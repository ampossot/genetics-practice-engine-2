/**
 * Gametes & Meiosis —  Objective 01
 *
 * Standalone learning-outcome module.
 */

export function registerObjective01(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE = "chromosomes, homologous chromosomes, and sister chromatids";

  const register = (difficulty, id, task, build) =>
    add("gametes", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const chromosomeSets = [
    { organism: "a fruit fly", diploid: 8, haploid: 4 },
    { organism: "a pea plant", diploid: 14, haploid: 7 },
    { organism: "a corn plant", diploid: 20, haploid: 10 },
    { organism: "a mouse", diploid: 40, haploid: 20 },
    { organism: "a human", diploid: 46, haploid: 23 }
  ];

  const countOptions = (correct, distractors) =>
    chooseOptions(String(correct), distractors.map(String));

  // -------------------------------------------------------------------------
  // BEGINNER — definitions, recognition, and basic chromosome relationships
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "gm1-chromosome-definition",
    "concept recognition",
    () =>
      q(
        "gm1-chromosome-definition",
        "gametes",
        "beginner",
        "A chromosome consists of one continuous DNA molecule together with associated proteins. Its appearance changes during the cell cycle.",
        "Which statement best defines a chromosome?",
        [
          "A DNA-containing structure that carries genes",
          "Only one of the two copies made during DNA replication",
          "A pair consisting of one maternal and one paternal chromosome",
          "Any two DNA molecules located in the same nucleus"
        ],
        "A DNA-containing structure that carries genes",
        "A chromosome is defined by its DNA molecule and associated proteins, not by whether it is replicated.",
        "A chromosome is a DNA-containing structure that carries genes. Before replication it contains one chromatid; after replication it contains two sister chromatids. Key takeaway: replication changes chromatid number, not chromosome identity."
      )
  );

  register(
    "beginner",
    "gm1-homologues-definition",
    "relationship identification",
    () =>
      q(
        "gm1-homologues-definition",
        "gametes",
        "beginner",
        "In a diploid organism, chromosomes occur in homologous pairs. One homologue is inherited from the mother and the other from the father.",
        "Which description correctly identifies homologous chromosomes?",
        [
          "Two chromosomes that carry the same genes in the same order but may carry different alleles",
          "The two identical DNA copies joined at one centromere after replication",
          "Any two chromosomes with the same physical length",
          "Two chromosomes that must carry identical alleles at every locus"
        ],
        "Two chromosomes that carry the same genes in the same order but may carry different alleles",
        "Homologues contain corresponding loci, but the alleles at those loci do not have to be identical.",
        "Homologous chromosomes carry the same genes in corresponding positions, although one may carry different alleles from the other. Key takeaway: homologous does not mean genetically identical."
      )
  );

  register(
    "beginner",
    "gm1-sister-chromatids-definition",
    "relationship identification",
    () =>
      q(
        "gm1-sister-chromatids-definition",
        "gametes",
        "beginner",
        "During S phase, each chromosome is copied. The two resulting DNA molecules remain attached at the centromere until they separate.",
        "What are these two attached copies called?",
        [
          "Sister chromatids",
          "Homologous chromosomes",
          "A bivalent",
          "Nonhomologous chromosomes"
        ],
        "Sister chromatids",
        "They are replicated copies of one chromosome and remain associated at a shared centromere.",
        "The attached copies are sister chromatids. Key takeaway: sister chromatids arise by replication of one chromosome; homologues were inherited from different parents."
      )
  );

  register(
    "beginner",
    "gm1-homologues-vs-sisters",
    "comparison",
    () => {
      const correct = pick([
        "Homologues can carry different alleles, whereas sister chromatids originate by copying one chromosome",
        "Homologues are usually inherited from different parents, whereas sister chromatids are produced during DNA replication"
      ]);
      return q(
        "gm1-homologues-vs-sisters",
        "gametes",
        "beginner",
        "A diploid cell contains homologous chromosome pairs. After DNA replication, each homologue consists of two sister chromatids.",
        "Which statement correctly distinguishes homologous chromosomes from sister chromatids?",
        [
          correct,
          "Homologues are joined at one centromere, whereas sister chromatids are never physically attached",
          "Sister chromatids carry different sets of genes, whereas homologues carry identical DNA sequences",
          "Homologues form during S phase, whereas sister chromatids are inherited from the two parents"
        ],
        correct,
        "Ask whether the structures came from the two parents or from replication of one chromosome.",
        `${correct}. Key takeaway: parental origin defines homologues; DNA replication produces sister chromatids.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — chromosome/chromatid counting and cell-cycle application
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "gm1-count-before-replication",
    "chromosome counting",
    () => {
      const item = pick(chromosomeSets);
      return q(
        "gm1-count-before-replication",
        "gametes",
        "intermediate",
        `${item.organism} has a diploid chromosome number of 2n = ${item.diploid}. Consider a diploid cell in G1, before DNA replication.`,
        "How many chromosomes and chromatids are present?",
        countOptions(
          `${item.diploid} chromosomes and ${item.diploid} chromatids`,
          [
            `${item.diploid} chromosomes and ${item.diploid * 2} chromatids`,
            `${item.haploid} chromosomes and ${item.diploid} chromatids`,
            `${item.diploid * 2} chromosomes and ${item.diploid * 2} chromatids`
          ]
        ),
        `${item.diploid} chromosomes and ${item.diploid} chromatids`,
        "Before replication, each chromosome consists of one chromatid.",
        `The cell has ${item.diploid} chromosomes, and each contains one chromatid, giving ${item.diploid} chromatids. Key takeaway: in G1, chromosome number equals chromatid number.`
      );
    }
  );

  register(
    "intermediate",
    "gm1-count-after-replication",
    "chromosome counting",
    () => {
      const item = pick(chromosomeSets);
      const correct =
        `${item.diploid} chromosomes and ${item.diploid * 2} chromatids`;
      return q(
        "gm1-count-after-replication",
        "gametes",
        "intermediate",
        `${item.organism} has a diploid chromosome number of 2n = ${item.diploid}. A diploid cell has completed S phase but has not yet begun meiosis I.`,
        "How many chromosomes and chromatids are present?",
        [
          correct,
          `${item.diploid * 2} chromosomes and ${item.diploid * 2} chromatids`,
          `${item.diploid} chromosomes and ${item.diploid} chromatids`,
          `${item.haploid} chromosomes and ${item.diploid} chromatids`
        ],
        correct,
        "DNA replication doubles the number of chromatids, but sister chromatids remain joined and are counted as one chromosome.",
        `There are still ${item.diploid} chromosomes, but each now contains two sister chromatids, giving ${item.diploid * 2} chromatids. Key takeaway: S phase doubles DNA content and chromatid number, not chromosome number.`
      );
    }
  );

  register(
    "intermediate",
    "gm1-count-homologous-pairs",
    "homologue counting",
    () => {
      const item = pick(chromosomeSets);
      return q(
        "gm1-count-homologous-pairs",
        "gametes",
        "intermediate",
        `${item.organism} has 2n = ${item.diploid}. Its diploid cells therefore contain ${item.diploid} chromosomes.`,
        "How many homologous chromosome pairs are present in one diploid cell?",
        countOptions(item.haploid, [
          item.diploid,
          item.diploid * 2,
          Math.max(1, item.haploid - 1)
        ]),
        String(item.haploid),
        "Each homologous pair contains two chromosomes, so divide the diploid number by two.",
        `${item.diploid} ÷ 2 = ${item.haploid} homologous pairs. Key takeaway: the haploid number equals the number of homologous pairs in a diploid cell.`
      );
    }
  );

  register(
    "intermediate",
    "gm1-replication-statement",
    "process interpretation",
    () =>
      q(
        "gm1-replication-statement",
        "gametes",
        "intermediate",
        "A diploid cell progresses from G1 through S phase. No cell division occurs during S phase.",
        "Which change occurs as a direct result of DNA replication?",
        [
          "Each chromosome changes from one chromatid to two sister chromatids",
          "The cell changes from diploid to tetraploid",
          "The number of homologous chromosome pairs doubles",
          "Each maternal chromosome becomes paired permanently with its paternal homologue"
        ],
        "Each chromosome changes from one chromatid to two sister chromatids",
        "Replication copies each DNA molecule; it does not add another set of homologous chromosomes.",
        "Each chromosome becomes a replicated chromosome composed of two sister chromatids. Ploidy and chromosome number remain unchanged. Key takeaway: DNA replication doubles DNA quantity without doubling ploidy."
      )
  );

  // -------------------------------------------------------------------------
  // ADVANCED — misconception analysis, recombination nuance, and evidence
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "gm1-centromere-counting-rule",
    "counting-rule application",
    () => {
      const item = pick(chromosomeSets);
      return q(
        "gm1-centromere-counting-rule",
        "gametes",
        "advanced",
        `${item.organism} has 2n = ${item.diploid}. A cell just before meiosis I contains ${item.diploid * 2} DNA molecules arranged as sister-chromatid pairs.`,
        "Why is the chromosome number still reported as " + item.diploid + " rather than " + item.diploid * 2 + "?",
        [
          "Chromosome number is counted by centromeres; each sister-chromatid pair still shares one centromere",
          "Only maternal DNA molecules are counted as chromosomes",
          "Half of the DNA molecules are temporarily inactive",
          "Chromosome number cannot be measured after DNA replication"
        ],
        "Chromosome number is counted by centromeres; each sister-chromatid pair still shares one centromere",
        "Joined sister chromatids constitute one replicated chromosome until their centromere separates.",
        "A replicated chromosome contains two DNA molecules but one functional centromere unit, so it is counted as one chromosome. Key takeaway: chromosome count follows centromere number, whereas chromatid count follows DNA-molecule number."
      );
    }
  );

  register(
    "advanced",
    "gm1-sisters-after-crossing-over",
    "concept refinement",
    () =>
      q(
        "gm1-sisters-after-crossing-over",
        "gametes",
        "advanced",
        "During prophase I, crossing over occurs between nonsister chromatids of homologous chromosomes.",
        "After a crossover, which statement about the chromatids is most accurate?",
        [
          "They are still sister chromatids if they share the same replicated chromosome, even though recombinant segments may make their DNA sequences no longer identical",
          "Any chromatids involved in crossing over become homologous chromosomes",
          "Crossing over converts sister chromatids into nonhomologous chromosomes",
          "All four chromatids in the homologous pair become genetically identical"
        ],
        "They are still sister chromatids if they share the same replicated chromosome, even though recombinant segments may make their DNA sequences no longer identical",
        "Structural relationship and sequence identity are related but not the same concept.",
        "Sister chromatids are defined by their origin from replication of one chromosome and their shared centromere relationship. Crossing over can make their sequences differ in exchanged regions. Key takeaway: sister chromatids need not remain perfectly sequence-identical after recombination."
      )
  );

  register(
    "advanced",
    "gm1-evaluate-doubling-claim",
    "misconception analysis",
    () => {
      const item = pick(chromosomeSets);
      return q(
        "gm1-evaluate-doubling-claim",
        "gametes",
        "advanced",
        `${item.organism} has 2n = ${item.diploid}. A student says, “After S phase the cell has ${item.diploid * 2} chromosomes because every chromosome was copied.”`,
        "What is the best evaluation of the student's claim?",
        [
          `The claim is incorrect: the cell still has ${item.diploid} chromosomes, now composed of ${item.diploid * 2} chromatids`,
          `The claim is correct because every DNA molecule is always counted as a separate chromosome`,
          `The claim is incorrect because neither chromosome number nor DNA amount changes during S phase`,
          `The claim is correct only for chromosomes inherited from the mother`
        ],
        `The claim is incorrect: the cell still has ${item.diploid} chromosomes, now composed of ${item.diploid * 2} chromatids`,
        "Separate chromosome number from DNA-molecule and chromatid number.",
        `Replication produces ${item.diploid * 2} chromatids, but paired sister chromatids are still counted as ${item.diploid} chromosomes. Key takeaway: “copied chromosome” does not mean “additional chromosome” until sister chromatids separate.`
      );
    }
  );

  register(
    "advanced",
    "gm1-information-sufficiency",
    "information sufficiency",
    () =>
      q(
        "gm1-information-sufficiency",
        "gametes",
        "advanced",
        "A microscopic image shows two DNA-containing rods of similar size inside one nucleus, but no centromere connections, parental markers, gene probes, or cell-cycle information are available.",
        "Can the image alone establish whether the rods are homologous chromosomes or sister chromatids?",
        [
          "No; similar appearance alone is insufficient because origin, loci, and centromere relationship are not shown",
          "Yes; structures of similar size must be sister chromatids",
          "Yes; any two rods in one nucleus are homologous chromosomes",
          "No; chromosomes and chromatids can never be distinguished experimentally"
        ],
        "No; similar appearance alone is insufficient because origin, loci, and centromere relationship are not shown",
        "Ask which defining evidence is missing rather than relying only on shape.",
        "Homologues are identified by corresponding loci and parental relationship; sister chromatids are identified as replicated copies joined within one chromosome. Similar size alone proves neither. Key takeaway: chromosome relationships require biological context, not appearance alone."
      )
  );

  // =========================================================================

}
