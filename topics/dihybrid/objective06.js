/**
 * Dihybrid Crosses — Objective 06
 *
 * Learning objective:
 * Infer parental genotypes from offspring genotypes, phenotypes, and ratios
 * in dihybrid crosses.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective06(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "inferring parental genotypes from offspring evidence in dihybrid crosses";

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
  // BEGINNER — identify what parental allele must be present
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh6-required-parental-allele",
    "allele-source inference",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          offspring: `${a}${a}${B}${b}`,
          observation: `an offspring with genotype ${a}${a}${B}${b}`,
          correct: `Both parents must carry allele ${a}`,
          distractors: [
            `Both parents must be ${A}${A}`,
            `Only one parent must carry allele ${a}`,
            `Neither parent needs to carry allele ${a}`
          ],
          explanation:
            `An ${a}${a} offspring receives one ${a} allele from each parent.`
        },
        {
          offspring: `${A}${a}${b}${b}`,
          observation: `an offspring with genotype ${A}${a}${b}${b}`,
          correct: `Both parents must carry allele ${b}`,
          distractors: [
            `Both parents must be ${B}${B}`,
            `Only one parent must carry allele ${b}`,
            `The ${b} alleles could arise through dominance`
          ],
          explanation:
            `A ${b}${b} offspring receives one ${b} allele from each parent.`
        },
        {
          offspring: `${a}${a}${b}${b}`,
          observation: `a double-recessive offspring with genotype ${a}${a}${b}${b}`,
          correct: `Each parent must carry both ${a} and ${b}`,
          distractors: [
            `Only one parent must carry ${a} and ${b}`,
            `Each parent must be homozygous dominant`,
            `The recessive alleles can appear even if absent from both parents`
          ],
          explanation:
            `The offspring requires one ${a} and one ${b} from each parent.`
        },
        {
          offspring: `${A}${A}${B}${b}`,
          observation: `an offspring with genotype ${A}${A}${B}${b}`,
          correct: `Each parent must be able to contribute allele ${A}`,
          distractors: [
            `Both parents must be ${a}${a}`,
            `Only one parent needs to carry ${A}`,
            `The offspring phenotype alone proves both parents are ${A}${A}`
          ],
          explanation:
            `An ${A}${A} offspring must receive ${A} from both parents.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh6-required-parental-allele",
        "dihybrid",
        "beginner",
        `In ${organism}, a cross produces ${item.observation}.`,
        "What can be concluded with certainty about the parents?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Assign one allele in the offspring genotype to each parent at each locus.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: every offspring allele must have a parental source.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — infer a parental genotype from a known mate and offspring
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh6-infer-unknown-parent",
    "parental genotype inference",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          knownParent: `${a}${a}${b}${b}`,
          offspringEvidence:
            `offspring occur in four phenotype classes in an approximately 1:1:1:1 ratio`,
          correct: `${A}${a}${B}${b}`,
          options: [
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`,
            `${A}${A}${B}${b}`,
            `${a}${a}${b}${b}`
          ],
          explanation:
            `A 1:1 ratio at each locus against a homozygous recessive tester requires heterozygosity at both loci.`
        },
        {
          knownParent: `${a}${a}${b}${b}`,
          offspringEvidence:
            `half the offspring are ${A}_${b}${b} and half are ${a}${a}${b}${b}; no ${B}_ offspring occur`,
          correct: `${A}${a}${b}${b}`,
          options: [
            `${A}${a}${b}${b}`,
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`,
            `${a}${a}${B}${b}`
          ],
          explanation:
            `The unknown parent segregates ${A}/${a} but contributes only ${b} at the second locus.`
        },
        {
          knownParent: `${a}${a}${b}${b}`,
          offspringEvidence:
            `all offspring show phenotype ${A}_${B}_`,
          correct: `${A}${A}${B}${B}`,
          options: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${B}`
          ],
          explanation:
            `Against a double-recessive tester, all dominant offspring require the unknown parent to contribute ${A} and ${B} every time.`
        },
        {
          knownParent: `${a}${a}${b}${b}`,
          offspringEvidence:
            `half the offspring are ${A}_${B}_ and half are ${A}_${b}${b}; no ${a}${a} offspring occur`,
          correct: `${A}${A}${B}${b}`,
          options: [
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`,
            `${A}${a}${b}${b}`
          ],
          explanation:
            `The unknown parent always contributes ${A}, but contributes either ${B} or ${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh6-infer-unknown-parent",
        "dihybrid",
        "intermediate",
        `An unknown parent is crossed with ${item.knownParent}. In a large sample, ${item.offspringEvidence}. Assume complete dominance and independent assortment.`,
        "What is the genotype of the unknown parent?",
        shuffle(item.options),
        item.correct,
        "Use the offspring pattern to infer whether the unknown parent is homozygous or heterozygous at each locus.",
        `${item.explanation} Therefore, the unknown parent is ${item.correct}. Key takeaway: a homozygous recessive tester exposes exactly which alleles the unknown parent contributes.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — compare candidate crosses using several offspring observations
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh6-compare-parental-crosses",
    "hypothesis comparison",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          evidence:
            `the offspring include all four phenotype classes, with the double-recessive class present`,
          correct: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          distractors: [
            `${A}${A}${B}${B} × ${a}${a}${b}${b}`,
            `${A}${A}${B}${b} × ${A}${a}${B}${B}`,
            `${A}${A}${b}${b} × ${a}${a}${B}${B}`
          ],
          explanation:
            `Producing ${a}${a}${b}${b} requires both parents to carry ${a} and ${b}; producing all four phenotypes is consistent with double heterozygosity in both parents.`
        },
        {
          evidence:
            `all offspring show the dominant phenotype at the ${A} locus, but the ${B} locus segregates 3:1`,
          correct: `${A}${A}${B}${b} × ${A}${a}${B}${b}`,
          distractors: [
            `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
            `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
            `${a}${a}${B}${b} × ${a}${a}${B}${b}`
          ],
          explanation:
            `No ${a}${a} offspring means at least one parent always supplies ${A}; a 3:1 ratio at B requires ${B}${b} × ${B}${b}.`
        },
        {
          evidence:
            `the four phenotype classes occur in equal proportions`,
          correct: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          distractors: [
            `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
            `${A}${A}${B}${B} × ${a}${a}${b}${b}`,
            `${A}${A}${B}${b} × ${A}${a}${B}${b}`
          ],
          explanation:
            `A 1:1:1:1 ratio is the diagnostic expectation of a dihybrid testcross.`
        },
        {
          evidence:
            `only ${A}_${B}_ offspring are observed in a very large sample`,
          correct: `${A}${A}${B}${B} × ${a}${a}${b}${b}`,
          distractors: [
            `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
            `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
            `${A}${a}${b}${b} × ${a}${a}${B}${b}`
          ],
          explanation:
            `The homozygous dominant parent supplies ${A} and ${B} to every offspring, producing only the double-dominant phenotype.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh6-compare-parental-crosses",
        "dihybrid",
        "advanced",
        `A large offspring sample is described as follows: ${item.evidence}. Assume complete dominance and independent assortment.`,
        "Which parental cross best explains the evidence?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Test each candidate cross one locus at a time against every part of the offspring evidence.",
        `${item.explanation} Therefore, ${item.correct} provides the best explanation. Key takeaway: reverse genetics is strongest when every observed class is used to test competing parental hypotheses.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — decide whether offspring information is sufficient
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh6-information-sufficiency",
    "information sufficiency",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          evidence:
            `two dominant-phenotype parents produce at least one ${a}${a}${b}${b} offspring`,
          correct:
            `Yes; both parents must be ${A}${a}${B}${b}`,
          options: [
            `Yes; both parents must be ${A}${a}${B}${b}`,
            "No; dominant phenotypes never reveal parental genotypes",
            `Yes; both parents must be ${A}${A}${B}${B}`,
            "No; crossing over prevents any conclusion"
          ],
          explanation:
            `A double-recessive offspring requires both dominant-phenotype parents to carry both recessive alleles.`
        },
        {
          evidence:
            `two dominant-phenotype parents produce only ${A}_${B}_ offspring in a sample of four`,
          correct:
            "No; the sample is too small to distinguish several possible parental genotypes",
          options: [
            "No; the sample is too small to distinguish several possible parental genotypes",
            `Yes; both parents must be ${A}${A}${B}${B}`,
            `Yes; both parents must be ${A}${a}${B}${b}`,
            "No; offspring phenotypes contain no genetic information"
          ],
          explanation:
            `Several crosses can produce four double-dominant offspring by chance; absence of other classes in a small sample is not decisive.`
        },
        {
          evidence:
            `an unknown dominant-phenotype parent crossed with ${a}${a}${b}${b} produces a large 1:1:1:1 ratio`,
          correct:
            `Yes; the unknown parent must be ${A}${a}${B}${b}`,
          options: [
            `Yes; the unknown parent must be ${A}${a}${B}${b}`,
            `No; the unknown parent could be any dominant genotype`,
            `Yes; the unknown parent must be ${A}${A}${B}${B}`,
            "No; phenotype ratios cannot identify heterozygosity"
          ],
          explanation:
            `The tester contributes only recessive alleles, so the four equal classes reveal four equally frequent gametes from a double heterozygote.`
        },
        {
          evidence:
            `a single offspring has genotype ${A}${a}${B}${b}`,
          correct:
            "No; many different parental genotype combinations can produce that offspring",
          options: [
            "No; many different parental genotype combinations can produce that offspring",
            `Yes; both parents must be ${A}${a}${B}${b}`,
            `Yes; one parent must be ${A}${A}${B}${B} and the other ${a}${a}${b}${b}`,
            "No; heterozygous offspring cannot reveal any parental allele"
          ],
          explanation:
            `The offspring shows which alleles were transmitted, but not the complete genotypes of either parent.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh6-information-sufficiency",
        "dihybrid",
        "advanced",
        `Consider this evidence: ${item.evidence}.`,
        "Is the information sufficient to determine the parental genotype or genotypes stated in the answer?",
        shuffle(item.options),
        item.correct,
        "Distinguish conclusions forced by the evidence from conclusions that are merely possible, especially when the sample is small.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: reverse inference requires enough offspring evidence to exclude alternative parental genotypes.`
      );
    }
  );
}
