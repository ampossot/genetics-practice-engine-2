/**
 * Dihybrid Crosses — Objective 11
 *
 * Learning objective:
 * Infer hidden heterozygosity from ordinary family-cross evidence and evaluate
 * when offspring observations are sufficient to support or prove parental
 * genotypes.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Testcross-specific reasoning is reserved for Objective 10.
 */

export function registerObjective11(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "inferring hidden heterozygosity from ordinary dihybrid family crosses";

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
  // BEGINNER — recognize hidden recessive alleles from offspring phenotypes
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
          parents: `two ${organism}s with phenotype ${A}_${B}_`,
          offspring: `${a}${a}${B}_`,
          correct: `Both parents must carry ${a}`,
          distractors: [
            `Only one parent must carry ${a}`,
            `Both parents must be ${A}${A}`,
            `The offspring phenotype gives no information about the parents`
          ],
          explanation:
            `An ${a}${a} offspring must receive one ${a} allele from each parent.`
        },
        {
          parents: `two ${organism}s with phenotype ${A}_${B}_`,
          offspring: `${A}_${b}${b}`,
          correct: `Both parents must carry ${b}`,
          distractors: [
            `Only one parent must carry ${b}`,
            `Both parents must be ${B}${B}`,
            `Dominance creates ${b} alleles in the offspring`
          ],
          explanation:
            `A ${b}${b} offspring must receive one ${b} allele from each parent.`
        },
        {
          parents: `two ${organism}s with phenotype ${A}_${B}_`,
          offspring: `${a}${a}${b}${b}`,
          correct: `Both parents must carry both ${a} and ${b}`,
          distractors: [
            `Only one parent must carry both recessive alleles`,
            `Both parents must be homozygous dominant`,
            `The double-recessive offspring could arise without parental recessive alleles`
          ],
          explanation:
            `The double-recessive offspring receives ${a} and ${b} from each parent.`
        },
        {
          parents: `one ${organism} with phenotype ${A}_${b}${b} and one with phenotype ${a}${a}${B}_`,
          offspring: `${a}${a}${b}${b}`,
          correct:
            `The first parent must carry ${a}, and the second parent must carry ${b}`,
          distractors: [
            `Only the first parent must carry a hidden recessive allele`,
            `Only the second parent must carry a hidden recessive allele`,
            `Neither parent needs to carry a hidden recessive allele`
          ],
          explanation:
            `The first parent already contributes ${b}; it must also contribute ${a}. The second already contributes ${a}; it must also contribute ${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh11-hidden-allele-evidence",
        "dihybrid",
        "beginner",
        `${item.parents} produce an offspring with phenotype ${item.offspring}.`,
        "What conclusion is justified?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Trace each recessive allele in the offspring back to one allele from each parent.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: recessive offspring phenotypes can expose alleles hidden by dominant parental phenotypes.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — infer parental genotypes locus by locus
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
          evidence:
            `Two ${A}_${B}_ parents produce at least one ${a}${a}${B}_ offspring, but no ${b}${b} offspring have been observed.`,
          correct:
            `Both parents are ${A}${a} at the first locus; their ${B}/${b} genotypes remain uncertain`,
          distractors: [
            `Both parents must be ${A}${a}${B}${b}`,
            `Both parents must be ${A}${A}${B}${B}`,
            `Only one parent needs to carry ${a}`
          ],
          explanation:
            `The ${a}${a} offspring proves both parents carry ${a}, but the second-locus evidence is incomplete.`
        },
        {
          evidence:
            `Two ${A}_${B}_ parents produce at least one ${A}_${b}${b} offspring, but no ${a}${a} offspring have been observed.`,
          correct:
            `Both parents are ${B}${b} at the second locus; their ${A}/${a} genotypes remain uncertain`,
          distractors: [
            `Both parents must be ${A}${a}${B}${b}`,
            `Both parents must be ${A}${A}${B}${B}`,
            `Only one parent needs to carry ${b}`
          ],
          explanation:
            `The ${b}${b} offspring proves both parents carry ${b}, but the first-locus evidence is incomplete.`
        },
        {
          evidence:
            `Two ${A}_${B}_ parents produce at least one ${a}${a}${b}${b} offspring.`,
          correct:
            `Both parents must be ${A}${a}${B}${b}`,
          distractors: [
            `Only one parent must be ${A}${a}${B}${b}`,
            `Both parents must be ${A}${A}${B}${B}`,
            `One parent may lack ${a} or ${b}`
          ],
          explanation:
            `Each parent must contribute both recessive alleles while showing dominant phenotypes.`
        },
        {
          evidence:
            `An ${A}_${b}${b} parent and an ${a}${a}${B}_ parent produce both ${A}_${B}_ and ${a}${a}${b}${b} offspring.`,
          correct:
            `The first parent is ${A}${a}${b}${b}, and the second is ${a}${a}${B}${b}`,
          distractors: [
            `The first parent is ${A}${A}${b}${b}, and the second is ${a}${a}${B}${B}`,
            `Both parents are ${A}${a}${B}${b}`,
            `The parental genotypes cannot be constrained at either locus`
          ],
          explanation:
            `The double-recessive offspring proves the first parent carries ${a} and the second carries ${b}; their phenotypes fix the other homozygous recessive loci.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh11-locus-by-locus-inference",
        "dihybrid",
        "intermediate",
        item.evidence,
        "Which conclusion is best supported?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Evaluate each locus separately and distinguish proven heterozygosity from unresolved genotype possibilities.",
        `${item.explanation} Therefore, ${item.correct}. Key takeaway: hidden heterozygosity should be inferred one locus at a time from specific offspring evidence.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — distinguish logical proof from probabilistic support
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
            `Two ${A}_${B}_ parents produce one ${a}${a}${b}${b} offspring.`,
          correct:
            `Both parents are proven to be ${A}${a}${B}${b}`,
          distractors: [
            `Only one parent is proven to carry ${a} and ${b}`,
            `The result merely supports, but does not prove, double heterozygosity`,
            `Both parents are proven homozygous dominant`
          ],
          explanation:
            `Each parent must contribute ${a} and ${b}; because both show dominant phenotypes, each must be heterozygous at both loci.`
        },
        {
          evidence:
            `Two ${A}_${B}_ parents produce 20 offspring, all with phenotype ${A}_${B}_.`,
          correct:
            "The result supports homozygosity at one or both loci but does not prove it",
          distractors: [
            `Both parents are proven ${A}${A}${B}${B}`,
            `Both parents are proven ${A}${a}${B}${b}`,
            "The offspring provide no genetic information"
          ],
          explanation:
            `Heterozygous parents can produce only dominant-phenotype offspring by chance, although the likelihood decreases as sample size grows.`
        },
        {
          evidence:
            `One ${a}${a}${B}_ offspring is produced by two ${A}_${B}_ parents.`,
          correct:
            `Both parents are proven heterozygous at the ${A}/${a} locus, but their second-locus genotypes remain unresolved`,
          distractors: [
            `Both parents are proven ${A}${a}${B}${b}`,
            `Only one parent is proven to carry ${a}`,
            `Both parents are proven homozygous dominant`
          ],
          explanation:
            `The offspring is decisive at the first locus only.`
        },
        {
          evidence:
            `A single ${A}${a}${B}${b} offspring is produced by two parents of unknown genotype.`,
          correct:
            "Many different parental genotype combinations remain possible",
          distractors: [
            `Both parents are proven ${A}${a}${B}${b}`,
            `One parent must be ${A}${A}${B}${B} and the other ${a}${a}${b}${b}`,
            `Neither parent can be homozygous at any locus`
          ],
          explanation:
            `The offspring reveals transmitted alleles but not the complete genotype of either parent.`
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
        "Ask whether competing parental genotypes are impossible or merely less likely.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()}. Key takeaway: observed diagnostic offspring can prove allele carriage, whereas missing classes usually provide only probabilistic support.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose overconfident family-cross conclusions
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
            `“One ${a}${a}${B}_ offspring proves both parents are heterozygous at both loci.”`,
          correct:
            `The offspring proves both parents carry ${a}, but gives no proof that both carry ${b}`,
          explanation:
            `The evidence is decisive only at the ${A}/${a} locus.`
        },
        {
          claim:
            `“All offspring showed ${A}_${B}_, so both parents must be homozygous dominant.”`,
          correct:
            "All-dominant offspring support homozygosity but do not prove it in a finite sample",
          explanation:
            `Possible recessive classes may simply have been missed by chance.`
        },
        {
          claim:
            `“One ${a}${a}${b}${b} offspring from two dominant-phenotype parents proves only one parent carries recessive alleles.”`,
          correct:
            `Both parents must carry both ${a} and ${b}`,
          explanation:
            `The offspring receives one recessive allele at each locus from each parent.`
        },
        {
          claim:
            `“Because one offspring is ${A}${a}${B}${b}, both parents must also be double heterozygotes.”`,
          correct:
            "An offspring genotype does not uniquely determine both parental genotypes",
          explanation:
            `Many parental combinations can contribute one dominant and one recessive allele at each locus.`
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
          "The student used too many loci"
        ]),
        item.correct,
        "Separate positive evidence from missing evidence and avoid inferring more loci than the offspring phenotype actually reveals.",
        `${item.explanation} Key takeaway: presence of a diagnostic class can be decisive, but absence of a class or a single non-diagnostic offspring rarely determines complete parental genotypes.`
      );
    }
  );
}
