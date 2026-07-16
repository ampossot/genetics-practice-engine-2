/**
 * Dihybrid Crosses — Objective 08
 *
 * Learning objective:
 * Interpret offspring data from dihybrid crosses and evaluate whether observed
 * patterns support expected Mendelian segregation.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective08(ctx) {
  const { add, q, pick, shuffle, chooseOptions } = ctx;

  const OBJECTIVE =
    "interpreting offspring data from dihybrid crosses";

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


  // -------------------------------------------------------------------------
  // BEGINNER — match a dataset to the expected ratio
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh8-match-dataset",
    "dataset recognition",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          ratio: "9:3:3:1",
          correct: "144, 48, 48, 16",
          distractors: [
            "64, 64, 64, 64",
            "192, 64",
            "128, 64, 32, 32"
          ],
          total: 256
        },
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          ratio: "1:1:1:1",
          correct: "40, 40, 40, 40",
          distractors: [
            "90, 30, 30, 10",
            "80, 40, 20, 20",
            "120, 40"
          ],
          total: 160
        },
        {
          cross: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          ratio: "3:1",
          correct: "120, 40",
          distractors: [
            "80, 80",
            "90, 30, 30, 10",
            "100, 60"
          ],
          total: 160
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh8-match-dataset",
        "dihybrid",
        "beginner",
        `In ${organism}, the cross ${item.cross} produces ${item.total} offspring. Assume complete dominance and independent assortment.`,
        `Which set of offspring counts best matches the expected ${item.ratio} phenotypic ratio?`,
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Convert the ratio into fractions of the total offspring.",
        `${item.correct} matches the expected ${item.ratio} ratio for ${item.total} offspring. Key takeaway: expected counts are obtained by multiplying each ratio fraction by the total sample size.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — compare observed and expected counts
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh8-compare-observed-expected",
    "observed-versus-expected comparison",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          observed: [91, 31, 29, 9],
          expected: [90, 30, 30, 10],
          correct:
            "The observed counts are close to the 9:3:3:1 expectation",
          distractors: [
            "The data exactly prove independent assortment",
            "The data clearly follow a 1:1:1:1 ratio",
            "The double-recessive class is impossible"
          ]
        },
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          observed: [42, 38, 41, 39],
          expected: [40, 40, 40, 40],
          correct:
            "The observed counts are close to the 1:1:1:1 expectation",
          distractors: [
            "The data exactly prove linkage",
            "The data support a 9:3:3:1 ratio",
            "Only two phenotype classes are expected"
          ]
        },
        {
          cross: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          observed: [121, 39],
          expected: [120, 40],
          correct:
            "The observed counts are close to the expected 3:1 ratio",
          distractors: [
            "The offspring should occur in four equal classes",
            "The recessive phenotype is absent",
            "The data prove both parents are double heterozygotes"
          ]
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh8-compare-observed-expected",
        "dihybrid",
        "intermediate",
        `For the cross ${item.cross}, the observed phenotype counts are ${item.observed.join(", ")}. The expected counts are ${item.expected.join(", ")}.`,
        "Which interpretation is most appropriate?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Look at the overall pattern and allow for small random differences between observed and expected counts.",
        `${item.correct}. Small deviations are expected from random sampling. Key takeaway: observed counts rarely match expected counts perfectly, even when the genetic model is correct.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — distinguish sampling variation from strong deviation
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh8-sampling-variation",
    "sampling interpretation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          expectedRatio: "9:3:3:1",
          sampleSize: 16,
          observed: "11, 3, 1, 1",
          correct:
            "The small sample could reasonably deviate from the exact ratio by chance",
          distractors: [
            "Independent assortment is disproven",
            "The ratio must be 11:3:1:1 in future crosses",
            "The double-recessive class should never appear"
          ],
          explanation:
            "With only 16 offspring, substantial random deviation from 9:3:3:1 is plausible."
        },
        {
          expectedRatio: "1:1:1:1",
          sampleSize: 400,
          observed: "198, 202, 0, 0",
          correct:
            "The absence of two expected classes in a large sample suggests the model may be wrong",
          distractors: [
            "This is normal sampling variation",
            "The data perfectly support independent assortment",
            "The sample is too small to interpret"
          ],
          explanation:
            "In a large sample, completely missing two classes expected at 25% each is strong evidence against the model."
        },
        {
          expectedRatio: "9:3:3:1",
          sampleSize: 160,
          observed: "88, 32, 29, 11",
          correct:
            "The deviations are modest and may reflect sampling variation",
          distractors: [
            "The model is certainly false",
            "The ratio is exactly 8:3:3:1",
            "The rarest class proves linkage"
          ],
          explanation:
            "The counts remain close to the expected 90, 30, 30, and 10."
        },
        {
          expectedRatio: "1:1:1:1",
          sampleSize: 200,
          observed: "92, 8, 91, 9",
          correct:
            "The strong excess of two classes suggests a systematic departure from independent assortment",
          distractors: [
            "The data are a typical 1:1:1:1 result",
            "The sample is too small to show any pattern",
            "Dominance alone explains the imbalance"
          ],
          explanation:
            "Two large and two small classes form a structured pattern unlikely to be explained by small random fluctuations."
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh8-sampling-variation",
        "dihybrid",
        "advanced",
        `A cross is expected to produce a ${item.expectedRatio} ratio. In ${item.sampleSize} offspring, the observed counts are ${item.observed}.`,
        "What is the best interpretation?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Consider both the magnitude of the deviation and the sample size.",
        `${item.explanation} Key takeaway: the same numerical deviation can mean different things in a small sample versus a large sample.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate what conclusion the data support
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh8-evidence-evaluation",
    "evidence evaluation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          data:
            `A ${A}${a}${B}${b} × ${a}${a}${b}${b} testcross produces 51 ${A}_${B}_ : 49 ${A}_${b}${b} : 48 ${a}${a}${B}_ : 52 ${a}${a}${b}${b}.`,
          correct:
            "The data are consistent with independent assortment",
          distractors: [
            "The data prove the genes are on different chromosomes",
            "The data prove the genes are linked",
            "The data show one allele is lethal"
          ],
          explanation:
            "The four classes are close to equal, as expected for a 1:1:1:1 testcross."
        },
        {
          data:
            `A ${A}${a}${B}${b} × ${a}${a}${b}${b} testcross produces 92, 8, 9, and 91 offspring in the four classes.`,
          correct:
            "The data suggest that the loci may not assort independently",
          distractors: [
            "The data are a typical 1:1:1:1 result",
            "The data prove complete dominance is absent",
            "The data prove mutation occurred"
          ],
          explanation:
            "Two common and two rare classes indicate a structured departure from equal class frequencies."
        },
        {
          data:
            `A ${A}${a}${B}${b} × ${A}${a}${B}${b} cross produces approximately 9:3:3:1 phenotypic proportions.`,
          correct:
            "The data are consistent with the standard independent-assortment model",
          distractors: [
            "The data uniquely determine the exact chromosome locations of the genes",
            "The data prove every offspring genotype",
            "The data show the genes are completely linked"
          ],
          explanation:
            "The phenotype pattern fits the expected model, but does not prove every underlying assumption uniquely."
        },
        {
          data:
            `A cross expected to yield 9:3:3:1 produces only eight offspring, all in the dominant-dominant class.`,
          correct:
            "The sample is too small to justify a strong conclusion about the model",
          distractors: [
            "The parents must be homozygous dominant",
            "Independent assortment is disproven",
            "The 9:3:3:1 model is proven"
          ],
          explanation:
            "A small sample can omit expected classes by chance, so stronger evidence requires more offspring."
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh8-evidence-evaluation",
        "dihybrid",
        "advanced",
        item.data,
        "Which conclusion is best supported by the evidence?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Choose the conclusion that matches the data without claiming more certainty than the evidence provides.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: data may support a model without proving it uniquely, and sample size limits the strength of inference.`
      );
    }
  );
}
