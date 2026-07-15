export function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value === null ? structuredClone(fallback) : value;
  } catch {
    return structuredClone(fallback);
  }
}

export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeKeys(keys) {
  keys.forEach(key => localStorage.removeItem(key));
}
