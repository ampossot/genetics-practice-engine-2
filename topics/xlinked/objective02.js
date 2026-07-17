/**
 * X-linked Inheritance — Objective 02
 *
 * Learning objective:
 * Determine the gametes produced by X-linked genotypes and infer parental
 * genotypes from sex-chromosome-bearing gametes.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family targets a distinct reasoning task.
 */

export function registerObjective02(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "determining gametes produced by individuals with X-linked genotypes";

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
  const formatGametes = (gametes) => gametes.join(" and ");

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked. ` +
    `${x(locus.dominantAllele)} is associated with ${locus.dominantTrait}, ` +
    `whereas ${x(locus.recessiveAllele)} is associated with ${locus.recessiveTrait}.`;

  // -------------------------------------------------------------------------
  // BEGINNER — identify the complete set of gametes
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "xl2-complete-gamete-set",
    "gamete generation",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          genotype: female(A, a),
          sex: "female",
          correct: formatGametes([x(A), x(a)]),
          distractors: [
            `${x(A)}/${x(a)}`,
            formatGametes([x(A), "Y"]),
            formatGametes([A, a])
          ],
          explanation:
            `The two X chromosomes separate during meiosis, so each egg receives either ${x(A)} or ${x(a)}.`
        },
        {
          genotype: female(A, A),
          sex: "female",
          correct: `Only ${x(A)}`,
          distractors: [
            formatGametes([x(A), x(a)]),
            formatGametes([x(A), "Y"]),
            `${x(A)}/${x(A)}`
          ],
          explanation:
            `Both X chromosomes carry ${A}, so all eggs are genetically the same at this locus and contain ${x(A)}.`
        },
        {
          genotype: female(a, a),
          sex: "female",
          correct: `Only ${x(a)}`,
          distractors: [
            formatGametes([x(A), x(a)]),
            formatGametes([x(a), "Y"]),
            `${x(a)}/${x(a)}`
          ],
          explanation:
            `Both X chromosomes carry ${a}, so every egg contains ${x(a)}.`
        },
        {
          genotype: male(A),
          sex: "male",
          correct: formatGametes([x(A), "Y"]),
          distractors: [
            `${x(A)}/Y`,
            formatGametes([x(A), x(a)]),
            formatGametes([A, "Y"])
          ],
          explanation:
            `The X and Y chromosomes separate during meiosis, producing ${x(A)}-bearing sperm and Y-bearing sperm.`
        },
        {
          genotype: male(a),
          sex: "male",
          correct: formatGametes([x(a), "Y"]),
          distractors: [
            `${x(a)}/Y`,
            formatGametes([x(A), "Y"]),
            formatGametes([a, "Y"])
          ],
          explanation:
            `The male's X chromosome carries ${a}; therefore, sperm receive either ${x(a)} or Y.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl2-complete-gamete-set",
        "xlinked",
        "beginner",
        `${ruleText(locus)} A ${item.sex} has genotype ${item.genotype}.`,
        "Which complete set of gametes can this individual produce?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Each gamete receives one sex chromosome. Keep an X-linked allele attached to its X chromosome.",
        `${item.explanation} Key takeaway: females produce X-bearing eggs, whereas males produce either X-bearing or Y-bearing sperm.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — identify an impossible gamete
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "xl2-impossible-gamete",
    "gamete error detection",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          parent: `a male with genotype ${male(a)}`,
          correct: `${x(a)}/Y`,
          valid: [x(a), "Y", `Either ${x(a)} or Y`],
          explanation:
            "A normal gamete is haploid and receives only one sex chromosome, not both X and Y."
        },
        {
          parent: `a heterozygous female with genotype ${female(A, a)}`,
          correct: "Y",
          valid: [x(A), x(a), `Either ${x(A)} or ${x(a)}`],
          explanation:
            "A female in the XX/XY model has no Y chromosome and therefore cannot produce a Y-bearing egg."
        },
        {
          parent: `a male with genotype ${male(A)}`,
          correct: x(a),
          valid: [x(A), "Y", `Either ${x(A)} or Y`],
          explanation:
            `This male does not possess ${x(a)}, so he cannot produce a sperm carrying that chromosome.`
        },
        {
          parent: `a homozygous female with genotype ${female(a, a)}`,
          correct: `${x(a)}/${x(a)}`,
          valid: [x(a), `An egg carrying ${x(a)}`, `Only ${x(a)}`],
          explanation:
            "A gamete receives one member of a homologous chromosome pair, not both X chromosomes."
        },
        {
          parent: `a heterozygous female with genotype ${female(A, a)}`,
          correct: A,
          valid: [x(A), x(a), `Either ${x(A)} or ${x(a)}`],
          explanation:
            `The allele ${A} is located on an X chromosome; it is not transmitted as a free-floating allele.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl2-impossible-gamete",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} Consider ${item.parent}.`,
        "Which option cannot be a gamete produced by this individual?",
        shuffle([item.correct, ...item.valid]),
        item.correct,
        "Check that the gamete contains exactly one sex chromosome and only genetic material present in the parent.",
        `${item.explanation} Key takeaway: meiosis separates homologous sex chromosomes, and alleles remain physically associated with the chromosome that carries them.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer the parental genotype from observed gametes
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl2-reverse-inference",
    "reverse inference from gametes",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          evidence: `eggs of types ${x(A)} and ${x(a)}`,
          correct: female(A, a),
          distractors: [male(A), male(a), female(A, A)],
          explanation:
            `Producing two different X-bearing egg types requires two different X chromosomes: one carrying ${A} and one carrying ${a}.`
        },
        {
          evidence: `sperm of types ${x(A)} and Y`,
          correct: male(A),
          distractors: [female(A, a), male(a), female(A, A)],
          explanation:
            `Y-bearing gametes identify the parent as male, and the X-bearing sperm reveals that his X chromosome carries ${A}.`
        },
        {
          evidence: `sperm of types ${x(a)} and Y`,
          correct: male(a),
          distractors: [female(a, a), male(A), female(A, a)],
          explanation:
            `The parent must be XY, and the observed X-bearing sperm shows that the X chromosome carries ${a}.`
        },
        {
          evidence: `only eggs carrying ${x(A)}`,
          correct: female(A, A),
          distractors: [female(A, a), male(A), male(a)],
          explanation:
            `A female that produces only ${x(A)} eggs is homozygous at the locus in this standard model.`
        },
        {
          evidence: `only eggs carrying ${x(a)}`,
          correct: female(a, a),
          distractors: [female(A, a), male(a), female(A, A)],
          explanation:
            `All eggs contain ${x(a)}, indicating that both maternal X chromosomes carry ${a}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl2-reverse-inference",
        "xlinked",
        "advanced",
        `${ruleText(locus)} An individual is observed producing ${item.evidence}.`,
        "Which genotype is most consistent with these gametes?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "First use the presence or absence of Y-bearing gametes to infer sex. Then use the X-bearing gamete types to reconstruct the X chromosome genotype.",
        `${item.explanation} Key takeaway: gametes provide direct evidence about the sex chromosomes and X-linked alleles present in the parent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate a student's explanation of gamete formation
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "xl2-evaluate-reasoning",
    "evaluation of meiosis reasoning",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const scenarios = [
        {
          claim: `A male with genotype ${male(A)} produces gametes ${A} and Y.`,
          correct:
            `Incorrect; the allele remains on the X chromosome, so the gametes are ${x(A)} and Y.`,
          distractors: [
            "Correct; alleles separate completely from chromosomes during meiosis.",
            "Incorrect; males produce only Y-bearing sperm.",
            `Correct; ${A} is itself a sex chromosome.`
          ],
          explanation:
            "An X-linked allele must be written together with the X chromosome that carries it."
        },
        {
          claim: `A heterozygous female with genotype ${female(A, a)} produces eggs ${x(A)}, ${x(a)}, and Y.`,
          correct:
            `Incorrect; she produces ${x(A)} and ${x(a)} eggs but cannot produce Y-bearing eggs.`,
          distractors: [
            "Correct; every individual produces both X-bearing and Y-bearing gametes.",
            `Incorrect; she produces only ${x(A)} eggs.`,
            `Correct; the Y gamete contains neither ${A} nor ${a}.`
          ],
          explanation:
            "An XX female does not possess a Y chromosome to place into an egg."
        },
        {
          claim: `A male with genotype ${male(a)} can produce a gamete containing ${x(a)}/Y.`,
          correct:
            `Incorrect; meiosis separates X and Y, so a sperm contains either ${x(a)} or Y.`,
          distractors: [
            "Correct; every sperm receives both sex chromosomes.",
            `Incorrect; he produces only ${x(a)} sperm.`,
            "Correct; sperm are diploid before fertilization."
          ],
          explanation:
            "Normal gametes are haploid and contain one sex chromosome."
        },
        {
          claim: `A female with genotype ${female(a, a)} produces two genetically different egg types because she has two X chromosomes.`,
          correct:
            `Incorrect; both X chromosomes carry ${a}, so all eggs are ${x(a)} at this locus.`,
          distractors: [
            `Correct; one egg type is ${x(a)} and the other is Y.`,
            `Correct; the two egg types are ${x(A)} and ${x(a)}.`,
            "Incorrect; females do not produce eggs through meiosis."
          ],
          explanation:
            "Two homologous chromosomes produce distinct gamete types only when they differ at the locus being considered."
        },
        {
          claim: `A male with genotype ${male(A)} produces approximately equal numbers of ${x(A)}-bearing and Y-bearing sperm.`,
          correct:
            "Correct; segregation of the X and Y chromosomes produces the two sperm classes in approximately equal proportions.",
          distractors: [
            `Incorrect; all sperm carry ${x(A)}.`,
            "Incorrect; all sperm carry Y.",
            `Incorrect; the sperm types are ${x(A)} and ${x(a)}.`
          ],
          explanation:
            "During normal meiosis, X and Y segregate into different sperm classes with an expected 1:1 distribution."
        }
      ];

      const item = pick(scenarios);

      return q(
        "xl2-evaluate-reasoning",
        "xlinked",
        "advanced",
        `${ruleText(locus)} A student states: “${item.claim}”`,
        "What is the best evaluation of the student's reasoning?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Check chromosome number, chromosome origin, and whether the X-linked allele remains attached to the X chromosome.",
        `${item.explanation} Key takeaway: accurate gamete notation must preserve both haploidy and the physical association between an X-linked allele and its X chromosome.`
      );
    }
  );
}
