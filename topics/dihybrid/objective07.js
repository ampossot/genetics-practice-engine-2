/**
 * Dihybrid Crosses — Objective 07
 *
 * Learning objective:
 * Design and evaluate crosses that test hypotheses about dihybrid genotypes
 * and inheritance patterns.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized scenarios.
 */

export function registerObjective07(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "designing and evaluating informative dihybrid crosses";

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
    "pea plant",
    "fruit fly",
    "corn plant",
    "laboratory mouse",
    "beetle"
  ];

  // -------------------------------------------------------------------------
  // BEGINNER — choose the most informative tester
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh7-choose-tester",
    "tester selection",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          unknown:
            `an individual (${organism}) showing dominant phenotypes at both loci`,
          goal:
            `determine whether it is heterozygous at either locus`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${b}${b}`
          ],
          explanation:
            `A double-recessive tester contributes only ${a} and ${b}, so every offspring phenotype directly reveals the alleles contributed by the unknown parent.`
        },
        {
          unknown:
            `an individual showing the dominant ${A} phenotype but recessive ${b}${b} phenotype`,
          goal:
            `determine whether the individual is ${A}${A}${b}${b} or ${A}${a}${b}${b}`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${b}${b}`
          ],
          explanation:
            `The tester must be ${a}${a} at the uncertain locus; using ${b}${b} also keeps the second locus unambiguous.`
        },
        {
          unknown:
            `an individual showing dominant phenotypes at both loci`,
          goal:
            `reveal all gamete types produced by the unknown parent`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${b}`
          ],
          explanation:
            `A double-recessive tester makes each offspring phenotype correspond to one gamete from the unknown parent.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh7-choose-tester",
        "dihybrid",
        "beginner",
        `A researcher has ${item.unknown} and wants to ${item.goal}.`,
        "Which tester genotype would be most informative?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Use a tester that contributes only recessive alleles at the loci being investigated.",
        `${item.explanation} Therefore, ${item.correct} is the most informative tester. Key takeaway: homozygous recessive testers expose the alleles transmitted by an unknown parent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — choose a cross that distinguishes two genotype hypotheses
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh7-distinguish-hypotheses",
    "hypothesis-discriminating cross design",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          hypotheses: `${A}${A}${B}${b} or ${A}${a}${B}${b}`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`
          ],
          evidence:
            `recessive ${a}${a} offspring would occur only if the unknown parent were ${A}${a}${B}${b}`,
          explanation:
            `The double-recessive tester makes the uncertain ${A}/${a} contribution visible while also revealing the ${B}/${b} contribution.`
        },
        {
          hypotheses: `${A}${a}${B}${B} or ${A}${a}${B}${b}`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${B}`,
            `${A}${a}${B}${b}`
          ],
          evidence:
            `recessive ${b}${b} offspring would occur only if the unknown parent carried ${b}`,
          explanation:
            `The tester contributes ${b} to every offspring, so the unknown parent's second-locus allele is exposed.`
        },
        {
          hypotheses: `${A}${A}${B}${B} or ${A}${a}${B}${b}`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${A}${b}${b}`,
            `${A}${a}${B}${b}`
          ],
          evidence:
            `any recessive phenotype class would support the double-heterozygote hypothesis`,
          explanation:
            `The two hypotheses make sharply different predictions against a double-recessive tester: all dominant versus four segregating classes.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh7-distinguish-hypotheses",
        "dihybrid",
        "intermediate",
        `An unknown dominant-phenotype individual could be ${item.hypotheses}.`,
        "Which mate would best distinguish these two genotype hypotheses?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Choose a mate that causes the candidate genotypes to predict clearly different offspring classes.",
        `${item.explanation} In particular, ${item.evidence}. Key takeaway: a strong experimental cross maximizes the difference between competing predictions.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — identify the most informative offspring result
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh7-informative-outcome",
    "informative evidence selection",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          cross: `unknown ${A}_${B}_ × ${a}${a}${b}${b}`,
          hypotheses:
            `${A}${A}${B}${B} versus ${A}${a}${B}${b}`,
          correct:
            `Observation of any ${a}${a} or ${b}${b} offspring`,
          distractors: [
            `Observation of an ${A}_${B}_ offspring`,
            "Observation that fertilization occurred",
            "Observation of equal numbers of males and females"
          ],
          explanation:
            `The homozygous dominant hypothesis cannot produce recessive offspring, whereas the double heterozygote can.`
        },
        {
          cross: `unknown ${A}_${B}_ × ${a}${a}${b}${b}`,
          hypotheses:
            `${A}${A}${B}${b} versus ${A}${a}${B}${b}`,
          correct:
            `Observation of an ${a}${a} offspring`,
          distractors: [
            `Observation of a ${b}${b} offspring`,
            `Observation of an ${A}_${B}_ offspring`,
            "Observation of four phenotype classes in one family of four"
          ],
          explanation:
            `Both hypotheses can produce ${b}${b}, but only the heterozygous first-locus hypothesis can produce ${a}${a}.`
        },
        {
          cross: `unknown ${A}_${B}_ × ${a}${a}${b}${b}`,
          hypotheses:
            `${A}${a}${B}${B} versus ${A}${a}${B}${b}`,
          correct:
            `Observation of a ${b}${b} offspring`,
          distractors: [
            `Observation of an ${a}${a} offspring`,
            `Observation of an ${A}_${B}_ offspring`,
            "Observation of a dominant phenotype at the first locus"
          ],
          explanation:
            `Both hypotheses segregate at the first locus, but only the second carries ${b} and can produce ${b}${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh7-informative-outcome",
        "dihybrid",
        "advanced",
        `A researcher performs ${item.cross} to distinguish ${item.hypotheses}.`,
        "Which observation would provide the clearest evidence distinguishing the hypotheses?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Look for an offspring class predicted by one hypothesis but impossible under the other.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()} is the most informative result. Key takeaway: the strongest evidence is often an outcome that one hypothesis cannot produce.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate flawed experimental designs
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh7-evaluate-design",
    "experimental design critique",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          proposal:
            `To determine whether an ${A}_${B}_ individual is ${A}${A}${B}${B} or ${A}${a}${B}${b}, a student crosses it with ${A}${A}${B}${B}.`,
          correct:
            "The dominant tester masks recessive alleles carried by the unknown parent",
          explanation:
            `Using ${a}${a}${b}${b} would make the unknown parent's gametes visible in the offspring.`
        },
        {
          proposal:
            `A student examines only one offspring from a dihybrid testcross and concludes that the unknown parent is homozygous at both loci.`,
          correct:
            "One offspring provides too little evidence to exclude heterozygosity",
          explanation:
            "A heterozygous parent can produce a dominant offspring by chance; a larger sample is needed."
        },
        {
          proposal:
            `A student records only whether offspring are dominant at both loci and ignores the other three phenotype classes.`,
          correct:
            "Discarding phenotype classes removes information needed to infer the parental genotype",
          explanation:
            "All four classes are informative in a dihybrid testcross."
        },
        {
          proposal:
            `A student chooses two parents with unknown dominant phenotypes to test whether one of them is heterozygous at both loci.`,
          correct:
            "Because both parental genotypes are uncertain, the offspring cannot be attributed clearly to either parent",
          explanation:
            `Crossing the unknown individual to ${a}${a}${b}${b} isolates the unknown parent's allele contributions.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh7-evaluate-design",
        "dihybrid",
        "advanced",
        item.proposal,
        "What is the main weakness of this experimental design?",
        shuffle([
          item.correct,
          "The design violates independent assortment",
          "The design requires crossing over to occur",
          "The design uses too many loci for a genetic cross"
        ]),
        item.correct,
        "Ask whether the chosen cross and sample provide observations that distinguish the competing genotype hypotheses.",
        `${item.explanation} Key takeaway: an informative design controls the tester genotype, preserves all relevant offspring categories, and uses enough observations to evaluate alternative explanations.`
      );
    }
  );
}
