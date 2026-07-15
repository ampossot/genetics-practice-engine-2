export function byIds(ids) {
  return Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
}
