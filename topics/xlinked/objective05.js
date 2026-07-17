/**
 * X-linked Inheritance — Objective 05
 *
 * Learning objective:
 * Infer parental genotypes, carrier status, and family consistency from
 * informative offspring in X-linked recessive inheritance.
 *
 * Design:
 * Four generator families move from one-child deductions to multi-person
 * family inference. Variation comes from multiple organisms, loci, parental
 * phenotypes, offspring combinations, certainty levels, and pedigree logic.
 */

export function registerObjective05(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE = "inferring X-linked genotypes from family evidence";
  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const loci = [
    { organism: "fruit flies", gene: "eye colour", dominantTrait: "wild-type eyes", recessiveTrait: "white eyes", dominantAllele: "w+", recessiveAllele: "w" },
    { organism: "humans", gene: "red-green colour vision", dominantTrait: "typical colour vision", recessiveTrait: "red-green colour blindness", dominantAllele: "C", recessiveAllele: "c" },
    { organism: "laboratory mice", gene: "coat pigmentation", dominantTrait: "pigmented coat", recessiveTrait: "reduced coat pigmentation", dominantAllele: "P", recessiveAllele: "p" },
    { organism: "beetles", gene: "wing pattern", dominantTrait: "banded wings", recessiveTrait: "unbanded wings", dominantAllele: "B", recessiveAllele: "b" },
    { organism: "mosquitoes", gene: "body colour", dominantTrait: "dark body colour", recessiveTrait: "light body colour", dominantAllele: "D", recessiveAllele: "d" },
    { organism: "moths", gene: "antenna shape", dominantTrait: "straight antennae", recessiveTrait: "curved antennae", dominantAllele: "S", recessiveAllele: "s" },
    { organism: "fish", gene: "fin pigmentation", dominantTrait: "pigmented fins", recessiveTrait: "pale fins", dominantAllele: "F", recessiveAllele: "f" },
    { organism: "crickets", gene: "body marking", dominantTrait: "striped body", recessiveTrait: "unstriped body", dominantAllele: "R", recessiveAllele: "r" }
  ];

  const x = (allele) => `X${allele}`;
  const female = (first, second) => `${x(first)}/${x(second)}`;
  const male = (allele) => `${x(allele)}/Y`;
  const unique = (values) => [...new Set(values)];

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked recessive. ` +
    `${x(locus.dominantAllele)} produces ${locus.dominantTrait}; ` +
    `${x(locus.recessiveAllele)} produces ${locus.recessiveTrait} when no dominant allele is present.`;

  // -------------------------------------------------------------------------
  // BEGINNER — infer the source of one allele from one informative child
  // -------------------------------------------------------------------------

  register("beginner", "xl5-one-child-deduction", "deducing an allele source from one child", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        stem: `A son shows ${l.recessiveTrait}.`,
        correct: `His mother must carry ${x(a)}`,
        explanation: `The son is ${male(a)}. He receives Y from his father and ${x(a)} from his mother, so the mother must possess ${x(a)}.`
      },
      {
        stem: `A daughter shows ${l.recessiveTrait}.`,
        correct: `Her father must have genotype ${male(a)}`,
        explanation: `The daughter is ${female(a, a)} and receives one X from each parent. Her father must therefore contribute ${x(a)}.`
      },
      {
        stem: `A daughter has genotype ${female(A, a)}, and her father has genotype ${male(a)}.`,
        correct: `The daughter received ${x(a)} from her father and ${x(A)} from her mother`,
        explanation: `Every daughter receives her father's X chromosome. Because the father is ${male(a)}, his contribution is ${x(a)}.`
      },
      {
        stem: `A son has genotype ${male(A)}.`,
        correct: `He received ${x(A)} from his mother and Y from his father`,
        explanation: `Sons inherit their only X chromosome maternally and their Y chromosome paternally.`
      },
      {
        stem: `A daughter is ${female(a, a)}.`,
        correct: `Each parent contributed one ${x(a)} chromosome`,
        explanation: `A daughter receives one X from each parent. Both copies of ${x(a)} therefore have different parental sources.`
      },
      {
        stem: `A father with ${l.recessiveTrait} has a daughter.`,
        correct: `Every daughter receives his ${x(a)} chromosome`,
        explanation: `A father gives his X chromosome to all daughters. Whether a daughter shows the recessive phenotype depends on the maternal X.`
      }
    ];

    const item = pick(scenarios);
    const distractors = unique([
      `The father must transmit ${x(a)} to every son`,
      "The Y chromosome must carry the recessive allele",
      "Both sex chromosomes came from the mother",
      "The child's phenotype identifies both parental genotypes with certainty",
      `The allele ${a} could have come from either parent regardless of the child's sex`,
      `The father contributed both ${x(a)} and Y`
    ]).filter((value) => value !== item.correct);

    return q(
      "xl5-one-child-deduction",
      "xlinked",
      "beginner",
      `${ruleText(l)} ${item.stem}`,
      "Which conclusion is required by X-linked inheritance?",
      shuffle([item.correct, ...distractors]).slice(0, 4),
      item.correct,
      "First identify whether the child received an X or Y chromosome from each parent.",
      item.explanation
    );
  });

  // -------------------------------------------------------------------------
  // INTERMEDIATE — distinguish required, possible, and unsupported genotypes
  // -------------------------------------------------------------------------

  register("intermediate", "xl5-certainty-of-inference", "evaluating certainty of a genotype inference", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        evidence: `A mother shows ${l.dominantTrait} and has a son with ${l.recessiveTrait}.`,
        correct: `The mother must be ${female(A, a)}`,
        explanation: `The son proves she carries ${x(a)}. Her dominant phenotype proves she also carries ${x(A)}.`
      },
      {
        evidence: `A mother shows ${l.recessiveTrait}.`,
        correct: `The mother must be ${female(a, a)}`,
        explanation: `For an X-linked recessive phenotype, a female must have the recessive allele on both X chromosomes.`
      },
      {
        evidence: `A father shows ${l.dominantTrait}.`,
        correct: `The father must be ${male(A)}`,
        explanation: `A male has one X-linked allele. A dominant phenotype therefore identifies his X genotype directly.`
      },
      {
        evidence: `A daughter shows ${l.dominantTrait}, and her father is ${male(a)}.`,
        correct: `The daughter must be ${female(A, a)}`,
        explanation: `She receives ${x(a)} from her father, but her dominant phenotype requires ${x(A)} from her mother.`
      },
      {
        evidence: `A father is ${male(A)}, and a daughter shows ${l.dominantTrait}.`,
        correct: `The daughter's second X could carry either ${A} or ${a}`,
        explanation: `She certainly receives ${x(A)} from her father, so her phenotype does not reveal which maternal allele she received.`
      },
      {
        evidence: `A mother shows ${l.dominantTrait} and has only daughters with ${l.dominantTrait}.`,
        correct: `The evidence does not distinguish ${female(A, A)} from ${female(A, a)}`,
        explanation: `A heterozygous mother can produce only dominant daughters in a small family by chance. No recessive son or daughter has revealed ${x(a)}.`
      }
    ];

    const item = pick(scenarios);
    const distractors = unique([
      `The mother must be ${female(A, A)}`,
      `The mother must be ${female(a, a)}`,
      `The father must be ${male(a)}`,
      `The father must be ${male(A)}`,
      `The daughter must be ${female(A, A)}`,
      "No genotype information can be inferred from an X-linked phenotype",
      "The Y chromosome determines whether the recessive allele is expressed"
    ]).filter((value) => value !== item.correct);

    return q(
      "xl5-certainty-of-inference",
      "xlinked",
      "intermediate",
      `${ruleText(l)} ${item.evidence}`,
      "Which statement is the strongest conclusion supported by the evidence?",
      shuffle([item.correct, ...distractors]).slice(0, 4),
      item.correct,
      "Separate what must be true from what is merely possible. Use both phenotype and sex-specific chromosome transmission.",
      item.explanation
    );
  });

  // -------------------------------------------------------------------------
  // ADVANCED — infer a parental pair from multiple offspring
  // -------------------------------------------------------------------------

  register("advanced", "xl5-infer-parental-pair", "inferring parental genotypes from multiple offspring", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        family: `Both parents show ${l.dominantTrait}. They have a son with ${l.recessiveTrait} and a daughter with ${l.dominantTrait}.`,
        correct: `${female(A, a)} mother × ${male(A)} father`,
        explanation: `The recessive son received ${x(a)} from his phenotypically dominant mother, proving she is heterozygous. The dominant father is ${male(A)}.`
      },
      {
        family: `The mother shows ${l.dominantTrait}. The father shows ${l.recessiveTrait}. They have one daughter with ${l.recessiveTrait}.`,
        correct: `${female(A, a)} mother × ${male(a)} father`,
        explanation: `A recessive daughter must receive ${x(a)} from both parents. The mother is dominant, so she must also carry ${x(A)}.`
      },
      {
        family: `The mother shows ${l.recessiveTrait}. The father shows ${l.dominantTrait}. All daughters show ${l.dominantTrait}, and all sons show ${l.recessiveTrait}.`,
        correct: `${female(a, a)} mother × ${male(A)} father`,
        explanation: `Every son receives ${x(a)} from the mother. Every daughter receives paternal ${x(A)}, making all daughters ${female(A, a)}.`
      },
      {
        family: `Both parents show ${l.recessiveTrait}. Every observed son and daughter also shows ${l.recessiveTrait}.`,
        correct: `${female(a, a)} mother × ${male(a)} father`,
        explanation: `The mother can contribute only ${x(a)}, and the father contributes ${x(a)} to daughters and Y to sons. Every child is recessive.`
      },
      {
        family: `The father shows ${l.recessiveTrait}. All daughters show ${l.dominantTrait}, and at least one son shows ${l.recessiveTrait}.`,
        correct: `${female(A, a)} mother × ${male(a)} father`,
        explanation: `The recessive son proves the mother carries ${x(a)}. Dominant daughters show that the mother can also provide ${x(A)}.`
      },
      {
        family: `The father shows ${l.dominantTrait}. A daughter shows ${l.recessiveTrait}.`,
        correct: "No parental genotype pair can produce the stated daughter",
        explanation: `A recessive daughter must receive ${x(a)} from her father, but a dominant father carries ${x(A)} and gives it to every daughter.`
      }
    ];

    const item = pick(scenarios);
    const candidatePairs = [
      `${female(A, A)} mother × ${male(A)} father`,
      `${female(A, A)} mother × ${male(a)} father`,
      `${female(A, a)} mother × ${male(A)} father`,
      `${female(A, a)} mother × ${male(a)} father`,
      `${female(a, a)} mother × ${male(A)} father`,
      `${female(a, a)} mother × ${male(a)} father`,
      "No parental genotype pair can produce the stated daughter"
    ];

    const distractors = candidatePairs.filter((value) => value !== item.correct);

    return q(
      "xl5-infer-parental-pair",
      "xlinked",
      "advanced",
      `${ruleText(l)} ${item.family}`,
      "Which parental genotype pair is best supported?",
      shuffle([item.correct, ...distractors]).slice(0, 4),
      item.correct,
      "Use the most informative child first: recessive sons reveal a maternal allele, while recessive daughters reveal an allele from both parents.",
      item.explanation
    );
  });

  // -------------------------------------------------------------------------
  // ADVANCED — test whether a family report is genetically possible
  // -------------------------------------------------------------------------

  register("advanced", "xl5-family-consistency", "testing family consistency", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        report: `${female(A, A)} mother × ${male(a)} father; a daughter with ${l.recessiveTrait}.`,
        correct: "Inconsistent",
        explanation: `Every daughter is ${female(A, a)} and shows ${l.dominantTrait}.`
      },
      {
        report: `${female(A, a)} mother × ${male(A)} father; a son with ${l.recessiveTrait}.`,
        correct: "Consistent",
        explanation: `The mother can contribute ${x(a)} and the father contributes Y, producing ${male(a)}.`
      },
      {
        report: `${female(a, a)} mother × ${male(A)} father; a daughter with ${l.recessiveTrait}.`,
        correct: "Inconsistent",
        explanation: `Every daughter receives paternal ${x(A)} and is ${female(A, a)} with ${l.dominantTrait}.`
      },
      {
        report: `${female(A, a)} mother × ${male(a)} father; a daughter with ${l.recessiveTrait}.`,
        correct: "Consistent",
        explanation: `The father supplies ${x(a)}, and the mother can also supply ${x(a)}, producing ${female(a, a)}.`
      },
      {
        report: `${female(a, a)} mother × ${male(a)} father; a son with ${l.dominantTrait}.`,
        correct: "Inconsistent",
        explanation: `Every son receives ${x(a)} from the mother and must show ${l.recessiveTrait}.`
      },
      {
        report: `${female(A, A)} mother × ${male(a)} father; a heterozygous daughter.`,
        correct: "Consistent",
        explanation: `Every daughter receives ${x(A)} from the mother and ${x(a)} from the father, making ${female(A, a)}.`
      },
      {
        report: `${female(A, a)} mother × ${male(A)} father; a recessive daughter.`,
        correct: "Inconsistent",
        explanation: `Every daughter receives paternal ${x(A)}, so none can be ${female(a, a)}.`
      },
      {
        report: `${female(A, a)} mother × ${male(a)} father; a dominant son.`,
        correct: "Consistent",
        explanation: `The mother can contribute ${x(A)} and the father contributes Y, producing ${male(A)}.`
      },
      {
        report: `${female(a, a)} mother × ${male(A)} father; a recessive son and a dominant daughter.`,
        correct: "Consistent",
        explanation: `Sons are ${male(a)}, while daughters are ${female(A, a)}. Both observations are expected.`
      }
    ];

    const item = pick(scenarios);
    const correct = item.correct;
    const options = [
      "Consistent",
      "Inconsistent",
      "Impossible to evaluate because the child's sex is irrelevant",
      "Possible only if the Y chromosome carries the alternate allele"
    ];

    return q(
      "xl5-family-consistency",
      "xlinked",
      "advanced",
      `${ruleText(l)} Family report: ${item.report}`,
      "Is this report genetically consistent with the stated parental genotypes?",
      shuffle(options),
      correct,
      "Write the possible eggs and sperm, then check whether the reported child appears among the possible combinations.",
      `${item.explanation} Therefore, the report is ${correct.toLowerCase()} with standard X-linked inheritance.`
    );
  });
}
