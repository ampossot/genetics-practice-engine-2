export function registerMonohybridTopic(ctx) {
  const { add, q, pick, chooseOptions, fractionOptions, traits, traitRule } = ctx;
  const randInt = (min, max) => Math.floor(ctx.rng() * (max - min + 1)) + min;

  const register = (difficulty, id, objective, task, build) =>
    add("monohybrid", difficulty, id, build, { objective, task });

  const rule = t => traitRule(t);
  const crossLabel = (t, type) => ({
    hetHet: `${t.A}${t.a} × ${t.A}${t.a}`,
    hetRec: `${t.A}${t.a} × ${t.a}${t.a}`,
    domRec: `${t.A}${t.A} × ${t.a}${t.a}`,
    domHet: `${t.A}${t.A} × ${t.A}${t.a}`,
    recRec: `${t.a}${t.a} × ${t.a}${t.a}`
  })[type];

  // ---------------------------------------------------------------------------
  // BEGINNER — recognition, vocabulary, simple prediction, and interpretation
  // ---------------------------------------------------------------------------

  register("beginner", "mono-vocabulary-heterozygous", "genetics vocabulary", "concept recognition", () => {
    const t = pick(traits);
    return q("mono-vocabulary-heterozygous", "monohybrid", "beginner",
      `${rule(t)} An individual has genotype ${t.A}${t.a}.`,
      "Which term correctly describes this genotype?",
      ["Heterozygous", "Homozygous dominant", "Homozygous recessive", "Hemizygous"],
      "Heterozygous",
      "A heterozygote carries two different alleles at the locus.",
      `${t.A}${t.a} contains one dominant allele and one recessive allele, so it is heterozygous. Key takeaway: heterozygous describes genotype, not phenotype.`);
  });

  register("beginner", "mono-vocabulary-homozygous", "genetics vocabulary", "concept recognition", () => {
    const t = pick(traits), kind = pick(["dominant", "recessive"]);
    const correct = kind === "dominant" ? `${t.A}${t.A}` : `${t.a}${t.a}`;
    return q("mono-vocabulary-homozygous", "monohybrid", "beginner",
      `${rule(t)}`,
      `Which genotype is homozygous ${kind}?`,
      [`${t.A}${t.A}`, `${t.A}${t.a}`, `${t.a}${t.a}`, `${t.A}`],
      correct,
      "Homozygous means that both alleles are identical.",
      `${correct} contains two identical ${kind} alleles. Key takeaway: homozygous genotypes contain two copies of the same allele.`);
  });

  register("beginner", "mono-genotype-vs-phenotype", "genotype and phenotype", "classification", () => {
    const t = pick(traits), item = pick([
      { text: `${t.A}${t.a}`, answer: "Genotype" },
      { text: t.dom, answer: "Phenotype" },
      { text: `${t.a}${t.a}`, answer: "Genotype" },
      { text: t.rec, answer: "Phenotype" }
    ]);
    return q("mono-genotype-vs-phenotype", "monohybrid", "beginner",
      `${rule(t)}`,
      `The expression “${item.text}” describes which kind of information?`,
      ["Genotype", "Phenotype", "Gamete", "Pedigree"],
      item.answer,
      "Allele symbols describe genotype; observable traits describe phenotype.",
      `${item.text} is a ${item.answer.toLowerCase()}. Key takeaway: genotype is the allele combination; phenotype is the observable expression.`);
  });

  register("beginner", "mono-dominant-phenotype-genotypes", "dominance relationships", "information sufficiency", () => {
    const t = pick(traits);
    return q("mono-dominant-phenotype-genotypes", "monohybrid", "beginner",
      `${rule(t)} An individual shows ${t.dom}.`,
      "Which genotypes could produce this phenotype?",
      [`${t.A}${t.A} or ${t.A}${t.a}`, `${t.a}${t.a} only`, `${t.A}${t.a} only`, `${t.A}${t.A} only`],
      `${t.A}${t.A} or ${t.A}${t.a}`,
      "Under complete dominance, one dominant allele is sufficient to produce the dominant phenotype.",
      `Both ${t.A}${t.A} and ${t.A}${t.a} show ${t.dom}. Key takeaway: a dominant phenotype does not reveal whether an individual is homozygous or heterozygous.`);
  });

  register("beginner", "mono-recessive-phenotype-genotype", "dominance relationships", "genotype inference", () => {
    const t = pick(traits);
    return q("mono-recessive-phenotype-genotype", "monohybrid", "beginner",
      `${rule(t)} An individual shows ${t.rec}.`,
      "What must its genotype be?",
      [`${t.a}${t.a}`, `${t.A}${t.a}`, `${t.A}${t.A}`, `${t.A}_`],
      `${t.a}${t.a}`,
      "A recessive phenotype appears only when no dominant allele is present.",
      `The genotype must be ${t.a}${t.a}. Key takeaway: under complete dominance, a recessive phenotype uniquely identifies the homozygous recessive genotype.`);
  });

  register("beginner", "mono-gametes-from-heterozygote", "gamete formation", "gamete identification", () => {
    const t = pick(traits);
    return q("mono-gametes-from-heterozygote", "monohybrid", "beginner",
      `${rule(t)} An individual is heterozygous, ${t.A}${t.a}.`,
      "Which gametes can it produce at this locus?",
      [`${t.A} and ${t.a}`, `${t.A}${t.a} only`, `${t.A}${t.A} and ${t.a}${t.a}`, `${t.A} only`],
      `${t.A} and ${t.a}`,
      "A gamete receives one allele from the pair.",
      `Meiosis separates the two alleles, producing ${t.A} and ${t.a} gametes. Key takeaway: gametes are haploid and carry one allele per locus.`);
  });

  register("beginner", "mono-punnett-valid-cell", "Punnett squares", "validity check", () => {
    const t = pick(traits);
    return q("mono-punnett-valid-cell", "monohybrid", "beginner",
      `${rule(t)} The cross is ${t.A}${t.a} × ${t.a}${t.a}.`,
      "Which offspring genotype can occur?",
      [`${t.A}${t.a}`, `${t.A}${t.A}`, `${t.A}${t.A}${t.a}`, `${t.A}`],
      `${t.A}${t.a}`,
      `The recessive parent contributes only ${t.a}; the heterozygous parent contributes ${t.A} or ${t.a}.`,
      `Possible offspring are ${t.A}${t.a} and ${t.a}${t.a}. Key takeaway: every offspring genotype contains one allele from each parent.`);
  });

  register("beginner", "mono-punnett-error-gametes", "Punnett squares", "error analysis", () => {
    const t = pick(traits);
    return q("mono-punnett-error-gametes", "monohybrid", "beginner",
      `${rule(t)} A student sets up ${t.A}${t.a} × ${t.a}${t.a} and labels the first parent's gametes ${t.A}${t.a} and ${t.a}${t.a}.`,
      "What is the mistake?",
      ["Gametes should contain one allele, not a diploid genotype", "The recessive parent cannot make gametes", "The dominant allele must enter every gamete", "A testcross cannot use a Punnett square"],
      "Gametes should contain one allele, not a diploid genotype",
      "Each gamete carries only one allele from this locus.",
      `The ${t.A}${t.a} parent makes ${t.A} and ${t.a} gametes. Key takeaway: Punnett-square margins contain gametes, whereas cells contain offspring genotypes.`);
  });

  register("beginner", "mono-simple-genotype-proportion", "genotypic ratios", "direct prediction", () => {
    const t = pick(traits), target = pick([`${t.A}${t.A}`, `${t.A}${t.a}`, `${t.a}${t.a}`]);
    const answer = target === `${t.A}${t.a}` ? "1/2" : "1/4";
    return q("mono-simple-genotype-proportion", "monohybrid", "beginner",
      `${rule(t)} Two heterozygotes are crossed: ${crossLabel(t, "hetHet")}.`,
      `What proportion of offspring is expected to have genotype ${target}?`,
      fractionOptions(answer), answer,
      "A heterozygote × heterozygote cross has a 1:2:1 genotypic ratio.",
      `${t.A}${t.A}:${t.A}${t.a}:${t.a}${t.a} = 1:2:1, so ${target} occurs with probability ${answer}. Key takeaway: the 1:2:1 ratio describes genotypes.`);
  });

  register("beginner", "mono-simple-phenotype-proportion", "phenotypic ratios", "direct prediction", () => {
    const t = pick(traits), target = pick(["dominant", "recessive"]);
    const answer = target === "dominant" ? "3/4" : "1/4";
    const phenotype = target === "dominant" ? t.dom : t.rec;
    return q("mono-simple-phenotype-proportion", "monohybrid", "beginner",
      `${rule(t)} Two heterozygotes are crossed: ${crossLabel(t, "hetHet")}.`,
      `What proportion of offspring is expected to show ${phenotype}?`,
      fractionOptions(answer), answer,
      target === "dominant" ? "Count both homozygous dominant and heterozygous offspring." : `Only ${t.a}${t.a} shows the recessive phenotype.`,
      `The expected proportion is ${answer}. Key takeaway: complete dominance converts the 1:2:1 genotypic ratio into a 3:1 phenotypic ratio.`);
  });

  register("beginner", "mono-cross-all-heterozygous", "cross outcomes", "cross recognition", () => {
    const t = pick(traits);
    return q("mono-cross-all-heterozygous", "monohybrid", "beginner",
      `${rule(t)}`,
      "Which cross produces offspring that are all heterozygous?",
      [crossLabel(t, "domRec"), crossLabel(t, "hetHet"), crossLabel(t, "hetRec"), crossLabel(t, "recRec")],
      crossLabel(t, "domRec"),
      "Each offspring must receive the dominant allele from one parent and the recessive allele from the other.",
      `${crossLabel(t, "domRec")} produces only ${t.A}${t.a} offspring. Key takeaway: crossing opposite homozygotes produces a uniform heterozygous F1.`);
  });

  register("beginner", "mono-cross-all-recessive", "cross outcomes", "cross recognition", () => {
    const t = pick(traits);
    return q("mono-cross-all-recessive", "monohybrid", "beginner",
      `${rule(t)}`,
      `Which cross produces only offspring showing ${t.rec}?`,
      [crossLabel(t, "recRec"), crossLabel(t, "hetRec"), crossLabel(t, "hetHet"), crossLabel(t, "domRec")],
      crossLabel(t, "recRec"),
      `Every offspring must receive ${t.a} from both parents.`,
      `${crossLabel(t, "recRec")} produces only ${t.a}${t.a}. Key takeaway: two homozygous recessive parents produce only recessive offspring.`);
  });

  // ---------------------------------------------------------------------------
  // INTERMEDIATE — reverse inference, expected counts, testcrosses, conditioning
  // ---------------------------------------------------------------------------

  register("intermediate", "mono-expected-counts", "expected offspring counts", "quantitative prediction", () => {
    const t = pick(traits), type = pick(["hetHet", "hetRec"]), total = pick([40, 80, 120, 160, 200]);
    const target = pick(["dominant", "recessive"]);
    const p = type === "hetHet" ? (target === "dominant" ? 0.75 : 0.25) : 0.5;
    const answer = total * p;
    return q("mono-expected-counts", "monohybrid", "intermediate",
      `${rule(t)} A ${crossLabel(t, type)} cross produces ${total} offspring.`,
      `How many offspring are expected to show the ${target === "dominant" ? t.dom : t.rec} phenotype?`,
      chooseOptions(answer, [total - answer, total / 2, total / 4, total]), answer,
      "Find the phenotype probability first, then multiply by the total number of offspring.",
      `${total} × ${p} = ${answer}. Key takeaway: expected counts equal sample size multiplied by expected probability.`);
  });

  register("intermediate", "mono-reverse-from-ratio", "reverse inference", "parental inference", () => {
    const t = pick(traits), item = pick([
      { outcome: "approximately 3 dominant : 1 recessive", answer: crossLabel(t, "hetHet") },
      { outcome: "approximately 1 dominant : 1 recessive", answer: crossLabel(t, "hetRec") },
      { outcome: "all dominant and all heterozygous", answer: crossLabel(t, "domRec") },
      { outcome: "all recessive", answer: crossLabel(t, "recRec") }
    ]);
    return q("mono-reverse-from-ratio", "monohybrid", "intermediate",
      `${rule(t)}`,
      `Which cross is expected to produce ${item.outcome}?`,
      [crossLabel(t, "hetHet"), crossLabel(t, "hetRec"), crossLabel(t, "domRec"), crossLabel(t, "recRec")],
      item.answer,
      "Work backward from the offspring classes and identify which parental gametes are required.",
      `${item.answer} produces the stated outcome. Key takeaway: characteristic offspring ratios can reveal parental genotypes.`);
  });

  register("intermediate", "mono-infer-parents-recessive-child", "reverse inference", "logical deduction", () => {
    const t = pick(traits);
    return q("mono-infer-parents-recessive-child", "monohybrid", "intermediate",
      `${rule(t)} Two parents show ${t.dom}, but they produce an offspring showing ${t.rec}.`,
      "What must be true about the parents?",
      ["Both parents are heterozygous", "At least one parent is homozygous dominant", "Both parents are homozygous dominant", "One parent must show the recessive phenotype"],
      "Both parents are heterozygous",
      `The recessive offspring received ${t.a} from each parent.`,
      `Because each dominant parent contributed ${t.a}, both must be ${t.A}${t.a}. Key takeaway: a recessive offspring can reveal hidden recessive alleles in dominant parents.`);
  });

  register("intermediate", "mono-testcross-purpose", "testcrosses", "experimental design", () => {
    const t = pick(traits);
    return q("mono-testcross-purpose", "monohybrid", "intermediate",
      `${rule(t)} An individual showing ${t.dom} could be ${t.A}${t.A} or ${t.A}${t.a}.`,
      "Which cross is most informative for determining its genotype?",
      [`Cross it with ${t.a}${t.a}`, `Cross it with ${t.A}${t.A}`, "Cross it with another unknown dominant individual", "Cross it only with its own dominant offspring"],
      `Cross it with ${t.a}${t.a}`,
      "Use a partner that contributes only recessive alleles.",
      `A ${t.a}${t.a} tester makes any hidden ${t.a} allele visible in recessive offspring. Key takeaway: a testcross uses a homozygous recessive tester to expose an unknown genotype.`);
  });

  register("intermediate", "mono-testcross-one-recessive", "testcrosses", "genotype inference", () => {
    const t = pick(traits);
    return q("mono-testcross-one-recessive", "monohybrid", "intermediate",
      `${rule(t)} An unknown individual showing ${t.dom} is crossed with ${t.a}${t.a}. At least one offspring shows ${t.rec}.`,
      "What is the unknown parent's genotype?",
      [`${t.A}${t.a}`, `${t.A}${t.A}`, `${t.a}${t.a}`, "It cannot be determined"],
      `${t.A}${t.a}`,
      `A recessive offspring must receive ${t.a} from the unknown parent.`,
      `The unknown parent shows the dominant phenotype but contributed ${t.a}, so it must be ${t.A}${t.a}. Key takeaway: one recessive testcross offspring conclusively identifies a heterozygous parent.`);
  });

  register("intermediate", "mono-small-sample-variation", "sampling variation", "data interpretation", () => {
    const t = pick(traits), total = pick([20, 28, 32, 40]), recessive = Math.round(total * pick([0.18, 0.29, 0.33]));
    return q("mono-small-sample-variation", "monohybrid", "intermediate",
      `${rule(t)} A ${crossLabel(t, "hetHet")} cross produces ${total - recessive} offspring with ${t.dom} and ${recessive} with ${t.rec}.`,
      "Which interpretation is most appropriate?",
      ["Sampling variation can produce counts that differ from an exact 3:1 ratio", "The parental genotypes must be wrong because the ratio is not exact", "Mendelian probabilities require every family to be exactly 3:1", "The recessive allele has become dominant"],
      "Sampling variation can produce counts that differ from an exact 3:1 ratio",
      "Expected ratios describe long-run tendencies, not guaranteed counts in every family.",
      `Random segregation causes natural variation around 3:1. Key takeaway: expected ratios are probabilistic, especially in small samples.`);
  });

  register("intermediate", "mono-conditional-dominant-heterozygote", "conditional probability", "conditional reasoning", () => {
    const t = pick(traits);
    return q("mono-conditional-dominant-heterozygote", "monohybrid", "intermediate",
      `${rule(t)} Two heterozygotes are crossed: ${crossLabel(t, "hetHet")}. An offspring is known to show ${t.dom}.`,
      "Given this phenotype, what is the probability that the offspring is heterozygous?",
      ["2/3", "1/2", "1/4", "3/4"],
      "2/3",
      `Exclude ${t.a}${t.a}, because the offspring is known to show the dominant phenotype.`,
      `Among dominant offspring, the possibilities are ${t.A}${t.A}, ${t.A}${t.a}, and ${t.A}${t.a}; two of three are heterozygous. Key takeaway: conditioning changes the sample space.`);
  });

  register("intermediate", "mono-conditional-unaffected-carrier", "conditional probability", "conditional reasoning", () => {
    const t = pick(traits);
    return q("mono-conditional-unaffected-carrier", "monohybrid", "intermediate",
      `${rule(t)} In a ${crossLabel(t, "hetHet")} cross, an offspring does not show the recessive phenotype.`,
      "What is the probability that this offspring carries the recessive allele?",
      ["2/3", "1/2", "1/3", "3/4"],
      "2/3",
      "Among nonrecessive offspring, count the heterozygotes and homozygous dominant individuals.",
      `The nonrecessive possibilities are ${t.A}${t.A}, ${t.A}${t.a}, and ${t.A}${t.a}; two of three carry ${t.a}. Key takeaway: among unaffected offspring of two carriers, the carrier probability is 2/3.`);
  });

  register("intermediate", "mono-multiple-cross-evidence", "multiple-cross inference", "evidence integration", () => {
    const t = pick(traits);
    return q("mono-multiple-cross-evidence", "monohybrid", "intermediate",
      `${rule(t)} Individual 1 shows ${t.dom}. A cross with a recessive tester produces 12 dominant offspring. Later, Individual 1 and another dominant individual produce a recessive offspring.`,
      "What can now be concluded with certainty?",
      ["Individual 1 and the second dominant parent both carry the recessive allele", "Individual 1 must be homozygous dominant", "The tester must have carried a dominant allele", "The recessive offspring is genetically impossible"],
      "Individual 1 and the second dominant parent both carry the recessive allele",
      `The recessive offspring received ${t.a} from both parents in the second cross.`,
      `Both dominant parents in the second cross must be ${t.A}${t.a}. Key takeaway: later evidence can resolve uncertainty left by a small initial testcross.`);
  });

  register("intermediate", "mono-information-sufficiency", "information sufficiency", "evidence evaluation", () => {
    const t = pick(traits);
    return q("mono-information-sufficiency", "monohybrid", "intermediate",
      `${rule(t)} Two parents show ${t.dom}, and their first six offspring also show ${t.dom}.`,
      "Can the parental genotypes be determined uniquely?",
      ["No; several genotype combinations remain possible", "Yes; both parents must be homozygous dominant", "Yes; both parents must be heterozygous", "Yes; one parent must be homozygous recessive"],
      "No; several genotype combinations remain possible",
      "All-dominant offspring can occur under more than one parental genotype combination.",
      `At least one ${t.A}${t.A} parent guarantees all-dominant offspring, but ${t.A}${t.a} × ${t.A}${t.a} can also produce six dominant offspring by chance. Key takeaway: observations may support a hypothesis without identifying a unique genotype.`);
  });

  register("intermediate", "mono-student-ratio-error", "misconceptions", "error analysis", () => {
    const t = pick(traits);
    return q("mono-student-ratio-error", "monohybrid", "intermediate",
      `${rule(t)} A student says, “${crossLabel(t, "hetHet")} gives 1 ${t.A}${t.A}:2 ${t.A}${t.a}:1 ${t.a}${t.a}, so the phenotypic ratio must also be 1:2:1.”`,
      "What is wrong with this reasoning?",
      ["The first two genotype classes share the dominant phenotype", "The genotypic ratio is actually 1:1", "Heterozygotes show the recessive phenotype", "Phenotypes cannot be predicted from genotypes"],
      "The first two genotype classes share the dominant phenotype",
      "Under complete dominance, homozygous dominant and heterozygous individuals look alike.",
      `${t.A}${t.A} and ${t.A}${t.a} both show ${t.dom}, producing a 3:1 phenotypic ratio. Key takeaway: genotypic and phenotypic ratios are not interchangeable.`);
  });

  register("intermediate", "mono-probability-specific-order", "offspring probability", "ordered probability", () => {
    const t = pick(traits), n = pick([3, 4, 5]);
    const answer = `1/${4 ** n}`;
    return q("mono-probability-specific-order", "monohybrid", "intermediate",
      `${rule(t)} Two heterozygotes are crossed. Each offspring has probability 1/4 of showing ${t.rec}.`,
      `What is the probability that the first ${n} offspring all show ${t.rec}?`,
      fractionOptions(answer), answer,
      "Multiply 1/4 once for each independent offspring.",
      `(1/4)^${n} = ${answer}. Key takeaway: probabilities for a specified sequence of independent offspring are multiplied.`);
  });

  register("intermediate", "mono-next-offspring-independence", "offspring probability", "independence reasoning", () => {
    const t = pick(traits);
    return q("mono-next-offspring-independence", "monohybrid", "intermediate",
      `${rule(t)} Two heterozygotes have already produced four offspring showing ${t.dom}.`,
      `What is the probability that their next offspring shows ${t.rec}?`,
      ["1/4", "1/5", "1/2", "0"],
      "1/4",
      "Previous offspring do not change the allele-segregation probabilities for the next conception.",
      `Each offspring from ${crossLabel(t, "hetHet")} independently has probability 1/4 of being ${t.a}${t.a}. Key takeaway: Mendelian offspring outcomes are independent events.`);
  });

  // ---------------------------------------------------------------------------
  // ADVANCED — binomial reasoning, evidence strength, penetrance, lethality
  // ---------------------------------------------------------------------------

  register("advanced", "mono-binomial-exactly-k", "binomial probability", "multi-outcome calculation", () => {
    const t = pick(traits), n = pick([4, 5, 6]), k = randInt(1, n - 1), p = 0.25;
    const choose = (n, k) => { let v = 1; for (let i = 1; i <= k; i++) v = v * (n - k + i) / i; return v; };
    const value = choose(n, k) * p ** k * (1 - p) ** (n - k);
    const answer = `${(value * 100).toFixed(1)}%`;
    return q("mono-binomial-exactly-k", "monohybrid", "advanced",
      `${rule(t)} Two heterozygotes are crossed. Each offspring independently has probability 1/4 of showing ${t.rec}.`,
      `What is the probability that exactly ${k} of ${n} offspring show ${t.rec}?`,
      chooseOptions(answer, [`${(p ** k * 100).toFixed(1)}%`, `${(k / n * 100).toFixed(1)}%`, `${((1 - value) * 100).toFixed(1)}%`]), answer,
      "Use C(n,k)pᵏ(1−p)ⁿ⁻ᵏ.",
      `C(${n},${k})(0.25)^${k}(0.75)^${n-k} = ${answer}. Key takeaway: “exactly k” requires both the probability of each arrangement and the number of possible arrangements.`);
  });

  register("advanced", "mono-binomial-at-least-one", "binomial probability", "complement reasoning", () => {
    const t = pick(traits), n = pick([3, 4, 5, 6]);
    const value = 1 - 0.75 ** n, answer = `${(value * 100).toFixed(1)}%`;
    return q("mono-binomial-at-least-one", "monohybrid", "advanced",
      `${rule(t)} Two heterozygotes are crossed. Each offspring independently has probability 1/4 of showing ${t.rec}.`,
      `What is the probability that at least one of ${n} offspring shows ${t.rec}?`,
      chooseOptions(answer, [`${((0.25 ** n) * 100).toFixed(1)}%`, `${((0.75 ** n) * 100).toFixed(1)}%`, `${n * 25}%`]), answer,
      "Use the complement: 1 − P(no recessive offspring).",
      `1 − (3/4)^${n} = ${answer}. Key takeaway: “at least one” is often easiest to solve by subtracting the zero-event probability from 1.`);
  });

  register("advanced", "mono-binomial-no-more-than-one", "binomial probability", "cumulative probability", () => {
    const t = pick(traits), n = pick([4, 5]);
    const p0 = 0.75 ** n, p1 = n * 0.25 * 0.75 ** (n - 1), value = p0 + p1;
    const answer = `${(value * 100).toFixed(1)}%`;
    return q("mono-binomial-no-more-than-one", "monohybrid", "advanced",
      `${rule(t)} Two heterozygotes are crossed. Each offspring has probability 1/4 of showing ${t.rec}.`,
      `What is the probability that no more than one of ${n} offspring shows ${t.rec}?`,
      chooseOptions(answer, [`${(p0 * 100).toFixed(1)}%`, `${(p1 * 100).toFixed(1)}%`, `${((1-value) * 100).toFixed(1)}%`]), answer,
      "Add the probabilities of zero recessive offspring and exactly one recessive offspring.",
      `P(0) + P(1) = (0.75)^${n} + ${n}(0.25)(0.75)^${n-1} = ${answer}. Key takeaway: cumulative events require adding mutually exclusive binomial outcomes.`);
  });

  register("advanced", "mono-testcross-finite-evidence", "testcross evidence", "uncertainty evaluation", () => {
    const t = pick(traits), n = pick([6, 8, 10, 12]);
    const chance = `${((0.5 ** n) * 100).toFixed(n < 10 ? 2 : 3)}%`;
    const correct = `${t.A}${t.A} is better supported, but ${t.A}${t.a} is not impossible`;
    return q("mono-testcross-finite-evidence", "monohybrid", "advanced",
      `${rule(t)} An unknown dominant-phenotype individual is testcrossed with ${t.a}${t.a}. All ${n} offspring show ${t.dom}.`,
      "Which conclusion is scientifically strongest?",
      [correct, `The parent is proven to be ${t.A}${t.A}`, `The parent is proven to be ${t.A}${t.a}`, "The results contain no information"],
      correct,
      "Compare what each candidate genotype predicts, but distinguish strong evidence from proof.",
      `${t.A}${t.A} guarantees all dominant offspring. If the parent were ${t.A}${t.a}, the chance of ${n} consecutive dominant offspring would be (1/2)^${n} = ${chance}. Key takeaway: finite data can strongly support a genotype without proving it absolutely.`);
  });

  register("advanced", "mono-compare-hypotheses", "testcross evidence", "hypothesis comparison", () => {
    const t = pick(traits), n = pick([5, 7, 9]);
    return q("mono-compare-hypotheses", "monohybrid", "advanced",
      `${rule(t)} An unknown dominant-phenotype parent is either ${t.A}${t.A} or ${t.A}${t.a}. A testcross produces ${n} dominant offspring and no recessive offspring.`,
      "How should the competing genotype hypotheses be compared?",
      [`${t.A}${t.A} is more strongly supported because it predicts the complete result with probability 1`, `${t.A}${t.a} is more strongly supported because it produces two gamete types`, "Both hypotheses predict the data equally well", "The result proves incomplete dominance"],
      `${t.A}${t.A} is more strongly supported because it predicts the complete result with probability 1`,
      "Compare how likely the observed data are under each genotype.",
      `${t.A}${t.A} guarantees the data; ${t.A}${t.a} produces them with probability (1/2)^${n}. Key takeaway: evidence favors the hypothesis that makes the observed data more likely.`);
  });

  register("advanced", "mono-design-followup-test", "experimental design", "follow-up planning", () => {
    const t = pick(traits);
    return q("mono-design-followup-test", "monohybrid", "advanced",
      `${rule(t)} An initial testcross of an unknown dominant individual produced only eight dominant offspring.`,
      "Which next step would most directly strengthen the genotype inference?",
      ["Produce more offspring from the same testcross", "Cross the unknown with a homozygous dominant individual", "Observe only the unknown parent's phenotype again", "Change the allele symbols"],
      "Produce more offspring from the same testcross",
      "Increase the sample size while keeping the informative recessive tester.",
      `More testcross offspring reduce the chance that a heterozygote would appear homozygous dominant by chance. Key takeaway: larger informative samples strengthen genetic inference.`);
  });

  register("advanced", "mono-penetrance-expression", "penetrance", "quantitative prediction", () => {
    const t = pick(traits), penetrance = pick([60, 70, 80, 90]);
    const answer = `${penetrance / 2}%`;
    return q("mono-penetrance-expression", "monohybrid", "advanced",
      `${rule(t)} The dominant phenotype has ${penetrance}% penetrance in individuals carrying ${t.A}. A ${crossLabel(t, "hetRec")} cross is performed.`,
      "What proportion of all offspring is expected to express the dominant phenotype?",
      [answer, `${penetrance}%`, "50%", `${100 - penetrance / 2}%`],
      answer,
      `First find the fraction inheriting ${t.A}, then multiply by penetrance.`,
      `One-half inherit ${t.A}; ${penetrance}% of those express it. 0.5 × ${penetrance/100} = ${penetrance/200}, or ${answer}. Key takeaway: penetrance modifies phenotype frequency without changing allele transmission.`);
  });

  register("advanced", "mono-penetrance-unaffected-transmission", "penetrance", "conceptual inference", () => {
    const t = pick(traits);
    return q("mono-penetrance-unaffected-transmission", "monohybrid", "advanced",
      `${rule(t)} The dominant phenotype has incomplete penetrance. An individual does not show ${t.dom} but later produces an offspring that does.`,
      "Which explanation is genetically plausible?",
      [`The unaffected parent carries ${t.A} but does not express it`, `The offspring must have inherited ${t.A} from the recessive parent`, "Dominant alleles cannot skip phenotypic expression", "The allele changed from recessive to dominant during reproduction"],
      `The unaffected parent carries ${t.A} but does not express it`,
      "Incomplete penetrance allows a genotype to be present without its expected phenotype.",
      `A nonpenetrant ${t.A}${t.a} individual can transmit ${t.A}. Key takeaway: absence of a phenotype does not always prove absence of a dominant allele when penetrance is incomplete.`);
  });

  register("advanced", "mono-lethal-survivor-ratio", "lethal alleles", "survivor conditioning", () => {
    return q("mono-lethal-survivor-ratio", "monohybrid", "advanced",
      "In mice, allele Y produces yellow fur in Yy heterozygotes, but YY embryos die. Two living yellow mice are crossed: Yy × Yy.",
      "What phenotypic ratio is expected among surviving offspring?",
      ["2 yellow : 1 non-yellow", "3 yellow : 1 non-yellow", "1 yellow : 1 non-yellow", "All yellow"],
      "2 yellow : 1 non-yellow",
      "Start with the 1 YY : 2 Yy : 1 yy conception ratio, then remove the lethal class.",
      "YY embryos die, leaving two Yy yellow survivors for every one yy non-yellow survivor. Key takeaway: lethal genotypes alter ratios among surviving offspring." );
  });

  register("advanced", "mono-lethal-conception-vs-birth", "lethal alleles", "data interpretation", () => {
    return q("mono-lethal-conception-vs-birth", "monohybrid", "advanced",
      "A dominant allele L produces a visible phenotype in Ll individuals, while LL is embryonic lethal. Two Ll parents are crossed.",
      "Which statement correctly compares conception and surviving-offspring ratios?",
      ["At conception the genotypic ratio is 1:2:1, but among survivors it is 2 Ll : 1 ll", "Both conception and survivor ratios are 3:1", "At conception all embryos are Ll", "Among survivors the genotypic ratio remains 1:2:1"],
      "At conception the genotypic ratio is 1:2:1, but among survivors it is 2 Ll : 1 ll",
      "Separate the initial zygote distribution from the distribution after lethal embryos are removed.",
      "Mendelian segregation still creates 1 LL:2 Ll:1 ll at conception; viability selection removes LL. Key takeaway: segregation ratios and observed survivor ratios can differ." );
  });

  register("advanced", "mono-misconception-dominant-common", "dominance misconceptions", "error analysis", () => {
    const t = pick(traits);
    return q("mono-misconception-dominant-common", "monohybrid", "advanced",
      `${rule(t)} A student says, “The ${t.A} allele is dominant, so it must be more common in the population than ${t.a}.”`,
      "What is the best response?",
      ["Dominance describes heterozygote phenotype, not population frequency", "Dominant alleles are always more common", "Recessive alleles disappear after one generation", "Allele frequency is determined only by capitalization"],
      "Dominance describes heterozygote phenotype, not population frequency",
      "Dominance and frequency describe different biological properties.",
      `The label dominant means ${t.A}${t.a} resembles ${t.A}${t.A}; it does not state how frequent ${t.A} is. Key takeaway: dominance is not the same as abundance, fitness, or evolutionary advantage.`);
  });

  register("advanced", "mono-misconception-dominant-better", "dominance misconceptions", "error analysis", () => {
    const t = pick(traits);
    return q("mono-misconception-dominant-better", "monohybrid", "advanced",
      `${rule(t)} A student claims that ${t.dom} must be biologically “better” because it is dominant.`,
      "Why is this conclusion invalid?",
      ["Dominance describes expression in heterozygotes, not adaptive value", "All recessive traits are harmful", "Dominant alleles cannot mutate", "Phenotypes have no genetic basis"],
      "Dominance describes expression in heterozygotes, not adaptive value",
      "Ask what the word dominant actually specifies.",
      `Dominance concerns phenotype in ${t.A}${t.a}; fitness depends on environment and biological effects. Key takeaway: dominant does not mean beneficial, stronger, or more evolved.`);
  });

  register("advanced", "mono-insufficient-cross-data", "information sufficiency", "logical limits", () => {
    const t = pick(traits);
    return q("mono-insufficient-cross-data", "monohybrid", "advanced",
      `${rule(t)} A dominant-phenotype parent and a recessive-phenotype parent produce one dominant offspring.`,
      "Can the dominant parent's genotype be determined from this single offspring?",
      ["No; both homozygous dominant and heterozygous parents could produce that offspring", `Yes; it must be ${t.A}${t.A}`, `Yes; it must be ${t.A}${t.a}`, "No genotype could produce the offspring"],
      "No; both homozygous dominant and heterozygous parents could produce that offspring",
      "Consider all parental genotypes capable of producing one dominant child with a recessive tester.",
      `Both ${t.A}${t.A} × ${t.a}${t.a} and ${t.A}${t.a} × ${t.a}${t.a} can produce a dominant offspring. Key takeaway: one compatible observation may be insufficient to distinguish hypotheses.`);
  });

  register("advanced", "mono-sequential-evidence", "evidence accumulation", "data interpretation", () => {
    const t = pick(traits);
    return q("mono-sequential-evidence", "monohybrid", "advanced",
      `${rule(t)} A testcross first produces ten dominant offspring, then the eleventh offspring shows ${t.rec}.`,
      "How should the genotype conclusion change after the eleventh offspring?",
      [`The unknown parent is conclusively ${t.A}${t.a}`, `The unknown parent remains most likely ${t.A}${t.A}`, "The unknown parent must be recessive", "The new result provides no additional information"],
      `The unknown parent is conclusively ${t.A}${t.a}`,
      `A recessive offspring proves that the unknown parent contributed ${t.a}.`,
      `The first ten offspring only favored ${t.A}${t.A}; the recessive eleventh offspring rules it out. Key takeaway: a single diagnostic observation can overturn a provisional inference.`);
  });

  register("advanced", "mono-cross-design-distinguish-models", "experimental design", "model discrimination", () => {
    const t = pick(traits);
    return q("mono-cross-design-distinguish-models", "monohybrid", "advanced",
      `${rule(t)} A researcher wants to distinguish whether a dominant-phenotype individual is ${t.A}${t.A} or ${t.A}${t.a}.`,
      "Which design maximizes the chance of detecting the difference between the models?",
      [`Cross with many ${t.a}${t.a} testers and score all offspring`, `Cross once with ${t.A}${t.A}`, "Score only the parent's phenotype", "Use only dominant offspring as testers"],
      `Cross with many ${t.a}${t.a} testers and score all offspring`,
      "Choose a cross whose expected outcomes differ maximally between the two candidate genotypes.",
      `${t.A}${t.A} predicts all dominant offspring, whereas ${t.A}${t.a} predicts a 1:1 ratio with a recessive tester. Key takeaway: strong experiments make competing hypotheses generate different predictions.`);
  });

  register("advanced", "mono-observed-deviation-conclusion", "sampling variation", "scientific inference", () => {
    const t = pick(traits);
    return q("mono-observed-deviation-conclusion", "monohybrid", "advanced",
      `${rule(t)} A ${crossLabel(t, "hetHet")} cross produces 31 dominant and 19 recessive offspring.`,
      "Which conclusion is most defensible without a formal statistical test?",
      ["The counts differ from 3:1, but sampling variation could explain the deviation", "Mendelian segregation is disproven", "The recessive allele has incomplete penetrance", "The parents cannot both be heterozygous"],
      "The counts differ from 3:1, but sampling variation could explain the deviation",
      "Do not treat an expected ratio as an exact requirement.",
      `A sample of 50 can deviate from 37.5:12.5 by chance. Key takeaway: observed departures require statistical evaluation before rejecting a genetic model.`);
  });

  register("advanced", "mono-backcross-identification", "cross terminology", "cross interpretation", () => {
    const t = pick(traits);
    return q("mono-backcross-identification", "monohybrid", "advanced",
      `${rule(t)} Homozygous parents ${t.A}${t.A} and ${t.a}${t.a} produce an F1 generation of ${t.A}${t.a}. An F1 individual is then crossed with the recessive parental genotype.`,
      "How should this second cross be described?",
      ["It is both a backcross and a testcross", "It is only an F1 intercross", "It is a reciprocal cross", "It is a three-point testcross"],
      "It is both a backcross and a testcross",
      "A backcross uses a parent or parental genotype; a testcross uses a homozygous recessive individual.",
      `The cross is ${t.A}${t.a} × ${t.a}${t.a}, so it satisfies both definitions. Key takeaway: a cross can belong to more than one experimental category.`);
  });
}
