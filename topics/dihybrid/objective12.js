/**
 * Dihybrid Crosses — Objective 12
 *
 * Learning objective:
 * Integrate gamete prediction, offspring inference, ratios, probability,
 * expected counts, and experimental evidence in multistep dihybrid problems.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Every family combines at least two reasoning steps.
 */

export function registerObjective12(ctx) {
  const { add, q, pick, shuffle, chooseOptions } = ctx;

  const OBJECTIVE =
    "integrating multiple forms of reasoning in dihybrid crosses";

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
  // BEGINNER — connect parental genotypes, gametes, and offspring genotypes
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh12-genotype-to-offspring",
    "multistep genotype reasoning",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          question:
            "Which option correctly pairs a gamete from the first parent with the offspring genotype it can produce?",
          correct: `${A}${b} → ${A}${a}${b}${b}`,
          distractors: [
            `${A}${A} → ${A}${A}${B}${b}`,
            `${a}${B} → ${A}${A}${B}${B}`,
            `${B}${b} → ${a}${a}${B}${b}`
          ],
          explanation:
            `The first parent produces ${A}${B}, ${A}${b}, ${a}${B}, and ${a}${b}; combining ${A}${b} with tester gamete ${a}${b} gives ${A}${a}${b}${b}.`
        },
        {
          cross: `${A}${A}${B}${b} × ${a}${a}${b}${b}`,
          question:
            `Which gamete from the first parent produces offspring genotype ${A}${a}${b}${b}?`,
          correct: `${A}${b}`,
          distractors: [`${A}${B}`, `${a}${b}`, `${a}${B}`],
          explanation:
            `The tester contributes ${a}${b}, so the first parent must contribute ${A}${b}.`
        },
        {
          cross: `${A}${a}${b}${b} × ${a}${a}${B}${b}`,
          question:
            "Which offspring genotype can be produced?",
          correct: `${A}${a}${B}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${a}${a}${B}${B}`,
            `${A}${A}${b}${b}`
          ],
          explanation:
            `The first parent contributes ${A} or ${a} with ${b}; the second contributes ${a} with ${B} or ${b}.`
        },
        {
          cross: `${A}${a}${B}${b} × ${A}${A}${b}${b}`,
          question:
            "Which offspring genotype is impossible?",
          correct: `${a}${a}${B}${b}`,
          distractors: [
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${b}${b}`
          ],
          explanation:
            `The ${A}${A}${b}${b} parent always contributes ${A}, so no offspring can be ${a}${a}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh12-genotype-to-offspring",
        "dihybrid",
        "beginner",
        `In ${organism}, consider the cross ${item.cross}. Assume independent assortment.`,
        item.question,
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "List the gametes each parent can produce, then combine one gamete from each parent locus by locus.",
        `${item.explanation} Therefore, ${item.correct} is correct. Key takeaway: multistep offspring reasoning begins with valid parental gametes and ends with a correctly assembled genotype.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — infer probability, then convert it to an expected count
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh12-probability-to-data",
    "two-step probability and expected-count synthesis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          total: 320,
          event: `${A}_${b}${b}`,
          correct: "60",
          distractors: ["20", "80", "180"],
          explanation:
            `P(${A}_) = 3/4 and P(${b}${b}) = 1/4, so P(${A}_${b}${b}) = 3/16; 320 × 3/16 = 60.`
        },
        {
          cross: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          total: 200,
          event: `${a}${a}${b}${b}`,
          correct: "50",
          distractors: ["25", "100", "12.5"],
          explanation:
            `Each locus gives a 1/2 recessive outcome, so the combined probability is 1/4; 200 × 1/4 = 50.`
        },
        {
          cross: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          total: 160,
          event: `${A}_${b}${b}`,
          correct: "40",
          distractors: ["10", "30", "120"],
          explanation:
            `All offspring are ${A}_ and 1/4 are ${b}${b}; 160 × 1/4 = 40.`
        },
        {
          cross: `${A}${a}${b}${b} × ${a}${a}${B}${b}`,
          total: 120,
          event: `${A}_${B}_`,
          correct: "30",
          distractors: ["15", "60", "90"],
          explanation:
            `P(${A}_) = 1/2 and P(${B}_) = 1/2, so the combined probability is 1/4; 120 × 1/4 = 30.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh12-probability-to-data",
        "dihybrid",
        "intermediate",
        `The cross ${item.cross} produces ${item.total} offspring. Assume complete dominance and independent assortment.`,
        `How many offspring are expected to have phenotype ${item.event}?`,
        chooseOptions(item.correct, item.distractors),
        item.correct,
        "First infer the phenotype probability from the two single-locus crosses. Then multiply that probability by the total number of offspring.",
        `${item.explanation} Therefore, ${item.correct} offspring are expected. Key takeaway: synthesis problems require deriving the probability before converting it into an expected count.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — combine inference with the best next experimental step
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh12-inference-and-design",
    "reverse inference and experimental design",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          evidence:
            `An unknown ${A}_${B}_ parent crossed with ${a}${a}${b}${b} produces four phenotype classes in an approximately 1:1:1:1 ratio.`,
          correct:
            `${A}${a}${B}${b}; increase the sample if the goal is to test how closely the classes fit equal frequencies`,
          distractors: [
            `${A}${A}${B}${B}; cross it with another dominant parent`,
            `${A}${A}${B}${b}; ignore the recessive classes`,
            `${A}${a}${B}${B}; no additional evidence could be useful`
          ],
          explanation:
            `Four equal classes indicate four equally frequent gametes from a double heterozygote.`
        },
        {
          evidence:
            `Two ${A}_${B}_ parents produce one ${a}${a}${b}${b} offspring.`,
          correct:
            `Both parents are ${A}${a}${B}${b}; increase the offspring sample to compare observed and expected class frequencies`,
          distractors: [
            `Only one parent carries ${a} and ${b}; perform no additional cross`,
            `Both parents are ${A}${A}${B}${B}; repeat the same observation once`,
            `The offspring is impossible and should be discarded`
          ],
          explanation:
            `The double-recessive offspring proves both dominant parents carry both recessive alleles.`
        },
        {
          evidence:
            `An unknown ${A}_${B}_ parent crossed with ${a}${a}${b}${b} produces only ${A}_${B}_ offspring in a sample of four.`,
          correct:
            "Homozygosity is supported but not proven; collect substantially more offspring",
          distractors: [
            `The parent is proven ${A}${A}${B}${B}; stop the experiment`,
            `The parent is proven ${A}${a}${B}${b}; switch to a dominant tester`,
            "The cross contains no useful information"
          ],
          explanation:
            `A small sample can miss possible recessive classes by chance.`
        },
        {
          evidence:
            `A large testcross produces two common classes and two rare classes rather than four equal classes.`,
          correct:
            "Independent assortment may be violated; repeat the cross and evaluate whether the structured imbalance persists",
          distractors: [
            "The unknown parent must be homozygous at both loci",
            "The rare classes should be discarded",
            "The tester should be replaced by a dominant parent"
          ],
          explanation:
            `A reproducible two-large/two-small pattern is inconsistent with the standard independent-assortment expectation.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh12-inference-and-design",
        "dihybrid",
        "advanced",
        item.evidence,
        "Which combined inference and next step is best?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "First determine what the evidence supports. Then choose a next step that resolves remaining uncertainty.",
        `${item.explanation} Therefore, ${item.correct}. Key takeaway: strong synthesis connects current genetic evidence to the most informative next action.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate an integrated chain of reasoning
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh12-chain-of-reasoning",
    "integrated misconception analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          claim:
            `“An ${A}${a}${B}${b} parent makes four gametes, so every cross involving that parent must produce a 1:1:1:1 offspring ratio.”`,
          correct:
            "Gamete frequencies alone do not determine the offspring ratio; the other parent's genotype also matters",
          explanation:
            `A 1:1:1:1 ratio occurs in the dihybrid testcross, not in every cross involving a double heterozygote.`
        },
        {
          claim:
            `“Because ${A}_${B}_ occurs with probability 9/16 in ${A}${a}${B}${b} × ${A}${a}${B}${b}, every offspring in that class is ${A}${A}${B}${B}.”`,
          correct:
            "The student confused a phenotype class with a single genotype",
          explanation:
            `The ${A}_${B}_ phenotype class includes several homozygous and heterozygous genotypes.`
        },
        {
          claim:
            `“No ${a}${a}${b}${b} offspring appeared among eight progeny, so neither parent carries both recessive alleles.”`,
          correct:
            "The student treated absence in a small sample as proof of impossibility",
          explanation:
            `A possible class may be missing from a small family by chance.`
        },
        {
          claim:
            `“A 9:3:3:1 ratio proves the genes are on different chromosomes.”`,
          correct:
            "The ratio supports independent assortment but does not uniquely prove chromosome location",
          explanation:
            `Genes far apart on the same chromosome may also assort approximately independently.`
        },
        {
          claim:
            `“An offspring with genotype ${A}${a}${B}${b} proves both parents were ${A}${a}${B}${b}.”`,
          correct:
            "Many parental genotype combinations can produce a double-heterozygous offspring",
          explanation:
            `The offspring reveals transmitted alleles, not the complete genotype of each parent.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh12-chain-of-reasoning",
        "dihybrid",
        "advanced",
        `A student states: ${item.claim}`,
        "What is the most important flaw in the reasoning?",
        shuffle([
          item.correct,
          "The student ignored meiosis II",
          "The student assumed mutation occurred",
          "The student used too few allele symbols"
        ]),
        item.correct,
        "Check every link in the argument: gametes, parental cross, phenotype versus genotype, sample size, and strength of evidence.",
        `${item.explanation} Key takeaway: integrated dihybrid reasoning requires every conclusion to follow from the correct cross, probability model, and level of evidence.`
      );
    }
  );
}
