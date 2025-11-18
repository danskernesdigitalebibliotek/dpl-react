import { useMemo } from "react";
import { useQueryState, parseAsJson, parseAsBoolean } from "nuqs";
import { SuggestState, FacetState } from "../types";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";

interface UseSearchQueriesReturn {
  cql: string;
  hasQuery: boolean;
  urlState: {
    suggests: SuggestState[];
    preSearchFacets: FacetState[];
    facets: FacetState[];
  };
}

/**
 * Hook to read search parameters from URL and build queries
 */
export const useSearchQueries = (): UseSearchQueriesReturn => {
  // Read all search state from URL
  const [suggests] = useQueryState(
    "suggests",
    parseAsJson((value) => value as SuggestState[]).withDefault([])
  );

  const [preSearchFacets] = useQueryState(
    "preSearchFacets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const [facets] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  // Read toggle states
  const [onShelf] = useQueryState("onShelf", parseAsBoolean.withDefault(false));

  const [onlyExtraTitles] = useQueryState(
    "onlyExtraTitles",
    parseAsBoolean.withDefault(false)
  );

  // Build CQL query from all inputs
  const cql = useMemo(
    () =>
      buildCQLQuery(
        suggests,
        preSearchFacets,
        facets,
        onShelf,
        onlyExtraTitles
      ),
    [suggests, preSearchFacets, facets, onShelf, onlyExtraTitles]
  );

  const hasQuery = hasValidQuery(cql);

  return {
    cql,
    hasQuery,
    urlState: {
      suggests,
      preSearchFacets,
      facets
    }
  };
};
