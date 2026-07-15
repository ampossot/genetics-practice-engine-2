/**
 * Meiosis Learning Outcome 6
 *
 * Explain linkage foundations: linked versus unlinked genes, coupling and
 * repulsion phase, and why parental gametes are usually more common than
 * recombinant gametes.
 *
 * This module is intentionally standalone and registers its families into the
 * existing "gametes" topic.
 */

export function registerMeiosis6Topic(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE =
    "linkage foundations, phase, and parental versus recombinant gametes";

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
    "m6-linked-definition",
    "concept recognition",
    () =>
      q(
        "m6-linked-definition",
        "gametes",
        "beginner",
        "Two genes are located on the same chromosome.",
        "What does it mean to say that the genes are linked?",
        [
          "They tend to be inherited together because they are physically located on the same chromosome",
          "They are different alleles of the same gene",
          "They must always produce the same phenotype",
          "They can never be separated by recombination"
        ],
        "They tend to be inherited together because they are physically located on the same chromosome",
        "Think about physical location, not phenotype.",
        "Linked genes occupy the same chromosome and therefore tend to travel together through meiosis. Key takeaway: linkage reflects chromosome location.",
        {}
      )
  );

  register(
    "beginner",
    "m6-unlinked-definition",
    "concept recognition",
    () =>
      q(
        "m6-unlinked-definition",
        "gametes",
        "beginner",
        "Two genes are on different chromosome pairs.",
        "How are they expected to behave during meiosis?",
        [
          "They usually assort independently",
          "They must remain together in every gamete",
          "They cannot segregate",
          "They always show complete linkage"
        ],
        "They usually assort independently",
        "Different chromosome pairs orient independently at metaphase I.",
        "Genes on different chromosomes generally assort independently. Key takeaway: unlinked genes are not physically constrained to travel together.",
        {}
      )
  );

  register(
    "beginner",
    "m6-coupling-phase",
    "phase identification",
    () =>
      q(
        "m6-coupling-phase",
        "gametes",
        "beginner",
        "A heterozygote has chromosome arrangement AB/ab.",
        "What is this arrangement called?",
        [
          "Coupling phase",
          "Repulsion phase",
          "Independent assortment",
          "Hemizygosity"
        ],
        "Coupling phase",
        "Both dominant alleles are on one homologue and both recessive alleles are on the other.",
        "AB/ab is coupling phase, also called cis configuration. Key takeaway: phase describes how alleles are arranged on homologous chromosomes.",
        {}
      )
  );

  register(
    "beginner",
    "m6-repulsion-phase",
    "phase identification",
    () =>
      q(
        "m6-repulsion-phase",
        "gametes",
        "beginner",
        "A heterozygote has chromosome arrangement Ab/aB.",
        "What is this arrangement called?",
        [
          "Repulsion phase",
          "Coupling phase",
          "Homozygous phase",
          "Independent phase"
        ],
        "Repulsion phase",
        "Each homologue carries one dominant and one recessive allele.",
        "Ab/aB is repulsion phase, also called trans configuration. Key takeaway: repulsion places alternative allele combinations on the homologues.",
        {}
      )
  );

  register(
    "beginner",
    "m6-parental-gametes-basic",
    "parental-class identification",
    () => {
      const phase = pick([
        { arrangement: "AB/ab", answer: "AB and ab" },
        { arrangement: "Ab/aB", answer: "Ab and aB" }
      ]);
      return q(
        "m6-parental-gametes-basic",
        "gametes",
        "beginner",
        `A linked heterozygote has arrangement ${phase.arrangement}.`,
        "Which gametes are parental?",
        [
          phase.answer,
          phase.arrangement === "AB/ab" ? "Ab and aB" : "AB and ab",
          "Aa and Bb",
          "A and B only"
        ],
        phase.answer,
        "Parental gametes match the allele combinations already present on the homologues.",
        `${phase.answer} preserve the original chromosome arrangements. Key takeaway: parental gametes reproduce the parental haplotypes.`,
        {}
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "m6-recombinant-gametes-phase",
    "recombinant-class identification",
    () => {
      const phase = pick([
        { arrangement: "AB/ab", answer: "Ab and aB", parental: "AB and ab" },
        { arrangement: "Ab/aB", answer: "AB and ab", parental: "Ab and aB" }
      ]);
      return q(
        "m6-recombinant-gametes-phase",
        "gametes",
        "intermediate",
        `A linked heterozygote has arrangement ${phase.arrangement}.`,
        "Which gametes are recombinant?",
        [
          phase.answer,
          phase.parental,
          "Aa and Bb",
          "A and a"
        ],
        phase.answer,
        "Recombinant gametes contain allele combinations not originally present on either homologue.",
        `${phase.answer} are recombinant relative to ${phase.arrangement}. Key takeaway: recombinant status depends on phase.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "m6-why-parentals-more-common",
    "mechanism explanation",
    () =>
      q(
        "m6-why-parentals-more-common",
        "gametes",
        "intermediate",
        "Two genes are linked and separated by a relatively short chromosome interval.",
        "Why are parental gametes usually more common than recombinant gametes?",
        [
          "Most meioses do not have a crossover between the two loci",
          "Recombinant gametes are always lethal",
          "Dominant alleles are transmitted more often",
          "Sister chromatids cannot separate"
        ],
        "Most meioses do not have a crossover between the two loci",
        "Recombinants require a crossover in the interval between the genes.",
        "When genes are close together, crossovers between them are relatively uncommon, so parental haplotypes predominate. Key takeaway: recombination frequency reflects crossover probability in the interval.",
        {}
      )
  );

  register(
    "intermediate",
    "m6-infer-phase-from-largest-classes",
    "reverse phase inference",
    () => {
      const caseItem = pick([
        {
          large: "AB and ab",
          answer: "AB/ab",
          distractor: "Ab/aB"
        },
        {
          large: "Ab and aB",
          answer: "Ab/aB",
          distractor: "AB/ab"
        }
      ]);
      return q(
        "m6-infer-phase-from-largest-classes",
        "gametes",
        "intermediate",
        `A testcross produces four classes. The two largest classes correspond to gametes ${caseItem.large}.`,
        "What was the most likely chromosome arrangement in the heterozygous parent?",
        [
          caseItem.answer,
          caseItem.distractor,
          "AABB",
          "aabb"
        ],
        caseItem.answer,
        "The largest classes usually represent parental gametes.",
        `${caseItem.large} are parental, so the phase is ${caseItem.answer}. Key takeaway: testcross class sizes can reveal phase.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "m6-linked-vs-unlinked-data",
    "data interpretation",
    () => {
      const dataset = pick([
        {
          context: "AB 248, ab 252, Ab 49, aB 51",
          answer: "The genes are linked because parental classes greatly exceed recombinant classes"
        },
        {
          context: "AB 101, ab 98, Ab 102, aB 99",
          answer: "The genes behave as unlinked or very far apart because all four classes are approximately equal"
        }
      ]);
      return q(
        "m6-linked-vs-unlinked-data",
        "gametes",
        "intermediate",
        `A dihybrid testcross produces these offspring classes: ${dataset.context}.`,
        "Which interpretation is best?",
        [
          dataset.answer,
          "The parent is homozygous at both loci",
          "Segregation failed at one locus",
          "The dominant alleles are selectively transmitted"
        ],
        dataset.answer,
        "Compare the two largest classes with the two smallest classes.",
        `${dataset.answer}. Key takeaway: unequal parental and recombinant class sizes are evidence of linkage.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "m6-phase-does-not-change-genotype",
    "concept comparison",
    () =>
      q(
        "m6-phase-does-not-change-genotype",
        "gametes",
        "intermediate",
        "Two individuals both have genotype AaBb. One is AB/ab and the other is Ab/aB.",
        "Which statement is correct?",
        [
          "They have the same genotype but different chromosome phase",
          "They have different genotypes at both loci",
          "Only one is heterozygous",
          "Phase determines whether alleles segregate"
        ],
        "They have the same genotype but different chromosome phase",
        "Genotype lists alleles; phase specifies how those alleles are distributed across homologues.",
        "Both are AaBb, but their haplotypes differ. Key takeaway: genotype and phase describe different genetic information.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // ADVANCED
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "m6-genotype-alone-phase-insufficient",
    "information sufficiency",
    () =>
      q(
        "m6-genotype-alone-phase-insufficient",
        "gametes",
        "advanced",
        "A problem states only that an individual is AaBb and that the genes are linked.",
        "Can the parental gametes be identified unambiguously?",
        [
          "No; the phase arrangement must also be known",
          "Yes; AB and ab are always parental",
          "Yes; Ab and aB are always parental",
          "No; linked genes never produce identifiable parental classes"
        ],
        "No; the phase arrangement must also be known",
        "AaBb does not reveal which alleles share the same chromosome.",
        "The parent could be AB/ab or Ab/aB. Key takeaway: linked-genotype interpretation requires phase.",
        {}
      )
  );

  register(
    "advanced",
    "m6-student-linked-means-no-recombination",
    "misconception analysis",
    () =>
      q(
        "m6-student-linked-means-no-recombination",
        "gametes",
        "advanced",
        "A student says, “If two genes are linked, recombinant gametes cannot be produced.”",
        "What is the best correction?",
        [
          "Linked genes can produce recombinant gametes through crossing over",
          "The statement is correct for all linked genes",
          "Recombination occurs only between genes on different chromosomes",
          "Linked genes do not segregate"
        ],
        "Linked genes can produce recombinant gametes through crossing over",
        "Linkage changes frequencies; it does not necessarily eliminate possibilities.",
        "Linked genes often produce fewer recombinant gametes, not zero. Key takeaway: linkage usually causes unequal frequencies rather than absolute inheritance.",
        {}
      )
  );

  register(
    "advanced",
    "m6-distance-and-recombination-concept",
    "relationship interpretation",
    () =>
      q(
        "m6-distance-and-recombination-concept",
        "gametes",
        "advanced",
        "Two linked gene pairs are compared. Pair 1 is separated by a shorter chromosome interval than Pair 2.",
        "Which expectation is most reasonable?",
        [
          "Pair 1 should usually have a lower recombination frequency",
          "Pair 1 must have a higher recombination frequency",
          "Both pairs must have exactly 50% recombination",
          "Physical distance has no relationship to recombination"
        ],
        "Pair 1 should usually have a lower recombination frequency",
        "A shorter interval provides fewer opportunities for a crossover between the loci.",
        "Closer genes generally recombine less frequently than genes farther apart. Key takeaway: recombination frequency can reflect relative gene distance.",
        {}
      )
  );

  register(
    "advanced",
    "m6-parental-class-not-dominance",
    "misconception analysis",
    () =>
      q(
        "m6-parental-class-not-dominance",
        "gametes",
        "advanced",
        "In a linkage testcross, AB and ab are the largest classes. A student concludes that AB is parental because both alleles are dominant.",
        "What is the key error?",
        [
          "Parental status is determined by original chromosome arrangement, not allele dominance",
          "Dominant alleles can never be parental",
          "Only recessive gametes can be parental",
          "Class size is unrelated to linkage"
        ],
        "Parental status is determined by original chromosome arrangement, not allele dominance",
        "Parental and recombinant are haplotype-history terms.",
        "AB may be parental, but not because A and B are dominant. Key takeaway: dominance affects phenotype, whereas phase determines parental haplotypes.",
        {}
      )
  );

  register(
    "advanced",
    "m6-experimental-identify-phase",
    "experimental design",
    () =>
      q(
        "m6-experimental-identify-phase",
        "gametes",
        "advanced",
        "A researcher knows an individual is AaBb and the genes are linked but does not know the phase.",
        "Which experiment best reveals the phase?",
        [
          "Perform a testcross with aabb and identify the two largest offspring classes",
          "Cross the individual with AABB and score only dominant offspring",
          "Measure chromosome number without genetic markers",
          "Self-cross aabb"
        ],
        "Perform a testcross with aabb and identify the two largest offspring classes",
        "A recessive tester makes offspring classes reflect the heterozygote's gametes.",
        "The most frequent testcross classes reveal the parental haplotypes and therefore the phase. Key takeaway: testcrosses convert hidden chromosome arrangements into observable offspring data.",
        {}
      )
  );
}
