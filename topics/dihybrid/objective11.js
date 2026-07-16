/**
 * Dihybrid Crosses — Objective 11
 *
 * Learning objective:
 * Infer hidden heterozygosity from offspring evidence and evaluate when
 * observations are sufficient to exclude homozygous parental genotypes.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized biological scenarios.
 */

export function registerObjective11(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "inferring hidden heterozygosity from dihybrid offspring evidence";

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
    "pea plant",
    "fruit fly",
    "corn plant",
    "laboratory mouse",
    "beetle"
  ];

  // -------------------------------------------------------------------------
  // BEGINNER — identify evidence that proves a recessive allele is carried
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh11-hidden-allele-evidence",
    "hidden allele recognition",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          parentPhenotype: `${A}_${B}_`,
          evidence: `an offspring with phenotype ${a}${a}${B}_`,
          correct: `The parent must carry allele ${a}`,
          distractors: [
            `The parent must be ${A}${A}`,
            `The parent cannot carry ${a}`,
            `The offspring phenotype gives no information about the parent`
          ],
          explanation:
            `An ${a}${a} offspring must receive ${a} from both parents, so any dominant-phenotype parent that produced it must carry ${a}.`
        },
        {
          parentPhenotype: `${A}_${B}_`,
          evidence: `an offspring with phenotype ${A}_${b}${b}`,
          correct: `The parent must carry allele ${b}`,
          distractors: [
            `The parent must be ${B}${B}`,
            `The parent cannot carry ${b}`,
            `Dominance creates ${b} alleles in the offspring`
          ],
          explanation:
            `A ${b}${b} offspring requires a ${b} allele from each parent.`
        },
        {
          parentPhenotype: `${A}_${B}_`,
          evidence: `an offspring with phenotype ${a}${a}${b}${b}`,
          correct: `The parent must carry both ${a} and ${b}`,
          distractors: [
            `The parent must be homozygous dominant at both loci`,
            `Only one recessive allele must be carried`,
            `The offspring phenotype is unrelated to parental genotype`
          ],
          explanation:
            `A double-recessive offspring requires both parents to contribute ${a} and ${b}.`
        },
        {
          parentPhenotype: `${A}_${b}${b}`,
          evidence: `an offspring with phenotype ${a}${a}${b}${b}`,
          correct: `The parent must be ${A}${a}${b}${b}`,
          distractors: [
            `The parent must be ${A}${A}${b}${b}`,
            `The parent must be ${a}${a}${B}${B}`,
            `The parent could be any dominant genotype`
          ],
          explanation:
            `The parent already shows ${b}${b}; producing ${a}${a} offspring proves it also carries ${a}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh11-hidden-allele-evidence",
        "dihybrid",
        "beginner",
        `A ${organism} has phenotype ${item.parentPhenotype} and produces ${item.evidence}.`,
        "What conclusion is justified?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "A recessive offspring phenotype can appear only if the required recessive allele was transmitted by each parent.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: recessive offspring can reveal alleles hidden by dominant parental phenotypes.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — infer whether heterozygosity is proven at one or both loci
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh11-locus-by-locus-inference",
    "locus-specific genotype inference",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          parents:
            `two individuals with phenotype ${A}_${B}_`,
          offspring:
            `at least one ${a}${a}${B}_ offspring, but no ${b}${b} offspring have been observed`,
          correct:
            `Both parents are heterozygous at the ${A}/${a} locus; their ${B}/${b} genotypes remain uncertain`,
          distractors: [
            `Both parents are ${A}${a}${B}${b}`,
            `Both parents are homozygous dominant at both loci`,
            `Only one parent must carry ${a}`
          ],
          explanation:
            `The ${a}${a} offspring proves that both parents carry ${a}. Absence of ${b}${b} offspring does not prove homozygosity at the second locus.`
        },
        {
          parents:
            `two individuals with phenotype ${A}_${B}_`,
          offspring:
            `at least one ${A}_${b}${b} offspring, but no ${a}${a} offspring have been observed`,
          correct:
            `Both parents are heterozygous at the ${B}/${b} locus; their ${A}/${a} genotypes remain uncertain`,
          distractors: [
            `Both parents are ${A}${a}${B}${b}`,
            `Both parents are ${A}${A}${B}${B}`,
            `Only one parent must carry ${b}`
          ],
          explanation:
            `The ${b}${b} offspring proves that both parents carry ${b}; the first-locus genotypes are not fixed by the evidence.`
        },
        {
          parents:
            `two individuals with phenotype ${A}_${B}_`,
          offspring:
            `at least one ${a}${a}${b}${b} offspring`,
          correct:
            `Both parents must be ${A}${a}${B}${b}`,
          distractors: [
            `Both parents must be ${A}${A}${B}${B}`,
            `One parent may lack ${a}`,
            `Only the mother must carry both recessive alleles`
          ],
          explanation:
            `The double-recessive offspring requires each parent to contribute both ${a} and ${b}.`
        },
        {
          parents:
            `an unknown ${A}_${B}_ individual crossed with ${a}${a}${b}${b}`,
          offspring:
            `only ${A}_${B}_ and ${A}_${b}${b} classes occur in a large sample`,
          correct:
            `The unknown parent is ${A}${A}${B}${b}`,
          distractors: [
            `The unknown parent is ${A}${a}${B}${b}`,
            `The unknown parent is ${A}${A}${B}${B}`,
            `The unknown parent is ${A}${a}${B}${B}`
          ],
          explanation:
            `The unknown parent always supplies ${A}, but supplies either ${B} or ${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh11-locus-by-locus-inference",
        "dihybrid",
        "intermediate",
        `${item.parents} produce ${item.offspring}.`,
        "Which conclusion is best supported?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Evaluate the evidence separately at each locus. Do not infer heterozygosity where no recessive offspring class has been observed.",
        `${item.explanation} Therefore, ${item.correct}. Key takeaway: hidden heterozygosity must be inferred locus by locus from specific offspring evidence.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — distinguish proof from support in finite samples
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh11-strength-of-evidence",
    "evidence strength evaluation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          evidence:
            `An ${A}_${B}_ parent crossed with ${a}${a}${b}${b} produces one ${A}_${B}_ offspring.`,
          correct:
            "The result is compatible with several genotypes and does not prove homozygosity",
          distractors: [
            `The parent is proven to be ${A}${A}${B}${B}`,
            `The parent is proven to be ${A}${a}${B}${b}`,
            "The tester genotype is invalid"
          ],
          explanation:
            `A single double-dominant offspring could be produced by multiple dominant parental genotypes.`
        },
        {
          evidence:
            `An ${A}_${B}_ parent crossed with ${a}${a}${b}${b} produces one ${a}${a}${b}${b} offspring.`,
          correct:
            `The parent is proven to carry both ${a} and ${b}`,
          distractors: [
            `The parent is proven to be ${A}${A}${B}${B}`,
            "The result provides no genotype information",
            `Only one recessive allele is proven`
          ],
          explanation:
            `The tester supplies one ${a} and one ${b}; the unknown parent must have supplied the other ${a} and ${b}.`
        },
        {
          evidence:
            `An ${A}_${B}_ parent crossed with ${a}${a}${b}${b} produces 20 offspring, all ${A}_${B}_.`,
          correct:
            `The data strongly support ${A}${A}${B}${B}, but do not prove it absolutely`,
          distractors: [
            `The parent is mathematically proven to be ${A}${A}${B}${B}`,
            `The parent must be ${A}${a}${B}${b}`,
            "The data are uninformative"
          ],
          explanation:
            `A heterozygous parent could produce only dominant offspring by chance, although that becomes increasingly unlikely with larger samples.`
        },
        {
          evidence:
            `Two ${A}_${B}_ parents produce one ${a}${a}${b}${b} offspring.`,
          correct:
            `Both parents are proven to be ${A}${a}${B}${b}`,
          distractors: [
            `Only one parent must carry both ${a} and ${b}`,
            `Both parents are proven homozygous dominant`,
            "The offspring could arise without parental recessive alleles"
          ],
          explanation:
            `Each parent must contribute ${a} and ${b}, and both show dominant phenotypes, so both are double heterozygotes.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh11-strength-of-evidence",
        "dihybrid",
        "advanced",
        item.evidence,
        "Which statement best describes the strength of the evidence?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Ask whether the observation is impossible under competing genotypes or merely less likely.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: some offspring observations prove hidden heterozygosity, whereas absence of a class usually provides only probabilistic support.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose overconfident conclusions from missing classes
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh11-missing-class-reasoning",
    "misconception analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          claim:
            `“No ${a}${a}${b}${b} offspring appeared among eight progeny, so neither parent can be ${A}${a}${B}${b}.”`,
          correct:
            "The absence of a possible class in a small sample does not exclude double heterozygosity",
          explanation:
            `A double-heterozygote cross can fail to produce ${a}${a}${b}${b} in a small family by chance.`
        },
        {
          claim:
            `“All ten testcross offspring were ${A}_${B}_, so the unknown parent is certainly ${A}${A}${B}${B}.”`,
          correct:
            "The result supports homozygosity but does not prove it with absolute certainty",
          explanation:
            `A heterozygous parent could, by chance, contribute dominant alleles to all ten offspring.`
        },
        {
          claim:
            `“Because no ${a}${a} offspring were observed, both parents must be ${A}${A}.”`,
          correct:
            "Absence of recessive offspring does not distinguish homozygosity from an unobserved heterozygous outcome",
          explanation:
            `At least one parent might be ${A}${a}; the sample may simply have missed ${a}${a} offspring.`
        },
        {
          claim:
            `“One ${a}${a}${B}_ offspring proves both parents are heterozygous at both loci.”`,
          correct:
            `The offspring proves both parents carry ${a}, but gives no proof that both carry ${b}`,
          explanation:
            `The evidence is decisive at the ${A}/${a} locus only.`
        },
        {
          claim:
            `“One ${a}${a}${b}${b} offspring from two dominant-phenotype parents proves only that one parent carries recessive alleles.”`,
          correct:
            `Both parents must carry both ${a} and ${b}`,
          explanation:
            `The offspring receives one recessive allele at each locus from each parent.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh11-missing-class-reasoning",
        "dihybrid",
        "advanced",
        `A student states: ${item.claim}`,
        "What is the best correction?",
        shuffle([
          item.correct,
          "The student ignored crossing over",
          "The student assumed incomplete dominance",
          "The student used too many offspring classes"
        ]),
        item.correct,
        "Separate positive evidence from missing evidence. An observed recessive class can be decisive; an absent class may simply reflect sampling.",
        `${item.explanation} Key takeaway: presence of a diagnostic offspring class can prove hidden heterozygosity, but absence of a class rarely proves homozygosity in a finite sample.`
      );
    }
  );
}
