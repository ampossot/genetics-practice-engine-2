/**
 * Gametes & Meiosis —  Objective 03
 *
 * Standalone learning-outcome module.
 */

export function registerObjective03(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE = "gamete prediction and Mendel's law of segregation";

  const register = (difficulty, id, task, build) =>
    add("gametes", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });


  // LEARNING OUTCOME 3
  // Predict the gametes produced by genotypes with one or more loci and
  // explain how Mendel's law of segregation generates those gametes.
  // =========================================================================


  const genotypeCases = [
    {
      genotype: "Aa",
      gametes: ["A", "a"],
      impossible: ["AA", "Aa", "aa"],
      heterozygousLoci: 1
    },
    {
      genotype: "AaBb",
      gametes: ["AB", "Ab", "aB", "ab"],
      impossible: ["AA", "Bb", "Aab", "aaB"],
      heterozygousLoci: 2
    },
    {
      genotype: "AABb",
      gametes: ["AB", "Ab"],
      impossible: ["aB", "ab", "AAB", "Bb"],
      heterozygousLoci: 1
    },
    {
      genotype: "AaBB",
      gametes: ["AB", "aB"],
      impossible: ["Ab", "ab", "AaB", "BB"],
      heterozygousLoci: 1
    },
    {
      genotype: "AaBbCc",
      gametes: ["ABC", "ABc", "AbC", "Abc", "aBC", "aBc", "abC", "abc"],
      impossible: ["AABC", "BbC", "Aab", "aaBC"],
      heterozygousLoci: 3
    },
    {
      genotype: "AaBBCc",
      gametes: ["ABC", "ABc", "aBC", "aBc"],
      impossible: ["AbC", "abc", "AaBC", "BBC"],
      heterozygousLoci: 2
    }
  ];

  const lociFor = genotype => {
    const pairs = genotype.match(/[A-Z][A-Za-z]/g);
    return pairs || [];
  };

  const allelesAtEachLocus = genotype =>
    lociFor(genotype).map(pair => [...new Set(pair.split(""))]);

  const enumerateGametes = genotype =>
    allelesAtEachLocus(genotype).reduce(
      (acc, alleles) => acc.flatMap(prefix => alleles.map(a => prefix + a)),
      [""]
    );

  // -------------------------------------------------------------------------
  // BEGINNER — valid gametes, impossible gametes, and segregation basics
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "gm3-valid-gamete-one-locus",
    "validity check",
    () => {
      const genotype = pick(["Aa", "Bb", "Cc", "Dd"]);
      const A = genotype[0], a = genotype[1];
      const correct = pick([A, a]);
      return q(
        "gm3-valid-gamete-one-locus",
        "gametes",
        "beginner",
        `An individual has genotype ${genotype} at one autosomal locus. During meiosis, the two alleles segregate into different gametes.`,
        "Which is a valid gamete from this individual?",
        [correct, genotype, `${A}${A}`, `${a}${a}`],
        correct,
        "A gamete receives one allele from this locus.",
        `The individual can produce ${A} or ${a} gametes. ${correct} is valid because it contains one allele. Key takeaway: segregation places one allele from each gene into each gamete.`,
        {}
      );
    }
  );

  register(
    "beginner",
    "gm3-valid-gamete-multiple-loci",
    "validity check",
    () => {
      const item = pick(genotypeCases.slice(1));
      const correct = pick(item.gametes);
      const distractors = [
        ...item.impossible,
        item.genotype,
        correct + correct.slice(-1)
      ];
      return q(
        "gm3-valid-gamete-multiple-loci",
        "gametes",
        "beginner",
        `Assume the loci assort independently. The parent has genotype ${item.genotype}.`,
        "Which is a valid gamete from this parent?",
        chooseOptions(correct, distractors),
        correct,
        "A valid gamete contains exactly one allele from every locus, and each allele must be present in the parent.",
        `${correct} contains one allele from each locus represented in ${item.genotype}. Key takeaway: gametes are haploid combinations, not miniature diploid genotypes.`,
        {}
      );
    }
  );

  register(
    "beginner",
    "gm3-impossible-gamete",
    "impossible-combination identification",
    () => {
      const item = pick(genotypeCases.slice(1));
      const impossible = pick(item.impossible);
      return q(
        "gm3-impossible-gamete",
        "gametes",
        "beginner",
        `Assume independent assortment. The parent has genotype ${item.genotype}.`,
        "Which proposed gamete is impossible?",
        chooseOptions(impossible, item.gametes),
        impossible,
        "Check whether the gamete contains one allele per locus and whether every allele occurs in the parental genotype.",
        `${impossible} is impossible because it either contains too many alleles at a locus, omits a required locus, or includes an allele absent from the parent. Key takeaway: valid gametes must contain one parental allele from every locus.`,
        {}
      );
    }
  );

  register(
    "beginner",
    "gm3-complete-gamete-list",
    "set completion",
    () => {
      const item = pick([
        { genotype: "AaBb", shown: "AB, Ab, aB", missing: "ab" },
        { genotype: "AaBB", shown: "AB", missing: "aB" },
        { genotype: "AABb", shown: "AB", missing: "Ab" },
        { genotype: "AaBBCc", shown: "ABC, ABc, aBC", missing: "aBc" }
      ]);
      return q(
        "gm3-complete-gamete-list",
        "gametes",
        "beginner",
        `Assume independent assortment. A parent has genotype ${item.genotype}. A student lists these possible gametes: ${item.shown}.`,
        "Which gamete is missing from the complete list?",
        chooseOptions(item.missing, ["AA", "Bb", "abc", "Aab", "BBC"]),
        item.missing,
        "Systematically combine one possible allele from each locus.",
        `${item.missing} is the missing gamete. Key takeaway: a complete gamete list includes every one-allele-per-locus combination permitted by the genotype.`,
        {}
      );
    }
  );

  register(
    "beginner",
    "gm3-segregation-meaning",
    "law interpretation",
    () =>
      q(
        "gm3-segregation-meaning",
        "gametes",
        "beginner",
        "Mendel's law of segregation describes the behavior of the two alleles carried by a diploid individual at one gene.",
        "Which statement best expresses this law?",
        [
          "The two alleles separate during gamete formation so each gamete receives one allele",
          "Both alleles always enter the same gamete",
          "Dominant alleles are transmitted more often than recessive alleles",
          "Alleles at different genes must remain together"
        ],
        "The two alleles separate during gamete formation so each gamete receives one allele",
        "Relate allele segregation to separation of homologous chromosomes during meiosis.",
        "The two alleles occupy corresponding loci on homologous chromosomes, which separate during meiosis I. Key takeaway: segregation explains why each gamete receives only one allele per gene.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — counting, frequencies, reverse inference, mixed genotypes
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "gm3-count-gamete-types",
    "gamete-type counting",
    () => {
      const item = pick(genotypeCases);
      const correct = String(2 ** item.heterozygousLoci);
      return q(
        "gm3-count-gamete-types",
        "gametes",
        "intermediate",
        `Assume independent assortment and no linkage. The parent has genotype ${item.genotype}.`,
        "How many genetically distinct gamete types can this parent produce?",
        chooseOptions(correct, [
          String(item.heterozygousLoci),
          String(2 * item.heterozygousLoci),
          String(Math.max(1, 2 ** Math.max(0, item.heterozygousLoci - 1))),
          String(2 ** (item.heterozygousLoci + 1))
        ]),
        correct,
        "Use 2ⁿ, where n is the number of heterozygous loci.",
        `There are ${item.heterozygousLoci} heterozygous loci, so the number of gamete types is 2^${item.heterozygousLoci} = ${correct}. Key takeaway: homozygous loci do not increase the number of gamete types.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "gm3-gamete-frequency-independent",
    "gamete probability",
    () => {
      const item = pick([
        { genotype: "AaBb", gamete: "Ab", p: "1/4", calc: "1/2 × 1/2" },
        { genotype: "AaBbCc", gamete: "aBC", p: "1/8", calc: "1/2 × 1/2 × 1/2" },
        { genotype: "AaBBCc", gamete: "ABc", p: "1/4", calc: "1/2 × 1 × 1/2" },
        { genotype: "AABbCc", gamete: "AbC", p: "1/4", calc: "1 × 1/2 × 1/2" }
      ]);
      return q(
        "gm3-gamete-frequency-independent",
        "gametes",
        "intermediate",
        `Assume independent assortment and no linkage. The parent has genotype ${item.genotype}.`,
        `What is the probability of producing gamete ${item.gamete}?`,
        chooseOptions(item.p, ["1/2", "1/8", "1/16", "3/4", "1"]),
        item.p,
        "Multiply the probability of selecting the required allele at each locus.",
        `${item.calc} = ${item.p}. Key takeaway: gamete probability is the product of the required allele probabilities across independently assorting loci.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "gm3-reverse-infer-parent",
    "reverse genotype inference",
    () => {
      const caseItem = pick([
        {
          gametes: "AB, Ab, aB, and ab",
          answer: "AaBb",
          distractors: ["AABB", "AABb", "AaBB"]
        },
        {
          gametes: "AB and aB",
          answer: "AaBB",
          distractors: ["AABB", "AaBb", "AABb"]
        },
        {
          gametes: "ABC, ABc, aBC, and aBc",
          answer: "AaBBCc",
          distractors: ["AaBbCc", "AABBCc", "AaBBCC"]
        }
      ]);
      return q(
        "gm3-reverse-infer-parent",
        "gametes",
        "intermediate",
        `A parent produces these gamete types in approximately equal proportions: ${caseItem.gametes}. Assume independent assortment.`,
        "Which parental genotype best explains this gamete set?",
        [caseItem.answer, ...caseItem.distractors],
        caseItem.answer,
        "At each locus, two different alleles among the gametes indicate heterozygosity; one repeated allele indicates homozygosity.",
        `${caseItem.answer} produces exactly the listed gamete combinations. Key takeaway: gamete diversity can be used to reconstruct the parent's genotype.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "gm3-mixed-homozygous-heterozygous",
    "systematic gamete construction",
    () => {
      const genotype = pick(["AaBBCc", "AABbDd", "EeFfGG", "HhIIJj"]);
      const gametes = enumerateGametes(genotype);
      const correct = gametes.join(", ");
      const reversed = [...gametes].reverse().slice(0, Math.max(1, gametes.length - 1)).join(", ");
      return q(
        "gm3-mixed-homozygous-heterozygous",
        "gametes",
        "intermediate",
        `Assume independent assortment. The parent has genotype ${genotype}.`,
        "Which list contains all possible gamete types?",
        [
          correct,
          genotype,
          reversed,
          gametes.map(g => g + g.slice(-1)).join(", ")
        ],
        correct,
        "Homozygous loci contribute only one allele choice; heterozygous loci contribute two.",
        `${correct} is the complete set. Key takeaway: construct gametes locus by locus and vary only the heterozygous positions.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "gm3-segregation-chromosome-connection",
    "mechanism explanation",
    () =>
      q(
        "gm3-segregation-chromosome-connection",
        "gametes",
        "intermediate",
        "An Aa individual carries allele A on one homologue and allele a at the corresponding locus on the other homologue.",
        "Which meiotic event provides the physical basis of Mendel's law of segregation?",
        [
          "Separation of homologous chromosomes during meiosis I",
          "DNA replication during S phase",
          "Separation of sister chromatids during mitosis only",
          "Pairing of nonhomologous chromosomes"
        ],
        "Separation of homologous chromosomes during meiosis I",
        "The two alleles reside on the two homologous chromosomes.",
        "When homologues separate during meiosis I, A and a are directed into different daughter cells and ultimately different gametes. Key takeaway: Mendel's segregation law reflects homologue separation.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // ADVANCED — misconception analysis, sufficiency, and experimental logic
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "gm3-evaluate-diploid-gamete-error",
    "misconception analysis",
    () =>
      q(
        "gm3-evaluate-diploid-gamete-error",
        "gametes",
        "advanced",
        "A student states that an AaBb parent can produce gametes AA, Aa, Bb, and bb.",
        "What is the central error?",
        [
          "The student listed diploid allele pairs rather than one allele from each locus",
          "The student included too many recombinant gametes",
          "The student failed to duplicate each chromosome before meiosis",
          "The student assumed recessive alleles can enter gametes"
        ],
        "The student listed diploid allele pairs rather than one allele from each locus",
        "A gamete must represent all loci, but only one allele from each.",
        "Valid gametes from AaBb are AB, Ab, aB, and ab. Key takeaway: a gamete is haploid across loci, not diploid at one locus.",
        {}
      )
  );

  register(
    "advanced",
    "gm3-evaluate-missing-combinations",
    "error analysis",
    () =>
      q(
        "gm3-evaluate-missing-combinations",
        "gametes",
        "advanced",
        "A student lists only AB and ab as possible gametes from an AaBb parent and says the alleles must stay in the combinations found in the genotype notation.",
        "Under independent assortment, what is the best evaluation?",
        [
          "The list is incomplete because Ab and aB are also possible combinations",
          "The list is complete because allele order in the written genotype fixes chromosome arrangement",
          "The list is incorrect because only A and a gametes are possible",
          "The list is complete only when both genes are recessive"
        ],
        "The list is incomplete because Ab and aB are also possible combinations",
        "Written genotype notation AaBb does not specify physical linkage phase, and independent assortment allows all combinations.",
        "Under independent assortment, the allele choice at one locus is independent of the choice at the other, yielding AB, Ab, aB, and ab. Key takeaway: genotype notation alone does not force alleles to travel together.",
        {}
      )
  );

  register(
    "advanced",
    "gm3-information-sufficiency-linkage",
    "information sufficiency",
    () =>
      q(
        "gm3-information-sufficiency-linkage",
        "gametes",
        "advanced",
        "An individual has genotype AaBb, but the problem does not state whether the loci are linked, unlinked, or how the alleles are arranged on homologous chromosomes.",
        "Can the exact frequencies of AB, Ab, aB, and ab gametes be determined?",
        [
          "No; exact frequencies require information about linkage and, if linked, recombination frequency and phase",
          "Yes; all four gametes must always occur at 25%",
          "Yes; only AB and ab can occur",
          "No; genotypes can never be used to predict gametes"
        ],
        "No; exact frequencies require information about linkage and, if linked, recombination frequency and phase",
        "Separate the set of possible gametes from their expected frequencies.",
        "AaBb identifies possible alleles, but linked loci can produce unequal gamete frequencies depending on phase and recombination. Key takeaway: genotype alone may identify possibilities without determining exact probabilities.",
        {}
      )
  );

  register(
    "advanced",
    "gm3-experimental-test-segregation",
    "experimental design",
    () =>
      q(
        "gm3-experimental-test-segregation",
        "gametes",
        "advanced",
        "A researcher wants to test whether an Aa parent transmits A and a equally often. The alleles show complete dominance.",
        "Which design most directly reveals the allele carried by each gamete from the Aa parent?",
        [
          "Cross the Aa parent with aa and classify a large number of offspring",
          "Cross the Aa parent with AA and score only dominant offspring",
          "Cross AA with AA and measure offspring size",
          "Self-cross aa and count total offspring"
        ],
        "Cross the Aa parent with aa and classify a large number of offspring",
        "Use a tester that contributes only the recessive allele so offspring phenotype reveals the unknown gamete.",
        "In Aa × aa, dominant offspring received A and recessive offspring received a from the heterozygous parent. Key takeaway: a testcross converts gamete transmission into observable offspring classes.",
        {}
      )
  );

  register(
    "advanced",
    "gm3-observed-gamete-sampling",
    "data interpretation",
    () => {
      const n = pick([40, 60, 80, 100]);
      const A = Math.round(n * pick([0.45, 0.47, 0.53, 0.55]));
      const a = n - A;
      return q(
        "gm3-observed-gamete-sampling",
        "gametes",
        "advanced",
        `An Aa parent is testcrossed with aa. Among ${n} offspring, ${A} inherited A from the heterozygous parent and ${a} inherited a.`,
        "Which interpretation is most appropriate?",
        [
          "The counts are compatible with equal segregation because finite samples need not be exactly 1:1",
          "Mendel's law is disproven because the two counts are not identical",
          "Allele A is dominant, so it must be transmitted more often",
          "The aa tester altered which allele entered the heterozygous parent's gametes"
        ],
        "The counts are compatible with equal segregation because finite samples need not be exactly 1:1",
        "Expected ratios describe probabilities over many trials, not guaranteed exact counts.",
        `A 1:1 expectation allows random sampling deviations such as ${A}:${a}. Key takeaway: segregation predicts equal probabilities, not perfectly equal counts in every finite family.`,
        {}
      );
    }
  );


  // =========================================================================

}
