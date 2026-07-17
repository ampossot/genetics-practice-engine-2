/**
 * X-linked Inheritance — Objective 01
 *
 * Learning objective:
 * Interpret sex chromosomes and X-linked genotype notation, recognize
 * hemizygosity, and apply basic chromosome-transmission rules.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective01(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "interpreting sex chromosomes and X-linked genotype notation";

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
  const female = (firstAllele, secondAllele) =>
    `${x(firstAllele)}/${x(secondAllele)}`;
  const male = (allele) => `${x(allele)}/Y`;

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked. ` +
    `${x(locus.dominantAllele)} produces ${locus.dominantTrait}, whereas ` +
    `${x(locus.recessiveAllele)} produces ${locus.recessiveTrait}. ` +
    "Assume complete dominance.";

  // -------------------------------------------------------------------------
  // BEGINNER — identify sex from the sex-chromosome genotype
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl1-identify-sex",
    "sex identification",
    () => {
      const locus = pick(loci);
      const scenarios = [
        {
          genotype: male(locus.dominantAllele),
          correct: "Male",
          explanation: "The genotype contains one X chromosome and one Y chromosome."
        },
        {
          genotype: male(locus.recessiveAllele),
          correct: "Male",
          explanation: "The Y chromosome identifies this individual as male in an XY system."
        },
        {
          genotype: female(locus.dominantAllele, locus.recessiveAllele),
          correct: "Female",
          explanation: "The genotype contains two X chromosomes."
        },
        {
          genotype: female(locus.recessiveAllele, locus.recessiveAllele),
          correct: "Female",
          explanation: "Two X chromosomes identify this individual as female in an XX/XY system."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl1-identify-sex",
        "xlinked",
        "beginner",
        `${ruleText(locus)} An individual has genotype ${item.genotype}.`,
        "What is the sex of this individual?",
        shuffle(["Female", "Male", "Cannot be determined", "This is a gamete"]),
        item.correct,
        "Use the sex chromosomes, not the dominant or recessive allele, to identify sex.",
        `${item.explanation} Key takeaway: XX individuals are female and XY individuals are male in the inheritance model used here.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — interpret sex, genotype, and phenotype together
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl1-interpret-genotype",
    "genotype interpretation",
    () => {
      const locus = pick(loci);
      const scenarios = [
        {
          genotype: male(locus.recessiveAllele),
          correct: `A male showing ${locus.recessiveTrait}`,
          distractors: [
            `A female showing ${locus.recessiveTrait}`,
            `A female carrier showing ${locus.dominantTrait}`,
            `A male carrier showing ${locus.dominantTrait}`
          ],
          explanation:
            `The individual is male because the genotype is XY. Its only X chromosome carries ${locus.recessiveAllele}, so the recessive phenotype is expressed.`
        },
        {
          genotype: male(locus.dominantAllele),
          correct: `A male showing ${locus.dominantTrait}`,
          distractors: [
            `A female showing ${locus.dominantTrait}`,
            `A male carrying both alleles`,
            `A female carrier showing ${locus.recessiveTrait}`
          ],
          explanation:
            `The individual is male and has only one allele at this X-linked locus: ${locus.dominantAllele}.`
        },
        {
          genotype: female(locus.dominantAllele, locus.recessiveAllele),
          correct: `A heterozygous female showing ${locus.dominantTrait}`,
          distractors: [
            `A male showing ${locus.dominantTrait}`,
            `A homozygous female showing ${locus.recessiveTrait}`,
            `A male carrier showing ${locus.recessiveTrait}`
          ],
          explanation:
            `The two X chromosomes identify a female. Complete dominance means the ${locus.dominantAllele} allele masks ${locus.recessiveAllele} in the heterozygote.`
        },
        {
          genotype: female(locus.recessiveAllele, locus.recessiveAllele),
          correct: `A homozygous female showing ${locus.recessiveTrait}`,
          distractors: [
            `A heterozygous female showing ${locus.dominantTrait}`,
            `A male showing ${locus.recessiveTrait}`,
            `A female carrier showing ${locus.dominantTrait}`
          ],
          explanation:
            `The individual has two X chromosomes and two recessive alleles, so the recessive phenotype is expressed.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl1-interpret-genotype",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} An individual has genotype ${item.genotype}.`,
        "Which description is correct?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "First identify the sex chromosomes. Then determine which allele or alleles are present on the X chromosome(s).",
        `${item.explanation} Key takeaway: males are hemizygous for most X-linked loci because they carry only one X-linked allele.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — detect notation that violates basic chromosome logic
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl1-impossible-genotype",
    "chromosome-logic error detection",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          correct: "Y/Y",
          explanation:
            "A standard diploid individual in the XX/XY model cannot receive a Y chromosome from the mother, so Y/Y is not a valid genotype."
        },
        {
          correct: `${x(A)}${x(a)}/Y`,
          explanation:
            "This notation assigns two X-linked alleles plus a Y chromosome while presenting them as an ordinary male genotype. A standard XY male has one X-linked allele, not two."
        },
        {
          correct: `${x(A)}/${x(a)}/${x(a)}`,
          explanation:
            "This notation contains three X chromosomes and is not a standard XX or XY genotype for the model being used."
        },
        {
          correct: `${x(A + a)}/Y`,
          explanation:
            "A single X chromosome cannot simultaneously carry two alternative alleles at the same locus."
        }
      ];

      const item = pick(scenarios);
      const valid = [
        male(A),
        male(a),
        female(A, a),
        female(a, a),
        female(A, A)
      ].filter((value) => value !== item.correct);

      return q(
        "xl1-impossible-genotype",
        "xlinked",
        "advanced",
        `${ruleText(locus)} Use the standard XX/XY chromosome model.`,
        "Which genotype is not valid under this model?",
        shuffle([item.correct, ...shuffle(valid).slice(0, 3)]),
        item.correct,
        "Count the sex chromosomes and remember that each X chromosome carries only one allele at a particular locus.",
        `${item.explanation} Key takeaway: a standard female genotype contains two X-linked allele positions, whereas a standard male genotype contains one X-linked allele position and a Y chromosome.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate fundamental X-linked inheritance statements
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl1-evaluate-statement",
    "statement evaluation",
    () => {
      const locus = pick(loci);
      const scenarios = [
        {
          correct: "A male inherits his X chromosome from his mother.",
          distractors: [
            "A male inherits his X chromosome from his father.",
            "A father passes his X chromosome to every son.",
            "A male receives one X chromosome from each parent."
          ],
          explanation:
            "A son receives Y from his father and X from his mother."
        },
        {
          correct: "A father passes his X chromosome to all of his daughters.",
          distractors: [
            "A father passes his X chromosome to all of his sons.",
            "A father passes Y to all of his daughters.",
            "A daughter receives both X chromosomes from her mother."
          ],
          explanation:
            "Every daughter receives the father's X chromosome and one X chromosome from the mother."
        },
        {
          correct: "A standard XY male is hemizygous for most X-linked genes.",
          distractors: [
            "A standard XY male is heterozygous for every X-linked gene.",
            "A standard XY male has two alleles for every X-linked gene.",
            "Hemizygous means having two identical alleles."
          ],
          explanation:
            "Hemizygous means that only one allele is present at the locus rather than a homologous pair."
        },
        {
          correct: "A recessive X-linked allele can be expressed in a male with only one copy.",
          distractors: [
            "A recessive X-linked allele requires two copies in a male.",
            "Males can carry a recessive X-linked allele without either expressing or transmitting it.",
            "The Y chromosome always carries a matching dominant allele."
          ],
          explanation:
            "Most X-linked loci have no corresponding allele on the Y chromosome, so the allele on the male's single X chromosome determines the phenotype."
        },
        {
          correct: "A heterozygous female may carry a recessive X-linked allele without showing the recessive phenotype.",
          distractors: [
            "A heterozygous female must show the recessive phenotype.",
            "Females cannot carry X-linked alleles.",
            "A female has only one allele at every X-linked locus."
          ],
          explanation:
            "Under complete dominance, the dominant allele determines the phenotype of a heterozygous female."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl1-evaluate-statement",
        "xlinked",
        "advanced",
        `${ruleText(locus)} Consider ordinary inheritance in an XX/XY system.`,
        "Which statement is correct?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Track which sex chromosome each parent contributes to sons and daughters, and remember that an XY male usually has only one allele at an X-linked locus.",
        `${item.explanation} Key takeaway: mothers provide X chromosomes to sons, whereas fathers provide their X chromosome to daughters and their Y chromosome to sons.`
      );
    }
  );
}
