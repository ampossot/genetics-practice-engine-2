/**
 * Dihybrid Crosses — Objective 10
 *
 * Learning objective:
 * Interpret diagnostic testcross patterns, distinguish complete from partial
 * heterozygosity, and evaluate the limits of finite testcross evidence.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * This objective focuses on testcross-specific mastery rather than general
 * parental inference or experimental-design selection.
 */

export function registerObjective10(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "interpreting diagnostic patterns and limitations in dihybrid testcrosses";

  const register = (difficulty, id, task, build) =>
    add("dihybrid", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const allelePairs = [
    ["A", "B"],
    ["D", "E"],
    ["G", "H"],
    ["M", "N"],
    ["R", "T"]
  ];

  // -------------------------------------------------------------------------
  // BEGINNER — predict the class structure of a specified testcross
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh10-predict-testcross-classes",
    "testcross class prediction",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          unknown: `${A}${a}${B}${b}`,
          result:
            `four classes: ${A}_${B}_, ${A}_${b}${b}, ${a}${a}${B}_, and ${a}${a}${b}${b}`,
          ratio: "1:1:1:1"
        },
        {
          unknown: `${A}${A}${B}${b}`,
          result:
            `two classes: ${A}_${B}_ and ${A}_${b}${b}`,
          ratio: "1:1"
        },
        {
          unknown: `${A}${a}${B}${B}`,
          result:
            `two classes: ${A}_${B}_ and ${a}${a}${B}_`,
          ratio: "1:1"
        },
        {
          unknown: `${A}${A}${B}${B}`,
          result:
            `one class: ${A}_${B}_`,
          ratio: "all offspring in one class"
        },
        {
          unknown: `${A}${a}${b}${b}`,
          result:
            `two classes: ${A}_${b}${b} and ${a}${a}${b}${b}`,
          ratio: "1:1"
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-predict-testcross-classes",
        "dihybrid",
        "beginner",
        `An individual with genotype ${item.unknown} is crossed with the double-recessive tester ${a}${a}${b}${b}.`,
        "Which offspring pattern is expected?",
        shuffle([
          `${item.result}, in a ${item.ratio} pattern`,
          "four classes in a 9:3:3:1 ratio",
          `only ${a}${a}${b}${b} offspring`,
          "two classes in a 3:1 ratio"
        ]),
        `${item.result}, in a ${item.ratio} pattern`,
        "Each testcross offspring class corresponds directly to one gamete from the unknown parent.",
        `${item.unknown} produces the gametes represented by ${item.result}; therefore, the expected pattern is ${item.ratio}. Key takeaway: the number and frequency of testcross classes mirror the gametes produced by the unknown parent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — distinguish complete from partial heterozygosity
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh10-partial-heterozygosity",
    "partial heterozygosity diagnosis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          classes:
            `${A}_${B}_ and ${A}_${b}${b} in equal numbers`,
          correct: `${A}${A}${B}${b}`,
          explanation:
            `The unknown parent always contributes ${A}, but contributes either ${B} or ${b}.`
        },
        {
          classes:
            `${A}_${B}_ and ${a}${a}${B}_ in equal numbers`,
          correct: `${A}${a}${B}${B}`,
          explanation:
            `The unknown parent contributes either ${A} or ${a}, but always contributes ${B}.`
        },
        {
          classes:
            `${A}_${b}${b} and ${a}${a}${b}${b} in equal numbers`,
          correct: `${A}${a}${b}${b}`,
          explanation:
            `The unknown parent segregates at the first locus and is homozygous recessive at the second.`
        },
        {
          classes:
            `${a}${a}${B}_ and ${a}${a}${b}${b} in equal numbers`,
          correct: `${a}${a}${B}${b}`,
          explanation:
            `The unknown parent is homozygous recessive at the first locus and segregates at the second.`
        },
        {
          classes:
            `all four phenotype classes in approximately equal numbers`,
          correct: `${A}${a}${B}${b}`,
          explanation:
            `Four equal classes require heterozygosity at both loci.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-partial-heterozygosity",
        "dihybrid",
        "intermediate",
        `An unknown parent is testcrossed with ${a}${a}${b}${b}. A large sample contains ${item.classes}.`,
        "Which unknown-parent genotype is most consistent with the testcross?",
        shuffle([
          item.correct,
          `${A}${A}${B}${B}`,
          `${A}${a}${B}${b}`,
          `${a}${a}${b}${b}`
        ].filter((value, index, array) => array.indexOf(value) === index)),
        item.correct,
        "Determine which loci segregate into two classes and which loci remain fixed.",
        `${item.explanation} Therefore, the unknown genotype is ${item.correct}. Key takeaway: two testcross classes usually reveal heterozygosity at one locus, whereas four classes reveal heterozygosity at both.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — identify diagnostic classes that falsify a genotype hypothesis
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh10-falsifying-class",
    "testcross falsification reasoning",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          hypothesis: `${A}${A}${B}${B}`,
          diagnostic:
            `any offspring with ${a}${a} or ${b}${b}`,
          explanation:
            `A homozygous dominant parent cannot contribute ${a} or ${b}.`
        },
        {
          hypothesis: `${A}${A}${B}${b}`,
          diagnostic:
            `any ${a}${a} offspring`,
          explanation:
            `The proposed parent cannot contribute ${a}, although it can contribute ${b}.`
        },
        {
          hypothesis: `${A}${a}${B}${B}`,
          diagnostic:
            `any ${b}${b} offspring`,
          explanation:
            `The proposed parent cannot contribute ${b}.`
        },
        {
          hypothesis: `${A}${A}${b}${b}`,
          diagnostic:
            `any ${a}${a} offspring`,
          explanation:
            `The proposed parent can produce only ${A}${b} gametes.`
        },
        {
          hypothesis: `${a}${a}${B}${B}`,
          diagnostic:
            `any ${b}${b} offspring`,
          explanation:
            `The proposed parent can produce only ${a}${B} gametes.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-falsifying-class",
        "dihybrid",
        "advanced",
        `An unknown parent is testcrossed with ${a}${a}${b}${b}. The working hypothesis is that the unknown genotype is ${item.hypothesis}.`,
        "Which observation would immediately falsify that hypothesis?",
        shuffle([
          item.diagnostic,
          `an ${A}_${B}_ offspring`,
          "successful fertilization",
          "approximately equal numbers of males and females"
        ]),
        item.diagnostic,
        "Find an offspring class that requires an allele the proposed genotype cannot contribute.",
        `${item.explanation} Therefore, ${item.diagnostic} would falsify the hypothesis. Key takeaway: a single impossible-under-the-hypothesis class can be more decisive than many compatible offspring.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate finite-sample limits in testcrosses
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh10-finite-sample-limits",
    "testcross evidence limitation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          evidence:
            `four testcross offspring are all ${A}_${B}_`,
          correct:
            "The result supports homozygosity but does not exclude heterozygosity",
          explanation:
            `A heterozygous parent can produce four ${A}${B} gametes in succession by chance.`
        },
        {
          evidence:
            `one testcross offspring is ${a}${a}${b}${b}`,
          correct:
            `The unknown parent is proven to carry both ${a} and ${b}`,
          explanation:
            `The tester supplies one recessive allele at each locus, so the unknown parent supplied the other two.`
        },
        {
          evidence:
            `twenty testcross offspring are all ${A}_${B}_`,
          correct:
            `The evidence strongly supports ${A}${A}${B}${B}, but it is still probabilistic rather than absolute proof`,
          explanation:
            `Missing all alternative classes becomes unlikely under heterozygosity, but finite samples cannot create logical certainty from absence alone.`
        },
        {
          evidence:
            `two classes are observed among six offspring`,
          correct:
            "The data may suggest heterozygosity at one locus, but a larger sample is needed to exclude missing classes",
          explanation:
            `A double heterozygote can fail to display all four classes in a small sample.`
        },
        {
          evidence:
            `all four classes appear among five offspring`,
          correct:
            `The unknown parent is proven to be heterozygous at both loci`,
          explanation:
            `Producing all four tester-revealed classes requires all four gamete types.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-finite-sample-limits",
        "dihybrid",
        "advanced",
        `A dihybrid testcross yields the following evidence: ${item.evidence}.`,
        "Which conclusion best respects the strength and limits of the evidence?",
        shuffle([
          item.correct,
          "The observed sample proves every unobserved class is impossible",
          "Testcross results cannot reveal parental genotype",
          "Dominant alleles are transmitted more frequently"
        ]),
        item.correct,
        "Observed diagnostic classes can prove allele presence; missing classes in finite samples usually provide only probabilistic evidence.",
        `${item.explanation} Key takeaway: presence can be logically decisive, whereas absence must be interpreted in light of sample size.`
      );
    }
  );
}
