/**
 * Dihybrid Crosses — Objective 03
 *
 * Learning objective:
 * Predict which offspring genotypes are possible from dihybrid crosses.
 */

export function registerObjective03(ctx) {
  const { add, q, pick, chooseOptions, shuffle } = ctx;

  const OBJECTIVE =
    "predicting possible offspring genotypes from dihybrid crosses";

  const register = (difficulty, id, task, build) =>
    add("dihybrid", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const organisms = [
    "a pea plant",
    "a fruit fly",
    "a corn plant",
    "a laboratory mouse",
    "a beetle"
  ];

  const allelePairs = [
    ["A", "B"],
    ["D", "E"],
    ["G", "H"],
    ["M", "N"],
    ["R", "T"]
  ];

  const locusOffspring = (parent1, parent2) => {
    const genotypes = [];

    for (const allele1 of parent1.split("")) {
      for (const allele2 of parent2.split("")) {
        const upper = allele1 === allele1.toUpperCase()
          ? allele1
          : allele2;
        const lower = allele1 === allele1.toLowerCase()
          ? allele1
          : allele2;

        const genotype =
          allele1 === allele2
            ? `${allele1}${allele2}`
            : `${upper.toUpperCase()}${lower.toLowerCase()}`;

        genotypes.push(genotype);
      }
    }

    return [...new Set(genotypes)];
  };

  const offspringGenotypes = (
    firstParentA,
    firstParentB,
    secondParentA,
    secondParentB
  ) => {
    const locusA = locusOffspring(firstParentA, secondParentA);
    const locusB = locusOffspring(firstParentB, secondParentB);

    return locusA.flatMap((aGenotype) =>
      locusB.map((bGenotype) => `${aGenotype}${bGenotype}`)
    );
  };

  const crossData = (A, B) => {
    const a = A.toLowerCase();
    const b = B.toLowerCase();

    return [
      {
        parent1A: `${A}${a}`,
        parent1B: `${B}${b}`,
        parent2A: `${A}${a}`,
        parent2B: `${B}${b}`
      },
      {
        parent1A: `${A}${a}`,
        parent1B: `${B}${b}`,
        parent2A: `${a}${a}`,
        parent2B: `${b}${b}`
      },
      {
        parent1A: `${A}${A}`,
        parent1B: `${B}${b}`,
        parent2A: `${a}${a}`,
        parent2B: `${B}${b}`
      },
      {
        parent1A: `${A}${a}`,
        parent1B: `${b}${b}`,
        parent2A: `${a}${a}`,
        parent2B: `${B}${b}`
      }
    ];
  };

  const crossLabel = (item) =>
    `${item.parent1A}${item.parent1B} × ${item.parent2A}${item.parent2B}`;

  const allStandardGenotypes = (A, B) => {
    const a = A.toLowerCase();
    const b = B.toLowerCase();

    return [
      `${A}${A}${B}${B}`,
      `${A}${A}${B}${b}`,
      `${A}${A}${b}${b}`,
      `${A}${a}${B}${B}`,
      `${A}${a}${B}${b}`,
      `${A}${a}${b}${b}`,
      `${a}${a}${B}${B}`,
      `${a}${a}${B}${b}`,
      `${a}${a}${b}${b}`
    ];
  };

  // -------------------------------------------------------------------------
  // BEGINNER — recognize one possible offspring genotype
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh3-possible-offspring",
    "possibility recognition",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const cross = pick(crossData(A, B));
      const possible = offspringGenotypes(
        cross.parent1A,
        cross.parent1B,
        cross.parent2A,
        cross.parent2B
      );
      const impossible = allStandardGenotypes(A, B).filter(
        (genotype) => !possible.includes(genotype)
      );
      const correct = pick(possible);

      return q(
        "dh3-possible-offspring",
        "dihybrid",
        "beginner",
        `In ${organism}, consider the cross ${crossLabel(cross)}. The two loci assort independently.`,
        "Which offspring genotype can be produced by this cross?",
        shuffle([
          correct,
          ...shuffle(impossible).slice(0, 3)
        ]),
        correct,
        "At each locus, the offspring must receive one allele from each parent. Check the two loci separately.",
        `${correct} is possible because each allele can be traced to one of the two parents at its locus. The other options require at least one parental contribution that cannot occur. Key takeaway: build an offspring genotype one locus at a time, using one allele from each parent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — identify a genotype excluded by parental alleles
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh3-impossible-offspring",
    "constraint reasoning",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const cross = pick(crossData(A, B));
      const possible = offspringGenotypes(
        cross.parent1A,
        cross.parent1B,
        cross.parent2A,
        cross.parent2B
      );
      const impossible = allStandardGenotypes(A, B).filter(
        (genotype) => !possible.includes(genotype)
      );
      const correct = pick(impossible);

      return q(
        "dh3-impossible-offspring",
        "dihybrid",
        "intermediate",
        `A ${organism} is produced from the cross ${crossLabel(cross)}.`,
        "Which offspring genotype cannot be produced?",
        shuffle([
          correct,
          ...shuffle(possible).slice(0, 3)
        ]),
        correct,
        "Look for a homozygous genotype that would require both parents to contribute an allele that one parent does not carry.",
        `${correct} cannot be produced because at least one required allele cannot be supplied by the appropriate parent. Independent assortment recombines parental alleles, but it cannot create an allele absent from the cross. Key takeaway: parental allele availability sets strict limits on possible offspring genotypes.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer which parental cross can produce a target genotype
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh3-parent-cross",
    "reverse inference",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const cases = [
        {
          target: `${a}${a}${b}${b}`,
          correct: `${A}${a}${B}${b} × ${A}${a}${B}${b}`,
          distractors: [
            `${A}${A}${B}${B} × ${a}${a}${b}${b}`,
            `${A}${A}${B}${b} × ${A}${a}${B}${B}`,
            `${A}${A}${b}${b} × ${a}${a}${B}${B}`
          ],
          reason:
            `To produce ${a}${a}${b}${b}, both parents must be able to contribute ${a} and ${b}.`
        },
        {
          target: `${A}${A}${B}${b}`,
          correct: `${A}${a}${B}${b} × ${A}${A}${B}${B}`,
          distractors: [
            `${a}${a}${B}${b} × ${a}${a}${B}${B}`,
            `${A}${a}${b}${b} × ${a}${a}${b}${b}`,
            `${A}${A}${b}${b} × ${a}${a}${b}${b}`
          ],
          reason:
            `The offspring needs an ${A} allele from both parents and must receive ${B} from one parent and ${b} from the other.`
        },
        {
          target: `${A}${a}${b}${b}`,
          correct: `${A}${a}${B}${b} × ${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B} × ${A}${A}${B}${B}`,
            `${a}${a}${B}${B} × ${a}${a}${B}${B}`,
            `${A}${A}${B}${B} × ${a}${a}${B}${B}`
          ],
          reason:
            `The offspring must receive one ${A}, one ${a}, and a ${b} allele from each parent.`
        }
      ];

      const item = pick(cases);

      return q(
        "dh3-parent-cross",
        "dihybrid",
        "advanced",
        `Assume normal meiosis and independent assortment at the ${A}/${a} and ${B}/${b} loci.`,
        `Which parental cross can produce an offspring with genotype ${item.target}?`,
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Work backward. For each locus, determine which allele each parent must be capable of contributing.",
        `${item.correct} can produce ${item.target}. ${item.reason} Key takeaway: reverse inference begins by assigning each offspring allele to a possible parental source.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose an invalid offspring claim
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh3-evaluate-reasoning",
    "misconception analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();
      const claimed = `${A}${A}${B}${B}`;
      const cross = `${A}${a}${B}${b} × ${a}${a}${b}${b}`;
      const correct =
        `The ${a}${a}${b}${b} parent cannot contribute ${A} or ${B}`;

      return q(
        "dh3-evaluate-reasoning",
        "dihybrid",
        "advanced",
        `A student claims that the cross ${cross} can produce an offspring with genotype ${claimed}.`,
        "What is the best evaluation of the student's claim?",
        [
          correct,
          "The claim is correct because dominant alleles are always inherited preferentially",
          "The claim is incorrect only because the two genes assort independently",
          "The claim would become correct if crossing over occurred"
        ],
        correct,
        "For each pair of offspring alleles, identify which allele would have to come from each parent.",
        `The claim is incorrect. To produce ${claimed}, both parents would need to contribute ${A} and ${B}. However, the ${a}${a}${b}${b} parent can contribute only ${a} and ${b}. Dominance affects phenotype, not which alleles can be transmitted. Key takeaway: offspring genotypes are constrained by parental alleles, regardless of dominance or crossing over.`,
        {
          "The claim is correct because dominant alleles are always inherited preferentially":
            "Dominant alleles are not transmitted more frequently simply because they are dominant.",
          "The claim is incorrect only because the two genes assort independently":
            "Independent assortment affects allele combinations, not whether an absent allele can appear.",
          "The claim would become correct if crossing over occurred":
            "Crossing over rearranges existing alleles; it does not create dominant alleles in a homozygous recessive parent."
        }
      );
    }
  );
}
