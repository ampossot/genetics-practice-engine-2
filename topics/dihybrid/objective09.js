/**
 * Dihybrid Crosses — Objective 09
 *
 * Learning objective:
 * Predict outcomes across multiple offspring from dihybrid crosses using
 * expected values, complements, and binomial reasoning.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective09(ctx) {
  const { add, q, pick, shuffle, chooseOptions } = ctx;

  const OBJECTIVE =
    "predicting multi-offspring outcomes from dihybrid crosses";

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

  const combination = (n, k) => {
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result = (result * (n - i + 1)) / i;
    }
    return result;
  };

  const percent = (value, digits = 1) =>
    `${(value * 100).toFixed(digits)}%`;

  // -------------------------------------------------------------------------
  // BEGINNER — expected number in a phenotype class
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh9-expected-number",
    "expected offspring count",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          total: 160,
          event: `${A}_${B}_`,
          probability: 9 / 16,
          correct: "90"
        },
        {
          total: 160,
          event: `${A}_${b}${b}`,
          probability: 3 / 16,
          correct: "30"
        },
        {
          total: 320,
          event: `${a}${a}${B}_`,
          probability: 3 / 16,
          correct: "60"
        },
        {
          total: 320,
          event: `${a}${a}${b}${b}`,
          probability: 1 / 16,
          correct: "20"
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh9-expected-number",
        "dihybrid",
        "beginner",
        `In ${organism}, an ${A}${a}${B}${b} × ${A}${a}${B}${b} cross produces ${item.total} offspring. Assume complete dominance and independent assortment.`,
        `How many offspring are expected to have phenotype ${item.event}?`,
        chooseOptions(item.correct, [
          String(item.total / 16),
          String((item.total * 3) / 16),
          String((item.total * 9) / 16),
          String(item.total / 4)
        ]),
        item.correct,
        "Multiply the total number of offspring by the expected fraction for that phenotype class.",
        `The probability of ${item.event} is ${item.probability === 9 / 16 ? "9/16" : item.probability === 3 / 16 ? "3/16" : "1/16"}. Therefore, ${item.total} × ${item.probability} = ${item.correct}. Key takeaway: expected count equals probability multiplied by sample size.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — probability of at least one target offspring
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh9-at-least-one",
    "complement probability",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          n: 2,
          event: `${a}${a}${b}${b}`,
          p: 1 / 16
        },
        {
          n: 3,
          event: `${a}${a}${b}${b}`,
          p: 1 / 16
        },
        {
          n: 2,
          event: `${A}_${B}_`,
          p: 9 / 16
        },
        {
          n: 4,
          event: `${A}_${b}${b}`,
          p: 3 / 16
        }
      ];

      const item = pick(scenarios);
      const answer = 1 - (1 - item.p) ** item.n;
      const correct = percent(answer);

      return q(
        "dh9-at-least-one",
        "dihybrid",
        "intermediate",
        `For the cross ${A}${a}${B}${b} × ${A}${a}${B}${b}, each offspring independently has probability ${item.p === 1 / 16 ? "1/16" : item.p === 3 / 16 ? "3/16" : "9/16"} of having phenotype ${item.event}.`,
        `What is the probability that at least one of ${item.n} offspring has this phenotype?`,
        chooseOptions(correct, [
          percent(item.p ** item.n),
          percent((1 - item.p) ** item.n),
          percent(Math.min(1, item.n * item.p))
        ]),
        correct,
        "Use the complement: 1 minus the probability that none of the offspring has the target phenotype.",
        `P(at least one) = 1 − P(none) = 1 − (${(1 - item.p).toFixed(4)})^${item.n} = ${correct}. Key takeaway: “at least one” problems are usually easiest with the complement rule.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — exact number of offspring in a target class
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh9-exactly-k",
    "binomial probability",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          n: 4,
          k: 1,
          event: `${a}${a}${b}${b}`,
          p: 1 / 16
        },
        {
          n: 5,
          k: 2,
          event: `${A}_${b}${b}`,
          p: 3 / 16
        },
        {
          n: 4,
          k: 3,
          event: `${A}_${B}_`,
          p: 9 / 16
        },
        {
          n: 6,
          k: 2,
          event: `${a}${a}${B}_`,
          p: 3 / 16
        }
      ];

      const item = pick(scenarios);
      const probability =
        combination(item.n, item.k) *
        item.p ** item.k *
        (1 - item.p) ** (item.n - item.k);
      const correct = percent(probability);

      return q(
        "dh9-exactly-k",
        "dihybrid",
        "advanced",
        `In an ${A}${a}${B}${b} × ${A}${a}${B}${b} cross, the probability that one offspring has phenotype ${item.event} is ${item.p === 1 / 16 ? "1/16" : item.p === 3 / 16 ? "3/16" : "9/16"}.`,
        `What is the probability that exactly ${item.k} of ${item.n} offspring have this phenotype?`,
        chooseOptions(correct, [
          percent(item.p ** item.k),
          percent((1 - item.p) ** (item.n - item.k)),
          percent(item.n * item.p)
        ]),
        correct,
        "Use the binomial expression: choose which offspring show the phenotype, then multiply by the probability of that arrangement.",
        `P(exactly ${item.k}) = C(${item.n},${item.k}) × p^${item.k} × (1−p)^${item.n - item.k} = ${correct}. Key takeaway: exact-count questions require both the probability of one arrangement and the number of possible arrangements.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose multi-offspring probability errors
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh9-error-analysis",
    "misconception analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          claim:
            `“Because ${a}${a}${b}${b} occurs with probability 1/16, the chance that at least one of four offspring is ${a}${a}${b}${b} is 4/16.”`,
          correct:
            "The student added probabilities and ignored overlap among possible offspring positions",
          explanation:
            "The correct method is 1 − (15/16)^4, not simply 4 × 1/16."
        },
        {
          claim:
            `“The probability that exactly two of four offspring are ${A}_${B}_ is (9/16)^2.”`,
          correct:
            "The student omitted the probability of the other two offspring and the number of possible arrangements",
          explanation:
            "The full binomial expression is C(4,2)(9/16)^2(7/16)^2."
        },
        {
          claim:
            `“If 3/16 of offspring are ${A}_${b}${b}, then exactly 30 of 160 offspring must have that phenotype.”`,
          correct:
            "Expected counts are averages, not guaranteed outcomes",
          explanation:
            "Thirty is the expected count, but an actual sample may differ because of random segregation."
        },
        {
          claim:
            `“After three offspring fail to show ${a}${a}${b}${b}, the fourth offspring is more likely to show it.”`,
          correct:
            "The student treated independent offspring outcomes as dependent",
          explanation:
            "Each offspring still has probability 1/16 of being double recessive."
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh9-error-analysis",
        "dihybrid",
        "advanced",
        `A student states: ${item.claim}`,
        "What is the best correction?",
        shuffle([
          item.correct,
          "The student assumed the genes are linked",
          "The student ignored complete dominance",
          "The student confused genotype with phenotype"
        ]),
        item.correct,
        "Identify whether the error concerns expected values, independence, complements, or the binomial coefficient.",
        `${item.explanation} Key takeaway: multi-offspring probability requires careful distinction among expected counts, independent trials, at-least-one events, and exact-count events.`
      );
    }
  );
}
