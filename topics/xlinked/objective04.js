/**
 * X-linked Inheritance — Objective 04
 *
 * Learning objective:
 * Compare reciprocal X-linked crosses and explain why exchanging the sexes of
 * parental genotypes can change offspring genotype and phenotype distributions.
 *
 * Design:
 * Four generator families target identification, comparison, prediction, and
 * explanation. Variation comes from multiple organisms, loci, parental states,
 * requested offspring classes, and misconception-based distractors.
 */

export function registerObjective04(ctx) {
  const { add, q, pick, shuffle } = ctx;

  const OBJECTIVE = "comparing reciprocal X-linked crosses";
  const register = (difficulty, id, task, build) =>
    add("xlinked", difficulty, id, build, { objective: OBJECTIVE, task });

  const loci = [
    { organism: "fruit flies", gene: "eye colour", dominantTrait: "wild-type eyes", recessiveTrait: "white eyes", dominantAllele: "w+", recessiveAllele: "w" },
    { organism: "humans", gene: "red-green colour vision", dominantTrait: "typical colour vision", recessiveTrait: "red-green colour blindness", dominantAllele: "C", recessiveAllele: "c" },
    { organism: "laboratory mice", gene: "coat pigmentation", dominantTrait: "pigmented coat", recessiveTrait: "reduced coat pigmentation", dominantAllele: "P", recessiveAllele: "p" },
    { organism: "beetles", gene: "wing pattern", dominantTrait: "banded wings", recessiveTrait: "unbanded wings", dominantAllele: "B", recessiveAllele: "b" },
    { organism: "mosquitoes", gene: "body colour", dominantTrait: "dark body colour", recessiveTrait: "light body colour", dominantAllele: "D", recessiveAllele: "d" },
    { organism: "moths", gene: "antenna shape", dominantTrait: "straight antennae", recessiveTrait: "curved antennae", dominantAllele: "S", recessiveAllele: "s" },
    { organism: "fish", gene: "fin pigmentation", dominantTrait: "pigmented fins", recessiveTrait: "pale fins", dominantAllele: "F", recessiveAllele: "f" },
    { organism: "crickets", gene: "body marking", dominantTrait: "striped body", recessiveTrait: "unstriped body", dominantAllele: "R", recessiveAllele: "r" }
  ];

  const x = (allele) => `X${allele}`;
  const female = (first, second) => `${x(first)}/${x(second)}`;
  const male = (allele) => `${x(allele)}/Y`;
  const cross = (mother, father) => `${mother} female × ${father} male`;

  const ruleText = (locus) =>
    `In ${locus.organism}, ${locus.gene} is X-linked recessive. ` +
    `${x(locus.dominantAllele)} produces ${locus.dominantTrait}; ` +
    `${x(locus.recessiveAllele)} produces ${locus.recessiveTrait} when no dominant allele is present.`;

  const reciprocalOf = (mother, father) => {
    const maternalAlleles = mother.replaceAll("X", "").split("/");
    const paternalAllele = father.replace("X", "").replace("/Y", "");
    const newMother = female(paternalAllele, paternalAllele);
    const newFather = male(maternalAlleles[0]);
    return { mother: newMother, father: newFather };
  };

  const unique = (values) => [...new Set(values)];

  // -------------------------------------------------------------------------
  // BEGINNER — identify the reciprocal cross
  // -------------------------------------------------------------------------

  register("beginner", "xl4-identify-reciprocal", "identifying a reciprocal cross", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const templates = [
      { mother: female(A, A), father: male(a), reciprocalMother: female(a, a), reciprocalFather: male(A) },
      { mother: female(a, a), father: male(A), reciprocalMother: female(A, A), reciprocalFather: male(a) },
      { mother: female(A, a), father: male(A), reciprocalMother: female(A, A), reciprocalFather: male(a), note: "Use the contrasting parental phenotypes represented in the original cross." },
      { mother: female(A, a), father: male(a), reciprocalMother: female(a, a), reciprocalFather: male(A), note: "Use the contrasting parental phenotypes represented in the original cross." }
    ];

    const item = pick(templates);
    const correct = cross(item.reciprocalMother, item.reciprocalFather);
    const distractors = unique([
      cross(item.mother, item.father),
      cross(item.reciprocalMother, item.father),
      cross(item.mother, item.reciprocalFather),
      `${item.reciprocalFather} female × ${item.reciprocalMother} male`,
      cross(female(A, a), male(a))
    ]).filter((value) => value !== correct);

    return q(
      "xl4-identify-reciprocal",
      "xlinked",
      "beginner",
      `${ruleText(l)} The original cross is ${cross(item.mother, item.father)}.`,
      "Which option represents the reciprocal cross?",
      shuffle([correct, ...shuffle(distractors.filter((value) => value !== correct)).slice(0, 3)]),
      correct,
      "A reciprocal cross retains the contrasting parental conditions but exchanges which sex carries each condition.",
      `The reciprocal cross is ${correct}. The relevant parental phenotypes or alleles are retained, but their maternal and paternal assignments are reversed.${item.note ? ` ${item.note}` : ""}`
    );
  });

  // -------------------------------------------------------------------------
  // INTERMEDIATE — compare sons or daughters across reciprocal crosses
  // -------------------------------------------------------------------------

  register("intermediate", "xl4-compare-offspring-sex", "comparing one offspring sex", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        cross1: cross(female(A, A), male(a)),
        cross2: cross(female(a, a), male(A)),
        focus: "sons",
        correct: `Cross 1 produces sons with ${l.dominantTrait}, whereas Cross 2 produces sons with ${l.recessiveTrait}`,
        explanation: `Sons receive Y from the father and their only X from the mother. Cross 1 mothers provide ${x(A)}; Cross 2 mothers provide ${x(a)}.`
      },
      {
        cross1: cross(female(A, A), male(a)),
        cross2: cross(female(a, a), male(A)),
        focus: "daughters",
        correct: `Both crosses produce heterozygous daughters with ${l.dominantTrait}`,
        explanation: `Cross 1 daughters are ${female(A, a)}, and Cross 2 daughters are also ${female(A, a)}. The parental origin of the alleles changes, but the genotype does not.`
      },
      {
        cross1: cross(female(A, a), male(A)),
        cross2: cross(female(A, A), male(a)),
        focus: "sons",
        correct: `Only Cross 1 can produce sons with ${l.recessiveTrait}`,
        explanation: `The heterozygous mother in Cross 1 can transmit ${x(a)} to sons. The homozygous dominant mother in Cross 2 can transmit only ${x(A)}.`
      },
      {
        cross1: cross(female(A, a), male(a)),
        cross2: cross(female(a, a), male(A)),
        focus: "daughters",
        correct: `Cross 1 can produce both daughter phenotypes, whereas Cross 2 produces only daughters with ${l.dominantTrait}`,
        explanation: `Cross 1 daughters receive ${x(a)} from the father and either ${x(A)} or ${x(a)} from the mother. Cross 2 daughters receive ${x(A)} from the father, so all show the dominant phenotype.`
      },
      {
        cross1: cross(female(A, a), male(A)),
        cross2: cross(female(A, A), male(a)),
        focus: "daughters",
        correct: `Both crosses produce only daughters with ${l.dominantTrait}, but their possible genotypes differ`,
        explanation: `Cross 1 daughters may be ${female(A, A)} or ${female(A, a)}. Cross 2 daughters are all ${female(A, a)}.`
      },
      {
        cross1: cross(female(a, a), male(a)),
        cross2: cross(female(a, a), male(A)),
        focus: "sons",
        correct: `The sons have ${l.recessiveTrait} in both crosses`,
        explanation: `Both mothers are ${female(a, a)}, and sons inherit their X chromosome from the mother. The father's X-linked genotype does not alter sons.`
      }
    ];

    const item = pick(scenarios);
    const distractors = [
      `The ${item.focus} are identical because reciprocal crosses always produce identical offspring`,
      `The father determines the X-linked allele in every ${item.focus.slice(0, -1)}`,
      `Cross 1 and Cross 2 differ only in offspring sex, not genotype or phenotype`,
      `The Y chromosome carries the alternate allele and reverses the result`,
      `Only the paternal phenotype determines the ${item.focus}`
    ];

    return q(
      "xl4-compare-offspring-sex",
      "xlinked",
      "intermediate",
      `${ruleText(l)} Cross 1: ${item.cross1}. Cross 2: ${item.cross2}.`,
      `Which statement correctly compares the ${item.focus}?`,
      shuffle([item.correct, ...shuffle(distractors.filter((value) => value !== item.correct)).slice(0, 3)]),
      item.correct,
      item.focus === "sons"
        ? "Track the maternal X chromosome separately. Every son gets Y from the father."
        : "Each daughter receives one maternal X and the father's X chromosome.",
      item.explanation
    );
  });

  // -------------------------------------------------------------------------
  // ADVANCED — compare probabilities or class distributions
  // -------------------------------------------------------------------------

  register("advanced", "xl4-reciprocal-probability", "comparing offspring-class probabilities", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        cross1: cross(female(A, A), male(a)),
        cross2: cross(female(a, a), male(A)),
        target: `an offspring with ${l.recessiveTrait}`,
        p1: "0",
        p2: "1/2",
        correct: "Cross 1: 0; Cross 2: 1/2",
        explanation: `Cross 1 produces no recessive offspring. In Cross 2, every son is ${male(a)} and every daughter is ${female(A, a)}, so half of all offspring are recessive sons.`
      },
      {
        cross1: cross(female(A, a), male(A)),
        cross2: cross(female(A, A), male(a)),
        target: `a son with ${l.recessiveTrait}`,
        p1: "1/4",
        p2: "0",
        correct: "Cross 1: 1/4; Cross 2: 0",
        explanation: `In Cross 1, the mother gives ${x(a)} with probability 1/2 and the father gives Y with probability 1/2. Cross 2 mothers cannot provide ${x(a)}.`
      },
      {
        cross1: cross(female(A, a), male(a)),
        cross2: cross(female(a, a), male(A)),
        target: `a daughter with ${l.recessiveTrait}`,
        p1: "1/4",
        p2: "0",
        correct: "Cross 1: 1/4; Cross 2: 0",
        explanation: `Cross 1 can produce ${female(a, a)} daughters when the mother contributes ${x(a)}. In Cross 2, every daughter receives ${x(A)} from the father.`
      },
      {
        cross1: cross(female(A, a), male(A)),
        cross2: cross(female(A, A), male(a)),
        target: `a heterozygous daughter`,
        p1: "1/4",
        p2: "1/2",
        correct: "Cross 1: 1/4; Cross 2: 1/2",
        explanation: `Cross 1 requires a daughter and maternal ${x(a)} transmission. In Cross 2, every daughter is ${female(A, a)}.`
      },
      {
        cross1: cross(female(a, a), male(a)),
        cross2: cross(female(a, a), male(A)),
        target: `an offspring with ${l.recessiveTrait}`,
        p1: "1",
        p2: "1/2",
        correct: "Cross 1: 1; Cross 2: 1/2",
        explanation: `Cross 1 makes every offspring recessive. In Cross 2, all sons are recessive but all daughters receive ${x(A)} and show the dominant phenotype.`
      }
    ];

    const item = pick(scenarios);
    const distractors = unique([
      `Cross 1: ${item.p2}; Cross 2: ${item.p1}`,
      "Cross 1: 1/2; Cross 2: 1/2",
      "Cross 1: 0; Cross 2: 0",
      "Cross 1: 1; Cross 2: 1",
      "The probabilities cannot differ in reciprocal crosses"
    ]).filter((value) => value !== item.correct);

    return q(
      "xl4-reciprocal-probability",
      "xlinked",
      "advanced",
      `${ruleText(l)} Cross 1: ${item.cross1}. Cross 2: ${item.cross2}.`,
      `What is the probability of ${item.target} in each cross?`,
      shuffle([item.correct, ...shuffle(distractors.filter((value) => value !== item.correct)).slice(0, 3)]),
      item.correct,
      "List maternal eggs and paternal sperm for each cross, then count the requested offspring class out of all equally likely combinations.",
      item.explanation
    );
  });

  // -------------------------------------------------------------------------
  // ADVANCED — evaluate explanations of reciprocal-cross asymmetry
  // -------------------------------------------------------------------------

  register("advanced", "xl4-explain-asymmetry", "explaining reciprocal-cross outcomes", () => {
    const l = pick(loci);
    const A = l.dominantAllele;
    const a = l.recessiveAllele;

    const scenarios = [
      {
        observation: `Crossing a ${female(A, A)} female with a ${male(a)} male produces dominant sons, but the reciprocal cross produces recessive sons.`,
        correct: "Sons receive their only X chromosome from the mother, so reversing the maternal genotype reverses the allele inherited by sons",
        explanation: `The father contributes Y to sons. Therefore, the mother's genotype directly determines whether sons receive ${x(A)} or ${x(a)}.`
      },
      {
        observation: `The reciprocal crosses ${cross(female(A, A), male(a))} and ${cross(female(a, a), male(A))} produce daughters with the same genotype but sons with different phenotypes.`,
        correct: "Daughters receive one X from each parent, whereas sons receive X only from the mother",
        explanation: `Both daughter classes are ${female(A, a)}, but sons copy the maternal X-linked state because their father supplies Y.`
      },
      {
        observation: `A recessive father affects the genotype of every daughter but does not transmit his recessive X-linked allele to any son.`,
        correct: "Fathers transmit their X chromosome to daughters and their Y chromosome to sons",
        explanation: `This sex-specific transmission pattern creates the characteristic asymmetry of reciprocal X-linked crosses.`
      },
      {
        observation: `Two reciprocal crosses have identical parental phenotypes but different proportions of recessive offspring.`,
        correct: "The same phenotype can correspond to different sex-specific transmission routes in X-linked inheritance",
        explanation: `Which parent carries an allele matters because mothers transmit X to both sexes, while fathers transmit X only to daughters.`
      },
      {
        observation: `Changing only the father's X-linked genotype changes all daughters but leaves the sons unchanged when the mother's genotype is fixed.`,
        correct: "Every daughter receives the father's X chromosome, while every son receives the father's Y chromosome",
        explanation: `With a fixed mother, sons receive the same maternal X distribution. Daughters, however, receive whichever X allele the father carries.`
      }
    ];

    const item = pick(scenarios);
    const distractors = [
      "Dominant alleles become recessive when they are inherited from the mother",
      "The Y chromosome carries a matching allele that masks the X-linked allele",
      "Fathers transmit their X chromosome directly to sons",
      "Reciprocal crosses change the segregation rules of meiosis",
      "The sex of the parent changes the molecular function of the allele"
    ];

    return q(
      "xl4-explain-asymmetry",
      "xlinked",
      "advanced",
      `${ruleText(l)} ${item.observation}`,
      "Which explanation best accounts for the observation?",
      shuffle([item.correct, ...shuffle(distractors.filter((value) => value !== item.correct)).slice(0, 3)]),
      item.correct,
      "Use the sex-specific inheritance route: mothers give X to every child; fathers give X to daughters and Y to sons.",
      item.explanation
    );
  });
}
