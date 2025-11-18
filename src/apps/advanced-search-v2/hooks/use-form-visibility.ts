import { useEffect } from "react";
import { useQueryState, parseAsJson, parseAsStringEnum } from "nuqs";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";
import { SuggestState, FacetState } from "../types";

type FormView = "search" | "results";

interface UseFormVisibilityReturn {
  view: FormView;
  hasCurrentQuery: boolean;
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
    parseAsJson((value) => value as SuggestState[]).withDefault([])
  );

  const [urlPreSearchFacets] = useQueryState(
    "preSearchFacets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const [urlFacets] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const cql = buildCQLQuery(urlSuggests, urlPreSearchFacets, urlFacets);
  const hasCurrentQuery = hasValidQuery(cql);

  // Ensure we show the form when there is no current query (e.g. after clearing)
  useEffect(() => {
    if (!hasCurrentQuery && view !== "search") {
      setView("search");
    }
  }, [hasCurrentQuery, view, setView]);

  return {
    view,
    hasCurrentQuery,
    setView
  };
};
