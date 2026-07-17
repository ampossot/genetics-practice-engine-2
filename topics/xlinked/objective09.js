/**
 * X-linked Inheritance — Objective 09
 *
 * Learning objective:
 * Distinguish X-linked dominant from X-linked recessive inheritance and predict
 * the sex-specific outcomes of X-linked dominant crosses.
 *
 * Generator families:
 *   1. Classify dominant versus recessive X-linked evidence.
 *   2. Predict offspring from X-linked dominant parental crosses.
 *   3. Interpret pedigree patterns characteristic of X-linked dominance.
 *   4. Evaluate explanations and diagnose common misconceptions.
 *
 * This module expands beyond the earlier X-linked recessive objectives while
 * preserving the same chromosome-transmission logic.
 */

export function registerObjective09(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "distinguishing and applying X-linked dominant inheritance";

  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const loci = [
    {
      organism: "humans",
      gene: "tooth enamel development",
      dominantTrait: "altered enamel development",
      recessiveTrait: "typical enamel development",
      dominantAllele: "E",
      recessiveAllele: "e"
    },
    {
      organism: "laboratory mice",
      gene: "tail morphology",
      dominantTrait: "shortened tail",
      recessiveTrait: "typical tail",
      dominantAllele: "T",
      recessiveAllele: "t"
    },
    {
      organism: "fruit flies",
      gene: "wing posture",
      dominantTrait: "raised wings",
      recessiveTrait: "normal wing posture",
      dominantAllele: "R",
      recessiveAllele: "r"
    },
    {
      organism: "beetles",
      gene: "elytra pattern",
      dominantTrait: "spotted elytra",
      recessiveTrait: "plain elytra",
      dominantAllele: "S",
      recessiveAllele: "s"
    },
    {
      organism: "fish",
      gene: "fin shape",
      dominantTrait: "curved dorsal fin",
      recessiveTrait: "straight dorsal fin",
      dominantAllele: "F",
      recessiveAllele: "f"
    },
    {
      organism: "moths",
      gene: "body banding",
      dominantTrait: "broad body bands",
      recessiveTrait: "narrow body bands",
      dominantAllele: "B",
      recessiveAllele: "b"
    },
    {
      organism: "crickets",
      gene: "antenna length",
      dominantTrait: "short antennae",
      recessiveTrait: "long antennae",
      dominantAllele: "A",
      recessiveAllele: "a"
    },
    {
      organism: "mosquitoes",
      gene: "wing pigmentation",
      dominantTrait: "dark wing pigmentation",
      recessiveTrait: "clear wings",
      dominantAllele: "D",
      recessiveAllele: "d"
    }
  ];

  const x = (allele) => `X${allele}`;
  const female = (first, second) => `${x(first)}/${x(second)}`;
  const male = (allele) => `${x(allele)}/Y`;

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked dominant. ` +
    `One copy of ${x(locus.dominantAllele)} is sufficient for ` +
    `${locus.dominantTrait}. Individuals lacking that allele show ` +
    `${locus.recessiveTrait}.`;

  const options = (correct, distractors) =>
    shuffle([correct, ...distractors.filter((item) => item !== correct)]).slice(0, 4);

  const percentOptions = (correct) =>
    shuffle(
      [correct, "0%", "25%", "50%", "75%", "100%"].filter(
        (value, index, array) => array.indexOf(value) === index
      )
    ).slice(0, 4);

  // -------------------------------------------------------------------------
  // BEGINNER — classify X-linked dominant versus recessive evidence
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl9-classify-dominance",
    "classifying X-linked dominant and recessive evidence",
    () => {
      const l = pick(loci);

      const scenarios = [
        {
          evidence:
            "An affected father and unaffected mother produce affected daughters but no affected sons.",
          correct: "Consistent with X-linked dominant inheritance",
          distractors: [
            "Consistent only with X-linked recessive inheritance",
            "Consistent with direct father-to-son X transmission",
            "Impossible for any X-linked trait"
          ],
          explanation:
            "An affected father passes his affected X chromosome to every daughter and his Y chromosome to every son. With an unaffected mother, daughters are affected and sons are unaffected."
        },
        {
          evidence:
            "Unaffected parents produce an affected son, and the mother is a carrier.",
          correct: "Consistent with X-linked recessive inheritance",
          distractors: [
            "Consistent with X-linked dominant inheritance",
            "Consistent only with Y-linked inheritance",
            "Impossible because sons inherit X from fathers"
          ],
          explanation:
            "For a dominant trait, an affected child would normally have an affected parent. An unaffected carrier mother producing an affected son is the classic recessive pattern."
        },
        {
          evidence:
            "A heterozygous affected mother and unaffected father produce affected sons and daughters in approximately equal proportions.",
          correct: "Consistent with X-linked dominant inheritance",
          distractors: [
            "Consistent only with X-linked recessive inheritance",
            "Consistent with Y-linked inheritance",
            "Impossible because daughters cannot inherit maternal X chromosomes"
          ],
          explanation:
            "A heterozygous affected mother passes the dominant allele to half of all children, regardless of sex."
        },
        {
          evidence:
            "The trait frequently skips generations through unaffected females and appears mainly in males.",
          correct: "More characteristic of X-linked recessive inheritance",
          distractors: [
            "More characteristic of X-linked dominant inheritance",
            "More characteristic of Y-linked inheritance",
            "Diagnostic of mitochondrial inheritance"
          ],
          explanation:
            "Unaffected heterozygous females can transmit a recessive allele silently, whereas an X-linked dominant allele is usually expressed in heterozygous females."
        },
        {
          evidence:
            "Every affected male has an affected mother, and affected fathers never transmit the trait to sons.",
          correct: "Compatible with either X-linked dominant or X-linked recessive inheritance",
          distractors: [
            "Diagnostic only of X-linked dominant inheritance",
            "Diagnostic only of X-linked recessive inheritance",
            "Diagnostic of autosomal inheritance"
          ],
          explanation:
            "Both X-linked dominant and X-linked recessive traits lack father-to-son transmission. Additional evidence about daughters and unaffected carriers is needed."
        },
        {
          evidence:
            "An affected father with an unaffected mother has all affected daughters.",
          correct: "Strong evidence for X-linked dominant inheritance",
          distractors: [
            "Strong evidence for X-linked recessive inheritance",
            "Strong evidence for Y-linked inheritance",
            "Evidence that fathers transmit X to sons"
          ],
          explanation:
            "For an X-linked dominant trait, one paternal affected X makes every daughter affected. Under a simple recessive model, daughters with one affected allele would usually be unaffected carriers."
        },
        {
          evidence:
            "Affected females are common, and heterozygous females express the phenotype.",
          correct: "Supports X-linked dominant inheritance",
          distractors: [
            "Supports X-linked recessive inheritance",
            "Supports strict Y linkage",
            "Rules out sex linkage"
          ],
          explanation:
            "Expression in heterozygous females is the defining feature of X-linked dominance."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl9-classify-dominance",
        "xlinked",
        "beginner",
        `A geneticist is comparing X-linked dominant and X-linked recessive inheritance in ${l.organism}.`,
        `Evidence: ${item.evidence} Which interpretation is best?`,
        options(item.correct, item.distractors),
        item.correct,
        "Ask whether one copy of the allele is expressed in females and whether affected fathers produce affected or unaffected daughters.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — predict offspring from X-linked dominant crosses
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl9-dominant-cross",
    "predicting offspring in X-linked dominant crosses",
    () => {
      const l = pick(loci);
      const D = l.dominantAllele;
      const d = l.recessiveAllele;

      const scenarios = [
        {
          cross: `${female(D, d)} mother × ${male(d)} father`,
          question:
            `What percentage of all offspring is expected to show ${l.dominantTrait}?`,
          correct: "50%",
          explanation:
            `The heterozygous mother transmits ${x(D)} to half of sons and half of daughters. The father contributes only the recessive allele to daughters.`
        },
        {
          cross: `${female(D, d)} mother × ${male(d)} father`,
          question:
            `What percentage of sons is expected to show ${l.dominantTrait}?`,
          correct: "50%",
          explanation:
            `Sons receive Y from the father and one maternal X. Half receive ${x(D)} and are affected.`
        },
        {
          cross: `${female(D, d)} mother × ${male(d)} father`,
          question:
            `What percentage of daughters is expected to show ${l.dominantTrait}?`,
          correct: "50%",
          explanation:
            `Every daughter receives paternal ${x(d)}. Half receive maternal ${x(D)} and express the dominant phenotype.`
        },
        {
          cross: `${female(d, d)} mother × ${male(D)} father`,
          question:
            `What percentage of daughters is expected to show ${l.dominantTrait}?`,
          correct: "100%",
          explanation:
            `Every daughter receives the father's ${x(D)} and therefore expresses the dominant phenotype.`
        },
        {
          cross: `${female(d, d)} mother × ${male(D)} father`,
          question:
            `What percentage of sons is expected to show ${l.dominantTrait}?`,
          correct: "0%",
          explanation:
            `Sons receive Y from the affected father and ${x(d)} from the unaffected mother, so none receives ${x(D)}.`
        },
        {
          cross: `${female(D, D)} mother × ${male(d)} father`,
          question:
            `What percentage of all offspring is expected to show ${l.dominantTrait}?`,
          correct: "100%",
          explanation:
            `The mother transmits ${x(D)} to every child, so all sons and daughters express the dominant phenotype.`
        },
        {
          cross: `${female(D, d)} mother × ${male(D)} father`,
          question:
            `What percentage of daughters is expected to show ${l.dominantTrait}?`,
          correct: "100%",
          explanation:
            `Every daughter receives paternal ${x(D)}, so every daughter is affected regardless of which maternal X she receives.`
        },
        {
          cross: `${female(D, d)} mother × ${male(D)} father`,
          question:
            `What percentage of sons is expected to show ${l.dominantTrait}?`,
          correct: "50%",
          explanation:
            `The father's affected X does not enter sons. Sons depend entirely on which maternal X they receive.`
        },
        {
          cross: `${female(d, d)} mother × ${male(D)} father`,
          question:
            `What percentage of all offspring is expected to show ${l.dominantTrait}?`,
          correct: "50%",
          explanation:
            `All daughters are affected and all sons are unaffected. With equal sex probability, half of all offspring are affected.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl9-dominant-cross",
        "xlinked",
        "intermediate",
        ruleText(l),
        `Cross: ${item.cross}. ${item.question}`,
        percentOptions(item.correct),
        item.correct,
        "Track the father's X only into daughters. Then remember that one dominant allele is sufficient for expression.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — interpret X-linked dominant pedigrees
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl9-dominant-pedigree",
    "interpreting pedigree evidence for X-linked dominance",
    () => {
      const l = pick(loci);
      const D = l.dominantAllele;
      const d = l.recessiveAllele;

      const scenarios = [
        {
          pedigree:
            "An affected father and unaffected mother have four daughters and three sons. All daughters are affected; all sons are unaffected.",
          question:
            "Which parental genotypes best explain the family?",
          correct: `${male(D)} father and ${female(d, d)} mother`,
          distractors: [
            `${male(d)} father and ${female(D, d)} mother`,
            `${male(D)} father and ${female(D, D)} mother`,
            `${male(d)} father and ${female(d, d)} mother`
          ],
          explanation:
            `The father must carry ${x(D)} and passes it to every daughter. The unaffected mother is ${female(d, d)} and passes only ${x(d)}.`
        },
        {
          pedigree:
            "An affected mother and unaffected father have affected and unaffected children of both sexes in roughly equal numbers.",
          question:
            "Which maternal genotype is most likely?",
          correct: female(D, d),
          distractors: [female(D, D), female(d, d), male(D)],
          explanation:
            `A heterozygous mother passes ${x(D)} to half of sons and daughters. A homozygous dominant mother would produce all affected children.`
        },
        {
          pedigree:
            "Two unaffected parents have an affected daughter.",
          question:
            "Is this expected under a simple fully penetrant X-linked dominant model?",
          correct: "No",
          distractors: ["Yes", "Yes, because fathers pass Y to daughters", "Only if every son is affected"],
          explanation:
            "Under a simple dominant model, an affected daughter normally must inherit the dominant allele from an affected parent."
        },
        {
          pedigree:
            "An affected father has an affected son and an affected daughter.",
          question:
            "Which statement is most accurate?",
          correct:
            "The son's allele must come from the mother, while the daughter can inherit the father's affected X.",
          distractors: [
            "The father transmitted the affected X directly to both children.",
            "The father transmitted Y to the daughter.",
            "The son proves the trait is Y-linked."
          ],
          explanation:
            "A father gives Y to sons and X to daughters. The son's affected X must therefore come from his mother."
        },
        {
          pedigree:
            "An affected heterozygous mother and unaffected father have two unaffected sons.",
          question:
            "Does this observation rule out the mother's heterozygous genotype?",
          correct: "No",
          distractors: ["Yes", "Yes, because all sons of affected mothers must be affected", "Only if there are no daughters"],
          explanation:
            `Each son independently has a 1/2 chance of receiving maternal ${x(d)}. Two unaffected sons are entirely possible.`
        },
        {
          pedigree:
            "An affected father and unaffected mother have an unaffected daughter.",
          question:
            "What does this observation suggest under a fully penetrant X-linked dominant model?",
          correct:
            "The stated model or pedigree information may be incorrect.",
          distractors: [
            "The daughter inherited Y from her father.",
            "This is the expected result.",
            "The mother must be homozygous dominant."
          ],
          explanation:
            `Every daughter of an affected father should inherit his ${x(D)} and express the trait if penetrance is complete.`
        },
        {
          pedigree:
            "The trait appears in every generation, affects both sexes, and affected fathers transmit it to every daughter but no sons.",
          question:
            "Which inheritance pattern is most strongly supported?",
          correct: "X-linked dominant",
          distractors: ["X-linked recessive", "Y-linked", "Mitochondrial"],
          explanation:
            "Vertical transmission plus all-daughter/no-son transmission from affected fathers is the classic X-linked dominant pattern."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl9-dominant-pedigree",
        "xlinked",
        "advanced",
        `${ruleText(l)} Pedigree observation: ${item.pedigree}`,
        item.question,
        options(item.correct, item.distractors),
        item.correct,
        "Use the father-to-daughter and father-to-son paths first; they are often the most diagnostic evidence.",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate explanations and misconceptions
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl9-dominant-reasoning",
    "evaluating reasoning about X-linked dominant inheritance",
    () => {
      const l = pick(loci);
      const D = l.dominantAllele;
      const d = l.recessiveAllele;

      const scenarios = [
        {
          statement:
            `"An affected father passes an X-linked dominant allele to all of his sons."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only if the mother is unaffected", "Cannot be determined"],
          explanation:
            "A father gives Y to sons, not X. His affected X chromosome goes to every daughter."
        },
        {
          statement:
            `"An unaffected daughter of an affected father is expected under a fully penetrant X-linked dominant model."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only if she has no brothers", "Cannot be determined"],
          explanation:
            `Every daughter receives the father's ${x(D)}. With full penetrance, she should express the phenotype.`
        },
        {
          statement:
            `"A heterozygous affected mother can transmit the trait to sons and daughters with equal probability."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for recessive traits", "Cannot be determined"],
          explanation:
            `She transmits ${x(D)} to half of all eggs, regardless of whether the child becomes male or female.`
        },
        {
          statement:
            `"An affected father and unaffected mother can have affected sons because the father carries the dominant allele."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct if all daughters are affected", "Cannot be determined"],
          explanation:
            "The father's affected X is not transmitted to sons. Affected sons would require the mother to contribute the dominant allele."
        },
        {
          statement:
            `"X-linked dominant traits usually appear in heterozygous females, unlike X-linked recessive traits."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only in males", "Cannot be determined"],
          explanation:
            "Dominance means one copy of the allele is sufficient for phenotype expression."
        },
        {
          statement:
            `"If an affected heterozygous mother has one unaffected child, she cannot carry an X-linked dominant allele."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only if the child is male", "Cannot be determined"],
          explanation:
            `A heterozygous mother transmits ${x(d)} to half of her children, so unaffected offspring are expected.`
        },
        {
          statement:
            `"All daughters of an affected father receive the allele, but their phenotype depends on whether the allele is dominant or recessive."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for sons", "Cannot be determined"],
          explanation:
            "Transmission is the same in both models; expression differs. A dominant allele is expressed in heterozygous daughters, while a recessive allele usually is not."
        },
        {
          statement:
            `"Father-to-son transmission is absent in both X-linked dominant and X-linked recessive inheritance."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for dominant traits", "Cannot be determined"],
          explanation:
            "Sons receive the father's Y chromosome, so no paternal X-linked allele is transmitted directly to them."
        },
        {
          statement:
            `"An affected father with an unaffected mother produces all affected daughters and all unaffected sons in a standard X-linked dominant cross."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for X-linked recessive traits", "Cannot be determined"],
          explanation:
            `Daughters receive paternal ${x(D)}; sons receive paternal Y and maternal ${x(d)}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl9-dominant-reasoning",
        "xlinked",
        "advanced",
        ruleText(l),
        `Evaluate this statement: ${item.statement}`,
        options(item.correct, item.distractors),
        item.correct,
        "Separate chromosome transmission from dominance. Transmission determines who receives the allele; dominance determines who expresses it.",
        item.explanation
      );
    }
  );
}
