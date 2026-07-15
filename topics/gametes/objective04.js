/**
 * Gametes & Meiosis —  Objective 04
 *
 * Standalone learning-outcome module.
 */

export function registerObjective04(ctx) {
  const { add, q, pick, chooseOptions } = ctx;

  const OBJECTIVE = "Mendel's law of independent assortment";

  const register = (difficulty, id, task, build) =>
    add("gametes", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });


  // LEARNING OUTCOME 4
  // Explain and apply Mendel's law of independent assortment, including the
  // role of random homologous-pair orientation at metaphase I and the limits
  // of the assumption when genes are linked.
  // =========================================================================


  // -------------------------------------------------------------------------
  // BEGINNER — definition, recognition, and chromosome-orientation logic
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "gm4-independent-assortment-definition",
    "law interpretation",
    () =>
      q(
        "gm4-independent-assortment-definition",
        "gametes",
        "beginner",
        "Consider two genes located on different chromosome pairs.",
        "Which statement best describes Mendel's law of independent assortment?",
        [
          "The allele received at one gene does not determine which allele is received at the other gene",
          "Dominant alleles always enter the same gamete",
          "Homologous chromosomes fail to separate during meiosis I",
          "All genes on the same chromosome assort independently"
        ],
        "The allele received at one gene does not determine which allele is received at the other gene",
        "Think about whether the outcome at one chromosome pair constrains the outcome at another.",
        "When loci assort independently, allele transmission at one locus is independent of allele transmission at another. Key takeaway: independent assortment creates new allele combinations across loci.",
        {}
      )
  );

  register(
    "beginner",
    "gm4-metaphase-i-orientation",
    "mechanism recognition",
    () =>
      q(
        "gm4-metaphase-i-orientation",
        "gametes",
        "beginner",
        "At metaphase I, each homologous chromosome pair can orient toward either pole independently of other homologous pairs.",
        "Why does this orientation matter genetically?",
        [
          "Different orientations produce different combinations of maternal and paternal chromosomes in gametes",
          "It determines which chromosomes replicate",
          "It forces all maternal chromosomes into one gamete",
          "It prevents homologous chromosomes from separating"
        ],
        "Different orientations produce different combinations of maternal and paternal chromosomes in gametes",
        "Relate orientation at the equator to which homologues move together into the same daughter cell.",
        "Random pair orientation changes which maternal and paternal homologues are inherited together. Key takeaway: metaphase I orientation is the chromosome basis of independent assortment.",
        {}
      )
  );

  register(
    "beginner",
    "gm4-independent-assortment-gametes",
    "gamete-set recognition",
    () =>
      q(
        "gm4-independent-assortment-gametes",
        "gametes",
        "beginner",
        "An individual has genotype AaBb. The A/a and B/b loci are on different chromosome pairs and assort independently.",
        "Which complete set of gametes is expected?",
        [
          "AB, Ab, aB, and ab",
          "AB and ab only",
          "Aa and Bb only",
          "A, a, B, and b"
        ],
        "AB, Ab, aB, and ab",
        "Combine one allele from the A locus with one allele from the B locus.",
        "Independent assortment allows all four one-allele-per-locus combinations. Key takeaway: AaBb can produce four gamete types when the loci assort independently.",
        {}
      )
  );

  register(
    "beginner",
    "gm4-linked-vs-independent-basic",
    "condition recognition",
    () =>
      q(
        "gm4-linked-vs-independent-basic",
        "gametes",
        "beginner",
        "Two genes are located very close together on the same chromosome.",
        "Which statement is most accurate?",
        [
          "They may not assort independently because they can be inherited together more often than expected by chance",
          "They must always assort independently",
          "They cannot undergo segregation",
          "They are necessarily different alleles of the same gene"
        ],
        "They may not assort independently because they can be inherited together more often than expected by chance",
        "Independent assortment is most straightforward for genes on different chromosome pairs or very far apart on the same chromosome.",
        "Closely linked genes can travel together through meiosis, violating the equal-combination expectation. Key takeaway: independent assortment has biological conditions.",
        {}
      )
  );

  register(
    "beginner",
    "gm4-two-orientations-two-pairs",
    "orientation counting",
    () =>
      q(
        "gm4-two-orientations-two-pairs",
        "gametes",
        "beginner",
        "A cell has two heterozygous chromosome pairs carrying A/a and B/b. Ignore crossing over.",
        "How many distinct metaphase I orientation patterns determine the allele combinations entering one pole?",
        ["4", "2", "8", "1"],
        "4",
        "Each pair has two possible orientations, so multiply 2 × 2.",
        "Two independently orienting homologous pairs give 2² = 4 combinations. Key takeaway: independent chromosome orientation generates combinatorial diversity.",
        {}
      )
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — probabilities, orientation counts, and reverse reasoning
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "gm4-gamete-probability-two-loci",
    "product-rule application",
    () => {
      const gamete = pick(["AB", "Ab", "aB", "ab"]);
      return q(
        "gm4-gamete-probability-two-loci",
        "gametes",
        "intermediate",
        "An AaBb individual has the two loci on different chromosome pairs. Each heterozygous locus contributes either allele with probability 1/2.",
        `What is the probability of gamete ${gamete}?`,
        ["1/4", "1/2", "1/8", "3/4"],
        "1/4",
        "Multiply the independent probabilities for the two required alleles.",
        "The probability is 1/2 × 1/2 = 1/4. Key takeaway: independent assortment allows product-rule calculations across loci.",
        {}
      );
    }
  );

  register(
    "intermediate",
    "gm4-orientation-count-three-pairs",
    "orientation counting",
    () => {
      const n = pick([3, 4, 5]);
      const correct = String(2 ** n);
      return q(
        "gm4-orientation-count-three-pairs",
        "gametes",
        "intermediate",
        `A meiotic cell contains ${n} independently orienting homologous chromosome pairs. Ignore crossing over.`,
        "How many chromosome combinations can be directed toward one pole at metaphase I?",
        chooseOptions(correct, [
          String(n),
          String(2 * n),
          String(2 ** (n - 1)),
          String(2 ** (n + 1))
        ]),
        correct,
        "Each pair has two possible orientations, so use 2ⁿ.",
        `There are 2^${n} = ${correct} possible combinations. Key takeaway: chromosome assortment diversity rises exponentially with chromosome-pair number.`,
        {}
      );
    }
  );

  register(
    "intermediate",
    "gm4-reverse-infer-independent-assortment",
    "reverse inference",
    () =>
      q(
        "gm4-reverse-infer-independent-assortment",
        "gametes",
        "intermediate",
        "A heterozygote AaBb produces AB, Ab, aB, and ab gametes in approximately equal proportions.",
        "Which interpretation is best supported?",
        [
          "The two loci are behaving as independently assorting loci",
          "The two loci are completely linked with no recombination",
          "The parent is homozygous at both loci",
          "Segregation failed at one locus"
        ],
        "The two loci are behaving as independently assorting loci",
        "Equal frequencies of all four combinations are expected when the allele choice at one locus is independent of the other.",
        "Approximately equal AB, Ab, aB, and ab frequencies support independent assortment. Key takeaway: gamete-frequency patterns can reveal chromosome behavior.",
        {}
      )
  );

  register(
    "intermediate",
    "gm4-distinguish-segregation-assortment",
    "concept comparison",
    () =>
      q(
        "gm4-distinguish-segregation-assortment",
        "gametes",
        "intermediate",
        "Mendel's law of segregation concerns one gene, while independent assortment concerns relationships among genes.",
        "Which pairing is correct?",
        [
          "Segregation: two alleles at one locus separate; independent assortment: allele transmission at different loci is independent",
          "Segregation: all genes enter one gamete; independent assortment: homologues fail to separate",
          "Segregation: sister chromatids replicate; independent assortment: DNA amount doubles",
          "Segregation and independent assortment are identical statements"
        ],
        "Segregation: two alleles at one locus separate; independent assortment: allele transmission at different loci is independent",
        "One law addresses allele separation within a locus; the other addresses combinations across loci.",
        "Segregation explains one allele per locus per gamete, while independent assortment explains how alleles at different loci combine. Key takeaway: the two Mendelian laws describe different levels of meiotic behavior.",
        {}
      )
  );

  register(
    "intermediate",
    "gm4-observed-equal-four-classes",
    "data interpretation",
    () => {
      const total = pick([80, 120, 160, 200]);
      const base = total / 4;
      const counts = [
        base + pick([-2, -1, 0, 1, 2]),
        base + pick([-2, -1, 0, 1, 2]),
        base + pick([-2, -1, 0, 1, 2])
      ];
      const fourth = total - counts.reduce((a, b) => a + b, 0);
      return q(
        "gm4-observed-equal-four-classes",
        "gametes",
        "intermediate",
        `An AaBb individual is testcrossed. The four offspring classes occur in counts ${counts[0]}, ${counts[1]}, ${counts[2]}, and ${fourth}.`,
        "Which interpretation is most appropriate?",
        [
          "The data are broadly consistent with a 1:1:1:1 expectation from independent assortment",
          "The loci are proven to be completely linked",
          "The parent must be homozygous at one locus",
          "Dominant alleles are transmitted more often"
        ],
        "The data are broadly consistent with a 1:1:1:1 expectation from independent assortment",
        "Expected equal classes need not be numerically identical in a finite sample.",
        "The four classes are close to equal, as expected from independent assortment in a dihybrid testcross. Key takeaway: sampling variation does not erase an underlying equal-probability pattern.",
        {}
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — assumptions, misconception analysis, and experimental design
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "gm4-genotype-alone-insufficient",
    "information sufficiency",
    () =>
      q(
        "gm4-genotype-alone-insufficient",
        "gametes",
        "advanced",
        "An individual is written as AaBb, but no chromosome locations or recombination information are given.",
        "Can exact gamete frequencies be inferred from the genotype notation alone?",
        [
          "No; the loci could assort independently or be linked, so chromosome context is required",
          "Yes; all four gametes must occur at 25%",
          "Yes; only AB and ab are possible",
          "No; genotypes never provide any information about gametes"
        ],
        "No; the loci could assort independently or be linked, so chromosome context is required",
        "Distinguish the possible allele combinations from their expected frequencies.",
        "AaBb identifies the alleles present, but linkage and phase determine whether gamete frequencies are equal or unequal. Key takeaway: independent assortment should be stated or biologically justified.",
        {}
      )
  );

  register(
    "advanced",
    "gm4-student-random-separation-error",
    "misconception analysis",
    () =>
      q(
        "gm4-student-random-separation-error",
        "gametes",
        "advanced",
        "A student says, “Independent assortment means chromosomes separate randomly, so either both homologues might enter the same gamete.”",
        "What is wrong with this statement?",
        [
          "Orientation of different homologous pairs is independent, but the two homologues of each pair still segregate to opposite poles",
          "Independent assortment means homologues do not separate",
          "Random orientation occurs during meiosis II only",
          "Independent assortment applies only to sister chromatids"
        ],
        "Orientation of different homologous pairs is independent, but the two homologues of each pair still segregate to opposite poles",
        "Randomness concerns pair orientation relative to other pairs, not whether segregation occurs.",
        "Each homologous pair segregates normally; what varies is which member faces the same pole as members of other pairs. Key takeaway: independent assortment is random combination, not random segregation failure.",
        {}
      )
  );

  register(
    "advanced",
    "gm4-experimental-test-independent-assortment",
    "experimental design",
    () =>
      q(
        "gm4-experimental-test-independent-assortment",
        "gametes",
        "advanced",
        "A researcher wants to test whether two genes in an AaBb individual assort independently.",
        "Which cross is most informative?",
        [
          "Testcross AaBb with aabb and compare the four offspring classes",
          "Cross AABB with AABB and count all offspring",
          "Cross aabb with aabb and measure body size",
          "Self-cross AABB and record only dominant phenotypes"
        ],
        "Testcross AaBb with aabb and compare the four offspring classes",
        "Use a tester that reveals the gamete genotype produced by the heterozygote.",
        "In AaBb × aabb, offspring phenotypes/genotypes directly reflect the gametes from AaBb. Equal four-class frequencies support independent assortment. Key takeaway: a dihybrid testcross exposes gamete combinations.",
        {}
      )
  );

  register(
    "advanced",
    "gm4-linked-gene-caveat",
    "assumption evaluation",
    () =>
      q(
        "gm4-linked-gene-caveat",
        "gametes",
        "advanced",
        "Two genes lie on the same chromosome, 2 map units apart.",
        "Why is a 1:1:1:1 gamete expectation inappropriate?",
        [
          "The loci are tightly linked, so parental gametes should greatly exceed recombinant gametes",
          "Genes on the same chromosome never segregate",
          "The parent cannot form four gamete types",
          "Recombination frequency must exceed 50%"
        ],
        "The loci are tightly linked, so parental gametes should greatly exceed recombinant gametes",
        "A 2% recombination frequency means only a small fraction of gametes are recombinant.",
        "Closely linked genes violate the equal-frequency assumption even though recombination can still create all four gamete types. Key takeaway: possibility and frequency are different questions.",
        {}
      )
  );

  register(
    "advanced",
    "gm4-orientation-probability",
    "probability reasoning",
    () => {
      const n = pick([3, 4, 5]);
      const denominator = 2 ** n;
      return q(
        "gm4-orientation-probability",
        "gametes",
        "advanced",
        `A cell has ${n} independently orienting homologous chromosome pairs. Consider one particular combination of maternal/paternal homologues directed toward one pole.`,
        "What is the probability of that specific combination?",
        chooseOptions(`1/${denominator}`, [
          `1/${n}`,
          `1/${2 * n}`,
          `1/${2 ** (n - 1)}`,
          "1/2"
        ]),
        `1/${denominator}`,
        "There are 2ⁿ equally likely pole-directed combinations.",
        `There are 2^${n} = ${denominator} equally likely combinations, so one specific combination has probability 1/${denominator}. Key takeaway: independent orientation supports precise chromosome-combination probabilities.`,
        {}
      );
    }
  );

}
