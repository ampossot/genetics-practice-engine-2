/**
 * Dihybrid Crosses — Objective 01
 *
 * Predict the gametes produced by dihybrid individuals using
 * Mendel's Law of Independent Assortment.
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
    "a pea plant",
    "a fruit fly",
    "a corn plant",
    "a laboratory mouse",
    "a beetle"
  ];

  const allelePairs = [
    ["A", "B"],
    ["D", "E"],
    ["G", "H"],
    ["M", "N"],
    ["R", "T"]
  ];

  const gametesFor = (firstGenotype, secondGenotype) => {
    const firstAlleles = [...new Set(firstGenotype.split(""))];
    const secondAlleles = [...new Set(secondGenotype.split(""))];

    return firstAlleles.flatMap((first) =>
      secondAlleles.map((second) => `${first}${second}`)
    );
  };

  const formatList = (items) => items.join(", ");

  const genotypeData = (first, second) => {
    const firstLower = first.toLowerCase();
    const secondLower = second.toLowerCase();

    return [
      {
        genotype: `${first}${first}${second}${second}`,
        gametes: [`${first}${second}`],
        heterozygousLoci: 0
      },
      {
        genotype: `${first}${first}${second}${secondLower}`,
        gametes: [`${first}${second}`, `${first}${secondLower}`],
        heterozygousLoci: 1
      },
      {
        genotype: `${first}${firstLower}${second}${second}`,
        gametes: [`${first}${second}`, `${firstLower}${second}`],
        heterozygousLoci: 1
      },
      {
        genotype: `${first}${firstLower}${second}${secondLower}`,
        gametes: [
          `${first}${second}`,
          `${first}${secondLower}`,
          `${firstLower}${second}`,
          `${firstLower}${secondLower}`
        ],
        heterozygousLoci: 2
      }
    ];
  };

  // -------------------------------------------------------------------------
  // BEGINNER — generate the complete gamete set
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh1-generate-all-gametes",
    "gamete generation",
    () => {
      const organism = pick(organisms);
      const [first, second] = pick(allelePairs);
      const firstLower = first.toLowerCase();
      const secondLower = second.toLowerCase();
      const genotype = `${first}${firstLower}${second}${secondLower}`;
      const correctGametes = gametesFor(
        `${first}${firstLower}`,
        `${second}${secondLower}`
      );
      const correct = formatList(correctGametes);

      const options = shuffle([
        correct,
        formatList([`${first}${second}`, `${firstLower}${secondLower}`]),
        formatList([
          `${first}${firstLower}`,
          `${second}${secondLower}`
        ]),
        formatList([
          `${first}${second}`,
          `${first}${secondLower}`,
          `${firstLower}${secondLower}`
        ])
      ]);

      return q(
        "dh1-generate-all-gametes",
        "dihybrid",
        "beginner",
        `In ${organism}, the genes ${first}/${firstLower} and ${second}/${secondLower} assort independently. An individual has genotype ${genotype}.`,
        "Which list contains all possible gamete types produced by this individual?",
        options,
        correct,
        "A gamete receives one allele from each gene. Pair each allele at the first locus with each allele at the second locus.",
        `The individual can contribute ${first} or ${firstLower} at the first locus and ${second} or ${secondLower} at the second locus. Independent assortment produces ${correct}. A common mistake is to place both alleles of one gene in the same gamete or to omit valid combinations. Key takeaway: a double heterozygote produces four gamete types, one allele from each locus.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // BEGINNER — recognize a gamete containing an unavailable allele
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh1-identify-impossible-gamete",
    "constraint recognition",
    () => {
      const organism = pick(organisms);
      const [first, second] = pick(allelePairs);
      const firstLower = first.toLowerCase();
      const secondLower = second.toLowerCase();
      const absentSecond = pick(
        allelePairs
          .map((pair) => pair[1])
          .filter((letter) => letter !== second)
      );
      const impossible = `${firstLower}${absentSecond.toLowerCase()}`;

      const options = shuffle([
        `${first}${second}`,
        `${first}${secondLower}`,
        `${firstLower}${second}`,
        impossible
      ]);

      return q(
        "dh1-identify-impossible-gamete",
        "dihybrid",
        "beginner",
        `A ${organism} has genotype ${first}${firstLower}${second}${secondLower}. The two genes assort independently.`,
        "Which gamete cannot be produced by this individual?",
        options,
        impossible,
        "Check whether every allele in the proposed gamete is actually present in the parent's genotype.",
        `${impossible} cannot be produced because the parent carries only ${second} and ${secondLower} at the second locus, not ${absentSecond.toLowerCase()}. Independent assortment changes how parental alleles are combined; it does not create new alleles. Key takeaway: every gamete must contain one allele from each locus, and both alleles must come from the parent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — count unique gamete types
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh1-count-gamete-types",
    "gamete-type counting",
    () => {
      const organism = pick(organisms);
      const [first, second] = pick(allelePairs);
      const item = pick(genotypeData(first, second));
      const correct = String(2 ** item.heterozygousLoci);

      return q(
        "dh1-count-gamete-types",
        "dihybrid",
        "intermediate",
        `In ${organism}, the two loci assort independently. Consider an individual with genotype ${item.genotype}.`,
        "How many genetically distinct gamete types can this individual produce?",
        chooseOptions(correct, ["1", "2", "4", "8"]),
        correct,
        "Count the heterozygous loci. Each heterozygous locus contributes two allele possibilities; each homozygous locus contributes one.",
        `This genotype has ${item.heterozygousLoci} heterozygous ${item.heterozygousLoci === 1 ? "locus" : "loci"}, so it produces 2^${item.heterozygousLoci} = ${correct} unique gamete ${correct === "1" ? "type" : "types"}. The possible set is ${formatList(item.gametes)}. A common misconception is to count alleles rather than combinations. Key takeaway: for independently assorting loci, the number of gamete types is 2^n, where n is the number of heterozygous loci.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer the parental genotype from the complete gamete set
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh1-reverse-inference",
    "reverse inference",
    () => {
      const organism = pick(organisms);
      const [first, second] = pick(allelePairs);
      const data = genotypeData(first, second);
      const target = pick(data);
      const observed = formatList(target.gametes);

      const options = shuffle(data.map((item) => item.genotype));

      return q(
        "dh1-reverse-inference",
        "dihybrid",
        "advanced",
        `A very large sample from ${organism} reveals the complete set of gamete types produced by one individual: ${observed}. Assume normal meiosis and independent assortment.`,
        "Which parental genotype is consistent with this complete gamete set?",
        options,
        target.genotype,
        "At each locus, identify every allele represented among the gametes. One observed allele implies homozygosity; two imply heterozygosity.",
        `The gametes contain ${[...new Set(target.gametes.map((gamete) => gamete[0]))].join(" and ")} at the first locus and ${[...new Set(target.gametes.map((gamete) => gamete[1]))].join(" and ")} at the second locus. Therefore, the parental genotype is ${target.genotype}. The phrase “complete set” matters: without it, a small sample might fail to include a possible gamete type. Key takeaway: the alleles represented across the complete gamete set reveal whether each parental locus was homozygous or heterozygous.`
      );
    }
  );
}
