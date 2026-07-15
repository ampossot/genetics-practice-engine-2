export function pedagogicalScore(family, state) {
  const taskCount = state.taskCounts[family.task] || 0;
  const objectiveCount = state.objectiveCounts[family.objective] || 0;
  const topicCount = state.topicCounts[family.topic] || 0;
  const recentPenalty = state.recentFamilies.includes(family.id) ? 100 : 0;
  return objectiveCount * 14 + taskCount * 8 + topicCount * 3 + recentPenalty;
}
