/**
 * Sex Linkage — Objective 11
 *
 * Learning objective:
 * Diagnose inheritance patterns from crosses, pedigrees, and family evidence
 * when the inheritance mode is not identified in advance.
 *
 * Inheritance modes included:
 *   - autosomal dominant
 *   - autosomal recessive
 *   - X-linked dominant
 *   - X-linked recessive
 *   - Y-linked
 *   - mitochondrial
 *   - sex-limited
 *   - sex-influenced
 *
 * Generator families:
 *   1. Identify an inheritance pattern from decisive evidence.
 *   2. Eliminate incompatible inheritance patterns.
 *   3. Distinguish closely related patterns using additional evidence.
 *   4. Solve integrated pedigree-style diagnostic cases.
 */

export function registerObjective11(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "diagnosing inheritance patterns from crosses and pedigree evidence";

  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const unique = (items) =>
    items.filter((item, index, array) => array.indexOf(item) === index);

  const options = (correct, distractors) =>
    shuffle([
      correct,
      ...shuffle(unique(distractors.filter((item) => item !== correct))).slice(0, 3)
    ]);

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

  const generalDistractors = [
    modes.AD,
    modes.AR,
    modes.XLD,
    modes.XLR,
    modes.Y,
    modes.MT,
    modes.SL,
    modes.SI
  ];

  const buildOptions = (correct, preferred = []) =>
    options(
      correct,
      unique([
        ...preferred,
        ...shuffle(generalDistractors.filter((mode) => mode !== correct))
      ])
    );

  // -------------------------------------------------------------------------
  // FAMILY 1 — identify a pattern from decisive evidence
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl11-identify-pattern",
    "identifying an inheritance pattern from decisive evidence",
    () => {
      const cases = [
        {
          mode: modes.AD,
          organism: "humans",
          trait: "a rare skeletal phenotype",
          evidence:
            "Affected individuals usually have an affected parent, both sexes are affected, and father-to-son transmission occurs.",
          hint:
            "Father-to-son transmission rules out X linkage. Vertical transmission suggests dominance.",
          explanation:
            "The trait appears in successive generations, affects both sexes, and includes father-to-son transmission. This is most consistent with autosomal dominant inheritance.",
          distractors: [modes.XLD, modes.AR, modes.XLR]
        },
        {
          mode: modes.AR,
          organism: "mice",
          trait: "a metabolic deficiency",
          evidence:
            "Unaffected parents produce affected offspring, both sexes are affected equally, and the trait can skip generations.",
          hint:
            "Unaffected parents producing affected offspring strongly suggests recessive inheritance.",
          explanation:
            "The trait skips generations and affected offspring can arise from unaffected carrier parents of either sex. This supports autosomal recessive inheritance.",
          distractors: [modes.AD, modes.XLR, modes.MT]
        },
        {
          mode: modes.XLD,
          organism: "humans",
          trait: "a rare enamel phenotype",
          evidence:
            "Every daughter of an affected father is affected, none of his sons are affected through him, and affected heterozygous mothers transmit the trait to about half of children of either sex.",
          hint:
            "An affected father's X chromosome goes to every daughter and no son.",
          explanation:
            "Affected fathers transmit the trait to all daughters but no sons, while heterozygous mothers transmit it to about half of children. This is X-linked dominant inheritance.",
          distractors: [modes.AD, modes.XLR, modes.Y]
        },
        {
          mode: modes.XLR,
          organism: "fruit flies",
          trait: "a recessive eye-colour mutation",
          evidence:
            "Affected males are common, affected fathers do not transmit the allele to sons, and unaffected daughters of affected fathers can produce affected sons.",
          hint:
            "Look for transmission through carrier daughters and the absence of father-to-son transmission.",
          explanation:
            "The allele passes from affected fathers to daughters and can reappear in grandsons. The male bias and lack of father-to-son transmission support X-linked recessive inheritance.",
          distractors: [modes.AR, modes.Y, modes.XLD]
        },
        {
          mode: modes.Y,
          organism: "humans",
          trait: "a rare male-specific marker",
          evidence:
            "Only males are affected, and every affected father transmits the phenotype to every son.",
          hint:
            "Strict father-to-son transmission is the defining clue.",
          explanation:
            "A Y-linked allele is inherited from father to son, so all affected individuals are male and every son of an affected father inherits it.",
          distractors: [modes.XLR, modes.SL, modes.AD]
        },
        {
          mode: modes.MT,
          organism: "humans",
          trait: "a mitochondrial energy disorder",
          evidence:
            "Affected mothers transmit the condition to sons and daughters, whereas affected fathers transmit it to none of their children.",
          hint:
            "Mitochondria are normally inherited through the egg.",
          explanation:
            "Maternal transmission to both sexes, together with no transmission from affected fathers, is characteristic of mitochondrial inheritance.",
          distractors: [modes.XLD, modes.AD, modes.AR]
        },
        {
          mode: modes.SL,
          organism: "dairy cattle",
          trait: "high milk yield",
          evidence:
            "The responsible alleles are autosomal and inherited by both sexes, but only females express the measured phenotype. Bulls can transmit high-yield alleles to daughters.",
          hint:
            "Separate inheritance from expression. Both sexes inherit the alleles, but only one sex expresses the trait.",
          explanation:
            "This is a sex-limited autosomal trait: both sexes inherit the genes, but milk production is expressed only in females.",
          distractors: [modes.XLD, modes.SI, modes.MT]
        },
        {
          mode: modes.SI,
          organism: "sheep",
          trait: "horn development",
          evidence:
            "The locus is autosomal. Heterozygous males are horned, whereas heterozygous females are hornless; homozygotes follow the specified allele dosage.",
          hint:
            "The same autosomal genotype produces different phenotypes in males and females.",
          explanation:
            "The genotype-to-phenotype relationship changes with sex, which defines sex-influenced autosomal inheritance.",
          distractors: [modes.SL, modes.XLD, modes.AD]
        }
      ];

      const item = pick(cases);

      return q(
        "xl11-identify-pattern",
        "xlinked",
        "intermediate",
        `A geneticist studies ${item.trait} in ${item.organism}.`,
        `${item.evidence} Which inheritance pattern is most likely?`,
        buildOptions(item.mode, item.distractors),
        item.mode,
        item.hint,
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 2 — eliminate incompatible patterns
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl11-eliminate-pattern",
    "eliminating inheritance patterns using pedigree evidence",
    () => {
      const cases = [
        {
          evidence:
            "Pedigree analysis confirms direct father-to-son transmission of the phenotype.",
          question:
            "Which inheritance pattern is ruled out by this confirmed transmission event?",
          correct: modes.XLD,
          distractors: [modes.AD, modes.Y, modes.SL],
          hint:
            "A father gives his Y chromosome, not his X chromosome, to a son.",
          explanation:
            "Direct father-to-son transmission cannot be caused by an X-linked allele. Therefore X-linked dominant inheritance is ruled out."
        },
        {
          evidence:
            "An affected father transmits the phenotype to none of his sons but all of his daughters.",
          question:
            "Which pattern is least compatible with this result?",
          correct: modes.Y,
          distractors: [modes.XLD, modes.AD, modes.SI],
          hint:
            "A Y-linked trait should pass from father to son.",
          explanation:
            "A Y-linked allele would be transmitted to sons, not daughters. The observed pattern is therefore incompatible with Y linkage."
        },
        {
          evidence:
            "An affected mother and unaffected father have affected and unaffected children of both sexes in approximately equal proportions.",
          question:
            "Which pattern is ruled out if the mother is known to transmit the phenotype to only half of her children?",
          correct: modes.MT,
          distractors: [modes.XLD, modes.AD, modes.SI],
          hint:
            "Under the simplified mitochondrial model, an affected mother transmits the mitochondrial allele to all children.",
          explanation:
            "A simple mitochondrial trait should be maternally transmitted to all offspring. Transmission to only half is inconsistent with that model."
        },
        {
          evidence:
            "Two unaffected parents have an affected daughter and an affected son.",
          question:
            "Which inheritance pattern is least compatible with these parents?",
          correct: modes.AD,
          distractors: [modes.AR, modes.XLR, modes.SL],
          hint:
            "A dominant trait generally requires an affected parent, assuming complete penetrance and no new mutation.",
          explanation:
            "Under a simple autosomal dominant model, affected offspring normally have an affected parent. Two unaffected parents producing affected children argues against autosomal dominance."
        },
        {
          evidence:
            "An affected female is born to an unaffected father.",
          question:
            "Which pattern is ruled out under a simple fully penetrant model?",
          correct: modes.XLR,
          distractors: [modes.AR, modes.AD, modes.MT],
          hint:
            "For an X-linked recessive female to be affected, she must receive a recessive allele on her father's X chromosome.",
          explanation:
            "An affected X-linked recessive female must inherit the recessive allele from her father, so her father would need to be affected."
        },
        {
          evidence:
            "A phenotype is expressed in both males and females, but heterozygous males and females have different phenotypes.",
          question:
            "Which category is ruled out by the fact that both sexes can express the phenotype?",
          correct: modes.SL,
          distractors: [modes.SI, modes.AD, modes.AR],
          hint:
            "A sex-limited trait is expressed in only one sex.",
          explanation:
            "Because both sexes can express the phenotype, the trait is not sex-limited. Different heterozygous expression instead suggests sex-influenced inheritance."
        },
        {
          evidence:
            "An affected father and unaffected mother have no affected sons, and all daughters are unaffected carriers.",
          question:
            "Which dominant inheritance model is ruled out?",
          correct: modes.XLD,
          distractors: [modes.XLR, modes.AR, modes.SL],
          hint:
            "Under X-linked dominant inheritance, every daughter of an affected father should be affected.",
          explanation:
            "Unaffected carrier daughters are compatible with X-linked recessive inheritance, but not X-linked dominant inheritance."
        },
        {
          evidence:
            "An affected father has unaffected sons, and one unaffected daughter later has affected sons.",
          question:
            "Which inheritance pattern is ruled out most directly?",
          correct: modes.Y,
          distractors: [modes.XLR, modes.AR, modes.SL],
          hint:
            "A Y-linked allele cannot pass through a daughter.",
          explanation:
            "Y-linked inheritance cannot pass through females, so an unaffected daughter cannot transmit a Y-linked trait to sons."
        }
      ];

      const item = pick(cases);

      return q(
        "xl11-eliminate-pattern",
        "xlinked",
        "advanced",
        `Pedigree evidence: ${item.evidence}`,
        item.question,
        buildOptions(item.correct, item.distractors),
        item.correct,
        item.hint,
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 3 — choose the additional evidence that distinguishes two models
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl11-distinguish-models",
    "distinguishing similar inheritance patterns using additional evidence",
    () => {
      const cases = [
        {
          pair: `${modes.AD} versus ${modes.XLD}`,
          initial:
            "The trait appears in every generation and affects males and females.",
          question:
            "Which additional observation would most clearly distinguish the two models?",
          correct: "Direct father-to-son transmission occurs.",
          distractors: [
            "An affected mother has an affected daughter.",
            "The trait appears in three generations.",
            "Affected individuals are uncommon."
          ],
          hint:
            "Focus on a transmission event that an X chromosome cannot produce.",
          explanation:
            "Father-to-son transmission rules out X-linked inheritance and supports an autosomal model."
        },
        {
          pair: `${modes.AR} versus ${modes.XLR}`,
          initial:
            "Unaffected parents produce affected sons.",
          question:
            "Which additional observation would most strongly support autosomal recessive inheritance?",
          correct: "Unaffected parents also produce an affected daughter while the father remains unaffected.",
          distractors: [
            "The affected sons have unaffected sisters.",
            "The mother has affected brothers.",
            "No affected father transmits the trait to a son."
          ],
          hint:
            "Ask what is required for a female to be affected under X-linked recessive inheritance.",
          explanation:
            "An affected daughter with an unaffected father is incompatible with a simple X-linked recessive model but compatible with autosomal recessive inheritance."
        },
        {
          pair: `${modes.Y} versus ${modes.SL}`,
          initial:
            "Only males express the phenotype.",
          question:
            "Which observation most strongly supports Y linkage rather than a male-limited autosomal trait?",
          correct: "Every affected father transmits the phenotype to every son.",
          distractors: [
            "Females never express the phenotype.",
            "The phenotype appears after puberty.",
            "Affected males have unaffected daughters."
          ],
          hint:
            "Male-only expression is not enough; examine father-to-son transmission.",
          explanation:
            "Strict father-to-son transmission is diagnostic of Y linkage. Male-limited autosomal traits need not pass to every son."
        },
        {
          pair: `${modes.MT} versus ${modes.AD}`,
          initial:
            "Affected mothers have affected sons and daughters.",
          question:
            "Which observation most strongly supports mitochondrial inheritance?",
          correct: "Affected fathers transmit the phenotype to none of their children.",
          distractors: [
            "Affected mothers have affected daughters.",
            "The trait appears in consecutive generations.",
            "Both sexes can express the phenotype."
          ],
          hint:
            "Compare transmission from affected mothers and affected fathers.",
          explanation:
            "The combination of maternal transmission and no paternal transmission is characteristic of mitochondrial inheritance."
        },
        {
          pair: `${modes.SL} versus ${modes.SI}`,
          initial:
            "Phenotype frequencies differ between males and females.",
          question:
            "Which observation most strongly supports sex-influenced rather than sex-limited inheritance?",
          correct: "The same heterozygous genotype is expressed in males but not in females.",
          distractors: [
            "Only females express the phenotype.",
            "Males can transmit alleles to daughters.",
            "The locus is autosomal."
          ],
          hint:
            "Sex-influenced traits can be expressed in both sexes, but dominance differs.",
          explanation:
            "Different expression of the same genotype between sexes is the defining feature of sex-influenced inheritance."
        },
        {
          pair: `${modes.XLD} versus ${modes.MT}`,
          initial:
            "An affected mother transmits a phenotype to sons and daughters.",
          question:
            "Which observation most strongly supports X-linked dominant inheritance?",
          correct: "An affected father transmits the phenotype to all daughters and no sons.",
          distractors: [
            "An affected mother has affected children.",
            "Both sexes show the phenotype.",
            "The trait appears in multiple generations."
          ],
          hint:
            "Use the transmission pattern of an affected father.",
          explanation:
            "An affected father's X chromosome goes to all daughters and no sons, producing the classic X-linked dominant pattern."
        },
        {
          pair: `${modes.AD} versus ${modes.SI}`,
          initial:
            "A trait is seen in both sexes and can pass from father to son.",
          question:
            "Which additional observation supports sex-influenced inheritance?",
          correct: "Heterozygous males express the trait, but heterozygous females do not.",
          distractors: [
            "Affected parents can have affected children.",
            "Both sexes inherit the allele.",
            "The trait is autosomal."
          ],
          hint:
            "Look for sex-dependent dominance rather than merely autosomal transmission.",
          explanation:
            "Different phenotypes for the same heterozygous genotype demonstrate sex-influenced inheritance."
        },
        {
          pair: `${modes.XLR} versus ${modes.Y}`,
          initial:
            "Most affected individuals are male.",
          question:
            "Which observation most strongly supports X-linked recessive inheritance?",
          correct: "Affected males are connected through unaffected carrier females.",
          distractors: [
            "Affected fathers have affected sons.",
            "Only males express the phenotype.",
            "The trait appears after puberty."
          ],
          hint:
            "A Y-linked trait cannot pass through females.",
          explanation:
            "Transmission through unaffected females to affected sons is expected for X-linked recessive inheritance and impossible for Y linkage."
        }
      ];

      const item = pick(cases);

      return q(
        "xl11-distinguish-models",
        "xlinked",
        "advanced",
        `A pedigree is currently consistent with either ${item.pair}. ${item.initial}`,
        item.question,
        options(item.correct, item.distractors),
        item.correct,
        item.hint,
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 4 — integrated pedigree-style diagnostic cases
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl11-integrated-case",
    "solving integrated pedigree-style inheritance cases",
    () => {
      const cases = [
        {
          title: "Family A",
          facts: [
            "Generation I includes an affected father and an unaffected mother.",
            "All three daughters are affected.",
            "Neither of the two sons is affected.",
            "One affected daughter later has both affected and unaffected sons and daughters with an unaffected partner."
          ],
          correct: modes.XLD,
          distractors: [modes.AD, modes.MT, modes.XLR],
          hint:
            "Start with the affected father's daughters and sons.",
          explanation:
            "All daughters and no sons of the affected father are affected, which is the hallmark of X-linked dominant inheritance. The affected daughter then transmits the allele to about half of children of either sex."
        },
        {
          title: "Family B",
          facts: [
            "Two unaffected parents have four children.",
            "One son and one daughter are affected.",
            "The trait was also present in a maternal cousin but absent in both parents.",
            "Affected individuals of both sexes can be born to unaffected parents."
          ],
          correct: modes.AR,
          distractors: [modes.XLR, modes.AD, modes.MT],
          hint:
            "An affected daughter with an unaffected father is an important clue.",
          explanation:
            "Unaffected parents producing affected children of both sexes, including an affected daughter with an unaffected father, strongly supports autosomal recessive inheritance."
        },
        {
          title: "Family C",
          facts: [
            "Only males are affected.",
            "An affected grandfather has no affected sons.",
            "One of his unaffected daughters has two affected sons.",
            "No affected male transmits the trait directly to a son."
          ],
          correct: modes.XLR,
          distractors: [modes.Y, modes.SL, modes.AR],
          hint:
            "Follow the allele through the unaffected daughter.",
          explanation:
            "The trait passes from an affected male through an unaffected carrier daughter to affected grandsons, with no father-to-son transmission. This is X-linked recessive inheritance."
        },
        {
          title: "Family D",
          facts: [
            "Every affected individual is male.",
            "Each affected father has only affected sons.",
            "Affected daughters never occur.",
            "The phenotype has remained on the paternal line for four generations."
          ],
          correct: modes.Y,
          distractors: [modes.XLR, modes.SL, modes.AD],
          hint:
            "Look for uninterrupted father-to-son transmission.",
          explanation:
            "Exclusive and complete father-to-son transmission is diagnostic of Y-linked inheritance."
        },
        {
          title: "Family E",
          facts: [
            "An affected woman has four affected children: two sons and two daughters.",
            "Her affected daughter transmits the phenotype to all of her children.",
            "Her affected son transmits the phenotype to none of his children."
          ],
          correct: modes.MT,
          distractors: [modes.XLD, modes.AD, modes.AR],
          hint:
            "Compare transmission by affected mothers and affected fathers.",
          explanation:
            "Affected mothers transmit the condition to all children, whereas affected fathers transmit it to none. This is mitochondrial inheritance."
        },
        {
          title: "Family F",
          facts: [
            "A bull does not display the measured phenotype.",
            "Several of his daughters show exceptionally high milk production.",
            "His sons do not produce milk but can sire high-producing daughters.",
            "The relevant alleles are autosomal."
          ],
          correct: modes.SL,
          distractors: [modes.SI, modes.XLD, modes.MT],
          hint:
            "The alleles pass through both sexes, but the phenotype is anatomically restricted.",
          explanation:
            "Milk production is a female-limited phenotype controlled by autosomal genes that can be carried and transmitted by males."
        },
        {
          title: "Family G",
          facts: [
            "A horn allele is autosomal.",
            "Heterozygous males are horned.",
            "Heterozygous females are hornless.",
            "Homozygous individuals show phenotypes according to allele dosage."
          ],
          correct: modes.SI,
          distractors: [modes.SL, modes.AD, modes.XLD],
          hint:
            "Compare the phenotype of the same heterozygous genotype in males and females.",
          explanation:
            "Because heterozygous males and females differ in phenotype, dominance is influenced by sex. This is sex-influenced autosomal inheritance."
        },
        {
          title: "Family H",
          facts: [
            "Affected individuals occur in every generation.",
            "Males and females are affected at similar frequencies.",
            "An affected father has an affected son.",
            "Affected individuals usually have an affected parent."
          ],
          correct: modes.AD,
          distractors: [modes.XLD, modes.AR, modes.MT],
          hint:
            "Father-to-son transmission rules out X linkage, while vertical transmission suggests dominance.",
          explanation:
            "The trait is dominant, affects both sexes, and passes from father to son. This supports autosomal dominant inheritance."
        },
        {
          title: "Family I",
          facts: [
            "An affected father and unaffected mother have only unaffected children.",
            "All daughters are known carriers.",
            "One carrier daughter later has affected sons with an unaffected male.",
            "No direct father-to-son transmission occurs."
          ],
          correct: modes.XLR,
          distractors: [modes.XLD, modes.AR, modes.Y],
          hint:
            "An affected father can make every daughter a carrier under one specific model.",
          explanation:
            "An affected father passes his recessive X-linked allele to every daughter, making them carriers, while sons receive his Y chromosome. Carrier daughters can then have affected sons."
        },
        {
          title: "Family J",
          facts: [
            "A phenotype is observed in men and women.",
            "Heterozygous men express it, but heterozygous women do not.",
            "Homozygous women express it.",
            "Father-to-son transmission can occur."
          ],
          correct: modes.SI,
          distractors: [modes.XLR, modes.AD, modes.SL],
          hint:
            "The locus is autosomal, but the heterozygous phenotype depends on sex.",
          explanation:
            "The same heterozygous genotype produces different phenotypes in men and women, so the trait is sex-influenced."
        }
      ];

      const item = pick(cases);
      const factsText = item.facts.map((fact, index) => `${index + 1}. ${fact}`).join(" ");

      return q(
        "xl11-integrated-case",
        "xlinked",
        "advanced",
        `${item.title}: ${factsText}`,
        "Which inheritance pattern best explains the complete set of observations?",
        buildOptions(item.correct, item.distractors),
        item.correct,
        item.hint,
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // FAMILY 5 — identify the strongest diagnostic clue
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl11-diagnostic-clue",
    "identifying the most informative pedigree clue",
    () => {
      const cases = [
        {
          mode: modes.XLD,
          correct: "All daughters of an affected father are affected, while none of his sons are affected through him.",
          distractors: [
            "The trait appears in more than one generation.",
            "Both males and females are affected.",
            "Affected mothers can have affected children."
          ],
          explanation:
            "The affected-father pattern directly tracks inheritance of his X chromosome and is therefore the most diagnostic clue for X-linked dominant inheritance."
        },
        {
          mode: modes.XLR,
          correct: "Affected males are linked through unaffected carrier females, with no father-to-son transmission.",
          distractors: [
            "The trait is rare.",
            "More males than females are affected.",
            "The trait can skip one generation."
          ],
          explanation:
            "A male bias alone is not decisive. Transmission through carrier females and absence of father-to-son transmission provide the strongest evidence."
        },
        {
          mode: modes.Y,
          correct: "Every affected father transmits the phenotype to every son.",
          distractors: [
            "Only males express the phenotype.",
            "The phenotype begins after puberty.",
            "Affected men have unaffected daughters."
          ],
          explanation:
            "Male-only expression can have several causes, but complete father-to-son transmission specifically identifies Y linkage."
        },
        {
          mode: modes.MT,
          correct: "Affected mothers transmit the phenotype to children of both sexes, but affected fathers transmit it to none.",
          distractors: [
            "Both sexes are affected.",
            "The trait varies in severity.",
            "The trait appears in several generations."
          ],
          explanation:
            "The contrast between maternal and paternal transmission is the defining diagnostic clue."
        },
        {
          mode: modes.SL,
          correct: "Both sexes inherit the autosomal alleles, but only one sex can express the phenotype.",
          distractors: [
            "The phenotype is more common in one sex.",
            "One sex has a stronger phenotype.",
            "The trait appears after sexual maturity."
          ],
          explanation:
            "Sex-limited inheritance requires complete restriction of expression to one sex even though both sexes can carry the alleles."
        },
        {
          mode: modes.SI,
          correct: "The same autosomal heterozygous genotype produces different phenotypes in males and females.",
          distractors: [
            "Only one sex is affected.",
            "The trait is more common in males.",
            "The phenotype depends on age."
          ],
          explanation:
            "Sex-influenced inheritance is defined by sex-dependent genotype-to-phenotype relationships."
        },
        {
          mode: modes.AD,
          correct: "The trait appears vertically in both sexes and includes father-to-son transmission.",
          distractors: [
            "The trait is common.",
            "Affected individuals may have affected children.",
            "Unaffected individuals usually lack the phenotype."
          ],
          explanation:
            "Vertical transmission suggests dominance, while father-to-son transmission confirms that an autosomal model is possible."
        },
        {
          mode: modes.AR,
          correct: "Unaffected parents produce affected sons and daughters.",
          distractors: [
            "The trait can be severe.",
            "Affected individuals may be related.",
            "The trait is uncommon."
          ],
          explanation:
            "Affected offspring of unaffected parents strongly indicate recessive inheritance, and involvement of both sexes supports an autosomal locus."
        }
      ];

      const item = pick(cases);

      return q(
        "xl11-diagnostic-clue",
        "xlinked",
        "advanced",
        `A student proposes that a pedigree shows ${item.mode}.`,
        "Which observation would provide the strongest support for that diagnosis?",
        options(item.correct, item.distractors),
        item.correct,
        "Choose the clue that uniquely tracks chromosome transmission or sex-dependent expression, not merely a common but nonspecific pattern.",
        item.explanation
      );
    }
  );
}
