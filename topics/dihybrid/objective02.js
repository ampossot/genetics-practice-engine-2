/**
 * Dihybrid Crosses — Objective 02
 *
 * Learning objective:
 * Predict offspring genotype and phenotype probabilities from dihybrid crosses
 * using Mendel's Law of Independent Assortment.
 *
 * Design rule:
 * Four generator families, each supporting several biologically distinct cases.
 */

export function registerObjective02(ctx) {
  const { add, q, pick, chooseOptions, shuffle } = ctx;

  const OBJECTIVE =
    "predicting offspring probabilities from dihybrid crosses";

  const register = (difficulty, id, task, build) =>
    add("dihybrid", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const organisms = [
    "pea plants",
    "fruit flies",
    "corn plants",
    "laboratory mice",
    "beetles"
  ];

  const allelePairs = [
    ["A", "B"],
    ["D", "E"],
    ["G", "H"],
    ["M", "N"],
    ["R", "T"]
  ];

  const normalizeFraction = (numerator, denominator) => {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
  };

  const multiplyFractions = (first, second) =>
    normalizeFraction(
      first.numerator * second.numerator,
      first.denominator * second.denominator
    );

  const probabilityOptions = (correct) =>
    chooseOptions(correct, [
      "1/16",
      "1/8",
      "3/16",
      "1/4",
      "3/8",
      "1/2",
      "9/16",
      "3/4",
      "1"
    ]);


  // -------------------------------------------------------------------------
  // BEGINNER — direct probability from several cross structures
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh2-direct-probability",
    "direct probability",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          target: `${A}_${b}${b}`,
          first: { numerator: 3, denominator: 4 },
          second: { numerator: 1, denominator: 4 },
          explanation: `P(${A}_) = 3/4 and P(${b}${b}) = 1/4`
        },
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          target: `${A}_${B}_`,
          first: { numerator: 1, denominator: 2 },
          second: { numerator: 1, denominator: 2 },
          explanation: `P(${A}_) = 1/2 and P(${B}_) = 1/2`
        },
        {
          cross: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          target: `${A}_${b}${b}`,
          first: { numerator: 1, denominator: 1 },
          second: { numerator: 1, denominator: 4 },
          explanation: `P(${A}_) = 1 and P(${b}${b}) = 1/4`
        },
        {
          cross: `${A}${a}${b}${b} × ${a}${a}${B}${b}`,
          target: `${a}${a}${b}${b}`,
          first: { numerator: 1, denominator: 2 },
          second: { numerator: 1, denominator: 2 },
          explanation: `P(${a}${a}) = 1/2 and P(${b}${b}) = 1/2`
        }
      ];

      const item = pick(scenarios);
      const correct = multiplyFractions(item.first, item.second);

      return q(
        "dh2-direct-probability",
        "dihybrid",
        "beginner",
        `In ${organism}, consider the cross ${item.cross}. Assume complete dominance and independent assortment.`,
        `What is the probability of offspring with phenotype ${item.target}?`,
        probabilityOptions(correct),
        correct,
        "Solve the two loci separately, then multiply because both conditions must occur in the same offspring.",
        `${item.explanation}. Multiplying gives ${correct}. A common mistake is to add the two probabilities even though both conditions must occur together. Key takeaway: use the product rule for independent outcomes that must occur simultaneously.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — compare outcomes without repeating the same calculation
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh2-compare-probabilities",
    "probability comparison",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${a}${a}${b}${b}`
          ],
          correct: `${A}_${B}_`,
          explanation:
            "The four phenotype classes occur at 9/16, 3/16, 3/16, and 1/16."
        },
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${a}${a}${b}${b}`
          ],
          correct: "All four outcomes are equally likely",
          explanation:
            "A dihybrid testcross produces the four phenotype classes in a 1:1:1:1 ratio."
        },
        {
          cross: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${a}${a}${b}${b}`
          ],
          correct: `${A}_${B}_`,
          explanation:
            `All offspring are ${A}_; at the second locus, ${B}_ occurs with probability 3/4 and ${b}${b} with probability 1/4.`
        },
        {
          cross: `${A}${a}${b}${b} × ${a}${a}${B}${b}`,
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${a}${a}${b}${b}`
          ],
          correct: "All four outcomes are equally likely",
          explanation:
            "Each locus produces a 1:1 phenotype ratio, so the four combined classes each occur with probability 1/4."
        }
      ];

      const item = pick(scenarios);
      const options =
        item.correct === "All four outcomes are equally likely"
          ? shuffle([
              ...item.options.slice(0, 3),
              "All four outcomes are equally likely"
            ])
          : shuffle(item.options);

      return q(
        "dh2-compare-probabilities",
        "dihybrid",
        "intermediate",
        `Consider the cross ${item.cross}. Assume complete dominance and independent assortment.`,
        "Which offspring phenotype is most likely?",
        options,
        item.correct,
        "Compare the single-locus probabilities first. You may not need to calculate every combined probability.",
        `${item.explanation} Therefore, ${item.correct} is the best answer. Key takeaway: probability comparisons can often be made by recognizing the structure of each single-locus cross.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose several common product-rule misconceptions
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh2-error-analysis",
    "misconception analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          claim: `For ${A}${a}${B}${b} × ${A}${a}${B}${b}, P(${A}_${b}${b}) = 3/4 + 1/4 = 1.`,
          correct:
            "The student added probabilities for events that must occur together",
          explanation:
            `The correct calculation is P(${A}_) × P(${b}${b}) = 3/4 × 1/4 = 3/16.`
        },
        {
          claim: `For ${A}${a}${B}${b} × ${A}${a}${B}${b}, P(${A}_${B}_) = 3/4 because the same 3/4 dominant probability applies to both genes.`,
          correct:
            "The student failed to include the probability at the second locus",
          explanation:
            `Both dominant phenotypes are required, so the correct calculation is 3/4 × 3/4 = 9/16.`
        },
        {
          claim: `For ${A}${a}${B}${b} × ${a}${a}${b}${b}, P(${a}${a}${b}${b}) = 1/16 because all dihybrid crosses produce a 9:3:3:1 ratio.`,
          correct:
            "The student applied the 9:3:3:1 ratio to the wrong parental cross",
          explanation:
            `This is a dihybrid testcross. P(${a}${a}) = 1/2 and P(${b}${b}) = 1/2, so the combined probability is 1/4.`
        },
        {
          claim: `For ${A}${A}${B}${b} × ${A}${a}${B}${b}, P(${a}${a}${b}${b}) = 1/16.`,
          correct:
            `The student ignored that ${a}${a} is impossible at the first locus`,
          explanation:
            `The ${A}${A} parent always contributes ${A}, so no offspring can be ${a}${a}. The true probability is 0.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh2-error-analysis",
        "dihybrid",
        "advanced",
        `A student writes: “${item.claim}”`,
        "What is the student's primary reasoning error?",
        shuffle([
          item.correct,
          "The student assumed that the genes are linked",
          "The student confused gamete genotype with offspring phenotype",
          "The student assumed dominant alleles are transmitted more often"
        ]),
        item.correct,
        "Check whether the student used the correct parental cross and combined the two locus probabilities appropriately.",
        `${item.explanation} Key takeaway: correct dihybrid probability reasoning requires both the correct single-locus model and the correct rule for combining events.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer an outcome or cross from a probability
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh2-reverse-inference",
    "reverse inference",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          context: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          probability: "9/16",
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${a}${a}${b}${b}`
          ],
          correct: `${A}_${B}_`,
          explanation:
            "In the standard dihybrid cross, the phenotype classes follow 9:3:3:1."
        },
        {
          context: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          probability: "1/16",
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${a}${a}${b}${b}`
          ],
          correct: `${a}${a}${b}${b}`,
          explanation:
            "The double-recessive phenotype is the 1/16 class."
        },
        {
          context: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          probability: "1/4",
          options: [
            `${A}_${B}_ only`,
            `${a}${a}${b}${b} only`,
            "Each of the four phenotype classes",
            "No phenotype class"
          ],
          correct: "Each of the four phenotype classes",
          explanation:
            "A dihybrid testcross gives four equally likely classes."
        },
        {
          context: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          probability: "0",
          options: [
            `${A}_${B}_`,
            `${A}_${b}${b}`,
            `${a}${a}${B}_`,
            `${A}${a}${B}${b}`
          ],
          correct: `${a}${a}${B}_`,
          explanation:
            `Because one parent is ${A}${A}, no offspring can be ${a}${a}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh2-reverse-inference",
        "dihybrid",
        "advanced",
        `For the cross ${item.context}, one offspring category has probability ${item.probability}. Assume complete dominance and independent assortment.`,
        "Which category matches that probability?",
        shuffle(item.options),
        item.correct,
        "Work backward from the probability and identify the single-locus combination that produces it.",
        `${item.explanation} Therefore, the matching category is ${item.correct}. Key takeaway: reverse probability reasoning connects numerical outcomes to the biological structure of the cross.`
      );
    }
  );
}
