export function validateQuestion(question) {
  const required = ["id","topic","difficulty","context","question","options","correct","hint","explanation"];
  const missing = required.filter(key => question?.[key] === undefined || question?.[key] === null);
  if (missing.length) throw new Error(`Invalid question; missing: ${missing.join(", ")}`);
  if (!Array.isArray(question.options) || question.options.length < 3) {
    throw new Error(`Question ${question.id} must have at least three options.`);
  }
  if (!question.options.map(String).includes(String(question.correct))) {
    throw new Error(`Correct answer is absent from options for ${question.id}.`);
  }
  return question;
}

export function conceptualSignature(question, family) {
  return [family.topic, family.difficulty, family.objective, family.task, family.id, question.correct].join("||");
}
