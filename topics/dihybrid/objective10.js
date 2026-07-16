/**
 * Dihybrid Crosses — Objective 10
 *
 * Learning objective:
 * Use testcrosses to determine unknown parental genotypes and evaluate
 * the strength of testcross evidence.
 *
 * Design:
 * One beginner family, one intermediate family, and two advanced families.
 * Each family contains multiple randomized biological scenarios.
 */

export function registerObjective10(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE =
    "using testcrosses to determine unknown dihybrid genotypes";

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
  // BEGINNER — select the most informative tester
  // -------------------------------------------------------------------------

  register(
    "beginner",
    "dh10-choose-tester",
    "tester selection",
    () => {
      const organism = pick(organisms);
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          unknown:
            `a ${organism} showing dominant phenotypes at both loci (${A}_${B}_)`,
          goal:
            "determine whether it is homozygous or heterozygous at either locus",
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${b}${b}`
          ],
          explanation:
            `The ${a}${a}${b}${b} tester contributes only recessive alleles, so every offspring phenotype reveals the alleles contributed by the unknown parent.`
        },
        {
          unknown:
            `a ${organism} with phenotype ${A}_${b}${b}`,
          goal:
            `distinguish ${A}${A}${b}${b} from ${A}${a}${b}${b}`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${b}${b}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`
          ],
          explanation:
            `The uncertain locus is ${A}/${a}. A tester that is ${a}${a} makes any recessive allele contributed by the unknown parent visible.`
        },
        {
          unknown:
            `a ${organism} with phenotype ${a}${a}${B}_`,
          goal:
            `distinguish ${a}${a}${B}${B} from ${a}${a}${B}${b}`,
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${a}${a}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`
          ],
          explanation:
            `The uncertain locus is ${B}/${b}. The ${b}${b} tester exposes whether the unknown parent contributes ${b}.`
        },
        {
          unknown:
            `a ${organism} showing dominant phenotypes at both loci`,
          goal:
            "make each offspring phenotype correspond directly to one gamete from the unknown parent",
          correct: `${a}${a}${b}${b}`,
          distractors: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${b}`
          ],
          explanation:
            `With a double-recessive tester, the tester's contribution is fixed, so offspring classes directly reveal the unknown parent's gametes.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-choose-tester",
        "dihybrid",
        "beginner",
        `A researcher has ${item.unknown} and wants to ${item.goal}.`,
        "Which tester genotype is most informative?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Choose a tester that contributes only recessive alleles at every locus being investigated.",
        `${item.explanation} Therefore, ${item.correct} is the most informative tester. Key takeaway: a testcross uses homozygous recessive testers to reveal hidden parental alleles.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // INTERMEDIATE — infer the unknown genotype from testcross results
  // -------------------------------------------------------------------------

  register(
    "intermediate",
    "dh10-interpret-results",
    "testcross interpretation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          result:
            `four phenotype classes occur in an approximately 1:1:1:1 ratio`,
          correct: `${A}${a}${B}${b}`,
          options: [
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`,
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${B}`
          ],
          explanation:
            `Four equally frequent classes require the unknown parent to produce ${A}${B}, ${A}${b}, ${a}${B}, and ${a}${b} gametes.`
        },
        {
          result:
            `half the offspring are ${A}_${B}_ and half are ${A}_${b}${b}; no ${a}${a} offspring occur`,
          correct: `${A}${A}${B}${b}`,
          options: [
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`,
            `${A}${a}${b}${b}`
          ],
          explanation:
            `The unknown parent always contributes ${A}, but contributes either ${B} or ${b}.`
        },
        {
          result:
            `half the offspring are ${A}_${B}_ and half are ${a}${a}${B}_; no ${b}${b} offspring occur`,
          correct: `${A}${a}${B}${B}`,
          options: [
            `${A}${a}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${B}`,
            `${a}${a}${B}${b}`
          ],
          explanation:
            `The unknown parent contributes either ${A} or ${a}, but always contributes ${B}.`
        },
        {
          result:
            `all offspring show dominant phenotypes at both loci`,
          correct: `${A}${A}${B}${B}`,
          options: [
            `${A}${A}${B}${B}`,
            `${A}${a}${B}${b}`,
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${B}`
          ],
          explanation:
            `Against ${a}${a}${b}${b}, all double-dominant offspring require the unknown parent to contribute ${A} and ${B} every time.`
        },
        {
          result:
            `half the offspring are ${A}_${b}${b} and half are ${a}${a}${b}${b}`,
          correct: `${A}${a}${b}${b}`,
          options: [
            `${A}${a}${b}${b}`,
            `${A}${A}${B}${b}`,
            `${A}${a}${B}${b}`,
            `${a}${a}${B}${b}`
          ],
          explanation:
            `The unknown parent segregates ${A}/${a} but can contribute only ${b} at the second locus.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-interpret-results",
        "dihybrid",
        "intermediate",
        `An unknown parent is crossed with ${a}${a}${b}${b}. In a large sample, ${item.result}. Assume complete dominance and independent assortment.`,
        "What is the genotype of the unknown parent?",
        shuffle(item.options),
        item.correct,
        "Use the number and identity of offspring classes to infer which gametes the unknown parent produced.",
        `${item.explanation} Therefore, the unknown parent is ${item.correct}. Key takeaway: testcross offspring classes directly reveal the gametes of the unknown parent.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — identify the most informative observation
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh10-best-evidence",
    "evidence evaluation",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          hypotheses:
            `${A}${A}${B}${B} versus ${A}${a}${B}${b}`,
          correct:
            `Observation of any ${a}${a} or ${b}${b} offspring`,
          distractors: [
            `Observation of one ${A}_${B}_ offspring`,
            "Observation that fertilization occurred",
            "Observation of equal numbers of male and female offspring"
          ],
          explanation:
            `The homozygous dominant hypothesis cannot produce recessive offspring, whereas the double heterozygote can.`
        },
        {
          hypotheses:
            `${A}${A}${B}${b} versus ${A}${a}${B}${b}`,
          correct:
            `Observation of an ${a}${a} offspring`,
          distractors: [
            `Observation of a ${b}${b} offspring`,
            `Observation of an ${A}_${B}_ offspring`,
            "Observation of a dominant phenotype at the second locus"
          ],
          explanation:
            `Both candidates carry ${b}, but only ${A}${a}${B}${b} can produce ${a}${a}.`
        },
        {
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
            `Both candidates carry ${a}, but only ${A}${a}${B}${b} can produce ${b}${b}.`
        },
        {
          hypotheses:
            `${A}${A}${B}${B} versus ${A}${A}${B}${b}`,
          correct:
            `Observation of a ${b}${b} offspring`,
          distractors: [
            `Observation of an ${A}_${B}_ offspring`,
            `Observation of an ${a}${a} offspring`,
            "Observation of equal offspring numbers in two families"
          ],
          explanation:
            `Only the heterozygous second-locus hypothesis can contribute ${b}.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-best-evidence",
        "dihybrid",
        "advanced",
        `An unknown dominant-phenotype parent is testcrossed with ${a}${a}${b}${b}. The competing genotype hypotheses are ${item.hypotheses}.`,
        "Which observation would most clearly distinguish the two hypotheses?",
        shuffle([item.correct, ...item.distractors]),
        item.correct,
        "Look for an offspring phenotype that one hypothesis can produce and the other cannot.",
        `${item.explanation} Therefore, ${item.correct.toLowerCase()} provides the strongest evidence. Key takeaway: the most informative testcross outcome is often one that falsifies a competing genotype hypothesis.`
      );
    }
  );

  // -------------------------------------------------------------------------
  // ADVANCED — critique weak or incomplete testcross designs
  // -------------------------------------------------------------------------

  register(
    "advanced",
    "dh10-design-critique",
    "experimental design critique",
    () => {
      const [A, B] = pick(allelePairs);
      const a = A.toLowerCase();
      const b = B.toLowerCase();

      const scenarios = [
        {
          proposal:
            `A student crosses an unknown ${A}_${B}_ individual with ${A}${A}${B}${B}.`,
          correct:
            "The dominant tester masks recessive alleles carried by the unknown parent",
          explanation:
            `A ${a}${a}${b}${b} tester would reveal the unknown parent's gametes.`
        },
        {
          proposal:
            "A student examines one offspring from a correctly designed dihybrid testcross and declares the unknown parent homozygous at both loci.",
          correct:
            "One offspring is insufficient to exclude heterozygosity",
          explanation:
            "A heterozygous parent can produce a dominant offspring by chance; a larger sample is required."
        },
        {
          proposal:
            "A student records only whether offspring are dominant at both loci and discards the other phenotype categories.",
          correct:
            "Discarding classes removes information needed to infer the unknown genotype",
          explanation:
            "All phenotype classes are informative because each corresponds to a gamete from the unknown parent."
        },
        {
          proposal:
            `A student observes no ${a}${a}${b}${b} offspring among four progeny and concludes that the parent cannot be ${A}${a}${B}${b}.`,
          correct:
            "A small sample can fail to contain a possible class by chance",
          explanation:
            "Absence of a class in four offspring is not enough to prove that the corresponding gamete cannot be produced."
        },
        {
          proposal:
            "A student testcrosses two unknown dominant-phenotype individuals with each other.",
          correct:
            "Because both parental genotypes are uncertain, allele contributions cannot be assigned clearly",
          explanation:
            `Using a known ${a}${a}${b}${b} tester isolates the gametes produced by the unknown parent.`
        }
      ];

      const item = pick(scenarios);

      return q(
        "dh10-design-critique",
        "dihybrid",
        "advanced",
        item.proposal,
        "What is the main weakness in the student's testcross reasoning or design?",
        shuffle([
          item.correct,
          "The design assumes independent assortment",
          "The design requires crossing over",
          "The design includes too many genes"
        ]),
        item.correct,
        "Check the tester genotype, the number of offspring, and whether all informative classes were recorded.",
        `${item.explanation} Key takeaway: a strong testcross uses a known recessive tester, records every relevant offspring class, and avoids conclusions unsupported by sample size.`
      );
    }
  );
}
