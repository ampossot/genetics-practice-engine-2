/**
 * Sex Linkage — Objective 10
 *
 * Learning objective:
 * Distinguish sex-linked, sex-limited, and sex-influenced inheritance, and
 * predict phenotypes when autosomal alleles are expressed differently by sex.
 *
 * Generator families:
 *   1. Classify sex-linked, sex-limited, and sex-influenced traits.
 *   2. Predict phenotypes for sex-influenced autosomal genotypes.
 *   3. Infer inheritance mode from crosses and pedigree-style evidence.
 *   4. Evaluate common misconceptions about sex and inheritance.
 *
 * This objective deliberately targets a frequent student error:
 * a phenotype restricted to one sex is not automatically sex-linked.
 */

export function registerObjective10(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "distinguishing sex-linked, sex-limited, and sex-influenced inheritance";

  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const options = (correct, distractors) =>
    shuffle([correct, ...distractors.filter((item) => item !== correct)]).slice(0, 4);

  const percentOptions = (correct) =>
    shuffle(
      [correct, "0%", "25%", "50%", "75%", "100%"].filter(
        (value, index, array) => array.indexOf(value) === index
      )
    ).slice(0, 4);

  const influencedTraits = [
    {
      organism: "humans",
      trait: "pattern hair loss",
      allele1: "B",
      allele2: "b",
      maleRule:
        "BB and Bb males express pattern hair loss; bb males do not.",
      femaleRule:
        "Only BB females express pattern hair loss; Bb and bb females do not.",
      phenotype: "pattern hair loss",
      alternative: "no pattern hair loss"
    },
    {
      organism: "sheep",
      trait: "horn development",
      allele1: "H",
      allele2: "h",
      maleRule:
        "HH and Hh males are horned; hh males are hornless.",
      femaleRule:
        "Only HH females are horned; Hh and hh females are hornless.",
      phenotype: "horned",
      alternative: "hornless"
    },
    {
      organism: "goats",
      trait: "beard development",
      allele1: "G",
      allele2: "g",
      maleRule:
        "GG and Gg males develop a beard; gg males do not.",
      femaleRule:
        "Only GG females develop a beard; Gg and gg females do not.",
      phenotype: "bearded",
      alternative: "not bearded"
    },
    {
      organism: "deer",
      trait: "antler growth tendency",
      allele1: "A",
      allele2: "a",
      maleRule:
        "AA and Aa males develop the trait; aa males do not.",
      femaleRule:
        "Only AA females develop the trait; Aa and aa females do not.",
      phenotype: "antler growth",
      alternative: "no antler growth"
    }
  ];

  const limitedTraits = [
    {
      organism: "cattle",
      trait: "milk production",
      expressedSex: "females",
      genotypeFact:
        "Alleles affecting milk yield are autosomal and can be carried by both males and females."
    },
    {
      organism: "roosters",
      trait: "cock feathering",
      expressedSex: "males",
      genotypeFact:
        "The responsible autosomal alleles may be inherited by both sexes, but the phenotype is expressed only in males."
    },
    {
      organism: "humans",
      trait: "beard growth",
      expressedSex: "males",
      genotypeFact:
        "Autosomal genes affecting beard growth can be inherited by anyone, but the phenotype is normally expressed only in males."
    },
    {
      organism: "hens",
      trait: "egg production",
      expressedSex: "females",
      genotypeFact:
        "Both sexes can inherit alleles affecting egg production, although only females express the trait."
    },
    {
      organism: "deer",
      trait: "lactation",
      expressedSex: "females",
      genotypeFact:
        "Autosomal alleles affecting lactation can pass through males even though the phenotype is expressed only in females."
    }
  ];

  const sexLinkedExamples = [
    {
      organism: "fruit flies",
      trait: "white eye colour",
      evidence:
        "reciprocal crosses give different results, and fathers transmit the allele to daughters but not to sons"
    },
    {
      organism: "humans",
      trait: "red-green colour blindness",
      evidence:
        "affected males inherit the allele through their mothers, and father-to-son transmission is absent"
    },
    {
      organism: "mice",
      trait: "an X-linked coat-colour mutation",
      evidence:
        "males are hemizygous, and daughters inherit their father's X chromosome"
    },
    {
      organism: "beetles",
      trait: "an X-linked wing-pattern allele",
      evidence:
        "the phenotype depends on which allele is carried on the X chromosome"
    }
  ];

  // -------------------------------------------------------------------------
  // BEGINNER — classify the inheritance category
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl10-classify-mode",
    "classifying sex-linked, sex-limited, and sex-influenced inheritance",
    () => {
      const category = pick(["sex-linked", "sex-limited", "sex-influenced"]);

      if (category === "sex-linked") {
        const item = pick(sexLinkedExamples);

        return q(
          "xl10-classify-mode",
          "xlinked",
          "beginner",
          `A geneticist studies ${item.trait} in ${item.organism}.`,
          `The key evidence is that ${item.evidence}. Which term best describes the inheritance pattern?`,
          options("Sex-linked", [
            "Sex-limited",
            "Sex-influenced",
            "Autosomal with identical expression in both sexes"
          ]),
          "Sex-linked",
          "Ask where the gene is located. A trait is sex-linked when the gene is on a sex chromosome.",
          "The transmission pattern depends directly on the X chromosome, so this is sex-linked inheritance."
        );
      }

      if (category === "sex-limited") {
        const item = pick(limitedTraits);

        return q(
          "xl10-classify-mode",
          "xlinked",
          "beginner",
          `${item.genotypeFact}`,
          `${item.trait} is expressed only in ${item.expressedSex}. Which term best describes this pattern?`,
          options("Sex-limited", [
            "Sex-linked",
            "Sex-influenced",
            "Y-linked in every case"
          ]),
          "Sex-limited",
          "A sex-limited trait is usually controlled by autosomal genes but expressed in only one sex.",
          `The alleles can be inherited by both sexes, but ${item.trait} is expressed only in ${item.expressedSex}. That makes it sex-limited.`
        );
      }

      const item = pick(influencedTraits);

      return q(
        "xl10-classify-mode",
        "xlinked",
        "beginner",
        `In ${item.organism}, ${item.trait} is controlled by an autosomal locus. ${item.maleRule} ${item.femaleRule}`,
        "Which term best describes this pattern?",
        options("Sex-influenced", [
          "Sex-linked",
          "Sex-limited",
          "Y-linked"
        ]),
        "Sex-influenced",
        "A sex-influenced trait is expressed in both sexes, but dominance or phenotype differs by sex.",
        "The locus is autosomal, yet the same genotype can produce different phenotypes in males and females. That is sex-influenced inheritance."
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — predict phenotype from genotype and sex
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl10-sex-influenced-phenotype",
    "predicting phenotype for a sex-influenced trait",
    () => {
      const item = pick(influencedTraits);
      const genotypes = [
        `${item.allele1}${item.allele1}`,
        `${item.allele1}${item.allele2}`,
        `${item.allele2}${item.allele2}`
      ];
      const sex = pick(["male", "female"]);
      const genotype = pick(genotypes);

      let correct;

      if (sex === "male") {
        correct =
          genotype === `${item.allele2}${item.allele2}`
            ? item.alternative
            : item.phenotype;
      } else {
        correct =
          genotype === `${item.allele1}${item.allele1}`
            ? item.phenotype
            : item.alternative;
      }

      const distractors = [
        item.phenotype,
        item.alternative,
        "The phenotype cannot be predicted from genotype and sex.",
        "The individual must be heterozygous."
      ];

      const explanation =
        sex === "male"
          ? `For males, ${item.allele1} behaves as dominant: both ${item.allele1}${item.allele1} and ${item.allele1}${item.allele2} express ${item.phenotype}.`
          : `For females, ${item.allele1} behaves as recessive in this model: only ${item.allele1}${item.allele1} expresses ${item.phenotype}.`;

      return q(
        "xl10-sex-influenced-phenotype",
        "xlinked",
        "intermediate",
        `In ${item.organism}, ${item.trait} is sex-influenced. ${item.maleRule} ${item.femaleRule}`,
        `What phenotype is expected for a ${sex} with genotype ${genotype}?`,
        options(correct, distractors),
        correct,
        "Do not apply one dominance rule to both sexes. Use the rule specified for the individual's sex.",
        explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — predict offspring classes for sex-influenced crosses
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl10-sex-influenced-cross",
    "predicting offspring in sex-influenced autosomal crosses",
    () => {
      const item = pick(influencedTraits);
      const A = item.allele1;
      const a = item.allele2;

      const scenarios = [
        {
          cross: `${A}${a} female × ${A}${a} male`,
          question:
            `What percentage of daughters is expected to express ${item.phenotype}?`,
          correct: "25%",
          explanation:
            `The genotypic ratio is 1 ${A}${A} : 2 ${A}${a} : 1 ${a}${a}. Only ${A}${A} females express ${item.phenotype}, so 25% of daughters are expected to show it.`
        },
        {
          cross: `${A}${a} female × ${A}${a} male`,
          question:
            `What percentage of sons is expected to express ${item.phenotype}?`,
          correct: "75%",
          explanation:
            `Among sons, both ${A}${A} and ${A}${a} express ${item.phenotype}. Together they make up 75%.`
        },
        {
          cross: `${A}${A} female × ${a}${a} male`,
          question:
            `What percentage of daughters is expected to express ${item.phenotype}?`,
          correct: "0%",
          explanation:
            `All daughters are ${A}${a}. In females, that genotype does not express ${item.phenotype} in this model.`
        },
        {
          cross: `${A}${A} female × ${a}${a} male`,
          question:
            `What percentage of sons is expected to express ${item.phenotype}?`,
          correct: "100%",
          explanation:
            `All sons are ${A}${a}, and heterozygous males express ${item.phenotype}.`
        },
        {
          cross: `${A}${a} female × ${a}${a} male`,
          question:
            `What percentage of daughters is expected to express ${item.phenotype}?`,
          correct: "0%",
          explanation:
            `Daughters are either ${A}${a} or ${a}${a}; neither female genotype expresses ${item.phenotype}.`
        },
        {
          cross: `${A}${a} female × ${a}${a} male`,
          question:
            `What percentage of sons is expected to express ${item.phenotype}?`,
          correct: "50%",
          explanation:
            `Half of sons are ${A}${a} and express ${item.phenotype}; half are ${a}${a} and do not.`
        },
        {
          cross: `${A}${A} female × ${A}${a} male`,
          question:
            `What percentage of all offspring is expected to express ${item.phenotype}?`,
          correct: "100%",
          explanation:
            `All offspring receive at least one ${A}. Daughters are ${A}${A} or ${A}${a}; only the ${A}${A} daughters express the trait, but every son with ${A} does. Wait carefully: half of daughters are ${A}${A}, half ${A}${a}; all sons express it. Therefore 75% of all offspring express the trait.`
        },
        {
          cross: `${A}${A} female × ${A}${a} male`,
          question:
            `What percentage of all offspring is expected to express ${item.phenotype}?`,
          correct: "75%",
          explanation:
            `All sons express ${item.phenotype}. Among daughters, half are ${A}${A} and express it, while half are ${A}${a} and do not. With equal sex probability: 1/2 + 1/4 = 3/4.`
        }
      ];

      const itemScenario = pick(scenarios.filter(
        (scenario, index) => !(index === 6)
      ));

      return q(
        "xl10-sex-influenced-cross",
        "xlinked",
        "advanced",
        `In ${item.organism}, ${item.trait} is controlled by an autosomal sex-influenced locus. ${item.maleRule} ${item.femaleRule}`,
        `Cross: ${itemScenario.cross}. ${itemScenario.question}`,
        percentOptions(itemScenario.correct),
        itemScenario.correct,
        "First calculate the autosomal genotype ratio. Then translate each genotype into phenotype separately for sons and daughters.",
        itemScenario.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer inheritance mode from evidence
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl10-infer-mode",
    "inferring inheritance mode from crosses or pedigrees",
    () => {
      const scenarios = [
        {
          evidence:
            "Both sexes carry the alleles, but only females express the phenotype. Males can transmit the allele to daughters.",
          correct: "Sex-limited",
          distractors: ["X-linked recessive", "Sex-influenced", "Y-linked"],
          explanation:
            "The locus can be inherited through either sex, but expression is restricted to females. That is sex-limited inheritance."
        },
        {
          evidence:
            "The same heterozygous autosomal genotype produces the phenotype in males but not in females.",
          correct: "Sex-influenced",
          distractors: ["Sex-linked", "Sex-limited", "Mitochondrial"],
          explanation:
            "The gene is autosomal, but dominance differs by sex. That is sex-influenced inheritance."
        },
        {
          evidence:
            "An affected father transmits the allele to all daughters but none of his sons.",
          correct: "Sex-linked",
          distractors: ["Sex-limited", "Sex-influenced", "Autosomal recessive"],
          explanation:
            "This transmission pattern follows the father's X chromosome."
        },
        {
          evidence:
            "Only males display the phenotype, but affected fathers can have unaffected sons and daughters who later produce affected sons.",
          correct: "Not enough evidence to call it sex-limited; X-linked recessive is plausible",
          distractors: [
            "Definitely Y-linked",
            "Definitely sex-influenced",
            "Definitely mitochondrial"
          ],
          explanation:
            "Male-only expression does not automatically mean sex-limited. The absence of father-to-son transmission and passage through daughters can indicate X-linked recessive inheritance."
        },
        {
          evidence:
            "A dairy bull never produces milk but can have daughters with unusually high milk yield.",
          correct: "Sex-limited",
          distractors: ["X-linked dominant", "Y-linked", "Sex-influenced"],
          explanation:
            "The bull carries autosomal alleles affecting milk production even though he cannot express the phenotype."
        },
        {
          evidence:
            "A heterozygous genotype causes horns in males but not females, while homozygotes of both sexes are horned.",
          correct: "Sex-influenced",
          distractors: ["Sex-linked", "Sex-limited", "Y-linked"],
          explanation:
            "The phenotype occurs in both sexes, but dominance differs between males and females."
        },
        {
          evidence:
            "A trait appears only in males and is passed from every affected father to every son.",
          correct: "Y-linked",
          distractors: ["Sex-limited autosomal", "X-linked recessive", "Sex-influenced"],
          explanation:
            "Strict father-to-son transmission is characteristic of Y linkage."
        },
        {
          evidence:
            "A trait appears in both sexes, but reciprocal crosses produce different offspring distributions.",
          correct: "Sex-linked",
          distractors: ["Sex-limited", "Sex-influenced", "Autosomal dominant"],
          explanation:
            "Different reciprocal-cross outcomes indicate that the sex of the parent carrying the allele matters, as expected for sex linkage."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl10-infer-mode",
        "xlinked",
        "advanced",
        "A geneticist is trying to classify a trait from family and cross data.",
        `Evidence: ${item.evidence} Which interpretation is best?`,
        options(item.correct, item.distractors),
        item.correct,
        "Separate three questions: Where is the gene located? Which sex can express it? Does the same genotype behave differently by sex?",
        item.explanation
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate misconceptions
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl10-misconception",
    "evaluating misconceptions about sex and inheritance",
    () => {
      const scenarios = [
        {
          statement:
            `"A trait found only in males must be Y-linked."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only in mammals", "Cannot be evaluated"],
          explanation:
            "Male-limited autosomal traits and X-linked recessive traits can also appear mainly or exclusively in males."
        },
        {
          statement:
            `"Sex-limited traits are always encoded on a sex chromosome."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only in females", "Cannot be evaluated"],
          explanation:
            "Sex-limited traits are commonly controlled by autosomal genes whose expression depends on sex-specific anatomy or physiology."
        },
        {
          statement:
            `"In a sex-influenced trait, the same genotype can produce different phenotypes in males and females."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for Y-linked traits", "Cannot be evaluated"],
          explanation:
            "That is the defining feature of sex-influenced inheritance."
        },
        {
          statement:
            `"A male can carry alleles for a female-limited trait and transmit them to daughters."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only if the gene is X-linked", "Cannot be evaluated"],
          explanation:
            "Because the genes are usually autosomal, males can carry and transmit them even though they do not express the phenotype."
        },
        {
          statement:
            `"If reciprocal crosses produce different results, an autosomal sex-limited trait is the only explanation."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only in fruit flies", "Cannot be evaluated"],
          explanation:
            "Different reciprocal-cross outcomes are often evidence of sex linkage, maternal effects, or cytoplasmic inheritance."
        },
        {
          statement:
            `"Sex-influenced inheritance means the gene must be located on the X chromosome."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only in males", "Cannot be evaluated"],
          explanation:
            "Sex-influenced loci are typically autosomal; sex affects expression or dominance, not chromosome location."
        },
        {
          statement:
            `"A daughter can inherit an allele for a male-limited trait and later transmit it to her sons."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only if she expresses the trait", "Cannot be evaluated"],
          explanation:
            "Expression is limited by sex, but inheritance is not. Females can carry and transmit autosomal alleles for male-limited traits."
        },
        {
          statement:
            `"The phrase 'sex-linked' describes gene location, whereas 'sex-limited' and 'sex-influenced' describe expression."`,
          correct: "Correct",
          distractors: ["Incorrect", "Correct only for dominant traits", "Cannot be evaluated"],
          explanation:
            "Sex-linked refers to a gene on a sex chromosome. Sex-limited and sex-influenced refer to how autosomal genotypes are expressed in males and females."
        },
        {
          statement:
            `"A phenotype that occurs in both sexes cannot be sex-influenced."`,
          correct: "Incorrect",
          distractors: ["Correct", "Correct only in mammals", "Cannot be evaluated"],
          explanation:
            "Sex-influenced traits may occur in both sexes, but genotype-to-phenotype relationships differ by sex."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl10-misconception",
        "xlinked",
        "advanced",
        "Consider the terminology used for traits associated with biological sex.",
        `Evaluate this statement: ${item.statement}`,
        options(item.correct, item.distractors),
        item.correct,
        "Do not confuse chromosome location with sex-specific expression.",
        item.explanation
      );
    }
  );
}
