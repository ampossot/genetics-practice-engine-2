/**
 * X-linked Inheritance — Objective 03
 *
 * Learning objective:
 * Predict offspring sex, genotype, and phenotype from X-linked crosses by
 * combining maternal X-bearing eggs with paternal X- or Y-bearing sperm.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family targets a distinct reasoning task.
 */

export function registerObjective03(ctx) {
  const { add, q, pick, shuffle } = ctx;
  const chooseOptions = ctx.chooseOptions || ((correct, candidates) =>
    shuffle([
      correct,
      ...shuffle(candidates.filter((value) => value !== correct)).slice(0, 3)
    ])
  );

  const OBJECTIVE =
    "predicting offspring outcomes from X-linked crosses";

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

  const offspringFrom = (egg, sperm) => {
    if (sperm === "Y") return `${egg}/Y`;
    return `${egg}/${sperm}`;
  };

  const phenotypeOf = (genotype, locus) => {
    const recessiveX = x(locus.recessiveAllele);
    const isMale = genotype.endsWith("/Y");
    const recessive = isMale
      ? genotype.startsWith(recessiveX)
      : genotype === `${recessiveX}/${recessiveX}`;

    return recessive ? locus.recessiveTrait : locus.dominantTrait;
  };

  const sexOf = (genotype) => genotype.endsWith("/Y") ? "male" : "female";

  // -------------------------------------------------------------------------
  // BEGINNER — combine one egg and one sperm
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl3-combine-gametes",
    "gamete combination",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        { egg: x(A), sperm: "Y" },
        { egg: x(a), sperm: "Y" },
        { egg: x(A), sperm: x(A) },
        { egg: x(a), sperm: x(A) },
        { egg: x(A), sperm: x(a) },
        { egg: x(a), sperm: x(a) }
      ];

      const item = pick(scenarios);
      const correct = offspringFrom(item.egg, item.sperm);
      const distractors = [
        `${item.egg}/${item.egg}`,
        item.sperm === "Y" ? `${x(A)}/${x(a)}` : `${item.sperm}/Y`,
        `${item.egg}${item.sperm}`
      ];

      return q(
        "xl3-combine-gametes",
        "xlinked",
        "beginner",
        `${ruleText(locus)} An egg carrying ${item.egg} is fertilized by a sperm carrying ${item.sperm}.`,
        "What is the offspring genotype?",
        shuffle([
          correct,
          ...shuffle(distractors.filter((value) => value !== correct)).slice(0, 3)
        ]),
        correct,
        "Place the maternal sex chromosome and paternal sex chromosome together. A Y-bearing sperm produces a son.",
        `The egg contributes ${item.egg}, and the sperm contributes ${item.sperm}, giving ${correct}. This offspring is ${sexOf(correct)} and has ${phenotypeOf(correct, locus)}.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — identify the paternal chromosome that determines sex
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl3-sex-chromosome-source",
    "sex-chromosome source reasoning",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          offspring: male(a),
          correct: `The father contributed Y, and the mother contributed ${x(a)}`,
          distractors: [
            `The father contributed ${x(a)}, and the mother contributed Y`,
            `The father contributed both ${x(a)} and Y`,
            `The mother contributed both sex chromosomes`
          ],
          explanation: `A son receives Y from his father and his only X chromosome, ${x(a)}, from his mother.`
        },
        {
          offspring: female(A, a),
          correct: "The father contributed one X chromosome and the mother contributed the other X chromosome",
          distractors: [
            "The father contributed Y and the mother contributed both X chromosomes",
            "The mother contributed Y and the father contributed both X chromosomes",
            "Both X chromosomes must have come from the mother"
          ],
          explanation: "A daughter receives one X chromosome from each parent."
        },
        {
          offspring: male(A),
          correct: `The father contributed Y, and the mother contributed ${x(A)}`,
          distractors: [
            `The father contributed ${x(A)}, and the mother contributed Y`,
            `The father contributed both ${x(A)} and Y`,
            `The mother contributed Y, and the father contributed ${x(A)}`
          ],
          explanation: `Every son receives Y from his father and his X chromosome from his mother.`
        },
        {
          offspring: female(a, a),
          correct: `The father contributed ${x(a)}, and the mother contributed ${x(a)}`,
          distractors: [
            `The father contributed Y, and the mother contributed two copies of ${x(a)}`,
            `Only the mother had to carry ${x(a)}`,
            `Both copies of ${x(a)} came from the father`
          ],
          explanation: `A daughter receives one X chromosome from each parent, so both parents contributed ${x(a)}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl3-sex-chromosome-source",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} An offspring has genotype ${item.offspring}.`,
        "Which statement correctly identifies the parental contributions?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "A mother contributes an X chromosome to every offspring. A father contributes X to daughters and Y to sons.",
        `${item.explanation} This transmission rule is central to interpreting X-linked inheritance.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — predict a specified offspring class from a complete cross
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl3-offspring-class-probability",
    "offspring-class probability",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          mother: female(A, a),
          father: male(A),
          target: `a son with ${locus.recessiveTrait}`,
          probability: "1/4",
          explanation: `The mother transmits ${x(a)} with probability 1/2, and the father transmits Y with probability 1/2. Multiplying gives 1/4.`
        },
        {
          mother: female(A, a),
          father: male(a),
          target: `a daughter with ${locus.recessiveTrait}`,
          probability: "1/4",
          explanation: `A recessive daughter must receive ${x(a)} from both parents. The father always gives ${x(a)} to daughters, while the mother gives ${x(a)} half the time; daughters are half of all offspring, so the overall probability is 1/4.`
        },
        {
          mother: female(a, a),
          father: male(A),
          target: `a son with ${locus.recessiveTrait}`,
          probability: "1/2",
          explanation: `All sons receive ${x(a)} from the mother and Y from the father. Because half the offspring are expected to be sons, the overall probability is 1/2.`
        },
        {
          mother: female(A, A),
          father: male(a),
          target: `an offspring with ${locus.recessiveTrait}`,
          probability: "0",
          explanation: `The mother can transmit only ${x(A)}. Therefore, every offspring receives at least one dominant allele.`
        },
        {
          mother: female(A, a),
          father: male(a),
          target: `a daughter carrying both ${A} and ${a}`,
          probability: "1/4",
          explanation: `The father gives ${x(a)} to every daughter. The mother gives ${x(A)} half the time, and half the offspring are daughters, giving 1/2 × 1/2 = 1/4.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl3-offspring-class-probability",
        "xlinked",
        "advanced",
        `${ruleText(locus)} Consider the cross ${item.mother} × ${item.father}. Assume equal production and fertilization of the possible gametes.`,
        `What is the probability of producing ${item.target}?`,
        chooseOptions(item.probability, ["0", "1/4", "1/2", "3/4", "1"]),
        item.probability,
        "List the maternal egg types and paternal sperm types, then count the combinations matching both the required sex and phenotype or genotype.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate reasoning about an X-linked cross
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl3-evaluate-cross-reasoning",
    "reasoning evaluation",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          cross: `${female(A, a)} × ${male(A)}`,
          claim: `“A son with ${locus.recessiveTrait} must have inherited ${x(a)} from his father.”`,
          correct: `Incorrect; a son inherits Y from his father and ${x(a)} from his mother`,
          distractors: [
            "Correct; fathers transmit their X-linked alleles to sons",
            `Incorrect; sons inherit both ${x(a)} and Y from their mother`,
            `Correct; the father determines both the son's sex and X-linked phenotype`
          ],
          explanation: "The father determines that the offspring is male by contributing Y, but the son's X-linked allele comes from the mother."
        },
        {
          cross: `${female(A, A)} × ${male(a)}`,
          claim: `“All daughters will have ${locus.recessiveTrait} because their father has it.”`,
          correct: `Incorrect; every daughter receives ${x(A)} from the mother and will show ${locus.dominantTrait}`,
          distractors: [
            "Correct; daughters always copy their father's X-linked phenotype",
            `Incorrect; daughters receive Y from their father`,
            `Correct; ${x(a)} is always dominant in daughters`
          ],
          explanation: `Every daughter is ${female(A, a)} and has the dominant phenotype, although she carries ${a}.`
        },
        {
          cross: `${female(a, a)} × ${male(A)}`,
          claim: `“All sons will have ${locus.recessiveTrait}.”`,
          correct: `Correct; every son receives ${x(a)} from the mother and Y from the father`,
          distractors: [
            `Incorrect; sons receive ${x(A)} from their father`,
            `Incorrect; only daughters inherit an X chromosome from their mother`,
            `Correct; the father transmits ${x(a)} to every son`
          ],
          explanation: `The mother can produce only ${x(a)} eggs, so every son is ${male(a)}.`
        },
        {
          cross: `${female(A, a)} × ${male(a)}`,
          claim: `“A daughter with ${locus.recessiveTrait} is possible only if the mother contributes ${x(a)}.”`,
          correct: `Correct; the father gives ${x(a)} to every daughter, and an affected daughter also requires ${x(a)} from the mother`,
          distractors: [
            `Incorrect; the father gives Y to daughters`,
            `Incorrect; one ${x(a)} allele is always sufficient in females`,
            `Correct; the mother alone supplies both X chromosomes`
          ],
          explanation: `A recessive daughter must be ${female(a, a)}, requiring one ${x(a)} from each parent.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl3-evaluate-cross-reasoning",
        "xlinked",
        "advanced",
        `${ruleText(locus)} For the cross ${item.cross}, a student states: ${item.claim}`,
        "What is the best evaluation of the student's reasoning?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Track the chromosome contributed by each parent separately: mothers always contribute X; fathers contribute X to daughters and Y to sons.",
        item.explanation
      );
    }
  );
}
