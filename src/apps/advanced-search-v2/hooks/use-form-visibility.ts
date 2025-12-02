import { useEffect } from "react";
import { useQueryState, parseAsJson, parseAsStringEnum } from "nuqs";
import { buildCQLQuery, isWildcardQuery } from "../lib/query-builder";
import { isValidFilterState, isValidFacetState } from "../lib/validation";

type FormView = "search" | "results";

interface UseFormVisibilityReturn {
  view: FormView;
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
  const [urlFilters] = useQueryState(
    "filters",
    parseAsJson((value) => {
      if (isValidFilterState(value)) return value;
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

  const cql = buildCQLQuery(urlFilters, urlPreSearchFacets, urlFacets);
  const hasCurrentQuery = !isWildcardQuery(cql);

  // Ensure we show the form when there is no current query (e.g. after clearing)
  useEffect(() => {
    if (!hasCurrentQuery && view !== "search") {
      setView("search");
    }
  }, [hasCurrentQuery, view, setView]);

  const showResults = view === "results" && hasCurrentQuery;

  return {
    view,
    showResults,
    setView
  };
};
