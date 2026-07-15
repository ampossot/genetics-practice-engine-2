export function createSession(total = 10) {
  return { current: 1, total, answered: 0, correct: 0 };
}
