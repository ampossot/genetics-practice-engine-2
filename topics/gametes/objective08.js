/**
 * Gametes & Meiosis — Objective 8
 *
 * Integrate chromosome structure, meiosis, segregation, independent
 * assortment, crossing over, linkage, and nondisjunction in short
 * multi-concept reasoning problems.
 */

export function registerObjective08(ctx) {
  const { add, q, pick } = ctx;

  const OBJECTIVE = "integrated meiosis reasoning";

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
    "gm8-stage-from-separation",
    "stage integration",
    () => {
      const item = pick([
        {
          event: "homologous chromosomes move to opposite poles while sister chromatids remain joined",
          answer: "Anaphase I"
        },
        {
          event: "sister chromatids move to opposite poles",
          answer: "Anaphase II"
        }
      ]);

      return q(
        "gm8-stage-from-separation",
        "gametes",
        "beginner",
        `A meiotic cell is observed while ${item.event}.`,
        "Which stage is occurring?",
        ["Anaphase I", "Anaphase II", "Prophase I", "Metaphase I"],
        item.answer,
        "Identify whether homologues or sister chromatids are separating.",
        `${item.answer} is correct. Key takeaway: chromosome behavior is the clearest way to distinguish meiosis I from meiosis II.`,
        {}
      );
    }
  );

  register(
    "beginner",
    "gm8-source-of-variation",
    "variation-source comparison",
    () =>
      q(
        "gm8-source-of-variation",
        "gametes",
        "beginner",
        "Three meiotic processes are considered: segregation, independent assortment, and crossing over.",
        "Which statement is most accurate?",
        [
          "All three influence which allele combinations appear in gametes",
          "Only segregation contributes to variation",
          "Crossing over changes chromosome number",
          "Independent assortment prevents allele segregation"
        ],
        "All three influence which allele combinations appear in gametes",
        "Each process changes how chromosomes or alleles are distributed.",
        "Segregation separates alleles, independent assortment combines chromosome pairs in different ways, and crossing over reshuffles alleles within homologues. Key takeaway: gamete diversity arises from multiple meiotic mechanisms.",
        {}
      )
  );

  register(
    "beginner",
    "gm8-normal-vs-nondisjunction",
    "normal-process identification",
    () =>
      q(
        "gm8-normal-vs-nondisjunction",
        "gametes",
        "beginner",
        "A cell completes meiosis and produces four gametes, each containing one chromosome from every homologous pair.",
        "Which conclusion is best supported?",
        [
          "Chromosome segregation was normal",
          "Meiosis I nondisjunction occurred",
          "Meiosis II nondisjunction occurred",
          "The cell remained diploid"
        ],
        "Chromosome segregation was normal",
        "Normal gametes receive one chromosome from each pair.",
        "All four products contain the expected chromosome complement, supporting normal segregation. Key takeaway: nondisjunction is detected by extra or missing chromosomes.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "gm8-linked-gamete-interpretation",
    "linkage and recombination integration",
    () =>
      q(
        "gm8-linked-gamete-interpretation",
        "gametes",
        "intermediate",
        "A linked heterozygote has arrangement AB/ab and produces mostly AB and ab gametes, with fewer Ab and aB gametes.",
        "Which explanation best accounts for this pattern?",
        [
          "AB and ab are parental gametes, while crossing over produces the less frequent recombinant gametes",
          "Independent assortment requires AB and ab to be most frequent",
          "Dominant alleles are transmitted more often",
          "Nondisjunction creates Ab and aB"
        ],
        "AB and ab are parental gametes, while crossing over produces the less frequent recombinant gametes",
        "Use phase to identify parental classes, then explain recombinant classes mechanistically.",
        "The original haplotypes are AB and ab. Crossovers between the loci generate Ab and aB. Key takeaway: phase plus crossover frequency explains linked gamete patterns.",
        {}
      )
  );

  register(
    "intermediate",
    "gm8-infer-error-stage",
    "nondisjunction integration",
    () =>
      q(
        "gm8-infer-error-stage",
        "gametes",
        "intermediate",
        "One meiosis produces two normal gametes, one gamete with an extra chromosome, and one gamete missing that chromosome.",
        "Which event most likely occurred?",
        [
          "Nondisjunction during meiosis II",
          "Nondisjunction during meiosis I",
          "Normal independent assortment",
          "A single crossover"
        ],
        "Nondisjunction during meiosis II",
        "Ask whether any normal gametes remain.",
        "A meiosis II error affects one of the two cells formed after meiosis I, leaving two gametes normal. Key takeaway: the gamete pattern can identify the division in which nondisjunction occurred.",
        {}
      )
  );

  register(
    "intermediate",
    "gm8-track-one-allele",
    "allele-pathway reasoning",
    () =>
      q(
        "gm8-track-one-allele",
        "gametes",
        "intermediate",
        "An Aa individual carries A on one homologue and a on the other. Meiosis proceeds normally without mutation.",
        "Why can no normal gamete contain both A and a?",
        [
          "Homologous chromosomes separate during meiosis I, so each gamete lineage receives only one allele",
          "Both alleles are destroyed during meiosis",
          "Sister chromatids carry different genes",
          "Crossing over removes one allele"
        ],
        "Homologous chromosomes separate during meiosis I, so each gamete lineage receives only one allele",
        "Connect Mendel's law of segregation to chromosome movement.",
        "A and a occupy corresponding loci on homologues that separate during meiosis I. Key takeaway: chromosome segregation gives each normal gamete one allele per locus.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // ADVANCED
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "gm8-multi-observation-inference",
    "multi-evidence inference",
    () =>
      q(
        "gm8-multi-observation-inference",
        "gametes",
        "advanced",
        "A testcross shows two large parental classes and two small recombinant classes. All offspring have normal chromosome numbers.",
        "Which conclusion best integrates these observations?",
        [
          "The genes are linked, crossing over occurred in some meioses, and chromosome segregation was normal",
          "The genes assort independently and nondisjunction occurred",
          "The parent was homozygous at both loci",
          "Recombination changed chromosome number"
        ],
        "The genes are linked, crossing over occurred in some meioses, and chromosome segregation was normal",
        "Interpret class frequency and chromosome number separately, then combine the conclusions.",
        "Unequal parental and recombinant classes indicate linkage with some crossing over, while normal chromosome number argues against nondisjunction. Key takeaway: different observations can diagnose different meiotic processes simultaneously.",
        {}
      )
  );

  register(
    "advanced",
    "gm8-student-integrated-error",
    "misconception analysis",
    () =>
      q(
        "gm8-student-integrated-error",
        "gametes",
        "advanced",
        "A student says, “Recombinant gametes are aneuploid because crossing over gives them extra chromosome material.”",
        "What is the best correction?",
        [
          "Normal reciprocal crossing over changes allele combinations without changing chromosome number",
          "The statement is correct because every recombinant is n+1",
          "Aneuploidy results from independent assortment",
          "Recombinant gametes cannot participate in fertilization"
        ],
        "Normal reciprocal crossing over changes allele combinations without changing chromosome number",
        "Separate DNA rearrangement from chromosome-number imbalance.",
        "Crossing over exchanges corresponding segments, whereas nondisjunction changes chromosome number. Key takeaway: recombination and aneuploidy arise from different meiotic mechanisms.",
        {}
      )
  );

  register(
    "advanced",
    "gm8-information-sufficiency-integrated",
    "information sufficiency",
    () =>
      q(
        "gm8-information-sufficiency-integrated",
        "gametes",
        "advanced",
        "A single offspring has a nonparental allele combination, but chromosome number is unknown and the parental phase was not recorded.",
        "Which conclusion can be made with confidence?",
        [
          "The observation suggests recombination, but phase and chromosome-number data are needed for a more specific conclusion",
          "Meiosis I nondisjunction is proven",
          "The genes are definitely unlinked",
          "A new allele was created"
        ],
        "The observation suggests recombination, but phase and chromosome-number data are needed for a more specific conclusion",
        "Distinguish what the observation supports from what it proves.",
        "A nonparental combination is consistent with recombination, but without phase and chromosome-number information, the exact mechanism cannot be fully resolved. Key takeaway: strong genetic reasoning includes recognizing missing information.",
        {}
      )
  );
}
