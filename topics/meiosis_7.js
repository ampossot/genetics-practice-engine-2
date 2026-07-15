/**
 * Meiosis Learning Outcome 7
 *
 * Explain nondisjunction and aneuploidy, distinguish meiosis I from meiosis II
 * nondisjunction, predict resulting gametes, and interpret fertilization
 * outcomes.
 *
 * This module is intentionally standalone and registers its families into the
 * existing "gametes" topic.
 */

export function registerMeiosis7Topic(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE =
    "nondisjunction, aneuploid gametes, and chromosome-number consequences";

  const register = (difficulty, id, task, build) =>
    add("gametes", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  // -------------------------------------------------------------------------
  // BEGINNER
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "m7-nondisjunction-definition",
    "concept recognition",
    () =>
      q(
        "m7-nondisjunction-definition",
        "gametes",
        "beginner",
        "During meiosis, chromosome structures normally separate into different daughter cells.",
        "What is nondisjunction?",
        [
          "Failure of homologous chromosomes or sister chromatids to separate properly",
          "Normal exchange of DNA between homologues",
          "Independent orientation of chromosome pairs",
          "Replication of chromosomes before meiosis"
        ],
        "Failure of homologous chromosomes or sister chromatids to separate properly",
        "Focus on a segregation failure.",
        "Nondisjunction is the failure of chromosome structures to separate normally. Key takeaway: nondisjunction creates gametes with abnormal chromosome numbers.",
        {}
      )
  );

  register(
    "beginner",
    "m7-meiosis-i-error",
    "division identification",
    () =>
      q(
        "m7-meiosis-i-error",
        "gametes",
        "beginner",
        "A homologous chromosome pair moves together to the same pole during anaphase I.",
        "What type of error occurred?",
        [
          "Meiosis I nondisjunction",
          "Meiosis II nondisjunction",
          "Crossing over",
          "Independent assortment"
        ],
        "Meiosis I nondisjunction",
        "Homologues normally separate during meiosis I.",
        "The error occurred in meiosis I because homologous chromosomes failed to segregate. Key takeaway: meiosis I nondisjunction involves homologues.",
        {}
      )
  );

  register(
    "beginner",
    "m7-meiosis-ii-error",
    "division identification",
    () =>
      q(
        "m7-meiosis-ii-error",
        "gametes",
        "beginner",
        "Sister chromatids fail to separate during anaphase II.",
        "What type of error occurred?",
        [
          "Meiosis II nondisjunction",
          "Meiosis I nondisjunction",
          "Synapsis",
          "Crossing over"
        ],
        "Meiosis II nondisjunction",
        "Sister chromatids normally separate during meiosis II.",
        "The error occurred in meiosis II because sister chromatids failed to segregate. Key takeaway: meiosis II nondisjunction involves sister chromatids.",
        {}
      )
  );

  register(
    "beginner",
    "m7-aneuploidy-definition",
    "concept recognition",
    () =>
      q(
        "m7-aneuploidy-definition",
        "gametes",
        "beginner",
        "A cell has one chromosome more or less than the normal chromosome number.",
        "What is this condition called?",
        [
          "Aneuploidy",
          "Polyploidy",
          "Crossing over",
          "Independent assortment"
        ],
        "Aneuploidy",
        "Aneuploidy concerns gain or loss of individual chromosomes.",
        "Aneuploidy is an abnormal number of particular chromosomes, such as one extra or one missing chromosome. Key takeaway: aneuploidy differs from changes in whole chromosome sets.",
        {}
      )
  );

  register(
    "beginner",
    "m7-normal-vs-abnormal-gamete",
    "gamete classification",
    () =>
      q(
        "m7-normal-vs-abnormal-gamete",
        "gametes",
        "beginner",
        "For one chromosome pair, a normal gamete should contain one chromosome.",
        "Which gamete is aneuploid for that chromosome?",
        [
          "A gamete containing two copies of the chromosome",
          "A gamete containing one copy of the chromosome",
          "A gamete containing one allele from each gene",
          "A gamete produced after crossing over"
        ],
        "A gamete containing two copies of the chromosome",
        "Compare the gamete with the expected one-copy state.",
        "A gamete with two copies is n+1 for that chromosome. Key takeaway: gametes are aneuploid when they contain too many or too few copies of a chromosome.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "m7-mi-gamete-pattern",
    "gamete outcome prediction",
    () =>
      q(
        "m7-mi-gamete-pattern",
        "gametes",
        "intermediate",
        "One homologous chromosome pair undergoes nondisjunction in meiosis I. Meiosis II proceeds normally.",
        "What gamete pattern is expected for that chromosome?",
        [
          "Two n+1 gametes and two n−1 gametes",
          "Two normal gametes, one n+1 gamete, and one n−1 gamete",
          "Four normal gametes",
          "One normal gamete and three n+1 gametes"
        ],
        "Two n+1 gametes and two n−1 gametes",
        "Both homologues enter one meiosis I daughter cell and neither enters the other.",
        "After meiosis II, the cell with both homologues produces two n+1 gametes, and the cell with none produces two n−1 gametes. Key takeaway: meiosis I nondisjunction makes all four gametes abnormal.",
        {}
      )
  );

  register(
    "intermediate",
    "m7-mii-gamete-pattern",
    "gamete outcome prediction",
    () =>
      q(
        "m7-mii-gamete-pattern",
        "gametes",
        "intermediate",
        "Meiosis I proceeds normally. In one of the two cells, sister chromatids fail to separate during meiosis II.",
        "What gamete pattern is expected for that chromosome?",
        [
          "Two normal gametes, one n+1 gamete, and one n−1 gamete",
          "Two n+1 gametes and two n−1 gametes",
          "Four n+1 gametes",
          "Four normal gametes"
        ],
        "Two normal gametes, one n+1 gamete, and one n−1 gamete",
        "Only one meiosis II division is affected.",
        "The unaffected meiosis II cell produces two normal gametes; the affected cell produces one n+1 and one n−1 gamete. Key takeaway: meiosis II nondisjunction leaves two gametes normal.",
        {}
      )
  );

  register(
    "intermediate",
    "m7-infer-error-from-gametes",
    "reverse inference",
    () => {
      const scenario = pick([
        {
          pattern: "two n+1 gametes and two n−1 gametes",
          answer: "Meiosis I nondisjunction"
        },
        {
          pattern: "two normal gametes, one n+1 gamete, and one n−1 gamete",
          answer: "Meiosis II nondisjunction"
        }
      ]);
      return q(
        "m7-infer-error-from-gametes",
        "gametes",
        "intermediate",
        `A single meiotic event produces ${scenario.pattern} for one chromosome.`,
        "Which error best explains this pattern?",
        [
          scenario.answer,
          scenario.answer === "Meiosis I nondisjunction"
            ? "Meiosis II nondisjunction"
            : "Meiosis I nondisjunction",
          "Crossing over",
          "Independent assortment"
        ],
        scenario.answer,
        "Ask whether any normal gametes remain.",
        `${scenario.answer} matches the observed pattern. Key takeaway: gamete patterns can reveal the division in which nondisjunction occurred.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "m7-trisomy-after-fertilization",
    "fertilization consequence",
    () =>
      q(
        "m7-trisomy-after-fertilization",
        "gametes",
        "intermediate",
        "An n+1 gamete is fertilized by a normal n gamete.",
        "What chromosome condition will the resulting zygote have for that chromosome?",
        [
          "Trisomy",
          "Monosomy",
          "Normal disomy",
          "Tetraploidy"
        ],
        "Trisomy",
        "Add the chromosome copies contributed by the two gametes.",
        "The zygote receives three copies of that chromosome: two from the n+1 gamete and one from the normal gamete. Key takeaway: n+1 plus n produces trisomy.",
        {}
      )
  );

  register(
    "intermediate",
    "m7-monosomy-after-fertilization",
    "fertilization consequence",
    () =>
      q(
        "m7-monosomy-after-fertilization",
        "gametes",
        "intermediate",
        "An n−1 gamete lacking one chromosome is fertilized by a normal n gamete.",
        "What chromosome condition will the resulting zygote have for that chromosome?",
        [
          "Monosomy",
          "Trisomy",
          "Normal disomy",
          "Triploidy"
        ],
        "Monosomy",
        "The zygote receives only the copy contributed by the normal gamete.",
        "The zygote has one copy instead of two, producing monosomy. Key takeaway: n−1 plus n produces monosomy.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // ADVANCED
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "m7-homologue-vs-sister-origin",
    "mechanistic inference",
    () =>
      q(
        "m7-homologue-vs-sister-origin",
        "gametes",
        "advanced",
        "A disomic gamete contains two homologous chromosomes that carry different alleles at several loci.",
        "Which error is more consistent with this gamete?",
        [
          "Meiosis I nondisjunction",
          "Meiosis II nondisjunction",
          "Normal meiosis",
          "Crossing over alone"
        ],
        "Meiosis I nondisjunction",
        "Meiosis I nondisjunction can place both homologues into one gamete lineage.",
        "A meiosis I error can transmit both maternal and paternal homologues, which may carry different alleles. Key takeaway: allele differences can help distinguish homologue nondisjunction from sister-chromatid nondisjunction.",
        {}
      )
  );

  register(
    "advanced",
    "m7-identical-sisters-pattern",
    "mechanistic inference",
    () =>
      q(
        "m7-identical-sisters-pattern",
        "gametes",
        "advanced",
        "A disomic gamete contains two sister chromatids that are identical across the examined chromosome region.",
        "Which error is most consistent with this observation?",
        [
          "Meiosis II nondisjunction",
          "Meiosis I nondisjunction",
          "Independent assortment",
          "Normal segregation"
        ],
        "Meiosis II nondisjunction",
        "Sister chromatids normally separate during meiosis II.",
        "Failure of sister chromatids to separate can place both into one gamete. Key takeaway: sister-chromatid nondisjunction is a meiosis II error.",
        {}
      )
  );

  register(
    "advanced",
    "m7-down-syndrome-reasoning",
    "application reasoning",
    () =>
      q(
        "m7-down-syndrome-reasoning",
        "gametes",
        "advanced",
        "A zygote has three copies of chromosome 21.",
        "Which explanation is most appropriate?",
        [
          "An aneuploid gamete carrying an extra chromosome 21 participated in fertilization",
          "Crossing over created a new chromosome 21",
          "Independent assortment doubled chromosome 21",
          "Both parents contributed normal gametes with one copy each"
        ],
        "An aneuploid gamete carrying an extra chromosome 21 participated in fertilization",
        "Trisomy requires one gamete to contribute an extra copy.",
        "A gamete produced by nondisjunction can carry two copies of chromosome 21; fertilization with a normal gamete produces trisomy 21. Key takeaway: trisomy results from chromosome-number imbalance, not ordinary recombination.",
        {}
      )
  );

  register(
    "advanced",
    "m7-student-all-abnormal-mii",
    "misconception analysis",
    () =>
      q(
        "m7-student-all-abnormal-mii",
        "gametes",
        "advanced",
        "A student claims that meiosis II nondisjunction makes all four gametes abnormal.",
        "What is the best correction?",
        [
          "Only the two gametes from the affected meiosis II cell are abnormal; the other two are normal",
          "The claim is correct for every meiosis II error",
          "Meiosis II nondisjunction affects homologous chromosomes in both cells",
          "Nondisjunction never changes gamete chromosome number"
        ],
        "Only the two gametes from the affected meiosis II cell are abnormal; the other two are normal",
        "Meiosis I already produced two cells, and only one undergoes the meiosis II error.",
        "A typical meiosis II nondisjunction event affects one of the two cells, leaving the other division normal. Key takeaway: the timing of the error determines how many gametes are affected.",
        {}
      )
  );

  register(
    "advanced",
    "m7-information-sufficiency",
    "information sufficiency",
    () =>
      q(
        "m7-information-sufficiency",
        "gametes",
        "advanced",
        "A single aneuploid offspring is observed, but no parental gametes, chromosome markers, or meiotic products are available.",
        "Can the observation alone determine whether nondisjunction occurred in meiosis I or meiosis II?",
        [
          "No; additional information about gamete patterns or chromosome origin is needed",
          "Yes; all trisomies come from meiosis I",
          "Yes; all monosomies come from meiosis II",
          "No; nondisjunction can never be studied"
        ],
        "No; additional information about gamete patterns or chromosome origin is needed",
        "The same zygotic chromosome number can result from more than one meiotic error.",
        "Both meiosis I and meiosis II nondisjunction can produce n+1 or n−1 gametes. Key takeaway: zygote chromosome count alone may identify aneuploidy without identifying the division of origin.",
        {}
      )
  );
}
