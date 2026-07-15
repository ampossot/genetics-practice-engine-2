import { registerLinkageTopic } from "../topics/linkage.js";
import { registerMonohybridTopic } from "../topics/monohybrid.js";
import { registerGametesTopic } from "../topics/gametes.js";
import { registerMeiosis5Topic } from "../topics/meiosis_5.js";

"use strict";

  const STORAGE = {
    stats: "geneticsPracticeV2Stats",
    recent: "geneticsPracticeV2Recent",
    mastery: "geneticsPracticeV2Mastery"
  };

  const els = Object.fromEntries([
    "topic","difficulty","attempted","correct","accuracy","streak","progressText","progressBar",
    "topicPill","questionNumber","context","question","options","typedAnswerWrap","typedAnswer",
    "checkBtn","hintBtn","nextBtn","feedback","newSessionBtn","resetProgressBtn",
    "dashboard","practiceShell","statsPanel","homeBtn","statsHomeBtn","activeModeLabel","timer",
    "statsAttempted","statsCorrect","statsAccuracy","statsStreak","statsMessage"
  ].map(id => [id, document.getElementById(id)]));

  const topicLabels = {
    monohybrid: "🌱 Monohybrid crosses",
    gametes: "🧬 Gametes and genotype logic",
    testcross: "🔎 Testcrosses and reverse inference",
    dihybrid: "🧩 Dihybrid probability",
    nonmendelian: "🎨 Non-Mendelian inheritance",
    sexlinked: "♀️ X-linked inheritance",
    chisquare: "📊 Chi-square reasoning",
    pedigree: "👪 Pedigree inference",
    linkage: "🧭 Linkage and recombination",
    interactions: "🧪 Gene interactions and epistasis"
  };

  const traits = [
    { organism:"pea plants", dom:"tall stems", rec:"dwarf stems", A:"T", a:"t" },
    { organism:"tomato plants", dom:"red fruit", rec:"yellow fruit", A:"R", a:"r" },
    { organism:"mice", dom:"black fur", rec:"brown fur", A:"B", a:"b" },
    { organism:"corn plants", dom:"purple kernels", rec:"yellow kernels", A:"P", a:"p" },
    { organism:"rabbits", dom:"short hair", rec:"long hair", A:"S", a:"s" },
    { organism:"beetles", dom:"striped elytra", rec:"plain elytra", A:"E", a:"e" },
    { organism:"guinea pigs", dom:"rough coat", rec:"smooth coat", A:"C", a:"c" },
    { organism:"moths", dom:"dark wings", rec:"light wings", A:"M", a:"m" },
    { organism:"fruit flies", dom:"normal wings", rec:"vestigial wings", A:"V", a:"v" },
    { organism:"snapdragons", dom:"spotted petals", rec:"unspotted petals", A:"S", a:"s" },
    { organism:"zebrafish", dom:"striped body", rec:"unstriped body", A:"Z", a:"z" },
    { organism:"sunflowers", dom:"dark seeds", rec:"pale seeds", A:"D", a:"d" },
    { organism:"barley plants", dom:"awned spikes", rec:"awnless spikes", A:"A", a:"a" },
    { organism:"chickens", dom:"pea comb", rec:"single comb", A:"P", a:"p" },
    { organism:"nematodes", dom:"normal movement", rec:"uncoordinated movement", A:"U", a:"u" },
    { organism:"Arabidopsis plants", dom:"purple stems", rec:"green stems", A:"P", a:"p" }
  ];

  const traitRule = t => `In ${t.organism}, ${t.dom} (${t.A}) is completely dominant to ${t.rec} (${t.a}).`;

  let rng = Math.random;
  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const randInt = (min,max) => Math.floor(rng() * (max-min+1)) + min;
  const shuffle = arr => {
    const a = [...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(rng()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  };
  const fmt = n => Number.isInteger(n) ? String(n) : Number(n.toFixed(3)).toString();
  const unique = arr => [...new Set(arr.map(String))];
  const chooseOptions = (correct, distractors, count=4) => shuffle(unique([correct,...distractors]).slice(0,count));
  const fractionOptions = correct => chooseOptions(correct,["0","1/16","1/8","3/16","1/4","3/8","1/2","5/8","3/4","7/8","1"]);
  const percentOptions = correct => chooseOptions(`${correct}%`,[`${Math.max(0,correct-25)}%`,`${Math.min(100,correct+25)}%`,`${100-correct}%`,"50%"]);

  function load(key, fallback){
    try{
      const parsed=JSON.parse(localStorage.getItem(key));
      if(parsed===null) return structuredClone(fallback);
      return parsed;
    }catch{
      return structuredClone(fallback);
    }
  }

  let stats = load(STORAGE.stats,{attempted:0,correct:0,streak:0,bestStreak:0});
  let recent = load(STORAGE.recent,[]);
  let mastery = load(STORAGE.mastery,{});
  if(!Array.isArray(recent)) recent=[];
  if(!mastery || typeof mastery!=="object" || Array.isArray(mastery)) mastery={};

  let session={current:1,total:10,answered:0,correct:0};
  let current=null, selected=null, locked=false;
  let activeMode="random", timerHandle=null, timeRemaining=0;
  let seededState=null, recentFamilies=[];
  let sessionTaskCounts={}, sessionObjectiveCounts={}, sessionTopicCounts={};

  function save(){
    localStorage.setItem(STORAGE.stats,JSON.stringify(stats));
    localStorage.setItem(STORAGE.recent,JSON.stringify(recent.slice(-600)));
    localStorage.setItem(STORAGE.mastery,JSON.stringify(mastery));
  }

  function seededRandom(){
    seededState=(seededState*1664525+1013904223)>>>0;
    return seededState/4294967296;
  }

  function setRandomMode(seed=null){
    seededState=seed===null?null:(seed>>>0);
    rng=seededState===null?Math.random:seededRandom;
  }

  function q(id,topic,difficulty,context,question,options,correct,hint,explanation,misconceptions={}){
    return {id,topic,difficulty,context,question,options:shuffle(options),correct:String(correct),hint,explanation,misconceptions};
  }

  const bank=[];

  function cognitiveTaskFor(topic,id){
    const exact={
      "mono-phenotype":"phenotype prediction","mono-genotype":"genotype prediction",
      "mono-identify-genotype":"genotype identification","mono-vocabulary":"concept recognition",
      "mono-punnett-error":"error analysis","mono-information":"information sufficiency",
      "mono-counts":"expected counts","mono-reverse":"reverse inference",
      "mono-testcross-design":"experimental design","mono-sampling":"data interpretation",
      "mono-multiple-crosses":"multi-cross inference","mono-conditional":"conditional probability",
      "mono-binomial":"binomial probability","mono-at-least-one":"binomial probability",
      "mono-uncertainty":"evidence and uncertainty","mono-student-reasoning":"error analysis",
      "mono-hypotheses":"hypothesis comparison","mono-penetrance":"penetrance reasoning",
      "mono-lethal":"lethal-allele reasoning","mono-sufficiency-advanced":"information sufficiency",
      "gamete-count":"counting gametes","valid-gamete":"validity check","gamete-probability":"gamete probability",
      "offspring-genotype":"multilocus probability","gamete-with-linkage-warning":"conceptual linkage",
      "linked-gamete-probability":"linked probability","testcross-purpose":"experimental purpose",
      "testcross-inference":"genotype inference","testcross-sampling":"sampling interpretation",
      "testcross-expected-counts":"expected counts","testcross-evidence-comparison":"hypothesis comparison",
      "testcross-no-recessives":"evidence and uncertainty","dihybrid-gametes":"gamete construction",
      "dihybrid-ratio":"ratio recognition","dihybrid-product":"product-rule probability",
      "dihybrid-counts":"expected counts","dihybrid-at-least":"binomial probability","trihybrid-product":"multilocus probability",
      "inheritance-pattern":"pattern classification","incomplete-cross":"cross prediction","abo-probability":"multiple-allele probability",
      "lethal-allele":"lethal-allele reasoning","penetrance":"penetrance reasoning","expressivity":"concept distinction",
      "father-son":"transmission logic","carrier-sons":"risk prediction","xlinked-cross":"cross prediction",
      "infer-carrier":"reverse inference","xlinked-daughters":"conditional risk","xlinked-dominant":"pattern classification",
      "chi-expected":"expected counts","chi-df":"degrees of freedom","chi-contribution":"calculation",
      "chi-interpret":"statistical interpretation","chi-full":"multi-step calculation","chi-assumptions":"assumption evaluation",
      "pedigree-ar":"pattern classification","pedigree-ad":"pattern classification","carrier-given-unaffected":"conditional probability",
      "mitochondrial":"transmission pattern","y-linked":"transmission pattern","pedigree-risk":"risk prediction",
      "dominant-penetrance-risk":"penetrance reasoning","rf-definition":"concept recognition","identify-recombinants":"class identification",
      "rf-counts":"mapping calculation","phase":"phase inference","threepoint-order":"gene-order inference","maximum-rf":"concept interpretation",
      "epistasis-definition":"concept recognition","pathway-block":"pathway reasoning","recessive-epistasis":"ratio interpretation",
      "epistasis-ratio":"ratio classification","duplicate-dominant":"gene-interaction reasoning","complementary-genes":"pathway probability"
    };
    return exact[id] || id.replace(/^[^-]+-/,'').replaceAll('-',' ');
  }

  function learningObjectiveFor(topic,id){
    const linkageObjectives={
      "linkage-basic-definition":"linkage concept",
      "linkage-linked-vs-unlinked":"linkage concept",
      "linkage-parental-haplotypes":"chromosome haplotypes",
      "linkage-identify-parental":"parental versus recombinant",
      "linkage-identify-recombinant":"parental versus recombinant",
      "linkage-coupling":"phase arrangement",
      "linkage-repulsion":"phase arrangement",
      "linkage-testcross-purpose":"testcross interpretation",
      "linkage-class-size":"offspring-class interpretation",
      "linkage-rf-definition":"recombination frequency",
      "linkage-rf-simple-count":"recombination frequency",
      "linkage-rf-meaning":"map interpretation",
      "linkage-map-distance":"map calculation",
      "linkage-expected-recombinants":"expected counts",
      "linkage-each-recombinant":"expected gamete frequencies",
      "linkage-each-parental":"expected gamete frequencies",
      "linkage-infer-phase":"phase inference",
      "linkage-linked-data":"data interpretation",
      "linkage-gamete-frequency":"gamete prediction",
      "linkage-reverse-counts":"reverse inference",
      "linkage-sampling":"sampling variation",
      "linkage-compare-distances":"map comparison",
      "linkage-threepoint-middle":"three-point gene order",
      "linkage-threepoint-variable":"three-point gene order",
      "linkage-threepoint-interval":"three-point mapping",
      "linkage-dco-correction":"double-crossovers",
      "linkage-maximum-rf":"recombination ceiling",
      "linkage-physical-genetic":"physical versus genetic distance",
      "linkage-interference":"crossover interference",
      "linkage-experimental-design":"experimental design",
      "linkage-error-analysis":"error analysis",
      "linkage-compare-datasets":"data interpretation"
    };
    return topic==="linkage" ? (linkageObjectives[id] || cognitiveTaskFor(topic,id)) : cognitiveTaskFor(topic,id);
  }

  const add=(topic,difficulty,id,build,metadata={})=>bank.push({
    topic,difficulty,id,
    task:metadata.task || cognitiveTaskFor(topic,id),
    objective:metadata.objective || learningObjectiveFor(topic,id),
    build
  });

  // MONOHYBRID is registered from topics/monohybrid.js

  // GAMETES & MEIOSIS is registered from topics/gametes.js

  // TESTCROSS
  add("testcross","beginner","testcross-purpose",()=>q("testcross-purpose","testcross","beginner","An organism shows a dominant phenotype, but its genotype is unknown.","Why is it crossed with a homozygous recessive individual in a testcross?",["Recessive offspring reveal whether the unknown parent carries the recessive allele","The recessive parent forces all offspring to be recessive","It increases the mutation rate","It proves the dominant allele is more common"],"Recessive offspring reveal whether the unknown parent carries the recessive allele","The recessive tester contributes only recessive alleles.","Any recessive offspring must receive a recessive allele from the unknown parent, revealing that it is heterozygous."));

  add("testcross","beginner","testcross-inference",()=>{
    const t=pick(traits), outcome=pick(["all dominant","approximately 1:1 dominant to recessive"]), ans=outcome==="all dominant"?`${t.A}${t.A}`:`${t.A}${t.a}`;
    return q("testcross-inference","testcross","beginner",`${traitRule(t)} An individual showing ${t.dom} is crossed with ${t.a}${t.a}. The offspring are ${outcome}.`,`What genotype best fits the unknown parent?`,[`${t.A}${t.A}`,`${t.A}${t.a}`,`${t.a}${t.a}`,"No genotype can fit"],ans,"A 1:1 ratio indicates a heterozygote; all dominant offspring support a homozygous dominant parent.",outcome==="all dominant"?`${t.A}${t.A} × ${t.a}${t.a} gives all ${t.A}${t.a}.`:`${t.A}${t.a} × ${t.a}${t.a} gives half dominant and half recessive.`);
  });

  add("testcross","intermediate","testcross-sampling",()=>{
    const t=pick(traits), n=pick([4,6,8]), probability=(0.5**n), correct=`${(probability*100).toFixed(2)}%`;
    return q("testcross-sampling","testcross","intermediate",`${traitRule(t)} An unknown individual showing ${t.dom} is actually ${t.A}${t.a} and is testcrossed with ${t.a}${t.a}.`,`What is the probability that the first ${n} offspring all show the dominant phenotype, potentially misleading the investigator?`,chooseOptions(correct,[`${(50/n).toFixed(2)}%`,`${(0.25**n*100).toFixed(2)}%`,`50%`]),correct,"Each offspring independently has a 1/2 chance of being dominant.",`(1/2)^${n} = ${correct}. A small sample can occasionally mimic a homozygous dominant testcross.`);
  });

  add("testcross","advanced","testcross-evidence-comparison",()=>{
    const t=pick(traits), n=pick([4,6,8,10]);
    const chance=`${((0.5**n)*100).toFixed(n<=6?1:2)}%`;
    const supported=`${t.A}${t.A} is more strongly supported, but ${t.A}${t.a} cannot be ruled out`;
    return q(
      "testcross-evidence-comparison",
      "testcross",
      "advanced",
      `${traitRule(t)} An individual showing ${t.dom} could be ${t.A}${t.A} or ${t.A}${t.a}. It is testcrossed with ${t.a}${t.a}, and all ${n} offspring show ${t.dom}.`,
      `Which conclusion is best supported by these results?`,
      [
        supported,
        `The parent is proven to be ${t.A}${t.A}`,
        `The parent is proven to be ${t.A}${t.a}`,
        "Both possible genotypes are supported equally well"
      ],
      supported,
      `Compare the predictions of ${t.A}${t.A} × ${t.a}${t.a} and ${t.A}${t.a} × ${t.a}${t.a}. Then distinguish strong evidence from absolute proof.`,
      `${t.A}${t.A} predicts only dominant offspring. ${t.A}${t.a} predicts a 1:1 ratio, but it could still produce ${n} dominant offspring in a row by chance; that probability is (1/2)^${n} = ${chance}. Therefore, the results support ${t.A}${t.A} more strongly, but they do not prove it.`
    );
  });

  // DIHYBRID
  add("dihybrid","beginner","dihybrid-gametes",()=>q("dihybrid-gametes","dihybrid","beginner","The genes assort independently.","Which set lists all gametes from AaBb?",["AB, Ab, aB, ab","AA, Ab, bB, bb","AB and ab only","A, a, B, b"],"AB, Ab, aB, ab","Each gamete receives one allele from A/a and one from B/b.","The four combinations are AB, Ab, aB, and ab."));

  add("dihybrid","beginner","dihybrid-ratio",()=>{
    const c=pick([{ratio:"9:3:3:1",ans:"AaBb × AaBb"},{ratio:"1:1:1:1",ans:"AaBb × aabb"}]);
    return q("dihybrid-ratio","dihybrid","beginner","Assume complete dominance and independent assortment.",`Which cross is classically associated with a ${c.ratio} phenotypic ratio?`,["AaBb × AaBb","AaBb × aabb","AABB × aabb","Aabb × aaBb"],c.ans,"Recognize standard dihybrid cross and testcross ratios.",`${c.ans} produces the expected ${c.ratio} ratio.`);
  });

  add("dihybrid","intermediate","dihybrid-product",()=>{
    const c=pick([
      {ask:"both recessive phenotypes",ans:"1/16",calc:"1/4 × 1/4"},
      {ask:"both dominant phenotypes",ans:"9/16",calc:"3/4 × 3/4"},
      {ask:"dominant at A and recessive at B",ans:"3/16",calc:"3/4 × 1/4"},
      {ask:"heterozygous at both loci",ans:"1/4",calc:"1/2 × 1/2"},
      {ask:"a dominant phenotype at exactly one of the two loci",ans:"6/16",calc:"3/16 + 3/16"}
    ]);
    return q("dihybrid-product","dihybrid","intermediate","Consider AaBb × AaBb; the genes assort independently.",`What is the probability of offspring with ${c.ask}?`,fractionOptions(c.ans),c.ans,"Solve each locus separately, then use the product or sum rule as appropriate.",`${c.calc} = ${c.ans}.`);
  });

  add("dihybrid","intermediate","dihybrid-counts",()=>{
    const n=pick([160,320,640]), phenotype=pick([{name:"A_B_",p:9/16},{name:"A_bb",p:3/16},{name:"aaB_",p:3/16},{name:"aabb",p:1/16}]), ans=n*phenotype.p;
    return q("dihybrid-counts","dihybrid","intermediate",`An AaBb × AaBb cross produces ${n} offspring. The loci assort independently and show complete dominance.`,`How many offspring are expected in phenotype class ${phenotype.name}?`,chooseOptions(ans,[n/16,n*3/16,n*9/16,n/4]),ans,"Use the 9:3:3:1 ratio.",`${phenotype.name} has expected frequency ${phenotype.p}; ${n} × ${phenotype.p} = ${ans}.`);
  });

  add("dihybrid","advanced","dihybrid-at-least",()=>{
    const n=pick([2,3,4]), p=1/16, val=1-(1-p)**n, correct=`${(val*100).toFixed(1)}%`;
    return q("dihybrid-at-least","dihybrid","advanced","For AaBb × AaBb, each offspring independently has probability 1/16 of being aabb.",`What is the probability that at least one of ${n} offspring is aabb?`,chooseOptions(correct,[`${((p**n)*100).toFixed(1)}%`,`${((1-p)**n*100).toFixed(1)}%`,`${(n*p*100).toFixed(1)}%`]),correct,"Use 1 − P(no aabb offspring).",`1 − (15/16)^${n} = ${correct}.`);
  });

  add("dihybrid","advanced","trihybrid-product",()=>{
    const c=pick([{ask:"A_B_cc",ans:"9/64",calc:"3/4 × 3/4 × 1/4"},{ask:"aaBbC_",ans:"3/32",calc:"1/4 × 1/2 × 3/4"},{ask:"AaBbCc",ans:"1/8",calc:"1/2 × 1/2 × 1/2"}]);
    return q("trihybrid-product","dihybrid","advanced","Consider AaBbCc × AaBbCc with independent assortment and complete dominance.",`What is the probability of ${c.ask}?`,fractionOptions(c.ans),c.ans,"Calculate each locus independently, then multiply.",`${c.calc} = ${c.ans}.`);
  });

  // NON-MENDELIAN
  add("nonmendelian","beginner","inheritance-pattern",()=>{
    const c=pick([{desc:"The heterozygote has an intermediate phenotype.",ans:"Incomplete dominance"},{desc:"The heterozygote simultaneously expresses both allelic products.",ans:"Codominance"},{desc:"The heterozygote resembles one homozygote.",ans:"Complete dominance"}]);
    return q("inheritance-pattern","nonmendelian","beginner",c.desc,"Which inheritance pattern best fits?",["Complete dominance","Incomplete dominance","Codominance","Mitochondrial inheritance"],c.ans,"Focus on the phenotype of the heterozygote.",`${c.ans} is defined by this heterozygote phenotype.`);
  });

  add("nonmendelian","beginner","incomplete-cross",()=>q("incomplete-cross","nonmendelian","beginner","In snapdragons, CᴿCᴿ is red, CᴿCᵂ is pink, and CᵂCᵂ is white.","What phenotypic ratio is expected from CᴿCᵂ × CᴿCᵂ?",["1 red : 2 pink : 1 white","3 red : 1 white","1 pink : 1 white","All pink"],"1 red : 2 pink : 1 white","Each genotype has a distinct phenotype.","The 1:2:1 genotypic ratio is also the phenotypic ratio under incomplete dominance."));

  add("nonmendelian","intermediate","abo-probability",()=>{
    const c=pick([{cross:"Iᴬi × Iᴮi",ask:"type O",ans:"1/4",why:"ii"},{cross:"IᴬIᴮ × ii",ask:"type A",ans:"1/2",why:"Iᴬi"},{cross:"IᴬIᴮ × Iᴬi",ask:"type AB",ans:"1/4",why:"IᴬIᴮ"},{cross:"Iᴮi × ii",ask:"type B",ans:"1/2",why:"Iᴮi"}]);
    return q("abo-probability","nonmendelian","intermediate","In the ABO blood group, Iᴬ and Iᴮ are codominant and i is recessive.",`For ${c.cross}, what is the probability of a child with ${c.ask}?`,fractionOptions(c.ans),c.ans,"List the parental gametes and combine them.",`${c.why} occurs with probability ${c.ans}.`);
  });

  add("nonmendelian","intermediate","lethal-allele",()=>q("lethal-allele","nonmendelian","intermediate","In mice, Y gives yellow fur, y gives agouti fur, and YY is embryonic lethal. Two yellow mice are crossed.","Among living offspring, what yellow:agouti ratio is expected?",["2:1","3:1","1:1","1:2:1"],"2:1","Begin with the 1 YY : 2 Yy : 1 yy zygotic ratio, then remove YY.","YY embryos die. Among survivors, 2 Yy are yellow for every 1 yy agouti, giving 2:1."));

  add("nonmendelian","advanced","penetrance",()=>{
    const penetrance=pick([60,70,80,90]), affected=penetrance/2;
    return q("penetrance","nonmendelian","advanced",`A heterozygous parent carries an autosomal dominant allele with ${penetrance}% penetrance and mates with a homozygous unaffected parent.`,`What percentage of their children is expected to inherit the allele and express the phenotype?`,percentOptions(affected),`${affected}%`,`Multiply 1/2 inheritance probability by ${penetrance/100} penetrance.`,`0.50 × ${penetrance/100} = ${affected/100}, so ${affected}% are expected to express the phenotype.`);
  });

  add("nonmendelian","advanced","expressivity",()=>q("expressivity","nonmendelian","advanced","Several individuals carry the same disease-causing allele. All show the trait, but severity ranges from mild to severe.","Which concept best explains the variation in severity?",["Variable expressivity","Incomplete penetrance","Codominance","Genetic anticipation"],"Variable expressivity","Penetrance concerns whether a phenotype appears; expressivity concerns its degree.","Because every carrier is affected but the intensity varies, this is variable expressivity."));

  // X-LINKED
  add("sexlinked","beginner","father-son",()=>q("father-son","sexlinked","beginner","A gene is located on the X chromosome.","Why can a father not transmit his X-linked allele directly to a son?",["A son receives the Y chromosome from his father","The allele is always recessive","The paternal X is destroyed during meiosis","The mother determines all inherited alleles"],"A son receives the Y chromosome from his father","Identify which paternal sex chromosome produces a son.","A son receives Y from his father and X from his mother, so direct father-to-son X-linked transmission does not occur."));

  add("sexlinked","beginner","carrier-sons",()=>q("carrier-sons","sexlinked","beginner","A recessive allele a is X-linked. A carrier female XᴬXᵃ mates with an unaffected male XᴬY.","Among sons, what fraction is expected to be affected?",fractionOptions("1/2"),"1/2","Sons receive Y from the father and one of the mother's X chromosomes.","Half of sons receive Xᵃ from the carrier mother, so 1/2 are affected."));

  add("sexlinked","intermediate","xlinked-cross",()=>{
    const c=pick([
      {cross:"XᴬXᵃ × XᴬY",group:"all children",event:"affected",ans:"1/4",why:"only XᵃY sons are affected"},
      {cross:"XᴬXᵃ × XᵃY",group:"daughters",event:"affected",ans:"1/2",why:"all daughters receive paternal Xᵃ; half also receive maternal Xᵃ"},
      {cross:"XᵃXᵃ × XᴬY",group:"sons",event:"affected",ans:"1",why:"every son receives maternal Xᵃ"},
      {cross:"XᴬXᴬ × XᵃY",group:"daughters",event:"carriers",ans:"1",why:"all daughters are XᴬXᵃ"}
    ]);
    return q("xlinked-cross","sexlinked","intermediate",`A recessive allele a is X-linked. The cross is ${c.cross}.`,`Among ${c.group}, what proportion is expected to be ${c.event}?`,fractionOptions(c.ans),c.ans,"Track daughters and sons separately before conditioning on sex.",`${c.why}; therefore the answer is ${c.ans}.`);
  });

  add("sexlinked","intermediate","infer-carrier",()=>q("infer-carrier","sexlinked","intermediate","An unaffected couple has a son affected by an X-linked recessive condition. The father is unaffected.","What is the most likely genotype of the mother?",["XᴬXᴬ","XᴬXᵃ","XᵃXᵃ","XᴬY"],"XᴬXᵃ","The affected son received his X chromosome from his mother.","The mother is unaffected but transmitted Xᵃ, so she is most likely a heterozygous carrier."));

  add("sexlinked","advanced","xlinked-daughters",()=>q("xlinked-daughters","sexlinked","advanced","A woman whose father had an X-linked recessive disorder is unaffected. Assume the allele is fully penetrant and rare outside the family. She mates with an unaffected man.","What is the probability that a randomly chosen child is an affected son?",fractionOptions("1/4"),"1/4","The woman is an obligate carrier. Multiply P(son) by P(receives mutant X).","Her affected father gave her Xᵃ, so she is XᴬXᵃ. P(son) × P(Xᵃ from mother) = 1/2 × 1/2 = 1/4."));

  add("sexlinked","advanced","xlinked-dominant",()=>q("xlinked-dominant","sexlinked","advanced","An affected father has an X-linked dominant allele and mates with an unaffected mother.","Which outcome is expected, assuming full penetrance?",["All daughters affected and no sons affected","All sons affected and no daughters affected","Half of daughters and half of sons affected","All children affected"],"All daughters affected and no sons affected","The father gives his X to every daughter and his Y to every son.","All daughters inherit the affected paternal X; sons inherit the paternal Y and are unaffected."));

  // CHI-SQUARE
  add("chisquare","beginner","chi-expected",()=>{
    const r=pick([{label:"3:1",parts:[3,1]},{label:"1:1",parts:[1,1]},{label:"9:3:3:1",parts:[9,3,3,1]}]), m=pick([8,10,12,20]), total=r.parts.reduce((a,b)=>a+b,0)*m, i=randInt(0,r.parts.length-1), ans=r.parts[i]*m;
    return q("chi-expected","chisquare","beginner",`A model predicts a ${r.label} ratio and ${total} total offspring.`,`What is the expected count in category ${i+1}?`,chooseOptions(ans,[total,ans+m,Math.max(0,ans-m),total/r.parts.length]),ans,"Multiply the total by the expected fraction for that category.",`Expected = ${total} × ${r.parts[i]}/${r.parts.reduce((a,b)=>a+b,0)} = ${ans}.`);
  });

  add("chisquare","beginner","chi-df",()=>{
    const cats=pick([2,3,4,5,6]), ans=cats-1;
    return q("chi-df","chisquare","beginner",`A goodness-of-fit test has ${cats} mutually exclusive categories and no parameters estimated from the data.`,`What are the degrees of freedom?`,chooseOptions(ans,[cats,cats+1,1]),ans,"For this setting, df = number of categories − 1.",`${cats} − 1 = ${ans}.`);
  });

  add("chisquare","intermediate","chi-contribution",()=>{
    const E=pick([20,25,40,50,80]), delta=pick([-12,-10,-5,5,10,12]), O=E+delta, ans=fmt((O-E)**2/E);
    return q("chi-contribution","chisquare","intermediate",`For one category, observed O = ${O} and expected E = ${E}.`,`What is this category's contribution to χ²?`,chooseOptions(ans,[fmt(Math.abs(O-E)/E),fmt((O-E)**2),fmt(Math.abs(O-E))]),ans,"Use (O − E)²/E.",`(${O} − ${E})²/${E} = ${ans}.`);
  });

  add("chisquare","intermediate","chi-interpret",()=>{
    const p=pick([0.62,0.31,0.08,0.051,0.049,0.03,0.01]), ans=p<.05?"Reject the null hypothesis":"Fail to reject the null hypothesis";
    return q("chi-interpret","chisquare","intermediate",`A chi-square goodness-of-fit test gives p = ${p}. Use α = 0.05.`,`What is the appropriate conclusion?`,["Reject the null hypothesis","Fail to reject the null hypothesis","Accept and prove the null hypothesis","The result determines the causal gene"],ans,"Compare p with α; avoid saying the null hypothesis is proven.",p<.05?"Because p < 0.05, reject the null hypothesis.":"Because p ≥ 0.05, fail to reject the null hypothesis. This does not prove the model is true.");
  });

  add("chisquare","advanced","chi-full",()=>{
    const observed=pick([[78,22],[46,54],[91,29],[147,53]]), total=observed[0]+observed[1], ratio=pick([[3,1],[1,1]]), sum=ratio[0]+ratio[1], expected=ratio.map(x=>total*x/sum), chi=observed.reduce((s,o,i)=>s+(o-expected[i])**2/expected[i],0), ans=fmt(chi);
    return q("chi-full","chisquare","advanced",`Observed counts are ${observed.join(" and ")}. The proposed ratio is ${ratio.join(":")}.`,`What is χ² for this dataset?`,chooseOptions(ans,[fmt(Math.abs(observed[0]-expected[0])),fmt(chi/2),fmt(chi+1)]),ans,"Calculate expected counts first, then sum (O−E)²/E over both categories.",`Expected counts are ${expected.map(fmt).join(" and ")}. Summing the two contributions gives χ² = ${ans}.`);
  });

  add("chisquare","advanced","chi-assumptions",()=>q("chi-assumptions","chisquare","advanced","A student applies a chi-square goodness-of-fit test to offspring categories.","Which condition is most important for the standard approximation to be reliable?",["Expected counts should generally not be too small","Observed counts must exactly match expected counts","All categories must have equal expected probabilities","The null hypothesis must already be known to be true"],"Expected counts should generally not be too small","Chi-square relies on an approximation that performs poorly with very small expected counts.","Expected counts are commonly expected to be at least about 5 in most categories; otherwise categories may need combining or an exact method may be preferable."));

  // PEDIGREE
  add("pedigree","beginner","pedigree-ar",()=>q("pedigree-ar","pedigree","beginner","Two unaffected parents have an affected child. The trait occurs in both sexes and may skip generations.","Which inheritance pattern is most consistent?",["Autosomal recessive","Autosomal dominant","Y-linked","Mitochondrial"],"Autosomal recessive","Unaffected carriers can have an affected child.","Autosomal recessive traits often affect both sexes and may appear among siblings while skipping generations."));

  add("pedigree","beginner","pedigree-ad",()=>q("pedigree-ad","pedigree","beginner","A trait appears in successive generations. Affected individuals usually have an affected parent, and both sexes are affected.","Which pattern is most consistent?",["Autosomal dominant","Autosomal recessive","X-linked recessive","Y-linked"],"Autosomal dominant","Vertical transmission suggests dominance.","The pattern best matches autosomal dominant inheritance, assuming high penetrance."));

  add("pedigree","intermediate","carrier-given-unaffected",()=>q("carrier-given-unaffected","pedigree","intermediate","Two carriers for an autosomal recessive condition, Aa × Aa, have an unaffected child.","Given that the child is unaffected, what is the probability the child is a carrier?",["1/4","1/3","1/2","2/3"],"2/3","Condition on being unaffected; exclude aa.","Among unaffected outcomes AA, Aa, Aa, two of three are carriers, so the probability is 2/3."));

  add("pedigree","intermediate","mitochondrial",()=>q("mitochondrial","pedigree","intermediate","An affected mother transmits a trait to all children, while an affected father transmits it to none.","Which pattern is most consistent?",["Mitochondrial","Autosomal dominant","X-linked dominant","Y-linked"],"Mitochondrial","Mitochondria are normally inherited through the egg.","Maternal transmission with no paternal transmission is characteristic of mitochondrial inheritance."));

  add("pedigree","intermediate","y-linked",()=>q("y-linked","pedigree","intermediate","A trait appears only in males, and every affected father passes it to all of his sons.","Which inheritance pattern is most consistent?",["Y-linked","X-linked recessive","Autosomal dominant","Mitochondrial"],"Y-linked","A Y chromosome passes from father to son.","Male-only, father-to-all-sons transmission is the classic Y-linked pattern."));

  add("pedigree","advanced","pedigree-risk",()=>{
    const carrierRisk=2/3, partnerCarrier=pick([1/20,1/30,1/40]), affected=carrierRisk*partnerCarrier*.25, denom=Math.round(1/affected), correct=`about 1/${denom}`;
    return q("pedigree-risk","pedigree","advanced",`An unaffected sibling of a person with a rare autosomal recessive condition has carrier probability 2/3. Their unrelated partner has carrier probability ${partnerCarrier}.`,`What is the approximate probability their child will be affected?`,chooseOptions(correct,[`about 1/${Math.round(1/(carrierRisk*partnerCarrier))}`,`about 1/${Math.round(1/(partnerCarrier*.25))}`,"1/4"]),correct,"Both parents must be carriers, then two carriers have a 1/4 affected-child risk.",`(2/3) × (${partnerCarrier}) × (1/4) ≈ ${correct}.`);
  });

  
  // Linkage families are registered from topics/linkage.js.
// GENE INTERACTIONS
  add("interactions","beginner","epistasis-definition",()=>q("epistasis-definition","interactions","beginner","Two genes affect the same phenotype.","What does epistasis mean?",["An allele at one locus masks or modifies the phenotypic effect of a genotype at another locus","Two alleles at one locus are both expressed","A gene lies on the X chromosome","A phenotype is caused only by the environment"],"An allele at one locus masks or modifies the phenotypic effect of a genotype at another locus","Epistasis is an interaction between loci, not between alleles at one locus.","In epistasis, genotype at one gene changes whether or how another gene is expressed phenotypically."));

  add("interactions","intermediate","recessive-epistasis",()=>q("recessive-epistasis","interactions","intermediate","In Labrador coat color, B_ gives black and bb gives brown, but ee prevents pigment deposition and produces yellow regardless of B/b. Two BbEe dogs are crossed.","What fraction of offspring is expected to be yellow?",fractionOptions("1/4"),"1/4","Yellow requires ee; the B locus does not matter when ee is present.","From Ee × Ee, P(ee)=1/4. All B_ee and bbee offspring are yellow."));

  add("interactions","intermediate","epistasis-ratio",()=>q("epistasis-ratio","interactions","intermediate","A dihybrid cross produces a 9:3:4 phenotypic ratio.","Which interaction commonly generates this modified ratio?",["Recessive epistasis","Codominance","X-linkage","Independent assortment with no interaction"],"Recessive epistasis","The 9:3:4 ratio combines two classes because a homozygous recessive genotype masks the other locus.","Recessive epistasis commonly converts the 9:3:3:1 ratio into 9:3:4."));

  add("interactions","advanced","duplicate-dominant",()=>q("duplicate-dominant","interactions","advanced","Either A_ or B_ is sufficient to produce a purple phenotype; only aabb is white. AaBb individuals are crossed.","What phenotypic ratio is expected?",["15 purple : 1 white","9 purple : 7 white","12 purple : 3 brown : 1 white","9:3:3:1"],"15 purple : 1 white","Only one of the 16 dihybrid outcomes, aabb, lacks both dominant functions.","Fifteen of sixteen offspring have at least one dominant allele at A or B; only aabb is white, giving 15:1."));

  add("interactions","advanced","complementary-genes",()=>q("complementary-genes","interactions","advanced","Pigment requires at least one dominant allele at both genes: A_B_ is colored, while aaB_, A_bb, and aabb are white. AaBb individuals are crossed.","What phenotypic ratio is expected?",["9 colored : 7 white","15 colored : 1 white","12 colored : 4 white","9:3:3:1"],"9 colored : 7 white","Only A_B_ produces pigment.","A_B_ accounts for 9/16. The remaining 7/16 lack a required dominant function, giving 9:7."));



  add("testcross","intermediate","testcross-expected-counts",()=>{
    const t=pick(traits), total=pick([40,60,80,100,120,160]);
    const unknown=pick(["heterozygous","homozygous dominant"]);
    const recessive=unknown==="heterozygous"?total/2:0;
    const genotype=unknown==="heterozygous"?`${t.A}${t.a}`:`${t.A}${t.A}`;
    return q("testcross-expected-counts","testcross","intermediate",
      `A ${t.dom} individual with genotype ${genotype} is testcrossed with ${t.a}${t.a}, producing ${total} offspring.`,
      `How many offspring are expected to show ${t.rec}?`,
      chooseOptions(recessive,[total-recessive,total/4,total]),recessive,
      `Determine whether the unknown parent can contribute ${t.a}; then apply the expected testcross ratio.`,
      `${genotype} × ${t.a}${t.a} produces ${unknown==="heterozygous"?"a 1:1 dominant-to-recessive ratio":"only heterozygous dominant-phenotype offspring"}, so ${recessive} recessive offspring are expected.`);
  });

  // EXTRA VARIETY FOR PREVIOUSLY SPARSE TOPIC/DIFFICULTY COMBINATIONS
  add("testcross","advanced","testcross-no-recessives",()=>{
    const n=pick([4,5,6,8,10]);
    const probability=(0.5**n)*100;
    const correct=`${probability<0.1?probability.toFixed(2):probability.toFixed(1)}%`;
    return q("testcross-no-recessives","testcross","advanced",
      `An unknown dominant-phenotype individual is actually heterozygous, Aa, and is testcrossed with aa. Exactly ${n} offspring are examined.`,
      `What is the probability that all ${n} offspring show the dominant phenotype, potentially making the parent appear homozygous?`,
      chooseOptions(correct,[`${(50/n).toFixed(1)}%`,`${((1-0.5**n)*100).toFixed(1)}%`,`50%`]),correct,
      `For Aa × aa, each offspring has a 1/2 probability of showing the dominant phenotype. Multiply across ${n} independent offspring.`,
      `P(all dominant) = (1/2)^${n} = ${correct}. A finite testcross can therefore occasionally fail to reveal heterozygosity.`);
  });

  add("pedigree","advanced","dominant-penetrance-risk",()=>{
    const penetrance=pick([60,70,75,80,90]);
    const inherit=0.5;
    const affected=inherit*penetrance/100;
    const correct=`${affected*100}%`;
    return q("dominant-penetrance-risk","pedigree","advanced",
      `A heterozygous parent carries a rare autosomal dominant allele with ${penetrance}% penetrance. The other parent does not carry the allele.`,
      `What is the probability that a child will inherit the allele and express the phenotype?`,
      percentOptions(affected*100),correct,
      `Multiply the 1/2 inheritance probability by the penetrance.`,
      `P(inherit and express) = 0.5 × ${penetrance/100} = ${affected}, or ${correct}. Penetrance affects expression after inheritance.`);
  });


  add("interactions","beginner","pathway-block",()=>{
    const blocked=pick(["aa","bb"]);
    const correct=blocked==="aa"?"The first biochemical step is blocked":"The second biochemical step is blocked";
    return q("pathway-block","interactions","beginner",
      `A pigment pathway is Colorless precursor —(gene A)→ Intermediate —(gene B)→ Purple pigment. Functional alleles A_ and B_ provide the corresponding enzymes.`,
      `What best explains why an individual with genotype ${blocked==="aa"?"aaB_":"A_bb"} is colorless?`,
      ["The first biochemical step is blocked","The second biochemical step is blocked","Both enzymes are fully functional","The genes must be X-linked"],correct,
      `Match the homozygous recessive genotype to the enzyme step it disables.`,
      `${blocked} eliminates functional gene ${blocked==="aa"?"A":"B"} product, so ${correct.toLowerCase()} and purple pigment cannot be completed.`);
  });

  const difficultyRank={beginner:1,intermediate:2,advanced:3};

  function eligibleGenerators(){
    const topic=els.topic.value, difficulty=els.difficulty.value;
    return bank.filter(g => (topic==="mixed" || g.topic===topic) && g.difficulty===difficulty);
  }

    registerMonohybridTopic({
      add, q, pick, shuffle, chooseOptions, fractionOptions,
      traits, traitRule, rng: () => rng
    });
    registerGametesTopic({
      add, q, pick, shuffle, chooseOptions, fractionOptions,
      traits, traitRule, rng: () => rng
    });
    registerMeiosis5Topic({
      add, q, pick, shuffle, chooseOptions, fractionOptions,
      traits, traitRule, rng: () => rng
    });
    registerLinkageTopic({ add, q, pick, shuffle, chooseOptions, rng: () => rng });

function chooseGenerator(){
    let pool=eligibleGenerators();
    if(!pool.length){
      const topic=els.topic.value;
      pool=bank.filter(g => topic==="mixed" || g.topic===topic);
    }

    // Choose by pedagogical need, not merely by random template. Families whose
    // cognitive task has appeared least often in this session receive priority.
    const scored=pool.map(g=>{
      const taskUses=sessionTaskCounts[g.task]||0;
      const objectiveUses=sessionObjectiveCounts[g.objective]||0;
      const topicUses=sessionTopicCounts[g.topic]||0;
      const recentPenalty=recentFamilies.includes(g.id)?6:0;
      const sameTaskRecent=recentFamilies.slice(-3).some(id=>{
        const prior=bank.find(x=>x.id===id); return prior && prior.task===g.task;
      })?4:0;
      const mixedTopicPenalty=els.topic.value==="mixed"?topicUses:0;
      return {g,score:objectiveUses*18+taskUses*8+mixedTopicPenalty*2+recentPenalty+sameTaskRecent,r:rng()};
    }).sort((a,b)=>a.score-b.score || a.r-b.r);

    const generator=scored[0].g;
    sessionTaskCounts[generator.task]=(sessionTaskCounts[generator.task]||0)+1;
    sessionObjectiveCounts[generator.objective]=(sessionObjectiveCounts[generator.objective]||0)+1;
    sessionTopicCounts[generator.topic]=(sessionTopicCounts[generator.topic]||0)+1;
    recentFamilies.push(generator.id);
    if(recentFamilies.length>16) recentFamilies.shift();
    return generator;
  }

  function signature(x){
    // Conceptual identity is deliberately independent of organism names and
    // numerical values. The detailed signature still prevents exact repeats.
    const generator=bank.find(g=>g.id===x.id);
    const conceptual=[x.topic,x.difficulty,generator?.objective||generator?.task||x.id,generator?.task||x.id,x.id].join("||");
    const detailed=[x.context,x.question,x.correct].join("||");
    return `${conceptual}||${detailed}`;
  }

  function makeQuestion(){
    let x,s,tries=0;
    do{
      const generator=chooseGenerator();
      x=generator.build();
      s=signature(x);
      tries++;
    }while(recent.includes(s) && tries<500);
    if(recent.includes(s)) recent=recent.slice(Math.floor(recent.length/2));
    recent.push(s);
    if(recent.length>600) recent.shift();
    save();
    return x;
  }

  function render(){
    selected=null; locked=false; current=makeQuestion();
    els.topicPill.textContent=topicLabels[current.topic] || "🧬 Genetics";
    els.questionNumber.textContent=`Question ${session.current} of ${session.total}`;
    els.context.textContent=current.context;
    els.question.textContent=current.question;
    els.options.innerHTML="";
    els.feedback.className="feedback";
    els.feedback.innerHTML="";
    els.nextBtn.disabled=true;
    els.checkBtn.disabled=false;
    els.hintBtn.disabled=false;

    current.options.forEach((option,i)=>{
      const b=document.createElement("button");
      b.className="option";
      b.type="button";
      b.dataset.value=String(option);
      const letter=document.createElement("span");
      letter.className="letter";
      letter.textContent=String.fromCharCode(65+i);
      const text=document.createElement("span");
      text.textContent=String(option);
      b.append(letter,text);
      b.onclick=()=>{
        if(locked)return;
        selected=String(option);
        document.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
        b.classList.add("selected");
      };
      els.options.appendChild(b);
    });
    updateUI();
  }

  function showFeedback(kind,title,body,worked=""){
    els.feedback.className=`feedback show ${kind}`;
    els.feedback.innerHTML="";
    const h=document.createElement("h3"); h.textContent=title;
    const p=document.createElement("p"); p.textContent=body;
    els.feedback.append(h,p);
    if(worked){
      const div=document.createElement("div"); div.className="worked";
      const strong=document.createElement("strong"); strong.textContent="Worked explanation";
      const wp=document.createElement("p"); wp.textContent=worked;
      div.append(strong,wp); els.feedback.append(div);
    }
  }

  function check(){
    if(locked)return;
    if(selected===null){showFeedback("hint","Choose an answer first","Select one option before checking.");return;}
    locked=true;
    const ok=selected===current.correct;
    stats.attempted++; session.answered++;
    mastery[current.topic] ||= {attempted:0,correct:0};
    mastery[current.topic].attempted++;
    if(ok){
      stats.correct++; stats.streak++; stats.bestStreak=Math.max(stats.bestStreak||0,stats.streak); session.correct++; mastery[current.topic].correct++;
    }else stats.streak=0;

    document.querySelectorAll(".option").forEach(b=>{
      b.disabled=true;
      if(b.dataset.value===current.correct)b.classList.add("correct");
      if(b.dataset.value===selected&&!ok)b.classList.add("wrong");
    });

    if(ok) showFeedback("good","Correct!","That reasoning is right.",current.explanation);
    else showFeedback("bad","Not quite",current.misconceptions[selected] || `The correct answer is ${current.correct}.`,current.explanation);

    els.checkBtn.disabled=true;
    els.hintBtn.disabled=true;
    els.nextBtn.disabled=false;
    save(); updateUI();
  }

  function next(){
    if(!locked)return;
    if(session.current>=session.total){
      const pct=Math.round(session.correct/session.total*100);
      showFeedback(pct>=70?"good":"hint","Session complete",`You answered ${session.correct} of ${session.total} correctly (${pct}%).`);
      els.questionNumber.textContent="Session complete";
      els.nextBtn.textContent="Start another session";
      els.nextBtn.disabled=false;
      els.nextBtn.onclick=()=>startSession(session.total);
      return;
    }
    session.current++;
    render();
  }

  function updateUI(){
    const acc=stats.attempted?Math.round(stats.correct/stats.attempted*100):0;
    els.attempted.textContent=stats.attempted;
    els.correct.textContent=stats.correct;
    els.accuracy.textContent=`${acc}%`;
    els.streak.textContent=stats.streak;
    els.progressText.textContent=`${session.answered} / ${session.total}`;
    els.progressBar.style.width=`${session.answered/session.total*100}%`;
  }

  function stopTimer(){
    if(timerHandle) clearInterval(timerHandle);
    timerHandle=null;
    els.timer.classList.remove("show");
  }

  function updateTimer(){
    const min=String(Math.floor(timeRemaining/60)).padStart(2,"0");
    const sec=String(timeRemaining%60).padStart(2,"0");
    els.timer.textContent=`${min}:${sec}`;
  }

  function startTimer(seconds){
    stopTimer(); timeRemaining=seconds; els.timer.classList.add("show"); updateTimer();
    timerHandle=setInterval(()=>{
      timeRemaining--; updateTimer();
      if(timeRemaining<=0){
        stopTimer(); locked=true;
        showFeedback("bad","Time is up",`You answered ${session.correct} of ${session.answered} attempted questions correctly.`);
        els.checkBtn.disabled=true; els.hintBtn.disabled=true; els.nextBtn.disabled=true;
      }
    },1000);
  }

  function startSession(total=10){
    session={current:1,total,answered:0,correct:0};
    recentFamilies=[];
    sessionTaskCounts={};
    sessionObjectiveCounts={};
    sessionTopicCounts={};
    els.nextBtn.textContent="Next question";
    els.nextBtn.onclick=next;
    render();
  }

  function showDashboard(){
    stopTimer(); setRandomMode();
    els.practiceShell.classList.add("hidden");
    els.statsPanel.classList.add("hidden");
    els.dashboard.classList.remove("hidden");
  }

  function showPractice(){
    els.dashboard.classList.add("hidden");
    els.statsPanel.classList.add("hidden");
    els.practiceShell.classList.remove("hidden");
  }

  function launchMode(mode){
    activeMode=mode; stopTimer(); showPractice(); setRandomMode();
    if(mode==="random"){
      els.activeModeLabel.textContent="🧬 Random Practice"; els.topic.value="mixed"; els.difficulty.value="intermediate"; startSession(10);
    }else if(mode==="topic"){
      els.activeModeLabel.textContent="🎯 Topic Practice"; if(els.topic.value==="mixed") els.topic.value="monohybrid"; els.difficulty.value="intermediate"; startSession(10);
    }else if(mode==="challenge"){
      els.activeModeLabel.textContent="📈 Challenge Mode"; els.topic.value="mixed"; els.difficulty.value="advanced"; startSession(10);
    }else if(mode==="daily"){
      els.activeModeLabel.textContent="🔥 Daily Challenge"; els.topic.value="mixed"; els.difficulty.value="intermediate";
      const now=new Date(); const seed=Number(`${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`);
      setRandomMode(seed); startSession(5);
    }else if(mode==="timed"){
      els.activeModeLabel.textContent="🏆 Timed Quiz"; els.topic.value="mixed"; els.difficulty.value="advanced"; startSession(10); startTimer(300);
    }
  }

  function showStats(){
    stopTimer();
    els.dashboard.classList.add("hidden"); els.practiceShell.classList.add("hidden"); els.statsPanel.classList.remove("hidden");
    const acc=stats.attempted?Math.round(stats.correct/stats.attempted*100):0;
    els.statsAttempted.textContent=stats.attempted; els.statsCorrect.textContent=stats.correct; els.statsAccuracy.textContent=`${acc}%`; els.statsStreak.textContent=stats.streak;
    let message="Complete a few questions to begin building your performance history.";
    if(stats.attempted>=5){
      const weak=Object.entries(mastery).filter(([,v])=>v.attempted>=3).sort((a,b)=>(a[1].correct/a[1].attempted)-(b[1].correct/b[1].attempted))[0];
      if(acc>=85) message="Excellent performance. Your overall accuracy suggests strong mastery across the questions attempted so far.";
      else if(acc>=70) message="Good progress. You are getting most questions right, with room to strengthen a few topics.";
      else message="Keep practising. Focused topic sessions and worked explanations should steadily raise your accuracy.";
      if(weak) message+=` Your lowest measured topic so far is ${topicLabels[weak[0]]?.replace(/^\S+\s/,"") || weak[0]} (${Math.round(weak[1].correct/weak[1].attempted*100)}%).`;
    }
    els.statsMessage.textContent=message;
  }

  els.checkBtn.onclick=check;
  els.hintBtn.onclick=()=>{if(!locked)showFeedback("hint","Hint",current.hint)};
  els.nextBtn.onclick=next;
  els.newSessionBtn.onclick=()=>startSession(session.total);
  els.topic.onchange=()=>{if(!els.practiceShell.classList.contains("hidden"))startSession(session.total)};
  els.difficulty.onchange=()=>{if(!els.practiceShell.classList.contains("hidden"))startSession(session.total)};
  els.homeBtn.onclick=showDashboard;
  els.statsHomeBtn.onclick=showDashboard;
  document.querySelectorAll(".mode-card").forEach(card=>card.onclick=()=>card.dataset.mode==="stats"?showStats():launchMode(card.dataset.mode));
  els.resetProgressBtn.onclick=()=>{
    if(!confirm("Reset all saved practice statistics, topic mastery, and recent-question history?"))return;
    stats={attempted:0,correct:0,streak:0,bestStreak:0}; recent=[]; mastery={}; recentFamilies=[]; save(); startSession(session.total);
  };

  showDashboard();