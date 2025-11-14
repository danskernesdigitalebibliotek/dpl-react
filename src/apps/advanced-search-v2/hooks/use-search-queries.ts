import { useMemo } from "react";
import { useQueryState, parseAsJson, parseAsBoolean } from "nuqs";
import { SuggestState, FilterState } from "../types";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";

interface UseSearchQueriesReturn {
  cql: string;
  hasQuery: boolean;
  urlState: {
    suggests: SuggestState[];
    filters: FilterState[];
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

  const [filters] = useQueryState(
    "filters",
    parseAsJson((value) => value as FilterState[]).withDefault([])
  );

  // Read toggle states
  const [onShelf] = useQueryState("onShelf", parseAsBoolean.withDefault(false));

  const [onlyExtraTitles] = useQueryState(
    "onlyExtraTitles",
    parseAsBoolean.withDefault(false)
  );

  // Build CQL query from all inputs
  const cql = useMemo(
    () => buildCQLQuery(suggests, filters, onShelf, onlyExtraTitles),
    [suggests, filters, onShelf, onlyExtraTitles]
  );

  const hasQuery = hasValidQuery(cql);

  return {
    cql,
    hasQuery,
    urlState: {
      suggests,
      filters
    }
  };
};
