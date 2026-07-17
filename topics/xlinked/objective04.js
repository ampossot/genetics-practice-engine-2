/**
 * X-linked Inheritance — Objective 04
 *
 * Learning objective:
 * Infer parental genotypes and carrier status from offspring evidence in
 * X-linked crosses.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family targets a different direction of inference.
 */

export function registerObjective04(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "inferring parental genotypes and carrier status from X-linked offspring evidence";

  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const loci = [
    {
      organism: "fruit flies",
      gene: "eye colour",
      dominantTrait: "wild-type eyes",
      recessiveTrait: "white eyes",
      dominantAllele: "w+",
      recessiveAllele: "w"
    },
    {
      organism: "humans",
      gene: "red-green colour vision",
      dominantTrait: "typical colour vision",
      recessiveTrait: "red-green colour blindness",
      dominantAllele: "C",
      recessiveAllele: "c"
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
      organism: "mosquitoes",
      gene: "body colour",
      dominantTrait: "dark body colour",
      recessiveTrait: "light body colour",
      dominantAllele: "D",
      recessiveAllele: "d"
    }
  ];

  const x = (allele) => `X${allele}`;
  const female = (first, second) => `${x(first)}/${x(second)}`;
  const male = (allele) => `${x(allele)}/Y`;

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked. ` +
    `${x(locus.dominantAllele)} produces ${locus.dominantTrait}, whereas ` +
    `${x(locus.recessiveAllele)} produces ${locus.recessiveTrait} when no dominant allele is present.`;

  // -------------------------------------------------------------------------
  // BEGINNER — infer the allele source for an affected son
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl4-affected-son-allele-source",
    "maternal allele inference",
    () => {
      const locus = pick(loci);
      const a = locus.recessiveAllele;

      const correct =
        `The mother must have contributed ${x(a)}; the father contributed Y`;

      return q(
        "xl4-affected-son-allele-source",
        "xlinked",
        "beginner",
        `${ruleText(locus)} A son has genotype ${male(a)} and shows ${locus.recessiveTrait}.`,
        "Which conclusion is required by this observation?",
        shuffle([
          correct,
          `The father must have contributed ${x(a)} to his son`,
          `The father contributed both ${x(a)} and Y`,
          `The son must have inherited ${x(a)} independently of either parent`
        ]),
        correct,
        "A son receives Y from his father and his only X chromosome from his mother.",
        `Because the son is ${male(a)}, his ${x(a)} chromosome came from his mother, while his father supplied Y.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — use a daughter's genotype to infer the father
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl4-daughter-infers-father",
    "paternal genotype inference",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          daughter: female(a, a),
          correct: male(a),
          distractors: [male(A), female(A, a), female(a, a)],
          explanation:
            `A daughter receives one X chromosome from her father. Because she is ${female(a, a)}, her father had to contribute ${x(a)} and therefore had genotype ${male(a)}.`
        },
        {
          daughter: female(A, A),
          correct: male(A),
          distractors: [male(a), female(A, a), female(A, A)],
          explanation:
            `One of the daughter's ${x(A)} chromosomes came from her father, so he must have genotype ${male(A)}.`
        },
        {
          daughter: female(A, a),
          correct: "Either X-linked paternal genotype may be possible without knowing which allele came from the mother",
          distractors: [
            male(A),
            male(a),
            "The father must be heterozygous"
          ],
          explanation:
            `A heterozygous daughter could receive ${x(A)} from her father and ${x(a)} from her mother, or the reverse. Her genotype alone does not identify which paternal X allele she received.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl4-daughter-infers-father",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} A daughter has genotype ${item.daughter}.`,
        "What can be concluded about her father's genotype?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Every daughter receives her father's only X chromosome. Ask whether the daughter's genotype uniquely identifies that paternal X.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer the mother's genotype from sons
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl4-infer-mother-from-sons",
    "maternal genotype inference",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          evidence: `she has produced both ${male(A)} and ${male(a)} sons`,
          correct: female(A, a),
          distractors: [female(A, A), female(a, a), male(A)],
          explanation:
            `Sons receive their X chromosome from their mother. Producing both son genotypes shows that she can contribute both ${x(A)} and ${x(a)}, so she is ${female(A, a)}.`
        },
        {
          evidence: `all of her sons are ${male(a)}, and genetic testing confirms she can produce only ${x(a)} eggs`,
          correct: female(a, a),
          distractors: [female(A, a), female(A, A), male(a)],
          explanation:
            `If she can produce only ${x(a)} eggs, both of her X chromosomes must carry ${a}; therefore she is ${female(a, a)}.`
        },
        {
          evidence: `all of her sons are ${male(A)}, and genetic testing confirms she can produce only ${x(A)} eggs`,
          correct: female(A, A),
          distractors: [female(A, a), female(a, a), male(A)],
          explanation:
            `Producing only ${x(A)} eggs requires two ${x(A)} chromosomes, so the mother is ${female(A, A)}.`
        },
        {
          evidence: `one observed son is ${male(a)}`, 
          correct: `She must carry at least one ${x(a)} chromosome, but she could be ${female(A, a)} or ${female(a, a)}`,
          distractors: [
            `She must be ${female(A, a)}`,
            `She must be ${female(a, a)}`,
            `Her genotype cannot contain ${x(a)}`
          ],
          explanation:
            `An ${male(a)} son proves that his mother can contribute ${x(a)}, but one son does not reveal whether her other X chromosome carries ${A} or ${a}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl4-infer-mother-from-sons",
        "xlinked",
        "advanced",
        `${ruleText(locus)} A mother has the ${locus.dominantTrait} phenotype, unless the evidence below states otherwise. The evidence is that ${item.evidence}.`,
        "Which conclusion about the mother's genotype is best supported?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Sons reveal which X chromosomes their mother can transmit because they receive Y, not X, from their father.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — judge whether family evidence is sufficient
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl4-evidence-sufficiency",
    "information sufficiency",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          evidence: `A phenotypically normal mother and a ${male(A)} father have one ${male(a)} son.`,
          question: "Is the mother's genotype uniquely determined?",
          correct: `No. She must carry ${x(a)}, but she could be ${female(A, a)} or ${female(a, a)} unless her phenotype rules out the latter`,
          distractors: [
            `Yes. She must be ${female(A, a)}`,
            `Yes. She must be ${female(a, a)}`,
            `No. The son's genotype gives no information about the mother`
          ],
          explanation:
            `The son proves that the mother carries ${x(a)}. If her normal phenotype is reliable under complete dominance, that additionally identifies her as ${female(A, a)}; without using that phenotype information, the son's genotype alone is not sufficient.`
        },
        {
          evidence: `A father is ${male(a)}, and one daughter is ${female(A, a)}.`,
          question: "Does this prove that the mother carries allele a?",
          correct: `No. The daughter necessarily received ${x(a)} from her father and could have received ${x(A)} from the mother`,
          distractors: [
            `Yes. Every heterozygous daughter must receive ${x(a)} from her mother`,
            `Yes. Fathers transmit Y to daughters`,
            `No. Daughters do not inherit X chromosomes from fathers`
          ],
          explanation:
            `The affected father contributes ${x(a)} to every daughter. This daughter's ${x(a)} therefore provides no evidence that her mother carries ${a}.`
        },
        {
          evidence: `A father is ${male(A)}, and one daughter is ${female(A, a)}.`,
          question: "Does this prove that the mother carries allele a?",
          correct: `Yes. The father can contribute only ${x(A)}, so the daughter's ${x(a)} must have come from her mother`,
          distractors: [
            `No. The father could have contributed ${x(a)}`,
            `No. The daughter could have produced ${x(a)} by mutation during fertilization`,
            `Yes. Fathers contribute both X chromosomes to daughters`
          ],
          explanation:
            `Because the father's only X is ${x(A)}, the daughter's ${x(a)} allele must be maternal.`
        },
        {
          evidence: `Two sons from the same mother are ${male(A)} and ${male(a)}.`,
          question: "Is the mother's genotype uniquely determined?",
          correct: `Yes. She must be ${female(A, a)}`,
          distractors: [
            `No. She could be ${female(A, A)} or ${female(a, a)}`,
            `Yes. She must be ${female(A, A)}`,
            `Yes. She must be ${female(a, a)}`
          ],
          explanation:
            `The mother has transmitted both ${x(A)} and ${x(a)} to sons, so she must possess both alleles.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl4-evidence-sufficiency",
        "xlinked",
        "advanced",
        `${ruleText(locus)} ${item.evidence}`,
        item.question,
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Identify which parent must supply each offspring sex chromosome, then decide whether the evidence allows one parental genotype or several.",
        item.explanation
      );
    }
  );
}
