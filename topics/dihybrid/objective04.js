/**
 * Dihybrid Crosses — Objective 04
 *
 * Learning objective:
 * Construct and interpret dihybrid Punnett squares.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized biological scenarios.
 */

export function registerObjective04(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "constructing and interpreting dihybrid Punnett squares";

  const register = (difficulty, id, task, build) =>
    add("dihybrid", difficulty, id, build, {
      objective: OBJECTIVE,
      task
    });

  const allelePairs = [
    ["A", "B"],
    ["D", "E"],
    ["G", "H"],
    ["M", "N"],
    ["R", "T"]
  ];

  const organisms = [
    "pea plants",
    "fruit flies",
    "corn plants",
    "laboratory mice",
    "beetles"
  ];

  const unique = (items) => [...new Set(items)];

  const gametesFrom = (genotypeA, genotypeB) => {
    const first = unique(genotypeA.split(""));
    const second = unique(genotypeB.split(""));

    return first.flatMap((a) => second.map((b) => `${a}${b}`));
  };

  const combineLocus = (first, second) => {
    if (first === second) return `${first}${second}`;

    const upper =
      first === first.toUpperCase() ? first : second.toUpperCase();
    const lower =
      first === first.toLowerCase() ? first : second.toLowerCase();

    return `${upper}${lower}`;
  };

  const combineGametes = (firstGamete, secondGamete) =>
    `${combineLocus(firstGamete[0], secondGamete[0])}${combineLocus(
      firstGamete[1],
      secondGamete[1]
    )}`;

  const crossLabel = (p1A, p1B, p2A, p2B) =>
    `${p1A}${p1B} × ${p2A}${p2B}`;

  // -------------------------------------------------------------------------
  // BEGINNER — identify correct gamete labels for a Punnett square
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh4-gamete-labels",
    "Punnett-square setup",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          genotypeA: `${A}${a}`,
          genotypeB: `${B}${b}`,
          correct: `${A}${B}, ${A}${b}, ${a}${B}, ${a}${b}`,
          distractors: [
            `${A}${A}, ${A}${a}, ${B}${B}, ${B}${b}`,
            `${A}${B}, ${a}${b}`,
            `${A}, ${a}, ${B}, ${b}`
          ]
        },
        {
          genotypeA: `${A}${A}`,
          genotypeB: `${B}${b}`,
          correct: `${A}${B}, ${A}${b}`,
          distractors: [
            `${A}${B}, ${a}${b}`,
            `${A}${A}, ${B}${b}`,
            `${A}${B}, ${A}${b}, ${a}${B}, ${a}${b}`
          ]
        },
        {
          genotypeA: `${A}${a}`,
          genotypeB: `${b}${b}`,
          correct: `${A}${b}, ${a}${b}`,
          distractors: [
            `${A}${B}, ${a}${b}`,
            `${A}${b}, ${a}${B}`,
            `${A}${a}, ${b}${b}`
          ]
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh4-gamete-labels",
        "dihybrid",
        "beginner",
        `In ${organism}, a parent with genotype ${item.genotypeA}${item.genotypeB} will be placed along one side of a Punnett square.`,
        "Which set correctly lists the unique gamete labels for that parent?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Each gamete receives one allele from the first locus and one allele from the second locus.",
        `${item.correct} is the correct gamete set. A Punnett square must be labeled with gametes, not with complete parental genotypes or isolated alleles. Key takeaway: Punnett-square labels represent all unique allele combinations a parent can transmit.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — complete one Punnett-square cell
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh4-complete-cell",
    "cell construction",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const parent1Gametes = [`${A}${B}`, `${A}${b}`, `${a}${B}`, `${a}${b}`];
      const parent2Gametes = pick([
        [`${A}${B}`, `${A}${b}`, `${a}${B}`, `${a}${b}`],
        [`${a}${B}`, `${a}${b}`],
        [`${A}${B}`, `${A}${b}`]
      ]);

      const rowGamete = pick(parent1Gametes);
      const columnGamete = pick(parent2Gametes);
      const correct = combineGametes(rowGamete, columnGamete);

      const distractors = unique([
        `${rowGamete}${columnGamete}`,
        `${combineLocus(rowGamete[0], columnGamete[1])}${combineLocus(
          rowGamete[1],
          columnGamete[0]
        )}`,
        `${rowGamete[0]}${rowGamete[0]}${columnGamete[1]}${columnGamete[1]}`,
        `${columnGamete[0]}${columnGamete[0]}${rowGamete[1]}${rowGamete[1]}`
      ]).filter((option) => option !== correct);

      return q(
        "dh4-complete-cell",
        "dihybrid",
        "intermediate",
        `A Punnett-square row is labeled ${rowGamete}, and the intersecting column is labeled ${columnGamete}.`,
        "Which offspring genotype belongs in the intersecting cell?",
        shuffle([correct, ...shuffle(distractors).slice(0, 3)]),
        correct,
        "Combine alleles by locus: first-locus allele with first-locus allele, and second-locus allele with second-locus allele.",
        `${rowGamete} contributes ${rowGamete[0]} and ${rowGamete[1]}; ${columnGamete} contributes ${columnGamete[0]} and ${columnGamete[1]}. The cell is therefore ${correct}. A common mistake is to join the gamete labels without reorganizing alleles by locus. Key takeaway: each Punnett-square cell contains one allele from each parent at each locus.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — diagnose a Punnett-square construction error
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh4-error-analysis",
    "Punnett-square error analysis",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          statement:
            `A student labels the rows of an ${A}${a}${B}${b} Punnett square as ${A}, ${a}, ${B}, and ${b}.`,
          correct:
            "The student listed individual alleles instead of complete gametes",
          explanation:
            `The row labels should be ${A}${B}, ${A}${b}, ${a}${B}, and ${a}${b}.`
        },
        {
          statement:
            `At the intersection of gametes ${A}${b} and ${a}${B}, a student writes ${A}${b}${a}${B}.`,
          correct:
            "The student failed to group homologous alleles by locus",
          explanation:
            `The correct genotype is ${A}${a}${B}${b}, not a direct concatenation of the two gamete labels.`
        },
        {
          statement:
            `For the cross ${A}${A}${B}${b} × ${A}${a}${B}${b}, a student draws a 4 × 4 Punnett square with four different gametes from each parent.`,
          correct:
            `The ${A}${A}${B}${b} parent produces only two unique gamete types`,
          explanation:
            `That parent produces ${A}${B} and ${A}${b}; duplicate gametes should not be treated as unique labels.`
        },
        {
          statement:
            `A student places ${A}${A}${B}${B} in a cell formed by gametes ${A}${b} and ${a}${B}.`,
          correct:
            `The cell contains alleles not supplied by the intersecting gametes`,
          explanation:
            `Those gametes combine to form ${A}${a}${B}${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh4-error-analysis",
        "dihybrid",
        "advanced",
        item.statement,
        "What is the student's primary error?",
        shuffle([
          item.correct,
          "The student assumed complete dominance",
          "The student ignored crossing over",
          "The student used too few phenotype categories"
        ]),
        item.correct,
        "Check whether the labels are valid gametes and whether the cell contains exactly the alleles supplied at the row-column intersection.",
        `${item.explanation} Key takeaway: Punnett-square accuracy depends on correct gamete labels and locus-by-locus allele combination.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — infer a missing gamete or parent from square contents
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh4-reverse-inference",
    "reverse Punnett-square inference",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          context:
            `One row gamete is ${A}${b}. The cell at its intersection with an unknown column gamete contains ${A}${a}${b}${b}.`,
          question: "Which column gamete must be missing?",
          options: [`${a}${b}`, `${A}${B}`, `${a}${B}`, `${A}${b}`],
          correct: `${a}${b}`,
          explanation:
            `The offspring already receives ${A} and ${b} from the row gamete, so the missing gamete must contribute ${a} and ${b}.`
        },
        {
          context:
            `One column gamete is ${a}${B}. The intersecting cell contains ${A}${a}${B}${b}.`,
          question: "Which row gamete produced that cell?",
          options: [`${A}${b}`, `${A}${B}`, `${a}${b}`, `${a}${B}`],
          correct: `${A}${b}`,
          explanation:
            `The column supplies ${a} and ${B}; the row must therefore supply ${A} and ${b}.`
        },
        {
          context:
            `A parent's Punnett-square labels are ${A}${B} and ${A}${b}.`,
          question: "Which parental genotype is consistent with these labels?",
          options: [
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`,
            `${A}${a}${b}${b}`,
            `${a}${a}${B}${b}`
          ],
          correct: `${A}${A}${B}${b}`,
          explanation:
            `Every gamete carries ${A}, so the parent is ${A}${A}; the parent contributes either ${B} or ${b}, so it is ${B}${b}.`
        },
        {
          context:
            `A parent's Punnett-square labels are ${A}${b} and ${a}${b}.`,
          question: "Which parental genotype is consistent with these labels?",
          options: [
            `${A}${a}${b}${b}`,
            `${A}${A}${B}${b}`,
            `${a}${a}${B}${b}`,
            `${A}${a}${B}${b}`
          ],
          correct: `${A}${a}${b}${b}`,
          explanation:
            `The parent contributes either ${A} or ${a}, but always contributes ${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh4-reverse-inference",
        "dihybrid",
        "advanced",
        item.context,
        item.question,
        shuffle(item.options),
        item.correct,
        "Subtract the alleles already supplied by the known gamete or infer the parental genotype from all gamete labels.",
        `${item.explanation} Therefore, the answer is ${item.correct}. Key takeaway: Punnett squares can be read backward as well as forward.`
      );
    }
  );
}
