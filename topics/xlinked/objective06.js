/**
 * X-linked Inheritance — Objective 06
 *
 * Learning objective:
 * Calculate and interpret sex-specific, unconditional, conditional, and
 * repeated-offspring probabilities for X-linked recessive inheritance.
 *
 * Design:
 * Four generator families emphasize distinct reasoning:
 *   1. Separate sex-specific probability from probability among all offspring.
 *   2. Calculate a named child category from parental genotypes.
 *   3. Apply conditional probability after a child's sex is specified.
 *   4. Reason about repeated independent births and family-level probability.
 *
 * Variation comes from multiple organisms, loci, parental crosses, requested
 * offspring categories, probability forms, and misconception-focused distractors.
 */

export function registerObjective06(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE = "calculating probabilities in X-linked crosses";
  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

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
    },
    {
      organism: "moths",
      gene: "antenna shape",
      dominantTrait: "straight antennae",
      recessiveTrait: "curved antennae",
      dominantAllele: "S",
      recessiveAllele: "s"
    },
    {
      organism: "fish",
      gene: "fin pigmentation",
      dominantTrait: "pigmented fins",
      recessiveTrait: "pale fins",
      dominantAllele: "F",
      recessiveAllele: "f"
    },
    {
      organism: "crickets",
      gene: "body marking",
      dominantTrait: "striped body",
      recessiveTrait: "unstriped body",
      dominantAllele: "R",
      recessiveAllele: "r"
    }
  ];

  const x = (allele) => `X${allele}`;
  const female = (first, second) => `${x(first)}/${x(second)}`;
  const male = (allele) => `${x(allele)}/Y`;

  const percent = (value) => `${Math.round(value * 100)}%`;
  const fraction = (numerator, denominator) => `${numerator}/${denominator}`;
  const unique = (values) => [...new Set(values)];

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked recessive. ` +
    `${x(locus.dominantAllele)} produces ${locus.dominantTrait}; ` +
    `${x(locus.recessiveAllele)} produces ${locus.recessiveTrait} when no dominant allele is present. ` +
    `Assume females and males are equally likely.`;

  const crossesFor = (locus) => {
    const A = locus.dominantAllele;
    const a = locus.recessiveAllele;

    return [
      {
        label: `${female(A, A)} mother × ${male(A)} father`,
        mother: [A, A],
        fatherX: A
      },
      {
        label: `${female(A, A)} mother × ${male(a)} father`,
        mother: [A, A],
        fatherX: a
      },
      {
        label: `${female(A, a)} mother × ${male(A)} father`,
        mother: [A, a],
        fatherX: A
      },
      {
        label: `${female(A, a)} mother × ${male(a)} father`,
        mother: [A, a],
        fatherX: a
      },
      {
        label: `${female(a, a)} mother × ${male(A)} father`,
        mother: [a, a],
        fatherX: A
      },
      {
        label: `${female(a, a)} mother × ${male(a)} father`,
        mother: [a, a],
        fatherX: a
      }
    ];
  };

  const outcomesFor = (cross, locus) => {
    const A = locus.dominantAllele;
    const a = locus.recessiveAllele;
    const eggs = cross.mother;
    const outcomes = [];

    for (const egg of eggs) {
      const daughterAlleles = [egg, cross.fatherX];
      const daughterRecessive = daughterAlleles.every((allele) => allele === a);
      const daughterCarrier =
        daughterAlleles.includes(A) && daughterAlleles.includes(a);

      outcomes.push({
        sex: "daughter",
        genotype: female(egg, cross.fatherX),
        phenotype: daughterRecessive
          ? locus.recessiveTrait
          : locus.dominantTrait,
        recessive: daughterRecessive,
        dominant: !daughterRecessive,
        carrier: daughterCarrier,
        probability: 0.25
      });

      outcomes.push({
        sex: "son",
        genotype: male(egg),
        phenotype: egg === a
          ? locus.recessiveTrait
          : locus.dominantTrait,
        recessive: egg === a,
        dominant: egg === A,
        carrier: false,
        probability: 0.25
      });
    }

    return outcomes;
  };

  const probabilityOf = (outcomes, predicate) =>
    outcomes.filter(predicate).reduce((sum, item) => sum + item.probability, 0);

  const amongSex = (outcomes, sex, predicate) => {
    const sexOutcomes = outcomes.filter((item) => item.sex === sex);
    const matching = sexOutcomes.filter(predicate).length;
    return matching / sexOutcomes.length;
  };

  const probabilityOptions = (correct) => {
    const standard = ["0%", "25%", "50%", "75%", "100%"];
    return shuffle([
      correct,
      ...shuffle(standard.filter((value) => value !== correct)).slice(0, 3)
    ]);
  };

  // -------------------------------------------------------------------------
  // BEGINNER — distinguish “among sons/daughters” from “among all offspring”
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl6-sex-specific-versus-overall",
    "distinguishing sex-specific and overall probability",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          cross: `${female(A, a)} mother × ${male(A)} father`,
          prompt: `What is the probability that a son will show ${l.recessiveTrait}?`,
          correct: "50%",
          explanation:
            `Among sons, the father always contributes Y. The heterozygous mother contributes ${x(A)} or ${x(a)} with equal probability, so half of the sons are ${male(a)}.`
        },
        {
          cross: `${female(A, a)} mother × ${male(A)} father`,
          prompt: `What is the probability that a randomly selected child will be a son showing ${l.recessiveTrait}?`,
          correct: "25%",
          explanation:
            `The child must first be a son (1/2) and then receive ${x(a)} from the mother (1/2). Multiplying gives 1/2 × 1/2 = 1/4.`
        },
        {
          cross: `${female(A, a)} mother × ${male(a)} father`,
          prompt: `What is the probability that a daughter will show ${l.recessiveTrait}?`,
          correct: "50%",
          explanation:
            `Every daughter receives paternal ${x(a)}. Half receive maternal ${x(a)}, so half of the daughters are ${female(a, a)}.`
        },
        {
          cross: `${female(A, a)} mother × ${male(a)} father`,
          prompt: `What is the probability that a randomly selected child will be a daughter showing ${l.recessiveTrait}?`,
          correct: "25%",
          explanation:
            `The child must be a daughter (1/2) and receive maternal ${x(a)} (1/2), giving 1/4 overall.`
        },
        {
          cross: `${female(a, a)} mother × ${male(A)} father`,
          prompt: `What is the probability that a son will show ${l.recessiveTrait}?`,
          correct: "100%",
          explanation:
            `Every son receives Y from his father and ${x(a)} from his mother, so every son is ${male(a)}.`
        },
        {
          cross: `${female(a, a)} mother × ${male(A)} father`,
          prompt: `What is the probability that a randomly selected child will be a son showing ${l.recessiveTrait}?`,
          correct: "50%",
          explanation:
            `All sons are recessive, but only half of all children are expected to be sons.`
        },
        {
          cross: `${female(A, A)} mother × ${male(a)} father`,
          prompt: `What is the probability that a daughter will be heterozygous?`,
          correct: "100%",
          explanation:
            `Every daughter receives ${x(a)} from the father and ${x(A)} from the mother, so every daughter is ${female(A, a)}.`
        },
        {
          cross: `${female(A, A)} mother × ${male(a)} father`,
          prompt: `What is the probability that a randomly selected child will be a heterozygous daughter?`,
          correct: "50%",
          explanation:
            `Every daughter is heterozygous, but daughters represent one-half of all offspring.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl6-sex-specific-versus-overall",
        "xlinked",
        "beginner",
        `${ruleText(l)} Cross: ${item.cross}`,
        item.prompt,
        probabilityOptions(item.correct),
        item.correct,
        `Watch the denominator. “A son” means calculate within sons; “a randomly selected child who is a son” includes the 1/2 probability of being male.`,
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — calculate the probability of a named offspring category
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl6-named-offspring-category",
    "calculating a named offspring probability",
    () => {
      const l = pick(loci);
      const crosses = crossesFor(l);
      const cross = pick(crosses);
      const outcomes = outcomesFor(cross, l);

      const categories = [
        {
          label: `a daughter showing ${l.recessiveTrait}`,
          predicate: (o) => o.sex === "daughter" && o.recessive
        },
        {
          label: `a daughter showing ${l.dominantTrait}`,
          predicate: (o) => o.sex === "daughter" && o.dominant
        },
        {
          label: `a heterozygous daughter`,
          predicate: (o) => o.sex === "daughter" && o.carrier
        },
        {
          label: `a son showing ${l.recessiveTrait}`,
          predicate: (o) => o.sex === "son" && o.recessive
        },
        {
          label: `a son showing ${l.dominantTrait}`,
          predicate: (o) => o.sex === "son" && o.dominant
        },
        {
          label: `any child showing ${l.recessiveTrait}`,
          predicate: (o) => o.recessive
        },
        {
          label: `any child showing ${l.dominantTrait}`,
          predicate: (o) => o.dominant
        }
      ];

      const category = pick(categories);
      const probability = probabilityOf(outcomes, category.predicate);
      const correct = percent(probability);

      const matchingDescriptions = unique(
        outcomes
          .filter(category.predicate)
          .map((o) => `${o.sex} ${o.genotype}`)
      );

      const explanation =
        probability === 0
          ? `None of the four equally likely fertilization outcomes matches ${category.label}.`
          : `${matchingDescriptions.join(" and ")} ${
              matchingDescriptions.length === 1 ? "matches" : "match"
            } the requested category. The matching outcomes account for ${correct} of all offspring.`;

      return q(
        "xl6-named-offspring-category",
        "xlinked",
        "intermediate",
        `${ruleText(l)} Cross: ${cross.label}`,
        `What is the probability that a randomly selected offspring will be ${category.label}?`,
        probabilityOptions(correct),
        correct,
        "List the two possible maternal X chromosomes and the paternal X or Y chromosome. Count only outcomes matching both the sex and phenotype/genotype requested.",
        explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — conditional probability after sex is known
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl6-conditional-on-sex",
    "applying conditional probability after sex is specified",
    () => {
      const l = pick(loci);
      const crosses = crossesFor(l);
      const cross = pick(crosses);
      const outcomes = outcomesFor(cross, l);

      const conditions = [
        {
          sex: "daughter",
          label: `show ${l.recessiveTrait}`,
          predicate: (o) => o.recessive
        },
        {
          sex: "daughter",
          label: `show ${l.dominantTrait}`,
          predicate: (o) => o.dominant
        },
        {
          sex: "daughter",
          label: "be heterozygous",
          predicate: (o) => o.carrier
        },
        {
          sex: "son",
          label: `show ${l.recessiveTrait}`,
          predicate: (o) => o.recessive
        },
        {
          sex: "son",
          label: `show ${l.dominantTrait}`,
          predicate: (o) => o.dominant
        }
      ];

      const condition = pick(conditions);
      const conditionalProbability = amongSex(
        outcomes,
        condition.sex,
        condition.predicate
      );
      const overallProbability = probabilityOf(
        outcomes,
        (o) => o.sex === condition.sex && condition.predicate(o)
      );

      const correct = percent(conditionalProbability);
      const overall = percent(overallProbability);
      const sexPlural = condition.sex === "daughter" ? "daughters" : "sons";

      return q(
        "xl6-conditional-on-sex",
        "xlinked",
        "advanced",
        `${ruleText(l)} Cross: ${cross.label} One offspring is known to be a ${condition.sex}.`,
        `Given that information, what is the probability that this ${condition.sex} will ${condition.label}?`,
        probabilityOptions(correct),
        correct,
        `Because sex is already known, restrict the sample space to ${sexPlural}. Do not multiply by 1/2 again.`,
        `Among ${sexPlural}, ${correct} satisfy the requested condition. The corresponding probability among all offspring would be ${overall}, but that is not the requested conditional probability.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — repeated births and family-level probability
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl6-repeated-offspring",
    "reasoning about repeated independent offspring",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          cross: `${female(A, a)} mother × ${male(A)} father`,
          event: `a child who is a son showing ${l.recessiveTrait}`,
          singleP: 0.25
        },
        {
          cross: `${female(A, a)} mother × ${male(a)} father`,
          event: `a child who is a daughter showing ${l.recessiveTrait}`,
          singleP: 0.25
        },
        {
          cross: `${female(a, a)} mother × ${male(A)} father`,
          event: `a child who is a son showing ${l.recessiveTrait}`,
          singleP: 0.5
        },
        {
          cross: `${female(A, A)} mother × ${male(a)} father`,
          event: "a heterozygous daughter",
          singleP: 0.5
        },
        {
          cross: `${female(A, a)} mother × ${male(A)} father`,
          event: `a child showing ${l.recessiveTrait}`,
          singleP: 0.25
        },
        {
          cross: `${female(A, a)} mother × ${male(a)} father`,
          event: `a child showing ${l.recessiveTrait}`,
          singleP: 0.5
        }
      ];

      const s = pick(scenarios);
      const familyTasks = [
        {
          stem: `What is the probability that the next two offspring will both be ${s.event}?`,
          probability: s.singleP ** 2,
          method: `Multiply the independent probabilities: ${percent(s.singleP)} × ${percent(s.singleP)}.`
        },
        {
          stem: `What is the probability that neither of the next two offspring will be ${s.event}?`,
          probability: (1 - s.singleP) ** 2,
          method: `The probability of not obtaining the event in one birth is ${percent(1 - s.singleP)}. Multiply that probability for two independent births.`
        },
        {
          stem: `What is the probability that at least one of the next two offspring will be ${s.event}?`,
          probability: 1 - (1 - s.singleP) ** 2,
          method: `Use the complement: 1 − P(neither). Here, P(neither) = ${percent(1 - s.singleP)} × ${percent(1 - s.singleP)}.`
        },
        {
          stem: `The first offspring was not ${s.event}. What is the probability that the next offspring will be ${s.event}?`,
          probability: s.singleP,
          method: "Births are independent, so the first outcome does not alter the probability for the next offspring."
        }
      ];

      const task = pick(familyTasks);
      const exactPercent = task.probability * 100;
      const correct =
        Number.isInteger(exactPercent)
          ? `${exactPercent}%`
          : `${exactPercent.toFixed(2)}%`;

      const candidateValues = unique([
        correct,
        percent(s.singleP),
        percent(1 - s.singleP),
        `${Math.round((s.singleP ** 2) * 100)}%`,
        `${Math.round((1 - (1 - s.singleP) ** 2) * 100)}%`,
        `${Math.round(((1 - s.singleP) ** 2) * 100)}%`,
        "100%"
      ]).filter((value) => value !== correct);

      return q(
        "xl6-repeated-offspring",
        "xlinked",
        "advanced",
        `${ruleText(l)} Cross: ${s.cross} For each birth, the probability of ${s.event} is ${percent(s.singleP)}.`,
        task.stem,
        shuffle([correct, ...shuffle(candidateValues).slice(0, 3)]),
        correct,
        "Treat separate births as independent trials. For “at least one,” it is usually easiest to calculate 1 minus the probability of none.",
        `${task.method} The result is ${correct}. Previous births do not change allele segregation in later births.`
      );
    }
  );
}
