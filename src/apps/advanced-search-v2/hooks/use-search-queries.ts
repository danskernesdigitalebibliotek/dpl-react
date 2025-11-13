import { useMemo } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import { SuggestState, MultiSelectState, FacetState } from "../types";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";

interface UseSearchQueriesReturn {
  cql: string;
  hasQuery: boolean;
  urlState: {
    suggests: SuggestState[];
    selects: MultiSelectState[];
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

  const [selects] = useQueryState(
    "selects",
    parseAsJson((value) => value as MultiSelectState[]).withDefault([])
  );

  const [facets] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  // Build CQL query from all inputs
  const cql = useMemo(
    () => buildCQLQuery(suggests, selects, facets),
    [suggests, selects, facets]
  );

  const hasQuery = hasValidQuery(cql);

  return {
    cql,
    hasQuery,
    urlState: {
      suggests,
      selects,
      facets
    }
  };
};
