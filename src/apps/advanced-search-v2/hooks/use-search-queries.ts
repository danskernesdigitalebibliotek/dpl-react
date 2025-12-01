import { useMemo } from "react";
import {
  useQueryState,
  parseAsJson,
  parseAsBoolean,
  parseAsStringEnum,
  parseAsString
} from "nuqs";
import { SuggestState, FacetState, SortOption } from "../types";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";
import { isValidSuggestState, isValidFacetState } from "../lib/validation";

interface UseSearchQueriesReturn {
  cql: string;
  hasQuery: boolean;
  onShelf: boolean;
  onlyExtraTitles: boolean;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
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
    parseAsJson((value) => {
      if (isValidSuggestState(value)) return value;
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

  // Radio filters
  const [fictionNonFiction] = useQueryState(
    "fictionNonFiction",
    parseAsString.withDefault("")
  );
  const [childrenOrAdults] = useQueryState(
    "childrenOrAdults",
    parseAsString.withDefault("")
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum<SortOption>(Object.values(SortOption)).withDefault(
      SortOption.Relevance
    )
  );

  // Build CQL query from all inputs
  const cql = useMemo(
    () =>
      buildCQLQuery(suggests, preSearchFacets, facets, onlyExtraTitles, {
        fictionNonFiction: fictionNonFiction || undefined,
        childrenOrAdults: childrenOrAdults || undefined
      }),
    [
      suggests,
      preSearchFacets,
      facets,
      onlyExtraTitles,
      fictionNonFiction,
      childrenOrAdults
    ]
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
      suggests,
      preSearchFacets,
      facets
    }
  };
};
