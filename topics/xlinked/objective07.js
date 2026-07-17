/**
 * X-linked Inheritance — Objective 07
 *
 * Learning objective:
 * Infer parental genotypes and inheritance patterns from offspring data in
 * X-linked recessive crosses.
 *
 * Generator families:
 *   1. Infer a missing parental genotype from offspring classes.
 *   2. Diagnose whether an offspring pattern is compatible with X linkage.
 *   3. Use sons and daughters separately to identify the informative parent.
 *   4. Evaluate explanations based on pedigree-style family evidence.
 *
 * The module emphasizes reasoning from evidence rather than forward prediction.
 */

export function registerObjective07(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE = "inferring X-linked crosses from offspring evidence";
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

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked recessive. ` +
    `${x(locus.dominantAllele)} produces ${locus.dominantTrait}; ` +
    `${x(locus.recessiveAllele)} produces ${locus.recessiveTrait} when no dominant allele is present.`;

  const optionSet = (correct, distractors) =>
    shuffle([
      correct,
      ...shuffle(distractors.filter((d) => d !== correct)).slice(0, 3)
    ]);

  // -------------------------------------------------------------------------
  // BEGINNER — infer a missing parental genotype from a decisive clue
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl7-infer-missing-parent",
    "inferring a missing parental genotype",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          stem:
            `The father is ${male(A)}. The couple has at least one son showing ${l.recessiveTrait}. ` +
            `Which maternal genotype is consistent with that result?`,
          correct: female(A, a),
          distractors: [female(A, A), male(a), male(A)],
          hint:
            `A son receives Y from his father and his only X chromosome from his mother.`,
          explanation:
            `The recessive son must have received ${x(a)} from his mother. A mother with ${female(A, a)} can transmit ${x(a)}, whereas ${female(A, A)} cannot.`
        },
        {
          stem:
            `The mother is ${female(A, A)}. Every daughter is heterozygous. Which paternal genotype is required?`,
          correct: male(a),
          distractors: [male(A), female(A, a), female(a, a)],
          hint:
            `Every daughter receives her father's X chromosome.`,
          explanation:
            `The mother always contributes ${x(A)}. For every daughter to be ${female(A, a)}, the father must contribute ${x(a)}, so he is ${male(a)}.`
        },
        {
          stem:
            `The father is ${male(a)}. A daughter showing ${l.recessiveTrait} is produced. Which maternal genotype could produce that daughter?`,
          correct: female(A, a),
          distractors: [female(A, A), male(a), male(A)],
          hint:
            `A recessive daughter must receive ${x(a)} from both parents.`,
          explanation:
            `The father supplies ${x(a)} to every daughter. The mother must also be able to supply ${x(a)}. A heterozygous mother can do so.`
        },
        {
          stem:
            `The mother shows ${l.recessiveTrait}, and every son also shows ${l.recessiveTrait}. Which maternal genotype explains the pattern?`,
          correct: female(a, a),
          distractors: [female(A, a), female(A, A), male(a)],
          hint:
            `All sons receive their only X chromosome from their mother.`,
          explanation:
            `A recessive female must be ${female(a, a)}. Because every egg carries ${x(a)}, every son receives ${x(a)} and shows the recessive phenotype.`
        },
        {
          stem:
            `The father shows ${l.recessiveTrait}, but no sons inherit the allele from him. Which genotype represents the father?`,
          correct: male(a),
          distractors: [female(a, a), female(A, a), male(A)],
          hint:
            `A father gives Y, not X, to his sons.`,
          explanation:
            `An affected male is ${male(a)}. His sons receive Y from him, so his X-linked allele is not transmitted father-to-son.`
        },
        {
          stem:
            `A mother showing ${l.dominantTrait} has both recessive and dominant sons. Which maternal genotype is most likely?`,
          correct: female(A, a),
          distractors: [female(A, A), female(a, a), male(A)],
          hint:
            `Different son phenotypes require two different maternal X chromosomes.`,
          explanation:
            `Sons obtain their X chromosome from the mother. Producing both ${male(A)} and ${male(a)} sons requires a heterozygous mother, ${female(A, a)}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl7-infer-missing-parent",
        "xlinked",
        "beginner",
        ruleText(l),
        item.stem,
        optionSet(item.correct, item.distractors),
        item.correct,
        item.hint,
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — judge whether an offspring pattern is compatible
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl7-compatible-pattern",
    "testing compatibility with X-linked inheritance",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          cross: `${female(A, a)} mother × ${male(A)} father`,
          pattern: `half the sons show ${l.recessiveTrait}, while no daughters show ${l.recessiveTrait}`,
          correct: "Compatible",
          explanation:
            `Half the sons can receive maternal ${x(a)}. Every daughter receives paternal ${x(A)}, so no daughter is recessive.`
        },
        {
          cross: `${female(A, A)} mother × ${male(a)} father`,
          pattern: `all daughters are heterozygous and all sons show ${l.dominantTrait}`,
          correct: "Compatible",
          explanation:
            `Every daughter receives paternal ${x(a)} and maternal ${x(A)}. Every son receives maternal ${x(A)}.`
        },
        {
          cross: `${female(a, a)} mother × ${male(A)} father`,
          pattern: `all daughters show ${l.dominantTrait} and all sons show ${l.recessiveTrait}`,
          correct: "Compatible",
          explanation:
            `Daughters are ${female(A, a)} and therefore dominant. Sons are ${male(a)} and therefore recessive.`
        },
        {
          cross: `${female(A, A)} mother × ${male(a)} father`,
          pattern: `some sons show ${l.recessiveTrait}`,
          correct: "Not compatible",
          explanation:
            `Sons receive their X chromosome from the mother. A ${female(A, A)} mother cannot produce ${male(a)} sons.`
        },
        {
          cross: `${female(A, a)} mother × ${male(A)} father`,
          pattern: `a daughter shows ${l.recessiveTrait}`,
          correct: "Not compatible",
          explanation:
            `Every daughter receives paternal ${x(A)}, so no daughter can be homozygous recessive.`
        },
        {
          cross: `${female(a, a)} mother × ${male(a)} father`,
          pattern: `some daughters show ${l.dominantTrait}`,
          correct: "Not compatible",
          explanation:
            `Both parents can contribute only ${x(a)} to daughters, so every daughter is ${female(a, a)}.`
        },
        {
          cross: `${female(A, a)} mother × ${male(a)} father`,
          pattern: `both recessive and dominant daughters are produced`,
          correct: "Compatible",
          explanation:
            `All daughters receive paternal ${x(a)}. Maternal ${x(A)} produces dominant heterozygous daughters, while maternal ${x(a)} produces recessive daughters.`
        },
        {
          cross: `${female(A, a)} mother × ${male(a)} father`,
          pattern: `all sons show ${l.dominantTrait}`,
          correct: "Not compatible",
          explanation:
            `A heterozygous mother produces both ${x(A)} and ${x(a)} eggs, so both dominant and recessive sons are expected.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl7-compatible-pattern",
        "xlinked",
        "intermediate",
        `${ruleText(l)} Cross: ${item.cross}`,
        `The observed pattern is: ${item.pattern}. Is this pattern compatible with the stated cross?`,
        shuffle(["Compatible", "Not compatible", "Only if the father passes X to sons", "Cannot be determined from sex-linked inheritance"]),
        item.correct,
        "Trace paternal X chromosomes only to daughters and maternal X chromosomes to both sons and daughters.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — determine which parent is informative from sex-specific data
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl7-informative-parent",
    "identifying the informative parent from sons and daughters",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          evidence:
            `The sons are split between ${l.dominantTrait} and ${l.recessiveTrait}.`,
          question:
            `Which parent provides the decisive information about the allele carried by the sons?`,
          correct: "The mother",
          distractors: ["The father", "Both parents equally", "Neither parent"],
          explanation:
            `Each son receives Y from his father and his only X chromosome from his mother. Variation among sons therefore reveals the mother's X alleles.`
        },
        {
          evidence:
            `Every daughter carries ${x(a)}, but the mother's genotype is ${female(A, A)}.`,
          question:
            `Which parent must be the source of ${x(a)} in every daughter?`,
          correct: "The father",
          distractors: ["The mother", "Either parent with equal probability", "The sons"],
          explanation:
            `The mother cannot contribute ${x(a)}. Every daughter receives the father's X, so the father must be ${male(a)}.`
        },
        {
          evidence:
            `A recessive daughter is observed.`,
          question:
            `What does this reveal about the parents?`,
          correct: `Both parents contributed ${x(a)}`,
          distractors: [
            `Only the father contributed ${x(a)}`,
            `Only the mother contributed ${x(a)}`,
            `The father passed Y to the daughter`
          ],
          explanation:
            `A recessive daughter is ${female(a, a)} and must receive one ${x(a)} from each parent.`
        },
        {
          evidence:
            `A recessive son is observed.`,
          question:
            `What can be concluded directly about the allele source?`,
          correct: `His ${x(a)} came from his mother`,
          distractors: [
            `His ${x(a)} came from his father`,
            `Both parents contributed ${x(a)}`,
            `His Y chromosome carried ${x(a)}`
          ],
          explanation:
            `The father contributes Y to a son. The son's X-linked allele therefore came from the mother.`
        },
        {
          evidence:
            `All daughters are heterozygous, and all sons show ${l.dominantTrait}.`,
          question:
            `Which parental combination best explains the evidence?`,
          correct: `${female(A, A)} mother and ${male(a)} father`,
          distractors: [
            `${female(A, a)} mother and ${male(A)} father`,
            `${female(a, a)} mother and ${male(A)} father`,
            `${female(A, A)} mother and ${male(A)} father`
          ],
          explanation:
            `The father's ${x(a)} enters every daughter, while the mother's ${x(A)} enters every child.`
        },
        {
          evidence:
            `All sons show ${l.recessiveTrait}, but all daughters show ${l.dominantTrait}.`,
          question:
            `Which cross is most consistent with the pattern?`,
          correct: `${female(a, a)} mother × ${male(A)} father`,
          distractors: [
            `${female(A, A)} mother × ${male(a)} father`,
            `${female(A, a)} mother × ${male(a)} father`,
            `${female(a, a)} mother × ${male(a)} father`
          ],
          explanation:
            `The mother gives ${x(a)} to every child. Sons express it immediately, while daughters receive paternal ${x(A)} and are heterozygous dominant.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl7-informative-parent",
        "xlinked",
        "advanced",
        ruleText(l),
        `${item.evidence} ${item.question}`,
        optionSet(item.correct, item.distractors),
        item.correct,
        "Separate the paths of inheritance: fathers give X to daughters and Y to sons; mothers give one X to every child.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate pedigree-style reasoning
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl7-family-evidence-reasoning",
    "evaluating pedigree-style explanations",
    () => {
      const l = pick(loci);
      const A = l.dominantAllele;
      const a = l.recessiveAllele;

      const scenarios = [
        {
          family:
            `A father shows ${l.recessiveTrait}. The mother is homozygous dominant. All daughters show ${l.dominantTrait}, and all sons show ${l.dominantTrait}.`,
          statement:
            `A student concludes: "The father passed the recessive allele to all daughters but to none of the sons."`,
          correct: "The conclusion is correct.",
          distractors: [
            "The conclusion is incorrect because fathers pass X to sons.",
            "The conclusion is incorrect because all daughters must be recessive.",
            "The conclusion is incorrect because the mother supplies Y to sons."
          ],
          explanation:
            `The father is ${male(a)} and gives ${x(a)} to every daughter, making them ${female(A, a)}. He gives Y to every son.`
        },
        {
          family:
            `A mother shows ${l.dominantTrait} but has both dominant and recessive sons. The father shows ${l.dominantTrait}.`,
          statement:
            `A student concludes: "The mother must be heterozygous."`,
          correct: "The conclusion is correct.",
          distractors: [
            "The conclusion is incorrect because sons inherit X from the father.",
            "The conclusion is incorrect because the mother must be homozygous recessive.",
            "The conclusion is impossible because males cannot show the recessive phenotype."
          ],
          explanation:
            `Producing both ${male(A)} and ${male(a)} sons requires the mother to produce both ${x(A)} and ${x(a)} eggs.`
        },
        {
          family:
            `A recessive daughter is born to a dominant father.`,
          statement:
            `A student concludes: "This is compatible with simple X-linked recessive inheritance."`,
          correct: "The conclusion is incorrect.",
          distractors: [
            "The conclusion is correct because the father passes Y to daughters.",
            "The conclusion is correct because daughters inherit only the maternal X.",
            "The conclusion is correct if the mother is homozygous dominant."
          ],
          explanation:
            `A dominant father is ${male(A)} and gives ${x(A)} to every daughter. A daughter therefore cannot be ${female(a, a)} under the stated assumptions.`
        },
        {
          family:
            `A recessive father and a heterozygous mother have children of both sexes and both phenotypes.`,
          statement:
            `A student concludes: "Both recessive and dominant daughters are possible."`,
          correct: "The conclusion is correct.",
          distractors: [
            "The conclusion is incorrect because all daughters receive Y from the father.",
            "The conclusion is incorrect because all daughters must be recessive.",
            "The conclusion is incorrect because heterozygous females make only one egg type."
          ],
          explanation:
            `The father gives ${x(a)} to every daughter. Maternal ${x(A)} produces ${female(A, a)} daughters, while maternal ${x(a)} produces ${female(a, a)} daughters.`
        },
        {
          family:
            `A homozygous recessive mother and a dominant father have children.`,
          statement:
            `A student concludes: "Every son is recessive, but every daughter is heterozygous dominant."`,
          correct: "The conclusion is correct.",
          distractors: [
            "The conclusion is incorrect because sons receive the father's X.",
            "The conclusion is incorrect because daughters receive Y from the father.",
            "The conclusion is incorrect because the mother's recessive allele cannot enter sons."
          ],
          explanation:
            `Every child receives maternal ${x(a)}. Sons pair it with paternal Y; daughters pair it with paternal ${x(A)}.`
        },
        {
          family:
            `A homozygous dominant mother and recessive father have children.`,
          statement:
            `A student concludes: "Half of the sons should be recessive because the father is recessive."`,
          correct: "The conclusion is incorrect.",
          distractors: [
            "The conclusion is correct because fathers pass X to sons.",
            "The conclusion is correct because Y carries the recessive allele.",
            "The conclusion is incorrect because all daughters must be recessive."
          ],
          explanation:
            `Sons receive Y from the father and ${x(A)} from the mother. None of the sons receives the father's recessive X.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl7-family-evidence-reasoning",
        "xlinked",
        "advanced",
        `${ruleText(l)} Family evidence: ${item.family}`,
        `${item.statement} What is the best evaluation?`,
        optionSet(item.correct, item.distractors),
        item.correct,
        "Track the father's X only into daughters and the mother's X into every child before judging the statement.",
        item.explanation
      );
    }
  );
}
