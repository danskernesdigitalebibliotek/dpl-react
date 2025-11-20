import { useEffect } from "react";
import { useQueryState, parseAsJson, parseAsStringEnum } from "nuqs";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";
import { isValidSuggestState, isValidFacetState } from "../lib/validation";

type FormView = "search" | "results";

interface UseFormVisibilityReturn {
  view: FormView;
  hasCurrentQuery: boolean;
  showResults: boolean;
  setView: (value: FormView) => Promise<URLSearchParams>;
}

/**
 * Hook to manage form visibility state in URL
 * Reads from URL state to determine if there's an active search query
 */
export const useFormVisibility = (): UseFormVisibilityReturn => {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringEnum<FormView>(["search", "results"]).withDefault("search")
  );

  // Read committed search state from URL (not local draft state)
  const [urlSuggests] = useQueryState(
    "suggests",
    parseAsJson((value) => {
      if (isValidSuggestState(value)) return value;
      return [];
    }).withDefault([])
  );

  const [urlPreSearchFacets] = useQueryState(
    "preSearchFacets",
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([])
  );

  const [urlFacets] = useQueryState(
    "facets",
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([])
  );

  const cql = buildCQLQuery(urlSuggests, urlPreSearchFacets, urlFacets);
  const hasCurrentQuery = hasValidQuery(cql);

  // Ensure we show the form when there is no current query (e.g. after clearing)
  useEffect(() => {
    if (!hasCurrentQuery && view !== "search") {
      setView("search");
    }
  }, [hasCurrentQuery, view, setView]);

  const showResults = view === "results" && hasCurrentQuery;

  return {
    view,
    hasCurrentQuery,
    showResults,
    setView
  };
};
