import { useMemo } from "react";
import {
  useQueryState,
  parseAsJson,
  parseAsBoolean,
  parseAsStringEnum
} from "nuqs";
import { FilterState, FacetState, SortOption } from "../types";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";
import { isValidFilterState, isValidFacetState } from "../lib/validation";

interface UseSearchQueriesReturn {
  cql: string;
  hasQuery: boolean;
  onShelf: boolean;
  onlyExtraTitles: boolean;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  urlState: {
    filters: FilterState[];
    preSearchFacets: FacetState[];
    facets: FacetState[];
  };
}

/**
 * Hook to read search parameters from URL and build queries
 */
export const useSearchQueries = (): UseSearchQueriesReturn => {
  // Read all search state from URL
  const [filters] = useQueryState(
    "filters",
    parseAsJson((value) => {
      if (isValidFilterState(value)) return value;
      return [];
    }).withDefault([])
  );

  const [preSearchFacets] = useQueryState(
    "preSearchFacets",
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([])
  );

  const [facets] = useQueryState(
    "facets",
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([])
  );

  // Read toggle states
  const [onShelf] = useQueryState("onShelf", parseAsBoolean.withDefault(false));

  const [onlyExtraTitles] = useQueryState(
    "onlyExtraTitles",
    parseAsBoolean.withDefault(false)
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum<SortOption>(Object.values(SortOption)).withDefault(
      SortOption.Relevance
    )
  );

  // Build CQL query from all inputs
  const cql = useMemo(
    () => buildCQLQuery(filters, preSearchFacets, facets, onlyExtraTitles),
    [filters, preSearchFacets, facets, onlyExtraTitles]
  );

  const hasQuery = hasValidQuery(cql);

  return {
    cql,
    hasQuery,
    onShelf,
    onlyExtraTitles,
    sort,
    setSort,
    urlState: {
      filters,
      preSearchFacets,
      facets
    }
  };
};
