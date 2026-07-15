/**
 * Gametes & Meiosis —  Objective 02
 *
 * Standalone learning-outcome module.
 */

export function registerObjective02(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE = "purpose and events of meiosis I and meiosis II";

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

  // LEARNING OUTCOME 2
  // Explain the purpose and sequence of meiosis I and meiosis II, including
  // which chromosome structures separate and how chromosome/chromatid counts
  // change through the two divisions.
  // =========================================================================


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
      )
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
      )
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
      )
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
      )
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
      )
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
    }
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
    }
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
      )
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
      )
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
    }
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
      )
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
      )
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
      )
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
    }
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
      )
  );


  // =========================================================================

}
