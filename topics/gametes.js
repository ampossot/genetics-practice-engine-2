/**
 * Gametes & Meiosis — Commit 1
 *
 * Learning outcome:
 * Distinguish chromosomes, homologous chromosomes, and sister chromatids,
 * and track chromosome/chromatid counts before and after DNA replication.
 *
 * This is intentionally one completed learning outcome. Later commits will
 * add additional learning outcomes to this same module.
 */

export function registerGametesTopic(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE =
    "chromosomes, homologous chromosomes, and sister chromatids";

  const register = (difficulty, id, task, build, objective = OBJECTIVE) =>
    add("gametes", difficulty, id, build, {
      objective,
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
  // LEARNING OUTCOME 2
  // Explain the purpose and sequence of meiosis I and meiosis II, including
  // which chromosome structures separate and how chromosome/chromatid counts
  // change through the two divisions.
  // =========================================================================

  const MEIOSIS_OBJECTIVE =
    "purpose and events of meiosis I and meiosis II";

  // -------------------------------------------------------------------------
  // BEGINNER — sequence, purpose, and the structures that separate
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "gm2-meiosis-purpose",
    "purpose recognition",
    () =>
      q(
        "gm2-meiosis-purpose",
        "gametes",
        "beginner",
        "A diploid germ-line cell undergoes meiosis before producing gametes.",
        "What is the central purpose of meiosis?",
        [
          "To reduce chromosome-set number and produce haploid cells",
          "To make two genetically identical diploid cells",
          "To double chromosome number before fertilization",
          "To separate genes from chromosomes"
        ],
        "To reduce chromosome-set number and produce haploid cells",
        "Think about why fertilization can restore diploidy without chromosome number doubling every generation.",
        "Meiosis reduces a diploid cell to haploid products, allowing fertilization to restore the diploid state. Key takeaway: meiosis prevents chromosome number from doubling across generations.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "beginner",
    "gm2-what-separates-meiosis-i",
    "division identification",
    () =>
      q(
        "gm2-what-separates-meiosis-i",
        "gametes",
        "beginner",
        "During anaphase I, each homologous pair is pulled toward opposite poles. Sister chromatids remain joined at their centromeres.",
        "Which structures separate during meiosis I?",
        [
          "Homologous chromosomes",
          "Sister chromatids",
          "Individual genes",
          "DNA bases within each chromosome"
        ],
        "Homologous chromosomes",
        "Meiosis I separates the maternal and paternal members of each homologous pair.",
        "Homologous chromosomes separate during meiosis I, while sister chromatids remain together. Key takeaway: meiosis I separates homologues.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "beginner",
    "gm2-what-separates-meiosis-ii",
    "division identification",
    () =>
      q(
        "gm2-what-separates-meiosis-ii",
        "gametes",
        "beginner",
        "After meiosis I, each chromosome still consists of two sister chromatids. During the second division, the centromeres separate.",
        "Which structures separate during meiosis II?",
        [
          "Sister chromatids",
          "Homologous chromosome pairs",
          "Maternal and paternal nuclei",
          "Alleles from the same DNA molecule"
        ],
        "Sister chromatids",
        "Meiosis II resembles mitosis in the type of chromosome structure that separates.",
        "Sister chromatids separate during meiosis II. Key takeaway: meiosis I separates homologues; meiosis II separates sister chromatids.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "beginner",
    "gm2-order-major-events",
    "sequence ordering",
    () =>
      q(
        "gm2-order-major-events",
        "gametes",
        "beginner",
        "Consider four major events: DNA replication, homologous chromosome pairing, separation of homologues, and separation of sister chromatids.",
        "Which sequence is correct?",
        [
          "DNA replication → homologous pairing → homologue separation → sister-chromatid separation",
          "Homologous pairing → DNA replication → sister-chromatid separation → homologue separation",
          "DNA replication → sister-chromatid separation → homologous pairing → homologue separation",
          "Homologue separation → DNA replication → homologous pairing → sister-chromatid separation"
        ],
        "DNA replication → homologous pairing → homologue separation → sister-chromatid separation",
        "Replication occurs before meiosis begins; homologues pair before they separate.",
        "DNA replicates first, homologues pair during prophase I, homologues separate in meiosis I, and sister chromatids separate in meiosis II. Key takeaway: meiosis follows a specific chromosome-behavior sequence.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "beginner",
    "gm2-number-of-divisions",
    "process recognition",
    () =>
      q(
        "gm2-number-of-divisions",
        "gametes",
        "beginner",
        "One round of DNA replication is followed by meiosis I and meiosis II.",
        "How many nuclear divisions occur, and how many cells are usually produced from one starting cell?",
        [
          "Two divisions, producing four cells",
          "One division, producing two cells",
          "Two divisions, producing two cells",
          "Four divisions, producing eight cells"
        ],
        "Two divisions, producing four cells",
        "Each division approximately doubles the number of cells.",
        "One starting cell divides in meiosis I to form two cells; each divides again in meiosis II, producing four cells. Key takeaway: one replication is followed by two divisions.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — count tracking and interpretation across both divisions
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "gm2-count-after-meiosis-i",
    "chromosome-state tracking",
    () => {
      const item = pick(chromosomeSets);
      const correct =
        `${item.haploid} chromosomes and ${item.diploid} chromatids per cell`;
      return q(
        "gm2-count-after-meiosis-i",
        "gametes",
        "intermediate",
        `${item.organism} has 2n = ${item.diploid}. A diploid cell completes meiosis I normally. Sister chromatids remain joined.`,
        "What does each daughter cell contain immediately after meiosis I?",
        [
          correct,
          `${item.diploid} chromosomes and ${item.diploid} chromatids per cell`,
          `${item.haploid} chromosomes and ${item.haploid} chromatids per cell`,
          `${item.diploid} chromosomes and ${item.diploid * 2} chromatids per cell`
        ],
        correct,
        "Each cell receives one chromosome from every homologous pair, but every chromosome still has two chromatids.",
        `Each cell has the haploid chromosome number, ${item.haploid}, and each chromosome has two sister chromatids, giving ${item.diploid} chromatids. Key takeaway: cells are haploid after meiosis I even though chromosomes remain replicated.`,
        {}
      );
    },
    MEIOSIS_OBJECTIVE
  );

  register(
    "intermediate",
    "gm2-count-after-meiosis-ii",
    "chromosome-state tracking",
    () => {
      const item = pick(chromosomeSets);
      const correct =
        `${item.haploid} chromosomes and ${item.haploid} chromatids per cell`;
      return q(
        "gm2-count-after-meiosis-ii",
        "gametes",
        "intermediate",
        `${item.organism} has 2n = ${item.diploid}. Meiosis is completed normally.`,
        "What does each final meiotic product contain?",
        [
          correct,
          `${item.haploid} chromosomes and ${item.diploid} chromatids per cell`,
          `${item.diploid} chromosomes and ${item.diploid} chromatids per cell`,
          `${item.diploid} chromosomes and ${item.haploid} chromatids per cell`
        ],
        correct,
        "After sister chromatids separate, each chromosome in a final product consists of one chromatid.",
        `Each final cell is haploid with ${item.haploid} chromosomes, each made of one chromatid. Key takeaway: after meiosis II, chromosome number and chromatid number are equal in each product.`,
        {}
      );
    },
    MEIOSIS_OBJECTIVE
  );

  register(
    "intermediate",
    "gm2-why-reductional",
    "terminology interpretation",
    () =>
      q(
        "gm2-why-reductional",
        "gametes",
        "intermediate",
        "Meiosis I is often called the reductional division.",
        "Why is this description appropriate?",
        [
          "Homologous chromosomes separate, reducing the number of chromosome sets from diploid to haploid",
          "Sister chromatids separate, reducing DNA sequence length by half",
          "Every chromosome loses one arm during the division",
          "The cell removes all recessive alleles"
        ],
        "Homologous chromosomes separate, reducing the number of chromosome sets from diploid to haploid",
        "Focus on chromosome sets, not simply on DNA quantity.",
        "Separating homologues gives each daughter cell one chromosome from each pair, reducing ploidy from 2n to n. Key takeaway: meiosis I reduces chromosome-set number.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "intermediate",
    "gm2-no-s-phase-between-divisions",
    "process explanation",
    () =>
      q(
        "gm2-no-s-phase-between-divisions",
        "gametes",
        "intermediate",
        "DNA replicates before meiosis I, but there is no full S phase between meiosis I and meiosis II.",
        "Why is another round of DNA replication unnecessary?",
        [
          "The chromosomes already consist of sister chromatids that must be separated in meiosis II",
          "DNA cannot replicate in haploid cells",
          "All DNA is discarded at the end of meiosis I",
          "Homologous chromosomes must first be recreated"
        ],
        "The chromosomes already consist of sister chromatids that must be separated in meiosis II",
        "Ask what physical structures remain attached after meiosis I.",
        "After meiosis I, chromosomes are still replicated. Meiosis II separates the existing sister chromatids, so another replication would be counterproductive. Key takeaway: meiosis has one S phase followed by two separations.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "intermediate",
    "gm2-infer-stage-from-cell-description",
    "reverse stage inference",
    () => {
      const scenario = pick([
        {
          description:
            "Homologous chromosomes are aligned as pairs at the cell equator, and sister chromatids remain joined",
          answer: "Metaphase I"
        },
        {
          description:
            "Homologous chromosomes are moving toward opposite poles while sister chromatids remain joined",
          answer: "Anaphase I"
        },
        {
          description:
            "Individual replicated chromosomes are aligned at the equator of each haploid cell",
          answer: "Metaphase II"
        },
        {
          description:
            "Centromeres have separated and sister chromatids are moving toward opposite poles",
          answer: "Anaphase II"
        }
      ]);
      return q(
        "gm2-infer-stage-from-cell-description",
        "gametes",
        "intermediate",
        scenario.description + ".",
        "Which meiotic stage is best described?",
        ["Metaphase I", "Anaphase I", "Metaphase II", "Anaphase II"],
        scenario.answer,
        "Identify whether homologues or sister chromatids are paired, aligned, or separating.",
        `${scenario.answer} is correct. Key takeaway: meiotic stages are identified most reliably by chromosome behavior, not by memorizing stage names alone.`,
        {}
      );
    },
    MEIOSIS_OBJECTIVE
  );

  // -------------------------------------------------------------------------
  // ADVANCED — misconception diagnosis, evidence, and information sufficiency
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "gm2-diagnose-homologue-error",
    "misconception analysis",
    () =>
      q(
        "gm2-diagnose-homologue-error",
        "gametes",
        "advanced",
        "A student writes: “Meiosis I separates sister chromatids, and meiosis II separates homologous chromosomes.”",
        "What is the best correction?",
        [
          "The order is reversed: meiosis I separates homologues, and meiosis II separates sister chromatids",
          "Both divisions separate homologous chromosomes",
          "Both divisions separate sister chromatids",
          "Neither division separates chromosome structures"
        ],
        "The order is reversed: meiosis I separates homologues, and meiosis II separates sister chromatids",
        "Track the centromeres: they normally remain intact during meiosis I and divide during meiosis II.",
        "Homologues separate first while sister centromeres remain together; sister chromatids separate in the second division. Key takeaway: the two meiotic divisions solve two different separation problems.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "advanced",
    "gm2-ploidy-vs-dna-content",
    "concept integration",
    () =>
      q(
        "gm2-ploidy-vs-dna-content",
        "gametes",
        "advanced",
        "Immediately after meiosis I, a daughter cell has one member of each homologous pair, but every chromosome still consists of two sister chromatids.",
        "Which statement is most accurate?",
        [
          "The cell is haploid even though its chromosomes are still replicated",
          "The cell remains diploid until sister chromatids separate",
          "The cell is tetraploid because each chromosome has two chromatids",
          "Ploidy cannot be determined until fertilization"
        ],
        "The cell is haploid even though its chromosomes are still replicated",
        "Ploidy counts homologous chromosome sets, not chromatids.",
        "The cell has one set of homologues and is therefore haploid. Replication state affects DNA content, not the number of homologous sets. Key takeaway: ploidy and DNA content must be tracked separately.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "advanced",
    "gm2-experimental-centromere-label",
    "experimental interpretation",
    () =>
      q(
        "gm2-experimental-centromere-label",
        "gametes",
        "advanced",
        "A researcher fluorescently labels the two sister centromeres of every replicated chromosome. The labels remain together during the first division but move apart during the second.",
        "Which conclusion is supported?",
        [
          "Sister centromere cohesion is maintained through meiosis I and released during meiosis II",
          "Homologous chromosomes remain joined through meiosis II",
          "DNA replication occurs between the two divisions",
          "Meiosis I and meiosis II separate the same chromosome structures"
        ],
        "Sister centromere cohesion is maintained through meiosis I and released during meiosis II",
        "Interpret what it means for sister-centromere labels to move together or apart.",
        "Sister centromeres co-orient and remain linked in meiosis I, then separate in meiosis II. Key takeaway: regulated centromere cohesion helps ensure the correct order of chromosome segregation.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );

  register(
    "advanced",
    "gm2-infer-completed-division",
    "reverse process inference",
    () => {
      const item = pick(chromosomeSets);
      const correct =
        "Meiosis I has just been completed";
      return q(
        "gm2-infer-completed-division",
        "gametes",
        "advanced",
        `A starting diploid cell from ${item.organism} has 2n = ${item.diploid}. It produces two cells, each containing ${item.haploid} chromosomes composed of two chromatids.`,
        "Which event has most likely just occurred?",
        [
          correct,
          "DNA replication has just been completed",
          "Meiosis II has just been completed",
          "Fertilization has just occurred"
        ],
        correct,
        "Two cells plus haploid chromosome number plus replicated chromosomes is the diagnostic combination.",
        "Homologous chromosomes have separated into two haploid cells, but sister chromatids remain joined. This is the state immediately after meiosis I. Key takeaway: cell number, ploidy, and replication state together identify the division.",
        {}
      );
    },
    MEIOSIS_OBJECTIVE
  );

  register(
    "advanced",
    "gm2-image-information-sufficiency",
    "information sufficiency",
    () =>
      q(
        "gm2-image-information-sufficiency",
        "gametes",
        "advanced",
        "An image shows replicated chromosomes aligned at a cell equator. It does not reveal whether homologous chromosomes are paired, how many chromosome sets are present, or whether the image comes from one diploid cell or one of two haploid cells.",
        "Can the image alone distinguish metaphase I from metaphase II?",
        [
          "No; evidence about homologous pairing or ploidy is required",
          "Yes; replicated chromosomes align only in metaphase I",
          "Yes; metaphase II never contains sister chromatids",
          "No; metaphase I and metaphase II are biologically identical"
        ],
        "No; evidence about homologous pairing or ploidy is required",
        "Both stages contain replicated chromosomes, so identify what additional structural information is needed.",
        "Metaphase I features paired homologues in a diploid context; metaphase II features individual replicated chromosomes in haploid cells. Without those details, the stages cannot be distinguished. Key takeaway: stage identification requires chromosome relationships, not alignment alone.",
        {}
      ),
    MEIOSIS_OBJECTIVE
  );


  // =========================================================================
  // LEARNING OUTCOME 3
  // Predict the gametes produced by genotypes with one or more loci and
  // explain how Mendel's law of segregation generates those gametes.
  // =========================================================================

  const GAMETE_PREDICTION_OBJECTIVE =
    "gamete prediction and Mendel's law of segregation";

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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
      ),
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
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
      ),
    GAMETE_PREDICTION_OBJECTIVE
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
      ),
    GAMETE_PREDICTION_OBJECTIVE
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
      ),
    GAMETE_PREDICTION_OBJECTIVE
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
      ),
    GAMETE_PREDICTION_OBJECTIVE
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
      ),
    GAMETE_PREDICTION_OBJECTIVE
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
    },
    GAMETE_PREDICTION_OBJECTIVE
  );

}
