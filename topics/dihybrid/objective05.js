/**
 * Dihybrid Crosses — Objective 05
 *
 * Learning objective:
 * Predict and interpret phenotypic ratios from dihybrid crosses under
 * complete dominance and independent assortment.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective05(ctx) {
  const { add, q, pick, shuffle, chooseOptions } = ctx;

  const OBJECTIVE =
    "predicting and interpreting phenotypic ratios from dihybrid crosses";

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

  const organisms = [
    "pea plants",
    "fruit flies",
    "corn plants",
    "laboratory mice",
    "beetles"
  ];

  const ratioOptions = (correct) =>
    chooseOptions(correct, [
      "9:3:3:1",
      "1:1:1:1",
      "3:1",
      "1:1",
      "3:3:1:1",
      "9:7",
      "15:1"
    ]);

  // -------------------------------------------------------------------------
  // BEGINNER — recognize the ratio produced by a standard cross
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh5-ratio-recognition",
    "ratio recognition",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          ratio: "9:3:3:1",
          explanation:
            "Each locus produces a 3:1 phenotype ratio, and combining the two independent loci gives 9:3:3:1."
        },
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          ratio: "1:1:1:1",
          explanation:
            "Each locus produces a 1:1 phenotype ratio, so the four combined classes are equally frequent."
        },
        {
          cross: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          ratio: "3:1",
          explanation:
            `All offspring show the dominant ${A} phenotype, while the ${B} locus segregates 3:1.`
        },
        {
          cross: `${A}${a}${b}${b} × ${a}${a}${B}${b}`,
          ratio: "1:1:1:1",
          explanation:
            "Both loci segregate 1:1, yielding four equally frequent phenotype classes."
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh5-ratio-recognition",
        "dihybrid",
        "beginner",
        `In ${organism}, consider the cross ${item.cross}. Assume complete dominance and independent assortment.`,
        "What phenotypic ratio is expected among the offspring?",
        ratioOptions(item.ratio),
        item.ratio,
        "Determine the phenotype ratio at each locus first, then combine the two independent results.",
        `${item.explanation} Therefore, the expected phenotypic ratio is ${item.ratio}. Key takeaway: a dihybrid phenotypic ratio depends on the structure of both single-locus crosses.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — map ratio classes to phenotype categories
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh5-ratio-class-interpretation",
    "ratio-class interpretation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          ratio: "9:3:3:1",
          classValue: "9",
          correct: `${A}_${B}_`,
          options: [`${A}_${B}_`, `${A}_${b}${b}`, `${a}${a}${B}_`, `${a}${a}${b}${b}`],
          explanation:
            "The 9 class contains offspring showing the dominant phenotype at both loci."
        },
        {
          ratio: "9:3:3:1",
          classValue: "1",
          correct: `${a}${a}${b}${b}`,
          options: [`${A}_${B}_`, `${A}_${b}${b}`, `${a}${a}${B}_`, `${a}${a}${b}${b}`],
          explanation:
            "The 1 class is the double-recessive phenotype."
        },
        {
          ratio: "9:3:3:1",
          classValue: "either 3",
          correct:
            `One dominant and one recessive phenotype: ${A}_${b}${b} or ${a}${a}${B}_`,
          options: [
            `One dominant and one recessive phenotype: ${A}_${b}${b} or ${a}${a}${B}_`,
            `Only ${A}_${B}_`,
            `Only ${a}${a}${b}${b}`,
            "Any genotype containing two heterozygous loci"
          ],
          explanation:
            "Each 3 class combines a dominant phenotype at one locus with a recessive phenotype at the other."
        },
        {
          ratio: "1:1:1:1",
          classValue: "each 1",
          correct: "Each of the four phenotype classes is equally frequent",
          options: [
            "Each of the four phenotype classes is equally frequent",
            `${A}_${B}_ is nine times more frequent than ${a}${a}${b}${b}`,
            "Only the parental phenotype classes occur",
            "The double-recessive phenotype is absent"
          ],
          explanation:
            "A 1:1:1:1 ratio means that all four phenotype classes occur at equal frequency."
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh5-ratio-class-interpretation",
        "dihybrid",
        "intermediate",
        `A cross produces a phenotypic ratio of ${item.ratio}.`,
        `What does the ${item.classValue} class represent?`,
        shuffle(item.options),
        item.correct,
        "Translate each ratio class into dominant or recessive phenotype states at the two loci.",
        `${item.explanation} Key takeaway: ratio numbers are meaningful only when connected to the phenotype categories they represent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer the cross from an observed phenotypic ratio
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh5-reverse-ratio-inference",
    "reverse cross inference",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          ratio: "9:3:3:1",
          correct: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          distractors: [
            `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
            `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
            `${A}${A}${B}${B} × ${a}${a}${b}${b}`
          ],
          explanation:
            "A 9:3:3:1 ratio requires a 3:1 phenotype ratio at both loci, which is produced by heterozygote × heterozygote at each locus."
        },
        {
          ratio: "1:1:1:1",
          correct: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          distractors: [
            `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
            `${A}${A}${B}${B} × ${a}${a}${b}${b}`,
            `${A}${A}${B}${b} × ${A}${a}${B}${b}`
          ],
          explanation:
            "A dihybrid testcross gives a 1:1 ratio at each locus, producing four equally frequent combined phenotypes."
        },
        {
          ratio: "3:1",
          correct: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          distractors: [
            `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
            `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
            `${A}${A}${B}${B} × ${a}${a}${b}${b}`
          ],
          explanation:
            `The ${A} locus does not segregate phenotypically because all offspring are ${A}_, while the ${B} locus produces a 3:1 ratio.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh5-reverse-ratio-inference",
        "dihybrid",
        "advanced",
        `A large offspring sample shows a phenotypic ratio of ${item.ratio}. Assume complete dominance and independent assortment.`,
        "Which parental cross is most consistent with this ratio?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Work backward by asking what phenotype ratio must have occurred at each individual locus.",
        `${item.explanation} Therefore, ${item.correct} is the best-supported cross. Key takeaway: combined phenotypic ratios can reveal the segregation pattern at each locus.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose misuse of standard phenotypic ratios
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh5-ratio-error-analysis",
    "misconception analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          claim:
            `“Every cross involving two genes produces a 9:3:3:1 phenotypic ratio.”`,
          correct:
            "The 9:3:3:1 ratio requires both parents to be heterozygous at both independently assorting loci",
          explanation:
            "The number of genes alone does not determine the ratio; the parental genotypes do."
        },
        {
          claim:
            `“The testcross ${A}${a}${B}${b} × ${a}${a}${b}${b} should produce a 9:3:3:1 ratio because the first parent is dihybrid.”`,
          correct:
            "A dihybrid testcross produces a 1:1:1:1 ratio, not 9:3:3:1",
          explanation:
            "At each locus, heterozygote × homozygous recessive produces a 1:1 phenotype ratio."
        },
        {
          claim:
            `“In a 9:3:3:1 ratio, the two 3 classes represent the same phenotype and should be combined.”`,
          correct:
            "The two 3 classes represent different combinations of dominant and recessive phenotypes",
          explanation:
            `One class is ${A}_${b}${b}; the other is ${a}${a}${B}_.`
        },
        {
          claim:
            `“The 9 class in a 9:3:3:1 ratio consists only of offspring with genotype ${A}${A}${B}${B}.”`,
          correct:
            "The 9 class is a phenotype class containing several different genotypes",
          explanation:
            `Any genotype producing ${A}_${B}_ belongs to the 9 class, including homozygous and heterozygous combinations.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh5-ratio-error-analysis",
        "dihybrid",
        "advanced",
        `A student states: ${item.claim}`,
        "What is the best correction?",
        shuffle([
          item.correct,
          "The student ignored crossing over between linked genes",
          "The student assumed the dominant alleles are more likely to be inherited",
          "The student confused meiosis I with meiosis II"
        ]),
        item.correct,
        "Check whether the student has matched the ratio to the correct parental genotypes and phenotype classes.",
        `${item.explanation} Key takeaway: standard ratios are conditional predictions, not universal rules for every two-gene cross.`
      );
    }
  );
}
