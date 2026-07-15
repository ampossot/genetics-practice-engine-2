/**
 * Meiosis Learning Outcome 5
 *
 * Explain how crossing over between nonsister chromatids produces recombinant
 * chromosomes and contributes to genetic diversity.
 *
 * This module is intentionally separate from gametes.js. The application
 * registers both modules into the same "gametes" topic.
 */

export function registerMeiosis5Topic(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE =
    "crossing over, recombinant chromatids, and genetic diversity";

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
    "m5-crossing-over-definition",
    "concept recognition",
    () =>
      q(
        "m5-crossing-over-definition",
        "gametes",
        "beginner",
        "During prophase I, homologous chromosomes pair closely and corresponding chromatids may exchange matching DNA segments.",
        "What is this exchange called?",
        [
          "Crossing over",
          "Independent assortment",
          "Nondisjunction",
          "DNA replication"
        ],
        "Crossing over",
        "Look for the process involving physical exchange of DNA between paired homologues.",
        "Crossing over is the reciprocal exchange of corresponding DNA segments between nonsister chromatids of homologous chromosomes. Key takeaway: crossing over reshuffles existing alleles along chromosomes.",
        {}
      )
  );

  register(
    "beginner",
    "m5-crossing-over-stage",
    "stage identification",
    () =>
      q(
        "m5-crossing-over-stage",
        "gametes",
        "beginner",
        "Homologous chromosomes synapse and form tetrads before the first meiotic division.",
        "During which stage does crossing over normally occur?",
        [
          "Prophase I",
          "Metaphase II",
          "Anaphase I",
          "Telophase II"
        ],
        "Prophase I",
        "Crossing over requires homologous chromosomes to be paired before they separate.",
        "Crossing over occurs during prophase I, when homologues are synapsed. Key takeaway: recombination occurs before homologous chromosomes separate.",
        {}
      )
  );

  register(
    "beginner",
    "m5-participating-chromatids",
    "structure identification",
    () =>
      q(
        "m5-participating-chromatids",
        "gametes",
        "beginner",
        "A homologous chromosome pair contains four chromatids after DNA replication.",
        "Which chromatids normally exchange DNA during crossing over?",
        [
          "Nonsister chromatids of homologous chromosomes",
          "The two sister chromatids of one chromosome only",
          "Chromatids from nonhomologous chromosomes",
          "All four chromatids simultaneously"
        ],
        "Nonsister chromatids of homologous chromosomes",
        "The exchange occurs between one chromatid from each homologue.",
        "Crossing over normally involves nonsister chromatids—one from the maternal homologue and one from the paternal homologue. Key takeaway: recombination connects homologous chromosomes without merging all four chromatids.",
        {}
      )
  );

  register(
    "beginner",
    "m5-parental-vs-recombinant",
    "vocabulary classification",
    () =>
      q(
        "m5-parental-vs-recombinant",
        "gametes",
        "beginner",
        "A chromosome initially carries alleles A and B together. After crossing over, one chromatid carries A with b.",
        "How should the Ab chromatid be classified?",
        [
          "Recombinant",
          "Parental",
          "Homozygous",
          "Nonhomologous"
        ],
        "Recombinant",
        "Compare the final allele combination with the combinations present before crossing over.",
        "Ab is recombinant because it contains a new combination of alleles relative to the original parental chromosome. Key takeaway: recombinant refers to a new arrangement of existing alleles.",
        {}
      )
  );

  register(
    "beginner",
    "m5-crossing-over-diversity",
    "purpose interpretation",
    () =>
      q(
        "m5-crossing-over-diversity",
        "gametes",
        "beginner",
        "Crossing over exchanges corresponding DNA segments between homologous chromosomes.",
        "How does this process increase genetic diversity?",
        [
          "It creates new combinations of alleles on chromatids",
          "It creates entirely new genes in every gamete",
          "It doubles the chromosome number",
          "It prevents homologous chromosomes from separating"
        ],
        "It creates new combinations of alleles on chromatids",
        "Crossing over rearranges alleles that already exist.",
        "Crossing over produces new allele combinations without necessarily producing new alleles. Key takeaway: recombination reshuffles genetic variation.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "m5-single-crossover-products",
    "chromatid outcome prediction",
    () =>
      q(
        "m5-single-crossover-products",
        "gametes",
        "intermediate",
        "Homologous chromosomes have haplotypes AB and ab. A single crossover occurs between the A and B loci involving two nonsister chromatids.",
        "Which four chromatid types are present after the crossover?",
        [
          "AB, ab, Ab, and aB",
          "AB, AB, ab, and ab",
          "Aa, Bb, AB, and ab",
          "Ab, Ab, aB, and aB"
        ],
        "AB, ab, Ab, and aB",
        "A single crossover usually changes two chromatids and leaves two unchanged.",
        "The participating chromatids become Ab and aB; the two nonparticipating chromatids remain AB and ab. Key takeaway: one crossover produces two parental and two recombinant chromatids.",
        {}
      )
  );

  register(
    "intermediate",
    "m5-how-many-recombinant-chromatids",
    "quantitative structure reasoning",
    () =>
      q(
        "m5-how-many-recombinant-chromatids",
        "gametes",
        "intermediate",
        "One crossover occurs between two nonsister chromatids in a tetrad, with no additional crossovers.",
        "How many of the four chromatids are recombinant?",
        ["2", "1", "4", "0"],
        "2",
        "Only the two chromatids that physically participate in the exchange are altered.",
        "Two chromatids become recombinant and two remain parental. Key takeaway: a single crossover does not automatically alter every chromatid in the tetrad.",
        {}
      )
  );

  register(
    "intermediate",
    "m5-crossover-chromosome-number",
    "consequence interpretation",
    () =>
      q(
        "m5-crossover-chromosome-number",
        "gametes",
        "intermediate",
        "A normal reciprocal crossover exchanges equal corresponding segments between homologous chromosomes.",
        "What happens to chromosome number as a direct result?",
        [
          "Chromosome number remains unchanged",
          "Chromosome number doubles",
          "Chromosome number is reduced by half",
          "One chromosome is destroyed"
        ],
        "Chromosome number remains unchanged",
        "A reciprocal exchange changes DNA arrangement, not the number of centromeres.",
        "Normal crossing over alters allele arrangement but does not change chromosome number. Key takeaway: recombination changes chromosome content arrangement, not ploidy.",
        {}
      )
  );

  register(
    "intermediate",
    "m5-identify-recombinant-gametes",
    "gamete classification",
    () => {
      const phase = pick([
        {
          parental: "AB and ab",
          recombinant: "Ab and aB",
          answer: "Ab and aB"
        },
        {
          parental: "Ab and aB",
          recombinant: "AB and ab",
          answer: "AB and ab"
        }
      ]);
      return q(
        "m5-identify-recombinant-gametes",
        "gametes",
        "intermediate",
        `Before crossing over, the parental chromosome combinations are ${phase.parental}.`,
        "Which gamete types are recombinant?",
        [
          phase.answer,
          phase.parental,
          "Aa and Bb",
          "A and a only"
        ],
        phase.answer,
        "Recombinant combinations differ from both original parental haplotypes.",
        `${phase.recombinant} are recombinant because they combine alleles differently from the parental chromosomes. Key takeaway: recombinant status depends on the original phase arrangement.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "m5-chiasma-meaning",
    "structure interpretation",
    () =>
      q(
        "m5-chiasma-meaning",
        "gametes",
        "intermediate",
        "After homologous chromosomes begin to separate in prophase I, they may remain visibly connected at X-shaped regions.",
        "What does a chiasma represent?",
        [
          "A physical manifestation of a crossover between nonsister chromatids",
          "A site where sister chromatids are permanently fused",
          "A location where DNA replication begins",
          "A failed centromere"
        ],
        "A physical manifestation of a crossover between nonsister chromatids",
        "A chiasma marks where homologues remain associated after recombination.",
        "Chiasmata are visible consequences of crossover events and help hold homologues together until anaphase I. Key takeaway: a chiasma is evidence of physical exchange and homologue connection.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // ADVANCED
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "m5-new-alleles-misconception",
    "misconception analysis",
    () =>
      q(
        "m5-new-alleles-misconception",
        "gametes",
        "advanced",
        "A student says, “Crossing over increases variation because it creates new alleles.”",
        "What is the best correction?",
        [
          "Crossing over usually creates new combinations of existing alleles, not new alleles",
          "The statement is fully correct because every crossover is a mutation",
          "Crossing over decreases variation by removing alleles",
          "Crossing over affects chromosome number but not allele arrangement"
        ],
        "Crossing over usually creates new combinations of existing alleles, not new alleles",
        "Distinguish recombination from mutation.",
        "Mutation can generate new alleles; crossing over mainly rearranges alleles already present on homologous chromosomes. Key takeaway: recombination and mutation are different sources of variation.",
        {}
      )
  );

  register(
    "advanced",
    "m5-single-recombinant-evidence",
    "evidence interpretation",
    () =>
      q(
        "m5-single-recombinant-evidence",
        "gametes",
        "advanced",
        "A testcross produces one offspring with a genotype corresponding to a nonparental gamete from the heterozygous parent.",
        "What conclusion is best supported?",
        [
          "A recombination event occurred somewhere in the lineage producing that gamete",
          "All four chromatids in that meiosis must have crossed over",
          "The two genes must be on different chromosomes",
          "A new allele must have been created"
        ],
        "A recombination event occurred somewhere in the lineage producing that gamete",
        "A nonparental allele combination requires exchange or another recombination-producing event.",
        "The recombinant offspring supports that a crossover generated a nonparental gamete, but it does not imply that all chromatids participated. Key takeaway: recombinant progeny are evidence of recombination, not of a specific number of participating chromatids.",
        {}
      )
  );

  register(
    "advanced",
    "m5-crossover-location-inference",
    "reverse interval inference",
    () =>
      q(
        "m5-crossover-location-inference",
        "gametes",
        "advanced",
        "A chromatid begins as ABC and, after recombination with abc, becomes Abc.",
        "Between which loci must the crossover have occurred?",
        [
          "Between A and B",
          "Between B and C",
          "At the centromere only",
          "No crossover is needed"
        ],
        "Between A and B",
        "Identify where the allele pattern switches from one parental chromosome to the other.",
        "The chromatid retains A from ABC but carries b and c from abc, so the switch occurred between A and B. Key takeaway: recombinant haplotypes can reveal the interval containing a crossover.",
        {}
      )
  );

  register(
    "advanced",
    "m5-two-chromatid-limit",
    "mechanistic reasoning",
    () =>
      q(
        "m5-two-chromatid-limit",
        "gametes",
        "advanced",
        "A tetrad contains four chromatids. One crossover event occurs at one position.",
        "Why does that event usually involve only two chromatids?",
        [
          "A crossover is a reciprocal exchange between one chromatid from each homologue at a particular contact",
          "Only two chromatids contain DNA",
          "Sister chromatids are absent during prophase I",
          "The other two chromatids are always destroyed"
        ],
        "A crossover is a reciprocal exchange between one chromatid from each homologue at a particular contact",
        "The exchange occurs locally between two aligned DNA molecules.",
        "A single crossover junction forms between two nonsister chromatids; other chromatids in the tetrad need not participate at that site. Key takeaway: tetrad structure allows, but does not require, all chromatids to participate in the same exchange.",
        {}
      )
  );

  register(
    "advanced",
    "m5-information-sufficiency-crossover",
    "information sufficiency",
    () =>
      q(
        "m5-information-sufficiency-crossover",
        "gametes",
        "advanced",
        "A chromosome pair is shown after meiosis, but the original parental allele arrangements are not provided.",
        "Can a chromatid be classified unambiguously as parental or recombinant?",
        [
          "No; classification requires knowledge of the original parental haplotypes",
          "Yes; any chromatid with dominant alleles is parental",
          "Yes; the longest chromatid is always recombinant",
          "No; recombinant chromatids cannot be identified under any conditions"
        ],
        "No; classification requires knowledge of the original parental haplotypes",
        "Parental and recombinant are relational terms.",
        "A haplotype is recombinant only relative to the allele combinations present before recombination. Key takeaway: phase information is required to label chromatid classes correctly.",
        {}
      )
  );
}
