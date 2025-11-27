import type { Option } from "../types";

type ComplexSuggestItem = {
  type: string;
  term: string;
  traceId?: string | null;
};

export function suggestionsToOptions(results?: ComplexSuggestItem[]): Option[] {
  if (!results || results.length === 0) return [];

  const seen = new Set<string>();

  return results
    .map((item) => item.term?.trim())
    .filter((term): term is string => Boolean(term && term.length > 0))
    .map((term) => ({ label: term, value: term.toLowerCase() }))
    .filter((opt) => {
      if (seen.has(opt.label)) return false;
      seen.add(opt.label);
      return true;
    });
}
