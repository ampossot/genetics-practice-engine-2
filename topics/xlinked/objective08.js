/**
 * X-linked Inheritance — Objective 08
 *
 * Learning objective:
 * Interpret pedigrees and family histories involving X-linked recessive traits.
 *
 * Generator families:
 *   1. Identify obligate carriers and unaffected non-carriers.
 *   2. Infer the most likely inheritance pattern from pedigree evidence.
 *   3. Calculate carrier and affected-child probabilities from a pedigree.
 *   4. Evaluate pedigree-based reasoning and common misconceptions.
 *
 * The module focuses on extracting evidence from family relationships rather
 * than merely completing a Punnett square.
 */

export function registerObjective08(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE = "interpreting pedigrees for X-linked recessive inheritance";
  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const loci = [
    {
      organism: "humans",
      gene: "red-green colour vision",
      dominantTrait: "typical colour vision",
      recessiveTrait: "red-green colour blindness",
      dominantAllele: "C",
      recessiveAllele: "c"
    },
    {
      organism: "humans",
      gene: "blood-clotting factor function",
      dominantTrait: "typical clotting",
      recessiveTrait: "reduced clotting",
      dominantAllele: "H",
      recessiveAllele: "h"
    },
    {
      organism: "fruit flies",
      gene: "eye colour",
      dominantTrait: "wild-type eyes",
      recessiveTrait: "white eyes",
      dominantAllele: "w+",
      recessiveAllele: "w"
    },
    {
      organism: "laboratory mice",
      gene: "coat pigmentation",
      dominantTrait: "pigmented coat",
      recessiveTrait: "reduced coat pigmentation",
      dominantAllele: "P",
      recessiveAllele: "p"
    },
    {
      organism: "beetles",
      gene: "wing pattern",
      dominantTrait: "banded wings",
      recessiveTrait: "unbanded wings",
      dominantAllele: "B",
      recessiveAllele: "b"
    },
    {
      organism: "moths",
      gene: "antenna shape",
      dominantTrait: "straight antennae",
      recessiveTrait: "curved antennae",
      dominantAllele: "S",
      recessiveAllele: "s"
    }
  ];

  const x = (allele) => `X${allele}`;
  const female = (first, second) => `${x(first)}/${x(second)}`;
  const male = (allele) => `${x(allele)}/Y`;
  const pct = (value) => `${Math.round(value * 100)}%`;

  const ruleText = (locus) =>
    `The trait is X-linked recessive. ${x(locus.dominantAllele)} is associated with ${locus.dominantTrait}, while ${x(locus.recessiveAllele)} is associated with ${locus.recessiveTrait} when no dominant allele is present.`;

  const options = (correct, distractors) =>
    shuffle([
      correct,
      ...shuffle(distractors.filter((item) => item !== correct)).slice(0, 3)
    ]);

  // -------------------------------------------------------------------------
  // BEGINNER — identify obligate carriers
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl8-obligate-carrier",
    "identifying obligate carriers from family evidence",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          evidence:
            `An affected father (${male(a)}) and a homozygous dominant mother (${female(A, A)}) have daughters.`,
          question:
            "What must be true of every daughter?",
          correct:
            `Every daughter is an obligate heterozygous carrier (${female(A, a)}).`,
          distractors: [
            `Every daughter is homozygous dominant (${female(A, A)}).`,
            `Every daughter is affected (${female(a, a)}).`,
            "The daughters receive Y from their father."
          ],
          explanation:
            `Every daughter receives ${x(a)} from the father and ${x(A)} from the mother, so every daughter is ${female(A, a)}.`
        },
        {
          evidence:
            `An unaffected woman has an affected son (${male(a)}). The father is unaffected.`,
          question:
            "What is the strongest conclusion about the mother?",
          correct:
            `She must carry ${x(a)} and is therefore heterozygous (${female(A, a)}).`,
          distractors: [
            `She must be homozygous dominant (${female(A, A)}).`,
            "The father transmitted the affected X chromosome to the son.",
            `She must be affected (${female(a, a)}).`
          ],
          explanation:
            `A son receives Y from his father and his only X chromosome from his mother. The affected son's ${x(a)} must therefore have come from her.`
        },
        {
          evidence:
            `A woman is unaffected, but her father was affected (${male(a)}).`,
          question:
            "What must she have inherited from her father?",
          correct: `${x(a)}`,
          distractors: [x(A), "Y", "No sex chromosome"],
          explanation:
            `Fathers transmit their X chromosome to every daughter. Because her father was affected, his X chromosome carried ${a}.`
        },
        {
          evidence:
            `A woman is affected (${female(a, a)}).`,
          question:
            "What must be true of her father under simple X-linked recessive inheritance?",
          correct: `He must be affected (${male(a)}).`,
          distractors: [
            `He must be unaffected (${male(A)}).`,
            "He could have transmitted Y to her.",
            "His genotype provides no information."
          ],
          explanation:
            `A daughter receives one X from her father. For her to be ${female(a, a)}, he must have contributed ${x(a)} and therefore must be ${male(a)}.`
        },
        {
          evidence:
            `An affected father and an affected mother have children.`,
          question:
            "Which statement is necessarily true?",
          correct: "All daughters and all sons are affected.",
          distractors: [
            "Only daughters are affected.",
            "Only sons are affected.",
            "Half of all children are affected."
          ],
          explanation:
            `The mother contributes ${x(a)} to every child. The father contributes ${x(a)} to daughters and Y to sons, so all children express the recessive phenotype.`
        },
        {
          evidence:
            `An unaffected father and a homozygous dominant mother have children.`,
          question:
            "Which statement is necessarily true?",
          correct: "No child inherits the recessive allele from either parent.",
          distractors: [
            "All daughters are carriers.",
            "Half of the sons are affected.",
            "All sons inherit the father's X chromosome."
          ],
          explanation:
            `Both parents carry only the dominant allele on their X chromosomes, so no child can receive ${x(a)}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl8-obligate-carrier",
        "xlinked",
        "beginner",
        ruleText(l),
        `${item.evidence} ${item.question}`,
        options(item.correct, item.distractors),
        item.correct,
        "Use the direction of X-chromosome transmission: fathers give X to daughters, while mothers give one X to every child.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — infer the inheritance pattern from pedigree evidence
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl8-inheritance-pattern",
    "inferring an X-linked recessive pattern from pedigree evidence",
    () => {
      const l = pick(loci);

      const scenarios = [
        {
          evidence:
            `Affected males are more common than affected females. Affected fathers do not transmit the trait to sons, but all daughters of affected fathers receive the allele.`,
          correct: "X-linked recessive",
          distractors: ["Autosomal dominant", "Y-linked", "Mitochondrial"],
          explanation:
            "The lack of father-to-son transmission and the passage of the father's X chromosome to every daughter are hallmark features of X-linked inheritance."
        },
        {
          evidence:
            `Only males are affected, and every affected father transmits the trait to every son.`,
          correct: "Y-linked",
          distractors: ["X-linked recessive", "Autosomal recessive", "Mitochondrial"],
          explanation:
            "Strict father-to-son transmission is expected for a Y-linked trait, not for an X-linked trait."
        },
        {
          evidence:
            `Affected mothers transmit the trait to all children, whereas affected fathers transmit it to none.`,
          correct: "Mitochondrial",
          distractors: ["X-linked recessive", "Autosomal dominant", "Y-linked"],
          explanation:
            "Mitochondrial inheritance is maternal because the egg supplies the embryo's mitochondria."
        },
        {
          evidence:
            `Affected fathers can transmit the trait to sons and daughters with similar frequency.`,
          correct: "Not consistent with simple X-linked inheritance",
          distractors: ["X-linked recessive", "Y-linked", "Mitochondrial"],
          explanation:
            "A father gives Y, not X, to his sons. Repeated father-to-son transmission argues against simple X-linked inheritance."
        },
        {
          evidence:
            `Unaffected parents occasionally have affected children of either sex, and father-to-son transmission can occur.`,
          correct: "Autosomal recessive",
          distractors: ["X-linked recessive", "Y-linked", "Mitochondrial"],
          explanation:
            "Affected offspring of either sex and possible father-to-son transmission fit an autosomal recessive pattern."
        },
        {
          evidence:
            `An affected father has no affected sons, but some grandsons through carrier daughters are affected.`,
          correct: "X-linked recessive",
          distractors: ["Y-linked", "Autosomal dominant", "Mitochondrial"],
          explanation:
            "The affected father's allele enters his daughters and can reappear in their sons, creating the classic crisscross pattern."
        },
        {
          evidence:
            `Every affected individual has an affected parent, males and females are similarly affected, and father-to-son transmission occurs.`,
          correct: "Autosomal dominant",
          distractors: ["X-linked recessive", "Y-linked", "Mitochondrial"],
          explanation:
            "Vertical transmission in both sexes with father-to-son inheritance supports an autosomal dominant pattern."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl8-inheritance-pattern",
        "xlinked",
        "intermediate",
        `A family is being studied for ${l.recessiveTrait}.`,
        `Pedigree evidence: ${item.evidence} Which inheritance pattern best fits?`,
        options(item.correct, item.distractors),
        item.correct,
        "First check whether father-to-son transmission occurs. Then compare the frequency and transmission patterns in males and females.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — calculate probabilities from pedigree information
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl8-pedigree-probability",
    "calculating risk from pedigree-derived genotypes",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          stem:
            `An unaffected woman has an affected father, so she is an obligate carrier (${female(A, a)}). She has children with an unaffected man (${male(A)}).`,
          question:
            `What is the probability that a randomly selected child will be an affected son?`,
          correct: "25%",
          distractors: ["0%", "50%", "100%"],
          explanation:
            `The child must be male (1/2) and inherit maternal ${x(a)} (1/2): 1/2 × 1/2 = 1/4.`
        },
        {
          stem:
            `An obligate carrier woman (${female(A, a)}) has children with an affected man (${male(a)}).`,
          question:
            `What is the probability that a daughter will be affected, given that the child is already known to be female?`,
          correct: "50%",
          distractors: ["25%", "75%", "100%"],
          explanation:
            `Every daughter receives paternal ${x(a)}. Half receive maternal ${x(a)}, making half of daughters ${female(a, a)}.`
        },
        {
          stem:
            `A woman has a 1/2 probability of being a carrier. Her partner is unaffected.`,
          question:
            `What is the probability that their next child will be an affected son?`,
          correct: "12.5%",
          distractors: ["25%", "50%", "6.25%"],
          explanation:
            `The mother must be a carrier (1/2), the child must be male (1/2), and she must pass ${x(a)} (1/2): 1/2 × 1/2 × 1/2 = 1/8.`
        },
        {
          stem:
            `A woman has a 1/2 probability of being a carrier. She has two unaffected sons with an unaffected partner. Assume each birth is independent.`,
          question:
            `Ignoring Bayesian updating, what is the original probability that a third child will be an affected son?`,
          correct: "12.5%",
          distractors: ["0%", "25%", "50%"],
          explanation:
            `Under the stated instruction, use the original carrier probability: 1/2 carrier × 1/2 son × 1/2 recessive allele = 1/8.`
        },
        {
          stem:
            `A carrier woman (${female(A, a)}) and an unaffected man (${male(A)}) have two children.`,
          question:
            `What is the probability that at least one of the two children is an affected son?`,
          correct: "43.75%",
          distractors: ["25%", "50%", "56.25%"],
          explanation:
            `For one child, P(affected son) = 1/4. P(no affected son in two births) = 3/4 × 3/4 = 9/16. Therefore P(at least one) = 1 − 9/16 = 7/16 = 43.75%.`
        },
        {
          stem:
            `An affected father (${male(a)}) and homozygous dominant mother (${female(A, A)}) have a daughter. That daughter later has children with an unaffected man.`,
          question:
            `What is the probability that one of her randomly selected children will be an affected son?`,
          correct: "25%",
          distractors: ["0%", "50%", "100%"],
          explanation:
            `The daughter is an obligate carrier. Her child must be a son (1/2) and receive ${x(a)} from her (1/2), giving 1/4.`
        },
        {
          stem:
            `An unaffected woman has an affected mother and unaffected father.`,
          question:
            `What is the woman's genotype, and what is the probability that a son of hers will be affected if her partner is unaffected?`,
          correct: `${female(A, a)}; 50% of her sons`,
          distractors: [
            `${female(A, A)}; 0% of her sons`,
            `${female(a, a)}; 100% of her sons`,
            `${female(A, a)}; 25% of her sons`
          ],
          explanation:
            `She receives ${x(a)} from her affected mother and ${x(A)} from her unaffected father, making her a carrier. Half of her sons inherit ${x(a)}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl8-pedigree-probability",
        "xlinked",
        "advanced",
        ruleText(l),
        `${item.stem} ${item.question}`,
        options(item.correct, item.distractors),
        item.correct,
        "Translate each pedigree fact into a genotype or carrier probability before multiplying independent events.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate pedigree reasoning
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl8-pedigree-reasoning",
    "evaluating reasoning from pedigree evidence",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          evidence:
            `An affected father has an unaffected daughter.`,
          statement:
            `"Because the daughter is unaffected, she did not inherit the affected allele."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only if she has sons", "Cannot be evaluated"],
          explanation:
            `The daughter necessarily inherited her father's ${x(a)}. She can remain unaffected if she also inherited ${x(A)} from her mother, making her ${female(A, a)}.`
        },
        {
          evidence:
            `An affected son is born to unaffected parents.`,
          statement:
            `"The father must be the source of the affected X chromosome."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct if the father is older", "Cannot be evaluated"],
          explanation:
            `The son receives Y from his father and his X chromosome from his mother. The mother must carry the recessive allele.`
        },
        {
          evidence:
            `An affected daughter is observed.`,
          statement:
            `"Her father must be affected, and her mother must contribute the recessive allele."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for autosomal traits", "Cannot be evaluated"],
          explanation:
            `An affected daughter is ${female(a, a)} and must receive one ${x(a)} from each parent.`
        },
        {
          evidence:
            `A carrier woman has three unaffected sons.`,
          statement:
            `"She cannot be a carrier because none of her sons is affected."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct if she has no daughters", "Cannot be evaluated"],
          explanation:
            `Each son independently has a 1/2 chance of receiving the dominant maternal X. Three unaffected sons are entirely possible for a carrier mother.`
        },
        {
          evidence:
            `An affected father has an affected son.`,
          statement:
            `"The father transmitted the affected allele directly to the son."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct if the mother is unaffected", "Cannot be evaluated"],
          explanation:
            `A father gives Y to his son. The son's affected X chromosome must come from his mother.`
        },
        {
          evidence:
            `An affected father has only unaffected daughters.`,
          statement:
            `"None of his daughters can transmit the allele to their children."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct if their partners are unaffected", "Cannot be evaluated"],
          explanation:
            `Every daughter inherits the father's affected X chromosome. If they are heterozygous, they can transmit that allele to sons or daughters.`
        },
        {
          evidence:
            `A pedigree contains many affected males connected through unaffected females.`,
          statement:
            `"This pattern can be produced by carrier females transmitting the allele to sons."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for Y-linked traits", "Cannot be evaluated"],
          explanation:
            `Unaffected heterozygous females can pass the recessive X-linked allele through generations, where it is more readily expressed in sons.`
        },
        {
          evidence:
            `A father and son are both affected.`,
          statement:
            `"This observation alone disproves X-linked recessive inheritance."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct unless the father is homozygous", "Cannot be evaluated"],
          explanation:
            `The father cannot transmit his affected X to the son, but the mother may independently transmit an affected X. Father and son can therefore both be affected without direct father-to-son transmission.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl8-pedigree-reasoning",
        "xlinked",
        "advanced",
        `${ruleText(l)} Pedigree evidence: ${item.evidence}`,
        `Evaluate this statement: ${item.statement}`,
        options(item.correct, item.distractors),
        item.correct,
        "Separate co-occurrence from direct transmission. Two relatives may share a phenotype without one transmitting the relevant chromosome directly to the other.",
        item.explanation
      );
    }
  );
}
