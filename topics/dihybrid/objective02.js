/**
 * Dihybrid Crosses — Objective 02
 */
export function registerObjective02(ctx){
const {add,q,pick,chooseOptions}=ctx;
const reg=(d,id,t,b)=>add("dihybrid",d,id,b,{objective:"offspring probabilities from dihybrid crosses",task:t});
const orgs=["pea plants","fruit flies","corn plants","mice","beetles"];
reg("beginner","dh2-genotype-probability","genotype probability",()=>q(
"dh2-genotype-probability","dihybrid","beginner",
`In ${pick(orgs)}, consider the cross AaBb × AaBb.`,
"What is the probability of producing an offspring with genotype AaBb?",
chooseOptions("1/4",["1/16","1/2","3/8"]),
"1/4",
"Treat each locus independently.",
"P(Aa)=1/2 and P(Bb)=1/2. Multiplying gives 1/4. Key takeaway: multiply independent locus probabilities."
));
reg("beginner","dh2-phenotype-probability","phenotype probability",()=>q(
"dh2-phenotype-probability","dihybrid","beginner",
"AaBb × AaBb with complete dominance and independent assortment.",
"What is the probability of an offspring with dominant phenotype at A and recessive phenotype at B?",
chooseOptions("3/16",["1/16","9/16","1/4"]),
"3/16",
"Solve each locus separately.",
"P(A_)=3/4 and P(bb)=1/4. Product = 3/16. Key takeaway: phenotype probabilities are products of single-locus probabilities."
));
reg("intermediate","dh2-expected-counts","expected counts",()=>q(
"dh2-expected-counts","dihybrid","intermediate",
"An AaBb × AaBb cross produces 320 offspring.",
"How many A_bb offspring are expected?",
chooseOptions("60",["20","180","80"]),
"60",
"Use the expected fraction before multiplying by the total.",
"A_bb occurs with probability 3/16. 320 × 3/16 = 60. Key takeaway: expected counts equal probability × total offspring."
));
reg("advanced","dh2-reverse-inference","reverse inference",()=>q(
"dh2-reverse-inference","dihybrid","advanced",
"A student calculates that a particular offspring class from AaBb × AaBb has probability 9/16.",
"Which outcome matches this probability?",
[
"Dominant phenotype at both loci (A_B_)",
"Both recessive phenotypes (aabb)",
"Dominant A, recessive b (A_bb)",
"Recessive A, dominant B (aaB_)"
],
"Dominant phenotype at both loci (A_B_)",
"Recall the classic 9:3:3:1 phenotypic ratio.",
"The 9/16 class is A_B_. The remaining phenotype classes occur at 3/16, 3/16, and 1/16. Key takeaway: recognize probabilities from the canonical dihybrid ratio."
));
}
