/**
 * Sex Linkage — Objective 12
 *
 * Capstone learning objective:
 * Integrate genotype inference, pedigree interpretation, probability,
 * reciprocal crosses, inheritance-mode diagnosis, and evidence evaluation
 * in multi-step sex-linkage case studies.
 *
 * Generator families:
 *   1. Multi-step X-linked recessive family cases.
 *   2. Multi-step X-linked dominant family cases.
 *   3. Reciprocal-cross and offspring-evidence investigations.
 *   4. Integrated probability and genotype inference.
 *   5. Comprehensive inheritance-diagnosis challenges.
 *
 * The module is designed as a final synthesis objective rather than a review
 * of isolated definitions. Each question requires students to combine two or
 * more ideas from Objectives 1–11.
 */

export function registerObjective12(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "integrating sex-linkage concepts in comprehensive case studies";

  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const unique = (items) =>
    items.filter((item, index, array) => array.indexOf(item) === index);

  const options = (correct, distractors) =>
    shuffle(unique([correct, ...distractors])).slice(0, 4);

  const percentOptions = (correct) =>
    shuffle(
      unique([correct, "0%", "12.5%", "25%", "37.5%", "50%", "75%", "100%"])
    ).slice(0, 4);

  const xrTraits = [
    {
      organism: "humans",
      trait: "red-green colour blindness",
      allele: "c",
      normal: "C"
    },
    {
      organism: "fruit flies",
      trait: "white eyes",
      allele: "w",
      normal: "w+"
    },
    {
      organism: "mice",
      trait: "an X-linked coat-colour mutation",
      allele: "m",
      normal: "M"
    },
    {
      organism: "beetles",
      trait: "an X-linked recessive wing mutation",
      allele: "r",
      normal: "R"
    }
  ];

  const xdTraits = [
    {
      organism: "humans",
      trait: "a rare enamel phenotype",
      allele: "D",
      normal: "d"
    },
    {
      organism: "mice",
      trait: "an X-linked dominant tail phenotype",
      allele: "T",
      normal: "t"
    },
    {
      organism: "fruit flies",
      trait: "an X-linked dominant bristle phenotype",
      allele: "B",
      normal: "b"
    }
  ];

  const modes = {
    AD: "Autosomal dominant",
    AR: "Autosomal recessive",
    XLD: "X-linked dominant",
    XLR: "X-linked recessive",
    Y: "Y-linked",
    MT: "Mitochondrial",
    SL: "Sex-limited autosomal",
    SI: "Sex-influenced autosomal"
  };

  const modeDistractors = [
    modes.AD,
    modes.AR,
    modes.XLD,
    modes.XLR,
    modes.Y,
    modes.MT,
    modes.SL,
    modes.SI
  ];

  // -------------------------------------------------------------------------
  // FAMILY 1 — multi-step X-linked recessive family cases
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl12-xlr-family-case",
    "solving multi-step X-linked recessive family cases",
    () => {
      const item = pick(xrTraits);
      const A = item.normal;
      const a = item.allele;

      const cases = [
        {
          stem:
            `An unaffected woman has an affected father. She has children with an unaffected man.`,
          question:
            `What is the probability that their next child is an affected son?`,
          correct: "25%",
          explanation:
            `Because her father is affected, the woman must inherit X${a} from him. Since she is unaffected, she is X${A}X${a}. The man is X${A}Y. The probability of a son is 1/2, and the probability she passes X${a} is 1/2, giving 1/4 overall.`
        },
        {
          stem:
            `An affected man and a homozygous unaffected woman have children.`,
          question:
            `Which statement about their daughters is correct?`,
          correct: "All daughters are unaffected carriers.",
          distractors: [
            "All daughters are affected.",
            "Half of the daughters are carriers.",
            "No daughter inherits the recessive allele."
          ],
          explanation:
            `Every daughter receives X${a} from the affected father and X${A} from the mother, so all daughters are X${A}X${a}: unaffected carriers.`
        },
        {
          stem:
            `A carrier woman and an affected man have children.`,
          question:
            `What percentage of daughters is expected to be affected?`,
          correct: "50%",
          explanation:
            `All daughters receive X${a} from the father. Half receive X${a} from the carrier mother, so half are X${a}X${a} and affected.`
        },
        {
          stem:
            `A carrier woman and an unaffected man have two sons.`,
          question:
            `What is the probability that both sons are unaffected?`,
          correct: "25%",
          explanation:
            `Each son has a 1/2 chance of receiving X${A} from the mother. The births are independent, so (1/2)(1/2) = 1/4.`
        },
        {
          stem:
            `An unaffected woman has an affected son with an unaffected man. A new mutation is excluded.`,
          question:
            `What is the woman's most likely genotype?`,
          correct: `X${A}X${a}`,
          distractors: [`X${A}X${A}`, `X${a}X${a}`, `X${A}Y`],
          explanation:
            `The son receives Y from his father and his only X chromosome from his mother. Because the son is affected and new mutation is excluded, the mother must carry X${a}.`
        },
        {
          stem:
            `An affected grandfather has an unaffected daughter, and that daughter has an affected son.`,
          question:
            `Which transmission path best explains the pedigree?`,
          correct:
            "The grandfather passed the recessive X-linked allele to his daughter, who passed it to her son.",
          distractors: [
            "The grandfather passed a Y-linked allele through his daughter.",
            "The father of the affected son passed the allele directly to him.",
            "The trait must be mitochondrial."
          ],
          explanation:
            `An affected father gives his X chromosome to every daughter. A carrier daughter can then pass the recessive allele to a son.`
        }
      ];

      const scenario = pick(cases);
      const choiceSet = scenario.distractors
        ? options(scenario.correct, scenario.distractors)
        : percentOptions(scenario.correct);

      return q(
        "xl12-xlr-family-case",
        "xlinked",
        "advanced",
        `In ${item.organism}, ${item.trait} is X-linked recessive. ${scenario.stem}`,
        scenario.question,
        choiceSet,
        scenario.correct,
        "Track the father's X chromosome only to daughters and the mother's X chromosome to both sons and daughters.",
        scenario.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 2 — multi-step X-linked dominant family cases
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl12-xld-family-case",
    "solving multi-step X-linked dominant family cases",
    () => {
      const item = pick(xdTraits);
      const D = item.allele;
      const d = item.normal;

      const cases = [
        {
          stem:
            `An affected heterozygous woman has children with an unaffected man.`,
          question:
            `What percentage of all children is expected to be affected?`,
          correct: "50%",
          explanation:
            `The mother transmits X${D} to half of her children. Because the allele is dominant, each child who receives it is affected.`
        },
        {
          stem:
            `An affected man has children with an unaffected woman.`,
          question:
            `Which offspring pattern is expected?`,
          correct: "All daughters affected and all sons unaffected.",
          distractors: [
            "All sons affected and all daughters unaffected.",
            "Half of sons and half of daughters affected.",
            "All children affected."
          ],
          explanation:
            `The father passes X${D} to every daughter and Y to every son. The mother contributes only unaffected X${d}.`
        },
        {
          stem:
            `An affected woman has an unaffected father.`,
          question:
            `Assuming the trait is rare and fully penetrant, what is the woman's most likely genotype?`,
          correct: `X${D}X${d}`,
          distractors: [`X${D}X${D}`, `X${d}X${d}`, `X${D}Y`],
          explanation:
            `Her unaffected father must contribute X${d}. Because she is affected, she must have received X${D} from her mother, making her heterozygous.`
        },
        {
          stem:
            `An affected father and affected heterozygous mother have children.`,
          question:
            `What percentage of sons is expected to be affected?`,
          correct: "50%",
          explanation:
            `Sons receive Y from the father and one X from the mother. The heterozygous mother transmits X${D} to half of sons.`
        },
        {
          stem:
            `An affected father and affected heterozygous mother have children.`,
          question:
            `What percentage of daughters is expected to be affected?`,
          correct: "100%",
          explanation:
            `Every daughter receives X${D} from the affected father, so every daughter is affected regardless of which maternal X she receives.`
        },
        {
          stem:
            `A pedigree shows an affected father, an unaffected mother, two affected daughters, and two unaffected sons.`,
          question:
            `Which observation in the family is most diagnostic?`,
          correct:
            "The father transmitted the phenotype to daughters but not to sons.",
          distractors: [
            "The family contains four children.",
            "Both daughters have the same phenotype.",
            "The mother is unaffected."
          ],
          explanation:
            `The affected-father pattern directly follows transmission of his X chromosome and is the strongest evidence for X-linked dominant inheritance.`
        }
      ];

      const scenario = pick(cases);
      const choiceSet = scenario.distractors
        ? options(scenario.correct, scenario.distractors)
        : percentOptions(scenario.correct);

      return q(
        "xl12-xld-family-case",
        "xlinked",
        "advanced",
        `In ${item.organism}, ${item.trait} is X-linked dominant. ${scenario.stem}`,
        scenario.question,
        choiceSet,
        scenario.correct,
        "For an affected father, separate daughters from sons before doing any probability calculation.",
        scenario.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 3 — reciprocal crosses and offspring evidence
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl12-reciprocal-investigation",
    "interpreting reciprocal crosses and offspring evidence",
    () => {
      const item = pick(xrTraits);
      const A = item.normal;
      const a = item.allele;

      const cases = [
        {
          cross1:
            `affected female X${a}X${a} × unaffected male X${A}Y`,
          cross2:
            `unaffected homozygous female X${A}X${A} × affected male X${a}Y`,
          question:
            "Which comparison of the F1 offspring is correct?",
          correct:
            "The first cross produces affected sons and carrier daughters; the reciprocal cross produces unaffected sons and carrier daughters.",
          distractors: [
            "Both crosses produce identical affected sons and daughters.",
            "The first cross produces only unaffected offspring.",
            "The reciprocal cross produces affected sons and affected daughters."
          ],
          explanation:
            `In the first cross, every son receives X${a} from the mother and is affected; daughters are X${A}X${a}. In the reciprocal cross, sons receive X${A} from the mother and are unaffected, while daughters are again carriers.`
        },
        {
          cross1:
            `carrier female X${A}X${a} × unaffected male X${A}Y`,
          cross2:
            `unaffected homozygous female X${A}X${A} × affected male X${a}Y`,
          question:
            "Which cross can produce affected sons?",
          correct: "Only the first cross.",
          distractors: [
            "Only the second cross.",
            "Both crosses.",
            "Neither cross."
          ],
          explanation:
            `Sons receive their X chromosome from the mother. Only the carrier mother can pass X${a} to sons.`
        },
        {
          cross1:
            `affected female X${a}X${a} × unaffected male X${A}Y`,
          cross2:
            `unaffected homozygous female X${A}X${A} × affected male X${a}Y`,
          question:
            "Why are reciprocal crosses informative for X-linked traits?",
          correct:
            "The sex of the parent carrying the allele changes which offspring inherit the allele.",
          distractors: [
            "Reciprocal crosses change the mutation rate.",
            "The father contributes mitochondria in one direction only.",
            "Autosomal genes are removed in the reciprocal cross."
          ],
          explanation:
            `Mothers pass X chromosomes to sons and daughters, whereas fathers pass X chromosomes only to daughters. Reversing the parental phenotypes therefore changes the expected offspring pattern.`
        },
        {
          cross1:
            `carrier female X${A}X${a} × unaffected male X${A}Y`,
          cross2:
            `carrier female X${A}X${a} × affected male X${a}Y`,
          question:
            "Which offspring class occurs only in the second cross?",
          correct: `affected daughters X${a}X${a}`,
          distractors: [
            `unaffected sons X${A}Y`,
            `affected sons X${a}Y`,
            `carrier daughters X${A}X${a}`
          ],
          explanation:
            `An affected daughter needs X${a} from both parents. Only the second cross has a father who can contribute X${a}.`
        },
        {
          cross1:
            `an affected father has only unaffected sons`,
          cross2:
            `an affected mother has both affected and unaffected sons`,
          question:
            "Which conclusion is best supported?",
          correct:
            "The son's phenotype depends on the X chromosome inherited from the mother.",
          distractors: [
            "The father transmits his X chromosome to sons.",
            "The trait must be Y-linked.",
            "The sons inherit mitochondrial DNA from the father."
          ],
          explanation:
            `A son receives Y from his father and his single X chromosome from his mother, so the mother's genotype determines the son's X-linked allele.`
        }
      ];

      const scenario = pick(cases);

      return q(
        "xl12-reciprocal-investigation",
        "xlinked",
        "advanced",
        `A geneticist studies ${item.trait} in ${item.organism}. Evidence or cross 1: ${scenario.cross1}. Evidence or cross 2: ${scenario.cross2}.`,
        scenario.question,
        options(scenario.correct, scenario.distractors),
        scenario.correct,
        "Compare who supplies the X chromosome to sons and who supplies it to daughters.",
        scenario.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 4 — integrated probability and genotype inference
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl12-probability-inference",
    "combining genotype inference with conditional and repeated-event probability",
    () => {
      const item = pick(xrTraits);
      const A = item.normal;
      const a = item.allele;

      const cases = [
        {
          stem:
            `A woman has an affected brother. Her father is unaffected, and her mother is known to be a carrier. The woman has not been genetically tested and has children with an unaffected man.`,
          question:
            `What is the probability that her next child is an affected son?`,
          correct: "12.5%",
          explanation:
            `The woman has a 1/2 probability of being a carrier. If she is a carrier, the probability of an affected son is 1/4. Therefore, (1/2)(1/4) = 1/8 = 12.5%.`
        },
        {
          stem:
            `A carrier woman and an unaffected man have three children.`,
          question:
            `What is the probability that all three children are unaffected?`,
          correct: "42.2%",
          distractors: ["12.5%", "25%", "50%"],
          explanation:
            `For each child, the probability of being affected is 1/4, so the probability of being unaffected is 3/4. For three independent children: (3/4)^3 = 27/64 ≈ 42.2%.`
        },
        {
          stem:
            `A carrier woman and an unaffected man have two sons.`,
          question:
            `Given that both children are sons, what is the probability that exactly one is affected?`,
          correct: "50%",
          explanation:
            `Each son has a 1/2 chance of being affected. Exactly one affected son can occur in two orders: affected–unaffected or unaffected–affected. The total probability is 2(1/2)(1/2) = 1/2.`
        },
        {
          stem:
            `An unaffected woman has an affected father and an unaffected mother. She has children with an unaffected man.`,
          question:
            `What is the probability that her first daughter is a carrier?`,
          correct: "50%",
          explanation:
            `The woman is an obligate carrier because she inherited X${a} from her affected father. Each daughter has a 1/2 chance of receiving X${a} from her.`
        },
        {
          stem:
            `A carrier woman and affected man have a child known to be female.`,
          question:
            `What is the probability that the daughter is affected?`,
          correct: "50%",
          explanation:
            `The daughter receives X${a} from the affected father with certainty. She is affected only if the carrier mother also transmits X${a}, which occurs with probability 1/2.`
        },
        {
          stem:
            `A woman of unknown genotype has an affected son with an unaffected man. A new mutation is excluded.`,
          question:
            `After this birth, what is the probability that the woman is a carrier?`,
          correct: "100%",
          explanation:
            `The affected son received his only X chromosome from his mother. With new mutation excluded, she must carry the recessive allele.`
        }
      ];

      const scenario = pick(cases);
      const choices = scenario.distractors
        ? options(scenario.correct, scenario.distractors)
        : percentOptions(scenario.correct);

      return q(
        "xl12-probability-inference",
        "xlinked",
        "advanced",
        `In ${item.organism}, ${item.trait} is X-linked recessive. ${scenario.stem}`,
        scenario.question,
        choices,
        scenario.correct,
        "Infer the relevant genotype probability first. Then multiply by the conditional probability of the requested offspring outcome.",
        scenario.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 5 — comprehensive inheritance diagnosis
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl12-capstone-diagnosis",
    "diagnosing inheritance mode from complete multi-generation evidence",
    () => {
      const cases = [
        {
          title: "Case 1",
          evidence: [
            "The phenotype occurs in every generation.",
            "Males and females are affected.",
            "An affected father has an affected son.",
            "Affected individuals generally have an affected parent."
          ],
          correct: modes.AD,
          distractors: [modes.XLD, modes.AR, modes.MT],
          explanation:
            "Vertical transmission suggests dominance, and father-to-son transmission rules out X linkage. Autosomal dominant inheritance best fits."
        },
        {
          title: "Case 2",
          evidence: [
            "Unaffected parents have affected sons and daughters.",
            "The phenotype can skip generations.",
            "An affected daughter has an unaffected father.",
            "The two parents are related."
          ],
          correct: modes.AR,
          distractors: [modes.XLR, modes.AD, modes.MT],
          explanation:
            "Affected offspring of unaffected parents indicate recessive inheritance. An affected daughter with an unaffected father argues against X-linked recessive inheritance."
        },
        {
          title: "Case 3",
          evidence: [
            "Most affected individuals are male.",
            "Affected fathers do not have affected sons.",
            "Affected males may have unaffected daughters who later have affected sons.",
            "The trait can skip generations through carrier females."
          ],
          correct: modes.XLR,
          distractors: [modes.Y, modes.AR, modes.SL],
          explanation:
            "Transmission through carrier females, male bias, and absence of father-to-son transmission are classic features of X-linked recessive inheritance."
        },
        {
          title: "Case 4",
          evidence: [
            "An affected father has all affected daughters and no affected sons.",
            "An affected heterozygous mother has affected and unaffected children of both sexes.",
            "The trait appears in consecutive generations."
          ],
          correct: modes.XLD,
          distractors: [modes.AD, modes.MT, modes.XLR],
          explanation:
            "The affected-father pattern is diagnostic of X-linked dominant inheritance."
        },
        {
          title: "Case 5",
          evidence: [
            "Only males express the phenotype.",
            "Every affected father has affected sons.",
            "No daughters are affected.",
            "The phenotype never passes through females."
          ],
          correct: modes.Y,
          distractors: [modes.XLR, modes.SL, modes.AD],
          explanation:
            "Strict father-to-son transmission and exclusion from females identify Y-linked inheritance."
        },
        {
          title: "Case 6",
          evidence: [
            "Affected mothers transmit the phenotype to sons and daughters.",
            "Affected fathers transmit it to none of their children.",
            "The phenotype may vary in severity among siblings."
          ],
          correct: modes.MT,
          distractors: [modes.XLD, modes.AD, modes.AR],
          explanation:
            "Maternal transmission to both sexes with no paternal transmission identifies mitochondrial inheritance."
        },
        {
          title: "Case 7",
          evidence: [
            "The locus is autosomal.",
            "Both sexes inherit the allele.",
            "Only females express the measured phenotype.",
            "Males can transmit high-expression alleles to daughters."
          ],
          correct: modes.SL,
          distractors: [modes.SI, modes.XLD, modes.MT],
          explanation:
            "Both sexes inherit the autosomal alleles, but expression is restricted to females, so the trait is sex-limited."
        },
        {
          title: "Case 8",
          evidence: [
            "The locus is autosomal.",
            "The heterozygous genotype is expressed in males.",
            "The same heterozygous genotype is not expressed in females.",
            "Homozygous females can express the phenotype."
          ],
          correct: modes.SI,
          distractors: [modes.SL, modes.AD, modes.XLD],
          explanation:
            "The same autosomal genotype produces different phenotypes according to sex, defining sex-influenced inheritance."
        }
      ];

      const scenario = pick(cases);
      const evidenceText = scenario.evidence
        .map((fact, index) => `${index + 1}. ${fact}`)
        .join(" ");

      return q(
        "xl12-capstone-diagnosis",
        "xlinked",
        "advanced",
        `${scenario.title}: ${evidenceText}`,
        "Which inheritance pattern best explains all of the evidence?",
        options(
          scenario.correct,
          unique([
            ...scenario.distractors,
            ...shuffle(modeDistractors.filter((mode) => mode !== scenario.correct))
          ])
        ),
        scenario.correct,
        "Prioritize decisive transmission clues: father-to-son transmission, affected-father daughter patterns, maternal-only transmission, and sex-dependent expression.",
        scenario.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 6 — evaluate a student's full reasoning chain
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl12-reasoning-audit",
    "evaluating a multi-step inheritance argument",
    () => {
      const cases = [
        {
          argument:
            "Only males are affected, so the trait must be Y-linked.",
          correct: "The reasoning is incomplete.",
          distractors: [
            "The reasoning is fully correct.",
            "The trait must instead be mitochondrial.",
            "The trait must instead be autosomal dominant."
          ],
          explanation:
            "Male-only expression can also result from X-linked recessive or male-limited autosomal inheritance. Father-to-son transmission must be examined."
        },
        {
          argument:
            "An affected father has an affected son, so the trait cannot be X-linked.",
          correct: "The reasoning is correct for direct father-to-son transmission.",
          distractors: [
            "The reasoning is always incorrect.",
            "The trait must be X-linked dominant.",
            "The trait must be mitochondrial."
          ],
          explanation:
            "A father gives Y, not X, to a son. Therefore a directly transmitted allele causing the shared phenotype cannot be X-linked."
        },
        {
          argument:
            "An affected father has all affected daughters and no affected sons; therefore X-linked dominant inheritance is strongly supported.",
          correct: "The reasoning is strong and correctly uses chromosome transmission.",
          distractors: [
            "The reasoning confuses X-linked dominant with Y-linked inheritance.",
            "The reasoning proves mitochondrial inheritance.",
            "The reasoning is invalid because daughters never inherit a father's X chromosome."
          ],
          explanation:
            "All daughters inherit the father's X chromosome, while sons inherit his Y chromosome. This is the classic X-linked dominant affected-father pattern."
        },
        {
          argument:
            "A carrier mother has an affected son, so the father must also carry the recessive allele.",
          correct: "The reasoning is incorrect.",
          distractors: [
            "The reasoning is correct.",
            "The father must be affected.",
            "The trait must be Y-linked."
          ],
          explanation:
            "A son receives Y from his father and his only X chromosome from his mother. The father's X-linked genotype does not determine the son's X-linked allele."
        },
        {
          argument:
            "The same heterozygous autosomal genotype is expressed in males but not females, so the trait is sex-influenced.",
          correct: "The reasoning is correct.",
          distractors: [
            "The trait must be sex-limited.",
            "The trait must be X-linked.",
            "The reasoning is incorrect because autosomal traits cannot differ by sex."
          ],
          explanation:
            "Different phenotypes for the same genotype in males and females are the defining feature of sex-influenced inheritance."
        },
        {
          argument:
            "Affected mothers transmit the phenotype to all children, while affected fathers transmit it to none; therefore mitochondrial inheritance is likely.",
          correct: "The reasoning is correct under the standard simplified model.",
          distractors: [
            "The reasoning proves X-linked dominant inheritance.",
            "The pattern is Y-linked.",
            "The reasoning is incorrect because fathers transmit mitochondria to sons."
          ],
          explanation:
            "Mitochondria are normally inherited through the egg, producing maternal transmission and no paternal transmission."
        }
      ];

      const scenario = pick(cases);

      return q(
        "xl12-reasoning-audit",
        "xlinked",
        "advanced",
        `A student writes: "${scenario.argument}"`,
        "How should the reasoning be evaluated?",
        options(scenario.correct, scenario.distractors),
        scenario.correct,
        "Check each step against chromosome transmission rather than judging only the final label.",
        scenario.explanation
      );
    }
  );
}
