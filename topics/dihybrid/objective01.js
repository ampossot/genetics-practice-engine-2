/**
 * Dihybrid Crosses — Objective 01
 *
 * Learning objective:
 * Predict the gametes produced by dihybrid individuals using
 * Mendel's Law of Independent Assortment.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective01(ctx) {
  const { add, q, pick, chooseOptions, shuffle } = ctx;

  const OBJECTIVE =
    "predicting gametes from dihybrid genotypes using independent assortment";

  const register = (difficulty, id, task, build) =>
    add("dihybrid", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const organisms = [
    "pea plant",
    "fruit fly",
    "corn plant",
    "laboratory mouse",
    "beetle"
  ];

  const allelePairs = [
    ["A", "B"],
    ["D", "E"],
    ["G", "H"],
    ["M", "N"],
    ["R", "T"]
  ];

  const unique = (items) => [...new Set(items)];

  const gametesFor = (firstGenotype, secondGenotype) => {
    const firstAlleles = unique(firstGenotype.split(""));
    const secondAlleles = unique(secondGenotype.split(""));

    return firstAlleles.flatMap((first) =>
      secondAlleles.map((second) => `${first}${second}`)
    );
  };

  const formatList = (items) => items.join(", ");

  const genotypeScenarios = (A, B) => {
    const a = A.toLowerCase();
    const b = B.toLowerCase();

    return [
      {
        genotype: `${A}${A}${B}${B}`,
        gametes: [`${A}${B}`],
        heterozygousLoci: 0
      },
      {
        genotype: `${A}${A}${B}${b}`,
        gametes: [`${A}${B}`, `${A}${b}`],
        heterozygousLoci: 1
      },
      {
        genotype: `${A}${a}${B}${B}`,
        gametes: [`${A}${B}`, `${a}${B}`],
        heterozygousLoci: 1
      },
      {
        genotype: `${A}${a}${b}${b}`,
        gametes: [`${A}${b}`, `${a}${b}`],
        heterozygousLoci: 1
      },
      {
        genotype: `${A}${a}${B}${b}`,
        gametes: [`${A}${B}`, `${A}${b}`, `${a}${B}`, `${a}${b}`],
        heterozygousLoci: 2
      }
    ];
  };

  // -------------------------------------------------------------------------
  // BEGINNER — generate the complete gamete set
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh1-generate-gametes",
    "gamete generation",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const item = pick(genotypeScenarios(A, B));
      const correct = formatList(item.gametes);

      const allAlleles = item.genotype.split("");
      const wrongSets = [
        formatList(unique(allAlleles)),
        formatList([
          `${item.genotype[0]}${item.genotype[1]}`,
          `${item.genotype[2]}${item.genotype[3]}`
        ]),
        formatList(item.gametes.slice(0, Math.max(1, item.gametes.length - 1))),
        formatList(
          unique([
            `${item.genotype[0]}${item.genotype[2]}`,
            `${item.genotype[1]}${item.genotype[3]}`
          ])
        )
      ].filter((option) => option !== correct);

      return q(
        "dh1-generate-gametes",
        "dihybrid",
        "beginner",
        `A ${organism} has genotype ${item.genotype}. The two loci assort independently.`,
        "Which list contains all unique gamete types this individual can produce?",
        shuffle([correct, ...shuffle(unique(wrongSets)).slice(0, 3)]),
        correct,
        "A gamete receives one allele from each locus. Combine every available allele at the first locus with every available allele at the second locus.",
        `${item.genotype} produces ${correct}. The number of combinations depends on how many loci are heterozygous. Key takeaway: each gamete contains one allele from each gene, and only unique allele combinations count as distinct gamete types.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — count and compare unique gamete types
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh1-count-and-compare",
    "gamete-type comparison",
    () => {
      const [A, B] = pick(allelePairs);
      const scenarios = genotypeScenarios(A, B);
      const first = pick(scenarios);
      const alternatives = scenarios.filter(
        (item) => item.heterozygousLoci !== first.heterozygousLoci
      );
      const second = pick(alternatives);

      const firstCount = 2 ** first.heterozygousLoci;
      const secondCount = 2 ** second.heterozygousLoci;

      const correct =
        firstCount === secondCount
          ? "They produce the same number of unique gamete types"
          : firstCount > secondCount
            ? `${first.genotype} produces more unique gamete types`
            : `${second.genotype} produces more unique gamete types`;

      return q(
        "dh1-count-and-compare",
        "dihybrid",
        "intermediate",
        `Compare individuals with genotypes ${first.genotype} and ${second.genotype}. Assume independent assortment.`,
        "Which statement is correct?",
        shuffle([
          correct,
          `${first.genotype} and ${second.genotype} must each produce four gamete types`,
          "The individual with more dominant alleles produces more gamete types",
          "Gamete-type number depends on chromosome number, not heterozygosity"
        ]),
        correct,
        "Count the heterozygous loci in each genotype. For independently assorting loci, the number of gamete types is 2^n.",
        `${first.genotype} has ${first.heterozygousLoci} heterozygous ${first.heterozygousLoci === 1 ? "locus" : "loci"} and produces ${firstCount} gamete type${firstCount === 1 ? "" : "s"}. ${second.genotype} has ${second.heterozygousLoci} heterozygous ${second.heterozygousLoci === 1 ? "locus" : "loci"} and produces ${secondCount}. Key takeaway: heterozygosity, not dominance, determines the number of unique gamete types.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — reverse-infer genotype from a complete gamete set
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh1-reverse-inference",
    "reverse genotype inference",
    () => {
      const [A, B] = pick(allelePairs);
      const scenarios = genotypeScenarios(A, B);
      const target = pick(scenarios);
      const correct = target.genotype;

      return q(
        "dh1-reverse-inference",
        "dihybrid",
        "advanced",
        `A very large sample reveals the complete gamete set ${formatList(target.gametes)} from one individual. Assume normal meiosis and independent assortment.`,
        "Which parental genotype is consistent with this complete gamete set?",
        shuffle([
          correct,
          ...shuffle(
            scenarios
              .filter((item) => item.genotype !== correct)
              .map((item) => item.genotype)
          ).slice(0, 3)
        ]),
        correct,
        "At each locus, identify every allele represented among the complete gamete set. One allele implies homozygosity; two imply heterozygosity.",
        `The gametes reveal exactly which alleles the parent can transmit at each locus, so the consistent genotype is ${correct}. The word “complete” is essential; a small sample could omit a possible gamete by chance. Key takeaway: complete gamete sets allow locus-by-locus reconstruction of the parental genotype.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate gamete reasoning and information sufficiency
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh1-evaluate-reasoning",
    "misconception and sufficiency analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          statement:
            `A student says that ${A}${a}${B}${b} produces only ${A}${B} and ${a}${b} gametes because alleles inherited together must stay together.`,
          correct:
            "The student ignored independent assortment, which also produces the mixed combinations",
          explanation:
            `Independent assortment produces ${A}${B}, ${A}${b}, ${a}${B}, and ${a}${b}.`
        },
        {
          statement:
            `A student says that ${A}${A}${B}${b} produces four gamete types because it contains four allele symbols.`,
          correct:
            "The student counted allele symbols instead of unique choices at each locus",
          explanation:
            `The parent contributes only ${A} at the first locus and either ${B} or ${b} at the second, producing two gamete types.`
        },
        {
          statement:
            `Only ${A}${B} and ${A}${b} gametes were observed in a sample of two gametes from an unknown parent.`,
          correct:
            "The sample is too small to prove that the parent is homozygous at the first locus",
          explanation:
            `A heterozygous parent could fail to contribute ${a} in a sample of only two gametes.`
        },
        {
          statement:
            `A student claims that a gamete from ${A}${a}${B}${b} can have genotype ${A}${a}${B}.`,
          correct:
            "A gamete must contain one allele from each locus, not both alleles from one locus",
          explanation:
            `Valid gametes contain one A-locus allele and one B-locus allele.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh1-evaluate-reasoning",
        "dihybrid",
        "advanced",
        item.statement,
        "What is the best evaluation?",
        shuffle([
          item.correct,
          "Dominant alleles are preferentially transmitted",
          "Crossing over is required to create any gametes",
          "The chromosome number must first be doubled"
        ]),
        item.correct,
        "Check whether the claim uses one allele per locus, includes all independently assorting combinations, and distinguishes a complete set from a small sample.",
        `${item.explanation} Key takeaway: correct gamete inference requires valid allele content, independent assortment, and appropriate attention to sample completeness.`
      );
    }
  );
}
