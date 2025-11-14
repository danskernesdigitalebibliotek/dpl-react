import { useEffect } from "react";
import { useQueryState, parseAsBoolean, parseAsJson } from "nuqs";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";
import { SuggestState, FilterState } from "../types";

interface UseFormVisibilityReturn {
  shouldShowForm: boolean;
  shouldShowSummary: boolean;
  setShowForm: (value: boolean) => Promise<URLSearchParams>;
}

/**
 * Hook to manage form visibility state in URL
 * Reads from URL state to determine if there's an active search query
 */
export const useFormVisibility = (): UseFormVisibilityReturn => {
  const [showForm, setShowForm] = useQueryState(
    "edit",
    parseAsBoolean.withDefault(true)
  );

  // Read committed search state from URL (not local draft state)
  const [urlSuggests] = useQueryState(
    "suggests",
    parseAsJson((value) => value as SuggestState[]).withDefault([])
  );

  const [urlFilters] = useQueryState(
    "filters",
    parseAsJson((value) => value as FilterState[]).withDefault([])
  );

  const cql = buildCQLQuery(urlSuggests, urlFilters);
  const hasCurrentQuery = hasValidQuery(cql);

  // Ensure we show the form when there is no current query (e.g. after clearing)
  useEffect(() => {
    if (!hasCurrentQuery && !showForm) {
      setShowForm(true);
    }
  }, [hasCurrentQuery, showForm, setShowForm]);

  const shouldShowSummary = !showForm && hasCurrentQuery;

  return {
    shouldShowForm: showForm,
    shouldShowSummary,
    setShowForm
  };
};
