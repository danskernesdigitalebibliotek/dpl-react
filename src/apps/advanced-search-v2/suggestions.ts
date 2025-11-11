export type Option = {
  label: string;
  value: string;
};

// Minimal common shape from both localSuggest and complexSuggest
// - localSuggest: { term, work: { titles: { main: string[] } } }
// - complexSuggest: { term, work: { titles: { main: string[] } } }
export type MinimalSuggestItem = {
  term: string;
  work?: { titles: { main: string[] } } | null;
};

export function suggestionsToOptions(results?: MinimalSuggestItem[]): Option[] {
  if (!results || results.length === 0) return [];

  const seen = new Set<string>();

  return results
    .map((item) => {
      const fromWork = item.work?.titles?.main?.[0];
      const raw = (typeof fromWork === "string" && fromWork) || item.term || "";
      const label = raw.trim();
      return label.length > 0 ? label : null;
    })
    .filter((label): label is string => Boolean(label))
    .map((label) => ({ label, value: label.toLowerCase() }))
    .filter((opt) => {
      if (seen.has(opt.label)) return false;
      seen.add(opt.label);
      return true;
    });
}
