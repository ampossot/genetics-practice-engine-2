/**
 * Dihybrid Crosses — Objective 02
 *
 * Learning objective:
 * Predict offspring probabilities from dihybrid crosses using
 * Mendel's Law of Independent Assortment.
 */

export function registerObjective02(ctx) {
  const { add, q, chooseOptions, pick } = ctx;

  const OBJECTIVE =
    "predict offspring probabilities from dihybrid crosses";

  const register = (difficulty,id,task,build)=>
    add("dihybrid",difficulty,id,build,{objective:OBJECTIVE,task});

  // 1. Direct probability
  register("beginner","dh2-direct-probability","direct probability",()=>
    q(
      "dh2-direct-probability","dihybrid","beginner",
      "Consider the cross AaBb × AaBb. Assume complete dominance and independent assortment.",
      "What is the probability of producing an offspring with phenotype A_bb?",
      chooseOptions("3/16",["1/16","1/4","9/16"]),
      "3/16",
      "Treat each gene separately, then multiply.",
      "P(A_) = 3/4 and P(bb) = 1/4. Multiplying gives 3/16. Key takeaway: independent probabilities multiply."
    )
  );

  // 2. Compare probabilities
  register("intermediate","dh2-compare-probabilities","probability comparison",()=>
    q(
      "dh2-compare-probabilities","dihybrid","intermediate",
      "AaBb × AaBb produces offspring under complete dominance.",
      "Which outcome is MOST likely?",
      [
        "Dominant phenotype at both loci (A_B_)",
        "Dominant A, recessive b (A_bb)",
        "Both recessive phenotypes (aabb)",
        "Recessive A, dominant B (aaB_)"
      ],
      "Dominant phenotype at both loci (A_B_)",
      "Recall the 9:3:3:1 phenotypic ratio.",
      "The four phenotype classes occur at 9/16, 3/16, 3/16 and 1/16. Therefore A_B_ is the most likely outcome. Key takeaway: compare probabilities instead of calculating each from scratch."
    )
  );

  // 3. Error analysis
  register("advanced","dh2-error-analysis","misconception analysis",()=>
    q(
      "dh2-error-analysis","dihybrid","advanced",
      "A student states: 'The probability of A_bb from AaBb × AaBb is 3/4 + 1/4 = 1.'",
      "What is the student's primary mistake?",
      [
        "They added independent probabilities instead of multiplying them",
        "They ignored complete dominance",
        "They counted too many gametes",
        "They assumed linkage"
      ],
      "They added independent probabilities instead of multiplying them",
      "Independent events require the product rule.",
      "A_ and bb occur independently, so their probabilities are multiplied: 3/4 × 1/4 = 3/16. Key takeaway: use multiplication, not addition, for independent events occurring together."
    )
  );

  // 4. Reverse inference
  register("advanced","dh2-reverse-inference","reverse inference",()=>
    q(
      "dh2-reverse-inference","dihybrid","advanced",
      "A phenotype from an AaBb × AaBb cross occurs with probability 9/16.",
      "Which phenotype matches this probability?",
      [
        "Dominant phenotype at both loci (A_B_)",
        "Dominant A, recessive b (A_bb)",
        "Recessive A, dominant B (aaB_)",
        "Both recessive phenotypes (aabb)"
      ],
      "Dominant phenotype at both loci (A_B_)",
      "Think of the classic dihybrid phenotypic ratio.",
      "The 9/16 class corresponds to A_B_. The remaining phenotype classes occur at 3/16, 3/16 and 1/16. Key takeaway: recognize the standard 9:3:3:1 distribution."
    )
  );
}
