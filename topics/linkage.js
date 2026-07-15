export function registerLinkageTopic(ctx) {
  const { add, q, pick, shuffle, chooseOptions } = ctx;
  const rng = () => ctx.rng();
  // LINKAGE — expanded learning-objective chapter
  add("linkage","beginner","linkage-basic-definition",()=>q(
    "linkage-basic-definition","linkage","beginner",
    "Genes located on the same chromosome may be inherited together more often than expected under independent assortment.",
    "What does genetic linkage mean?",
    ["Genes are on the same chromosome and may not assort independently","The alleles are identical","The genes always produce the same phenotype","Crossing over cannot occur between the genes"],
    "Genes are on the same chromosome and may not assort independently",
    "Linkage describes the chromosomal relationship between loci.",
    "Linked genes occupy the same chromosome. Crossing over can separate them, but they may be inherited together more often than genes that assort independently."
  ));

  add("linkage","beginner","linkage-linked-vs-unlinked",()=>{
    const rf=pick([8,14,22,35,50]);
    const correct=rf<50?"The genes show evidence of linkage":"The data are consistent with independent assortment or very distant loci";
    return q("linkage-linked-vs-unlinked","linkage","beginner",
      `A testcross gives a recombination frequency of ${rf}%.`,
      "Which interpretation is most appropriate?",
      [correct,"The genes must be alleles of the same locus","The genes cannot be on the same chromosome","Every offspring must be recombinant"],correct,
      "Recombination frequencies below 50% indicate detectable linkage.",
      rf<50?`${rf}% is below 50%, so parental combinations occur more often than recombinant combinations.`:"A value near 50% means the loci behave as if unlinked; they may be on different chromosomes or very far apart on the same chromosome."
    );
  });

  add("linkage","beginner","linkage-parental-haplotypes",()=>{
    const phase=pick(["AB/ab","Ab/aB"]), correct=phase.replace('/',' and ');
    return q("linkage-parental-haplotypes","linkage","beginner",
      `A double heterozygote has homologous chromosome haplotypes ${phase}.`,
      "Which allele combinations are the parental haplotypes?",
      ["AB and ab","Ab and aB","A and B","Aa and Bb"],correct,
      "Read the allele combinations written on the two homologous chromosomes.",
      `The slash separates the homologs, so the original chromosome combinations are ${correct}.`
    );
  });

  add("linkage","beginner","linkage-identify-parental",()=>{
    const phase=pick(["AB/ab","Ab/aB"]), correct=phase.replace('/',' and ');
    return q("linkage-identify-parental","linkage","beginner",
      `A double heterozygote has haplotypes ${phase}.`,
      "Which gametes are nonrecombinant (parental)?",
      ["AB and ab","Ab and aB","A and B","Aa and Bb"],correct,
      "Parental gametes preserve the allele combinations already present on each homolog.",
      `The original haplotypes are ${correct}, so those are the parental gametes.`
    );
  });

  add("linkage","beginner","linkage-identify-recombinant",()=>{
    const phase=pick(["AB/ab","Ab/aB"]), correct=phase==="AB/ab"?"Ab and aB":"AB and ab";
    return q("linkage-identify-recombinant","linkage","beginner",
      `A double heterozygote has homologous chromosome haplotypes ${phase}.`,
      "Which gametes are recombinant?",
      ["AB and ab","Ab and aB","A and B","Aa and Bb"],correct,
      "Recombinant gametes contain allele combinations not present on the original homologs.",
      `The parental combinations are ${phase.replace('/',' and ')}; therefore the alternative combinations, ${correct}, are recombinant.`
    );
  });

  add("linkage","beginner","linkage-coupling",()=>q(
    "linkage-coupling","linkage","beginner",
    "A double heterozygote has chromosome arrangement AB/ab.",
    "Which phase arrangement is shown?",
    ["Coupling (cis)","Repulsion (trans)","Independent assortment","Hemizygosity"],
    "Coupling (cis)",
    "Ask whether the two uppercase alleles occur on the same homolog.",
    "In AB/ab, A and B occur together on one homolog and a and b on the other. This is coupling, or cis, phase."
  ));

  add("linkage","beginner","linkage-repulsion",()=>q(
    "linkage-repulsion","linkage","beginner",
    "A double heterozygote has chromosome arrangement Ab/aB.",
    "Which phase arrangement is shown?",
    ["Repulsion (trans)","Coupling (cis)","Independent assortment","Homozygosity"],
    "Repulsion (trans)",
    "Ask whether the two uppercase alleles occur on opposite homologs.",
    "In Ab/aB, A and B are on opposite homologs. This is repulsion, or trans, phase."
  ));

  add("linkage","beginner","linkage-testcross-purpose",()=>q(
    "linkage-testcross-purpose","linkage","beginner",
    "A double heterozygote is crossed with an individual homozygous recessive at both loci.",
    "Why is this testcross useful for studying linkage?",
    ["Each offspring phenotype reveals the gamete produced by the heterozygous parent","The recessive parent creates crossing over","All offspring become homozygous","It guarantees a 9:3:3:1 ratio"],
    "Each offspring phenotype reveals the gamete produced by the heterozygous parent",
    "The tester contributes only recessive alleles.",
    "Because the tester always contributes ab, the offspring genotype and phenotype directly report which gamete came from the double heterozygote."
  ));

  add("linkage","beginner","linkage-class-size",()=>q(
    "linkage-class-size","linkage","beginner",
    "In a two-gene testcross with linked loci, two offspring classes are much larger than the other two.",
    "What do the two largest classes usually represent?",
    ["Parental combinations","Double crossovers","Mutation classes","Lethal genotypes"],
    "Parental combinations",
    "Linked loci preserve the original chromosome combinations more often than crossing over separates them.",
    "The most frequent testcross classes are normally the nonrecombinant, or parental, classes."
  ));

  add("linkage","beginner","linkage-rf-definition",()=>q(
    "linkage-rf-definition","linkage","beginner",
    "A testcross produces parental and recombinant offspring classes.",
    "How is recombination frequency calculated?",
    ["recombinant offspring ÷ total offspring × 100","parental offspring ÷ recombinant offspring × 100","largest class ÷ total × 100","one recombinant class ÷ one parental class × 100"],
    "recombinant offspring ÷ total offspring × 100",
    "Add both reciprocal recombinant classes.",
    "Recombination frequency is the percentage of all offspring that belong to recombinant classes."
  ));

  add("linkage","beginner","linkage-rf-simple-count",()=>{
    const total=pick([100,200,400]), recombinant=pick([10,20,40,50]);
    const rf=recombinant/total*100;
    return q("linkage-rf-simple-count","linkage","beginner",
      `A testcross produces ${total} offspring, of which ${recombinant} are recombinant.`,
      "What is the recombination frequency?",
      chooseOptions(`${rf}%`,[`${recombinant}%`,`${100-rf}%`,`50%`]),`${rf}%`,
      "Divide the total number of recombinant offspring by the total number of offspring.",
      `${recombinant} ÷ ${total} × 100 = ${rf}%.`
    );
  });

  add("linkage","beginner","linkage-rf-meaning",()=>{
    const rf=pick([6,12,18,24,30]);
    return q("linkage-rf-meaning","linkage","beginner",
      `Two loci have a recombination frequency of ${rf}%.`,
      "What does this value mean in a testcross?",
      [`About ${rf}% of offspring are expected to be recombinant`,`Exactly ${rf}% of genes mutate`,`The loci are ${100-rf} chromosomes apart`,`About ${rf}% of offspring must be parental`],
      `About ${rf}% of offspring are expected to be recombinant`,
      "Recombination frequency describes the fraction of recombinant products.",
      `A recombination frequency of ${rf}% means that approximately ${rf} of every 100 testcross offspring are expected to belong to recombinant classes.`
    );
  });

  add("linkage","intermediate","linkage-map-distance",()=>{
    const total=pick([200,400,500,1000]), rf=pick([8,12,18,24,32]), rec=total*rf/100, each=rec/2, par=(total-rec)/2;
    return q("linkage-map-distance","linkage","intermediate",
      `A two-point testcross gives offspring counts ${par}, ${par}, ${each}, and ${each}. The two largest classes are parental.`,
      "What is the estimated map distance between the genes?",
      chooseOptions(`${rf} cM`,[`${rf/2} cM`,`${100-rf} cM`,`50 cM`]),`${rf} cM`,
      "Add the two recombinant classes and divide by the total.",
      `(${each}+${each})/${total} × 100 = ${rf}%, corresponding to approximately ${rf} cM.`
    );
  });

  add("linkage","intermediate","linkage-expected-recombinants",()=>{
    const total=pick([200,400,500,800]), rf=pick([10,15,20,25,30]), answer=total*rf/100;
    return q("linkage-expected-recombinants","linkage","intermediate",
      `Two linked loci have a recombination frequency of ${rf}%. A testcross produces ${total} offspring.`,
      "How many total recombinant offspring are expected?",
      chooseOptions(answer,[answer/2,total-answer,total/2]),answer,
      "Multiply the total offspring number by the recombination frequency as a decimal.",
      `${total} × ${rf/100} = ${answer} total recombinant offspring.`
    );
  });

  add("linkage","intermediate","linkage-each-recombinant",()=>{
    const rf=pick([8,12,16,20,24,30,36]), phase=pick(["AB/ab","Ab/aB"]);
    const gamete=phase==="AB/ab"?pick(["Ab","aB"]):pick(["AB","ab"]), answer=`${rf/2}%`;
    return q("linkage-each-recombinant","linkage","intermediate",
      `A heterozygote has haplotypes ${phase}. The recombination frequency is ${rf}%, and reciprocal recombinant classes are equally frequent.`,
      `What percentage of gametes is expected to be ${gamete}?`,
      chooseOptions(answer,[`${rf}%`,`${(100-rf)/2}%`,`50%`]),answer,
      "Split the total recombinant frequency equally between the two reciprocal recombinant gametes.",
      `${gamete} is recombinant, so its frequency is ${rf}% ÷ 2 = ${answer}.`
    );
  });

  add("linkage","intermediate","linkage-each-parental",()=>{
    const rf=pick([8,12,16,20,24,30,36]), phase=pick(["AB/ab","Ab/aB"]);
    const gamete=pick(phase.split('/')), answer=`${(100-rf)/2}%`;
    return q("linkage-each-parental","linkage","intermediate",
      `A heterozygote has haplotypes ${phase}. The recombination frequency is ${rf}%, and reciprocal classes are equally frequent.`,
      `What percentage of gametes is expected to be ${gamete}?`,
      chooseOptions(answer,[`${rf/2}%`,`${100-rf}%`,`50%`]),answer,
      "The two parental classes together account for 100% minus the recombination frequency.",
      `Parental gametes total ${100-rf}%, so each parental class occurs at ${(100-rf)/2}%.`
    );
  });

  add("linkage","intermediate","linkage-infer-phase",()=>{
    const phase=pick(["AB/ab","Ab/aB"]), parents=phase.split('/'), answer=phase==="AB/ab"?"Coupling (cis)":"Repulsion (trans)";
    const counts=pick([[420,398,92,90],[360,344,150,146]]);
    return q("linkage-infer-phase","linkage","intermediate",
      `In a testcross, the two largest offspring classes correspond to gametes ${parents[0]} (${counts[0]}) and ${parents[1]} (${counts[1]}).`,
      "What was the phase of the double heterozygote?",
      ["Coupling (cis)","Repulsion (trans)","Independent assortment","The phase cannot be inferred"],answer,
      "The largest classes reveal the parental haplotypes.",
      `The parental haplotypes are ${phase}. This arrangement is ${answer.toLowerCase()}.`
    );
  });

  add("linkage","intermediate","linkage-linked-data",()=>{
    const linked=rng()<0.5;
    const counts=linked?pick([[420,398,92,90],[360,344,150,146]]):pick([[252,248,251,249],[101,98,103,98]]);
    const correct=linked?"The loci show evidence of linkage":"The data are consistent with independent assortment";
    return q("linkage-linked-data","linkage","intermediate",
      `A testcross produces four classes with counts ${counts.join(', ')}.`,
      "Which interpretation best fits the pattern?",
      [correct,"Only one locus is segregating","The largest classes must be double crossovers","The genes are alleles of the same locus"],correct,
      "Linked loci produce two large parental classes and two smaller recombinant classes; unlinked loci approach 1:1:1:1.",
      linked?"Two classes are much larger than the other two, which is the expected signature of linkage.":"All four classes are approximately equal, which is consistent with a recombination frequency near 50%."
    );
  });

  add("linkage","intermediate","linkage-gamete-frequency",()=>{
    const rf=pick([10,18,26,34]), phase=pick(["AB/ab","Ab/aB"]), target=pick(["parental","recombinant"]);
    const answer=target==="parental"?`${(100-rf)/2}%`:`${rf/2}%`;
    return q("linkage-gamete-frequency","linkage","intermediate",
      `A double heterozygote has haplotypes ${phase}, with recombination frequency ${rf}%.`,
      `What is the expected frequency of each ${target} gamete class?`,
      chooseOptions(answer,[`${rf}%`,`${100-rf}%`,`25%`]),answer,
      `First determine the combined ${target} frequency, then divide equally between the reciprocal classes.`,
      target==="parental"?`The two parental classes together total ${100-rf}%, so each is ${(100-rf)/2}%.`:`The two recombinant classes together total ${rf}%, so each is ${rf/2}%.`
    );
  });

  add("linkage","intermediate","linkage-reverse-counts",()=>{
    const total=pick([400,800,1000]), rf=pick([10,20,30]), rec=total*rf/100, p=(total-rec)/2, r=rec/2;
    const phase=pick(["AB/ab","Ab/aB"]), parental=phase.split('/'), recombinant=phase==="AB/ab"?["Ab","aB"]:["AB","ab"];
    return q("linkage-reverse-counts","linkage","intermediate",
      `A testcross produces ${p} ${parental[0]}, ${p} ${parental[1]}, ${r} ${recombinant[0]}, and ${r} ${recombinant[1]} offspring.`,
      "Which chromosome arrangement best describes the double heterozygous parent?",
      ["AB/ab","Ab/aB","AABB/aabb","The loci must be unlinked"],phase,
      "The two largest classes identify the parental haplotypes.",
      `${parental[0]} and ${parental[1]} are the most frequent classes, so the heterozygote had arrangement ${phase}.`
    );
  });

  add("linkage","intermediate","linkage-sampling",()=>q(
    "linkage-sampling","linkage","intermediate",
    "A small linkage testcross produces reciprocal recombinant classes with counts 8 and 13 rather than exactly equal counts.",
    "Which interpretation is most appropriate?",
    ["Random sampling can make reciprocal classes differ modestly","The two classes cannot both be recombinant","Crossing over occurred in only one sex chromosome","The genes must assort independently"],
    "Random sampling can make reciprocal classes differ modestly",
    "Expected equality does not require exact equality in a finite sample.",
    "Reciprocal recombinant classes have the same theoretical probability, but random segregation can produce somewhat different observed counts."
  ));

  add("linkage","intermediate","linkage-compare-distances",()=>{
    const a=pick([6,10,14,18]), b=pick([22,28,34,40]);
    return q("linkage-compare-distances","linkage","intermediate",
      `Gene pair X–Y has recombination frequency ${a}%, while gene pair M–N has recombination frequency ${b}%. Both values are below 50%.`,
      "Which pair is estimated to be farther apart genetically?",
      ["M–N","X–Y","The pairs are equally distant","Distance cannot be compared using recombination frequency"],"M–N",
      "Within the useful mapping range, a higher recombination frequency generally indicates greater map distance.",
      `${b}% is greater than ${a}%, so M–N is estimated to be farther apart genetically.`
    );
  });

  add("linkage","advanced","linkage-threepoint-middle",()=>q(
    "linkage-threepoint-middle","linkage","advanced",
    "In a three-point testcross, the parental classes are ABC and abc. The least frequent double-crossover classes are AbC and aBc.",
    "Which gene is in the middle?",
    ["B","A","C","The order cannot be inferred"],"B",
    "Compare each double-crossover class with its corresponding parental class.",
    "ABC → AbC changes only B, and abc → aBc changes only B. Therefore B is the middle gene."
  ));

  add("linkage","advanced","linkage-threepoint-variable",()=>{
    const cases=[
      {p:["ABC","abc"],d:["AbC","aBc"],mid:"B"},
      {p:["ABC","abc"],d:["ABc","abC"],mid:"C"},
      {p:["AbC","aBc"],d:["abC","ABc"],mid:"A"}
    ];
    const c=pick(cases);
    return q("linkage-threepoint-variable","linkage","advanced",
      `The parental classes are ${c.p[0]} and ${c.p[1]}. The double-crossover classes are ${c.d[0]} and ${c.d[1]}.`,
      "Which gene lies in the middle?",
      ["A","B","C","The order cannot be inferred"],c.mid,
      "The middle gene is the one whose allele state differs when each parental class is compared with its corresponding double crossover.",
      `Only gene ${c.mid} switches relative to the outside genes, so ${c.mid} is in the middle.`
    );
  });

  add("linkage","advanced","linkage-threepoint-interval",()=>{
    const total=1000, sco=pick([80,120,160]), dco=pick([10,20,30]), answer=(sco+dco)/total*100;
    return q("linkage-threepoint-interval","linkage","advanced",
      `In a three-point testcross of ${total} offspring, ${sco} are single crossovers in one interval and ${dco} are double crossovers.`,
      "What is the map distance for that interval?",
      chooseOptions(`${answer} cM`,[`${sco/total*100} cM`,`${dco/total*100} cM`,`${(sco+2*dco)/total*100} cM`]),`${answer} cM`,
      "Double crossovers include a crossover in both intervals, so include them when calculating either interval.",
      `(${sco} + ${dco})/${total} × 100 = ${answer} cM.`
    );
  });

  add("linkage","advanced","linkage-dco-correction",()=>q(
    "linkage-dco-correction","linkage","advanced",
    "Two genes are far apart, and some meioses contain two crossovers between them.",
    "Why can a simple two-point recombination estimate underestimate their true map distance?",
    ["A double crossover can restore the parental arrangement of the outside markers","Every double crossover kills the gamete","Double crossovers are counted twice as recombinant","Crossovers never occur between distant genes"],
    "A double crossover can restore the parental arrangement of the outside markers",
    "Consider what two exchanges do to the outside allele combination.",
    "An even number of crossovers can return the outside markers to a parental combination, so those products are not detected as recombinants in a two-point analysis."
  ));

  add("linkage","advanced","linkage-maximum-rf",()=>q(
    "linkage-maximum-rf","linkage","advanced",
    "Two genes are very far apart on the same chromosome.",
    "Why can observed recombination frequency not exceed 50%?",
    ["Multiple crossovers can restore parental combinations, causing parental and recombinant classes to approach equality","Crossing over stops beyond 50 cM","Only one chromatid can recombine","Recombinant gametes are always selected against"],
    "Multiple crossovers can restore parental combinations, causing parental and recombinant classes to approach equality",
    "At large distances, even and odd numbers of crossovers blur linkage information.",
    "As distance increases, multiple crossovers make parental and recombinant products approach equal frequencies. The observed value therefore approaches, but does not exceed, 50%."
  ));

  add("linkage","advanced","linkage-physical-genetic",()=>q(
    "linkage-physical-genetic","linkage","advanced",
    "Two chromosome intervals contain the same number of base pairs, but one lies near a recombination hotspot and the other near a recombination-suppressed region.",
    "Which statement is correct?",
    ["The hotspot interval can have a larger genetic map distance despite equal physical length","Equal physical length guarantees equal map distance","The suppressed interval must have more genes","Genetic distance is measured directly in base pairs"],
    "The hotspot interval can have a larger genetic map distance despite equal physical length",
    "Genetic distance reflects crossover frequency, not simply DNA length.",
    "Recombination rates vary along chromosomes. Therefore, equal physical distances can correspond to different distances in centimorgans."
  ));

  add("linkage","advanced","linkage-interference",()=>{
    const expected=pick([20,30,40,50]), observed=pick([5,10,15]), correct="Positive interference";
    return q("linkage-interference","linkage","advanced",
      `Based on the two single-interval crossover frequencies, ${expected} double crossovers are expected, but only ${observed} are observed.`,
      "What does this pattern indicate?",
      ["Positive interference","Negative interference","Independent assortment","No crossing over"],correct,
      "Fewer observed double crossovers than expected means one crossover reduces the probability of another nearby crossover.",
      `Because ${observed} is below the expected ${expected}, the coefficient of coincidence is below 1 and interference is positive.`
    );
  });

  add("linkage","advanced","linkage-experimental-design",()=>q(
    "linkage-experimental-design","linkage","advanced",
    "You want to estimate recombination between loci A and B in a double heterozygote.",
    "Which cross gives the most directly interpretable offspring classes?",
    ["Cross the double heterozygote with aabb","Cross it with AABB","Cross two double heterozygotes","Cross it with an individual of unknown genotype"],
    "Cross the double heterozygote with aabb",
    "Choose a tester whose gametes contribute only recessive alleles.",
    "In a testcross with aabb, each offspring class directly reveals the gamete produced by the heterozygous parent, making parental and recombinant classes easy to count."
  ));

  add("linkage","advanced","linkage-error-analysis",()=>q(
    "linkage-error-analysis","linkage","advanced",
    "A student calculates recombination frequency from a testcross by dividing the single smallest offspring class by the total.",
    "What is wrong with this method?",
    ["Both reciprocal recombinant classes must be added before dividing by the total","Only parental classes belong in the numerator","Recombination frequency is calculated from phenotype ratios only","The total should exclude parental offspring"],
    "Both reciprocal recombinant classes must be added before dividing by the total",
    "Crossing over produces two reciprocal recombinant products.",
    "The recombinant numerator must include both recombinant classes. Using only one class gives approximately half the correct recombination frequency."
  ));

  add("linkage","advanced","linkage-compare-datasets",()=>{
    const dataA=[430,420,75,75], dataB=[300,290,205,205];
    return q("linkage-compare-datasets","linkage","advanced",
      `Dataset A has testcross counts ${dataA.join(', ')}. Dataset B has counts ${dataB.join(', ')}. In each dataset, the two largest classes are parental.`,
      "Which dataset indicates that the loci are closer together?",
      ["Dataset A","Dataset B","They indicate the same distance","Distance cannot be estimated from these data"],"Dataset A",
      "The closer pair has the lower proportion of recombinant offspring.",
      "Dataset A has 150 recombinants out of 1000 (15%), whereas Dataset B has 410 out of 1000 (41%). Therefore, Dataset A represents the closer loci."
    );
  });






  
}
