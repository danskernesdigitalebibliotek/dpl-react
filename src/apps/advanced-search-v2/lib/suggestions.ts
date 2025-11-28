import type { Option } from "../types";

type ComplexSuggestItem = {
  type: string;
  term: string;
  traceId?: string | null;
};

export function suggestionsToOptions(results?: ComplexSuggestItem[]): Option[] {
  if (!results || results.length === 0) return [];

  return results.map((item) => ({
    label: item.term,
    value: item.term
  }));
}
