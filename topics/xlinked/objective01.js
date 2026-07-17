/**
 * X-linked Inheritance — Objective 01
 *
 * Learning objective:
 * Interpret sex chromosomes and X-linked genotype notation, recognize
 * hemizygosity, and apply basic chromosome-transmission rules.
 *
 * Architecture:
 * Four beginner families, four intermediate families, and four advanced
 * families. Each family assesses a distinct cognitive task and contains
 * randomized biological contexts.
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

  const options = (correct, distractors) =>
    shuffle([correct, ...distractors]);

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
      organism: "zebrafish",
      gene: "fin pigmentation",
      dominantTrait: "normal fin pigmentation",
      recessiveTrait: "pale fin pigmentation",
      dominantAllele: "F",
      recessiveAllele: "f"
    },
    {
      organism: "crickets",
      gene: "antenna length",
      dominantTrait: "long antennae",
      recessiveTrait: "short antennae",
      dominantAllele: "L",
      recessiveAllele: "l"
    },
    {
      organism: "mealworms",
      gene: "cuticle colour",
      dominantTrait: "dark cuticle",
      recessiveTrait: "light cuticle",
      dominantAllele: "K",
      recessiveAllele: "k"
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
    "Assume complete dominance and the standard XX/XY model.";

  // =========================================================================
  // BEGINNER — recognition, notation, allele counting, and terminology
  // =========================================================================

  register(
    "beginner",
    "xl1-identify-sex",
    "sex identification",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          genotype: male(locus.dominantAllele),
          correct: "Male",
          explanation:
            "The genotype contains one X chromosome and one Y chromosome."
        },
        {
          genotype: male(locus.recessiveAllele),
          correct: "Male",
          explanation:
            "The presence of a Y chromosome identifies the individual as male in this model."
        },
        {
          genotype: female(locus.dominantAllele, locus.recessiveAllele),
          correct: "Female",
          explanation:
            "The genotype contains two X chromosomes."
        },
        {
          genotype: female(locus.recessiveAllele, locus.recessiveAllele),
          correct: "Female",
          explanation:
            "Two X chromosomes identify the individual as female in the standard XX/XY model."
        },
        {
          genotype: female(locus.dominantAllele, locus.dominantAllele),
          correct: "Female",
          explanation:
            "The sex is determined by the chromosome combination, not by which allele is present."
        }
      ]);

      return q(
        "xl1-identify-sex",
        "xlinked",
        "beginner",
        `${ruleText(locus)} An individual has genotype ${item.genotype}.`,
        "What is the sex of this individual?",
        options(item.correct, [
          item.correct === "Male" ? "Female" : "Male",
          "Cannot be determined from the genotype",
          "This notation describes a gamete"
        ]),
        item.correct,
        "Use the X and Y chromosomes, not the allele symbols, to identify sex.",
        `${item.explanation} Key takeaway: in this model, XX denotes female and XY denotes male.`
      );
    }
  );

  register(
    "beginner",
    "xl1-recognize-valid-notation",
    "notation recognition",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const item = pick([
        {
          description: "a heterozygous female",
          correct: female(A, a),
          distractors: [
            `${x(A + a)}/Y`,
            `${x(A)}/${a}`,
            `${x(A)}/Y`
          ]
        },
        {
          description: `a male carrying ${a} on his X chromosome`,
          correct: male(a),
          distractors: [
            `${x(a)}/${x(a)}`,
            `${x(a)}/${a}`,
            `Y/${a}`
          ]
        },
        {
          description: "a homozygous dominant female",
          correct: female(A, A),
          distractors: [
            male(A),
            `${x(A)}/${A}`,
            `${x(A + A)}/Y`
          ]
        },
        {
          description: "a homozygous recessive female",
          correct: female(a, a),
          distractors: [
            male(a),
            `${x(a)}/Y/${x(a)}`,
            `${a}/${a}`
          ]
        }
      ]);

      return q(
        "xl1-recognize-valid-notation",
        "xlinked",
        "beginner",
        `${ruleText(locus)}`,
        `Which genotype correctly represents ${item.description}?`,
        options(item.correct, item.distractors),
        item.correct,
        "Place each X-linked allele on an X chromosome. A standard male has one X and one Y; a standard female has two X chromosomes.",
        `${item.correct} is the correctly structured genotype. Key takeaway: allele symbols belong on X chromosomes, and the number of allele positions must match the number of X chromosomes.`
      );
    }
  );

  register(
    "beginner",
    "xl1-count-xlinked-alleles",
    "allele counting",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          genotype: male(locus.dominantAllele),
          correct: "One X-linked allele",
          explanation:
            "The individual has one X chromosome, so there is one allele position at this X-linked locus."
        },
        {
          genotype: male(locus.recessiveAllele),
          correct: "One X-linked allele",
          explanation:
            "The Y chromosome does not provide a second allele at the locus in this model."
        },
        {
          genotype: female(locus.dominantAllele, locus.recessiveAllele),
          correct: "Two X-linked alleles",
          explanation:
            "Each of the two X chromosomes carries one allele at the locus."
        },
        {
          genotype: female(locus.recessiveAllele, locus.recessiveAllele),
          correct: "Two X-linked alleles",
          explanation:
            "The alleles are identical, but there are still two allele copies because there are two X chromosomes."
        }
      ]);

      return q(
        "xl1-count-xlinked-alleles",
        "xlinked",
        "beginner",
        `${ruleText(locus)} Consider the genotype ${item.genotype}.`,
        `How many alleles of the ${locus.gene} locus are represented?`,
        options(item.correct, [
          item.correct === "One X-linked allele"
            ? "Two X-linked alleles"
            : "One X-linked allele",
          "Three X-linked alleles",
          "No X-linked alleles"
        ]),
        item.correct,
        "Count the X chromosomes. Each X chromosome contributes one allele position at the locus.",
        `${item.explanation} Key takeaway: standard XY males are represented with one X-linked allele, whereas standard XX females are represented with two.`
      );
    }
  );

  register(
    "beginner",
    "xl1-classify-zygosity",
    "zygosity classification",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          genotype: male(locus.dominantAllele),
          correct: "Hemizygous",
          explanation:
            "The male has only one allele at the X-linked locus."
        },
        {
          genotype: male(locus.recessiveAllele),
          correct: "Hemizygous",
          explanation:
            "A standard XY male has one X-linked allele and therefore is hemizygous."
        },
        {
          genotype: female(locus.dominantAllele, locus.recessiveAllele),
          correct: "Heterozygous",
          explanation:
            "The two X chromosomes carry different alleles."
        },
        {
          genotype: female(locus.dominantAllele, locus.dominantAllele),
          correct: "Homozygous dominant",
          explanation:
            "Both X chromosomes carry the dominant allele."
        },
        {
          genotype: female(locus.recessiveAllele, locus.recessiveAllele),
          correct: "Homozygous recessive",
          explanation:
            "Both X chromosomes carry the recessive allele."
        }
      ]);

      return q(
        "xl1-classify-zygosity",
        "xlinked",
        "beginner",
        `${ruleText(locus)} An individual has genotype ${item.genotype}.`,
        "Which term best describes this individual's allele state at the X-linked locus?",
        options(item.correct, [
          "Hemizygous",
          "Heterozygous",
          "Homozygous dominant",
          "Homozygous recessive"
        ].filter((choice) => choice !== item.correct).slice(0, 3)),
        item.correct,
        "Count the allele copies first, then ask whether two copies are identical or different.",
        `${item.explanation} Key takeaway: hemizygous means that only one allele is present at the locus.`
      );
    }
  );

  // =========================================================================
  // INTERMEDIATE — phenotype, reverse inference, comparison, and transmission
  // =========================================================================

  register(
    "intermediate",
    "xl1-genotype-to-phenotype",
    "phenotype prediction",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          genotype: male(locus.recessiveAllele),
          correct: `A male showing ${locus.recessiveTrait}`,
          explanation:
            `His only X chromosome carries ${locus.recessiveAllele}, so the recessive phenotype is expressed.`
        },
        {
          genotype: male(locus.dominantAllele),
          correct: `A male showing ${locus.dominantTrait}`,
          explanation:
            `His only X-linked allele is ${locus.dominantAllele}, so the dominant phenotype is expressed.`
        },
        {
          genotype: female(locus.dominantAllele, locus.recessiveAllele),
          correct: `A heterozygous female showing ${locus.dominantTrait}`,
          explanation:
            "Complete dominance causes the dominant allele to determine the phenotype of the heterozygote."
        },
        {
          genotype: female(locus.recessiveAllele, locus.recessiveAllele),
          correct: `A homozygous female showing ${locus.recessiveTrait}`,
          explanation:
            "Both X chromosomes carry the recessive allele, so the recessive phenotype is expressed."
        },
        {
          genotype: female(locus.dominantAllele, locus.dominantAllele),
          correct: `A homozygous female showing ${locus.dominantTrait}`,
          explanation:
            "Both X chromosomes carry the dominant allele."
        }
      ]);

      return q(
        "xl1-genotype-to-phenotype",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} The genotype is ${item.genotype}.`,
        "Which description is correct?",
        options(item.correct, [
          `A male showing ${locus.dominantTrait}`,
          `A male showing ${locus.recessiveTrait}`,
          `A heterozygous female showing ${locus.dominantTrait}`,
          `A homozygous female showing ${locus.recessiveTrait}`
        ].filter((choice) => choice !== item.correct).slice(0, 3)),
        item.correct,
        "Identify sex first, then determine which allele or alleles are present and apply dominance.",
        `${item.explanation} Key takeaway: a recessive X-linked allele is expressed in a male when it is present on his single X chromosome.`
      );
    }
  );

  register(
    "intermediate",
    "xl1-description-to-genotype",
    "genotype construction",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const item = pick([
        {
          description: `a male showing ${locus.recessiveTrait}`,
          correct: male(a),
          distractors: [male(A), female(A, a), female(a, a)]
        },
        {
          description: `a male showing ${locus.dominantTrait}`,
          correct: male(A),
          distractors: [male(a), female(A, A), female(A, a)]
        },
        {
          description: `a carrier female showing ${locus.dominantTrait}`,
          correct: female(A, a),
          distractors: [female(A, A), female(a, a), male(a)]
        },
        {
          description: `a female showing ${locus.recessiveTrait}`,
          correct: female(a, a),
          distractors: [female(A, a), male(a), female(A, A)]
        },
        {
          description: `a homozygous female showing ${locus.dominantTrait}`,
          correct: female(A, A),
          distractors: [female(A, a), male(A), female(a, a)]
        }
      ]);

      return q(
        "xl1-description-to-genotype",
        "xlinked",
        "intermediate",
        `${ruleText(locus)}`,
        `Which genotype best represents ${item.description}?`,
        options(item.correct, item.distractors),
        item.correct,
        "Translate the sex description into XX or XY, then place the allele required for the stated phenotype on each X chromosome.",
        `${item.correct} matches both the chromosome combination and the phenotype description. Key takeaway: construct the sex chromosomes first, then assign the X-linked allele or alleles.`
      );
    }
  );

  register(
    "intermediate",
    "xl1-compare-sexes",
    "male-female comparison",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          prompt:
            `Compare ${male(locus.recessiveAllele)} with ${female(locus.dominantAllele, locus.recessiveAllele)}.`,
          correct:
            `The male shows ${locus.recessiveTrait}, whereas the heterozygous female shows ${locus.dominantTrait}.`,
          explanation:
            "The male has no second X-linked allele to mask the recessive allele, whereas the female carries a dominant allele on her other X chromosome."
        },
        {
          prompt:
            `Compare ${male(locus.dominantAllele)} with ${female(locus.recessiveAllele, locus.recessiveAllele)}.`,
          correct:
            `The male shows ${locus.dominantTrait}, whereas the female shows ${locus.recessiveTrait}.`,
          explanation:
            "Phenotype depends on the allele or alleles present, not simply on sex."
        },
        {
          prompt:
            `Compare ${male(locus.recessiveAllele)} with ${female(locus.recessiveAllele, locus.recessiveAllele)}.`,
          correct:
            `Both show ${locus.recessiveTrait}, but the male is hemizygous and the female is homozygous recessive.`,
          explanation:
            "They share a phenotype but differ in allele copy number and zygosity."
        },
        {
          prompt:
            `Compare ${male(locus.dominantAllele)} with ${female(locus.dominantAllele, locus.recessiveAllele)}.`,
          correct:
            `Both show ${locus.dominantTrait}, but the male is hemizygous and the female is heterozygous.`,
          explanation:
            "The same phenotype can result from different genotype structures."
        }
      ]);

      return q(
        "xl1-compare-sexes",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} ${item.prompt}`,
        "Which comparison is correct?",
        options(item.correct, [
          "Both individuals must have identical genotypes because they have the same locus.",
          "The female is hemizygous because she has two X chromosomes.",
          "The Y chromosome always supplies a second dominant allele in the male."
        ]),
        item.correct,
        "Compare chromosome number, allele copy number, and phenotype separately.",
        `${item.explanation} Key takeaway: similar phenotypes do not necessarily imply identical genotype structure or zygosity.`
      );
    }
  );

  register(
    "intermediate",
    "xl1-parental-origin",
    "parent-of-origin reasoning",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          child: "son",
          chromosome: `his ${x(locus.recessiveAllele)} chromosome`,
          correct: "His mother",
          distractors: ["His father", "Either parent with equal probability", "Neither parent"],
          explanation:
            "A son receives Y from his father and X from his mother."
        },
        {
          child: "daughter",
          chromosome: "her paternal X chromosome",
          correct: "Her father",
          distractors: ["Her mother", "Either grandparent directly", "It cannot be inherited"],
          explanation:
            "Every daughter receives one X chromosome from her father."
        },
        {
          child: "daughter",
          chromosome: "her maternal X chromosome",
          correct: "Her mother",
          distractors: ["Her father", "Only her paternal grandmother", "The chromosome forms after fertilization"],
          explanation:
            "A daughter receives one X from her mother and one X from her father."
        },
        {
          child: "son",
          chromosome: "his Y chromosome",
          correct: "His father",
          distractors: ["His mother", "Either parent", "His maternal grandfather"],
          explanation:
            "A son receives Y from his father in the standard XX/XY model."
        }
      ]);

      return q(
        "xl1-parental-origin",
        "xlinked",
        "intermediate",
        `${ruleText(locus)} Consider a ${item.child} and trace the origin of ${item.chromosome}.`,
        "From whom was this chromosome inherited directly?",
        options(item.correct, item.distractors),
        item.correct,
        "Write the sex-chromosome contribution of each parent: the mother contributes X; the father contributes X or Y.",
        `${item.explanation} Key takeaway: fathers transmit X to daughters and Y to sons, while mothers transmit X to both sons and daughters.`
      );
    }
  );

  // =========================================================================
  // ADVANCED — error detection, correction, evidence, and sufficiency
  // =========================================================================

  register(
    "advanced",
    "xl1-impossible-genotype",
    "chromosome-logic error detection",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const item = pick([
        {
          correct: "Y/Y",
          explanation:
            "A standard diploid individual cannot receive a Y chromosome from the mother, so Y/Y is not valid in this model."
        },
        {
          correct: `${x(A)}${x(a)}/Y`,
          explanation:
            "This notation assigns two alleles at one X-linked locus to a standard XY male, who has only one X chromosome."
        },
        {
          correct: `${x(A)}/${x(a)}/${x(a)}`,
          explanation:
            "The notation contains three X chromosomes rather than a standard XX or XY combination."
        },
        {
          correct: `${x(A + a)}/Y`,
          explanation:
            "One X chromosome cannot carry two alternative alleles at the same locus."
        },
        {
          correct: `${x(a)}/${a}`,
          explanation:
            "The second allele is written without an X chromosome even though X-linked alleles must be assigned to X chromosomes."
        }
      ]);

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
        `${ruleText(locus)}`,
        "Which genotype is not valid under the standard XX/XY model?",
        options(item.correct, shuffle(valid).slice(0, 3)),
        item.correct,
        "Count the sex chromosomes and confirm that each X chromosome carries only one allele at this locus.",
        `${item.explanation} Key takeaway: chromosome structure constrains how many X-linked allele positions a genotype may contain.`
      );
    }
  );

  register(
    "advanced",
    "xl1-correct-student-notation",
    "notation correction",
    () => {
      const locus = pick(loci);
      const A = locus.dominantAllele;
      const a = locus.recessiveAllele;

      const item = pick([
        {
          claim: `A student writes ${a}/Y for a male showing ${locus.recessiveTrait}.`,
          correct: `Replace it with ${male(a)} because the allele belongs on the X chromosome.`,
          distractors: [
            `Replace it with ${female(a, a)} because recessive phenotypes always require two copies.`,
            `Replace it with Y/${x(a)} because Y must be written first.`,
            "The notation is already complete and needs no correction."
          ]
        },
        {
          claim: `A student writes ${x(A + a)}/Y for a male carrying both alleles.`,
          correct: `Replace it with either ${male(A)} or ${male(a)} because a standard XY male has one allele at the locus.`,
          distractors: [
            `Replace it with ${female(A, a)} but continue calling the individual male.`,
            "Keep the notation because one X chromosome can contain both alternative alleles.",
            `Replace it with ${x(A)}/${x(a)}/Y because males require three sex chromosomes.`
          ]
        },
        {
          claim: `A student writes ${x(A)}/${a} for a heterozygous female.`,
          correct: `Replace it with ${female(A, a)} because each allele must be placed on an X chromosome.`,
          distractors: [
            `Replace it with ${male(a)} because heterozygous individuals are always male.`,
            `Replace it with ${female(A, A)} because dominant alleles erase recessive alleles from notation.`,
            "The notation is correct because only one X needs to be written."
          ]
        },
        {
          claim: `A student labels ${male(a)} as a heterozygous male.`,
          correct: "Change the description to hemizygous male because only one X-linked allele is present.",
          distractors: [
            "Change the description to homozygous recessive male.",
            "Keep heterozygous because X and Y count as two different alleles.",
            "Change the genotype to Y/Y."
          ]
        }
      ]);

      return q(
        "xl1-correct-student-notation",
        "xlinked",
        "advanced",
        `${ruleText(locus)} ${item.claim}`,
        "What is the best correction?",
        options(item.correct, item.distractors),
        item.correct,
        "Check both the chromosome combination and the placement and number of alleles.",
        `${item.correct} Key takeaway: correct notation must represent chromosome structure, allele location, and zygosity consistently.`
      );
    }
  );

  register(
    "advanced",
    "xl1-evaluate-statement",
    "statement evaluation",
    () => {
      const locus = pick(loci);
      const item = pick([
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
            "Hemizygous means that only one allele is present at the locus."
        },
        {
          correct: "A recessive X-linked allele can be expressed in a male with only one copy.",
          distractors: [
            "A recessive X-linked allele requires two copies in a male.",
            "A male can carry a recessive X-linked allele without expressing it under complete dominance.",
            "The Y chromosome always carries a matching dominant allele."
          ],
          explanation:
            "Most X-linked loci lack a corresponding allele on the Y chromosome."
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
        },
        {
          correct: "Confirmed direct father-to-son transmission excludes X-linked inheritance.",
          distractors: [
            "Father-to-son transmission is expected for X-linked genes.",
            "A father gives the same X chromosome to his sons and daughters.",
            "Father-to-son transmission proves that the mother is a carrier."
          ],
          explanation:
            "A son receives his Y chromosome, not his X chromosome, from his father."
        }
      ]);

      return q(
        "xl1-evaluate-statement",
        "xlinked",
        "advanced",
        `${ruleText(locus)} Consider ordinary inheritance in an XX/XY system.`,
        "Which statement is correct?",
        options(item.correct, item.distractors),
        item.correct,
        "Track which sex chromosome each parent contributes and distinguish hemizygosity from homozygosity and heterozygosity.",
        `${item.explanation} Key takeaway: chromosome transmission rules determine which parent can directly contribute an X-linked allele to a son or daughter.`
      );
    }
  );

  register(
    "advanced",
    "xl1-information-sufficiency",
    "information sufficiency",
    () => {
      const locus = pick(loci);
      const item = pick([
        {
          evidence:
            `An individual shows ${locus.dominantTrait}, but the individual's sex and family history are unknown.`,
          question:
            "Can the exact X-linked genotype be determined from this phenotype alone?",
          correct:
            "No; several genotypes may produce the dominant phenotype, and the sex is not known.",
          distractors: [
            `Yes; the genotype must be ${male(locus.dominantAllele)}.`,
            `Yes; the genotype must be ${female(locus.dominantAllele, locus.dominantAllele)}.`,
            "No; phenotypes never provide any genetic information."
          ],
          explanation:
            "A dominant phenotype could occur in a hemizygous male, a heterozygous female, or a homozygous dominant female."
        },
        {
          evidence:
            `A male shows ${locus.recessiveTrait} under complete dominance.`,
          question:
            "Is this information sufficient to identify his X-linked genotype?",
          correct:
            `Yes; his genotype must be ${male(locus.recessiveAllele)} in the standard model.`,
          distractors: [
            `No; he could also be ${female(locus.recessiveAllele, locus.recessiveAllele)}.`,
            `No; his genotype could be ${male(locus.dominantAllele)}.`,
            "Yes; his genotype must contain two recessive alleles."
          ],
          explanation:
            "A standard XY male has only one allele at the locus, and the recessive phenotype identifies that allele."
        },
        {
          evidence:
            `A female shows ${locus.recessiveTrait} under complete dominance.`,
          question:
            "Is this information sufficient to identify her X-linked genotype?",
          correct:
            `Yes; her genotype must be ${female(locus.recessiveAllele, locus.recessiveAllele)}.`,
          distractors: [
            `No; she could be ${female(locus.dominantAllele, locus.recessiveAllele)}.`,
            `Yes; her genotype must be ${male(locus.recessiveAllele)}.`,
            "No; a recessive phenotype gives no information about allele state."
          ],
          explanation:
            "Under complete dominance, a standard XX female must have two recessive alleles to show the recessive phenotype."
        },
        {
          evidence:
            "A daughter inherited an X-linked allele, but the allele carried by her other X chromosome is unknown.",
          question:
            "Can her phenotype always be predicted?",
          correct:
            "No; the phenotype may depend on the allele present on her other X chromosome.",
          distractors: [
            "Yes; every inherited X-linked allele is automatically expressed.",
            "Yes; daughters receive only one X chromosome.",
            "No; daughters never express X-linked traits."
          ],
          explanation:
            "A daughter has two X chromosomes, so dominance and the second allele may affect phenotype."
        }
      ]);

      return q(
        "xl1-information-sufficiency",
        "xlinked",
        "advanced",
        `${ruleText(locus)} ${item.evidence}`,
        item.question,
        options(item.correct, item.distractors),
        item.correct,
        "List all genotypes consistent with the stated sex and phenotype. If more than one remains possible, the information is insufficient.",
        `${item.explanation} Key takeaway: phenotype can identify genotype only when the chromosome combination and dominance rules leave a single possibility.`
      );
    }
  );
}
