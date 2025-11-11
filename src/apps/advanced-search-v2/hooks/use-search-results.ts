import { useState, useEffect, useMemo } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import { useComplexSearchWithPaginationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { SuggestState, MultiSelectState, FacetState } from "../types";
import { Work } from "../../../core/utils/types/entities";
import {
  buildCQLQuery,
  buildFacetQuery,
  hasValidQuery
} from "../query-builder";
import { DEFAULT_PAGE_SIZE } from "../constants";

export interface UseSearchResultsReturn {
  resultItems: Work[];
  hitcount: number;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  cql: string;
  facetQuery: string;
  hasQuery: boolean;
  canShowZeroResults: boolean;
  resetResults: () => void;
}

interface UseSearchResultsProps {
  page: number;
  pageSize?: number;
}

/**
 * Hook to manage search results with GraphQL queries
 */
export const useSearchResults = ({
  page,
  pageSize = DEFAULT_PAGE_SIZE
}: UseSearchResultsProps): UseSearchResultsReturn => {
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

  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);
  const [lastQueryStr, setLastQueryStr] = useState("");
  const [canShowZeroResults, setCanShowZeroResults] = useState(false);

  // Build CQL query from all inputs
  const cql = useMemo(
    () => buildCQLQuery(suggests, selects, facets),
    [suggests, selects, facets]
  );

  // Build simple query for facets (without facet filters)
  const facetQuery = useMemo(
    () => buildFacetQuery(suggests, selects),
    [suggests, selects]
  );

  const hasQuery = hasValidQuery(cql);

  // Fetch search results - disabled if no query
  const { data, isLoading, isFetching } = useComplexSearchWithPaginationQuery(
    {
      cql,
      offset: page * pageSize,
      limit: pageSize,
      filters: {}
    },
    {
      enabled: hasQuery,
      keepPreviousData: false,
      cacheTime: 0,
      staleTime: 0
    }
  );

  // Update results when data changes
  useEffect(() => {
    if (!data) {
      return;
    }

    const {
      complexSearch: { works: resultWorks, hitcount: resultCount }
    } = data as {
      complexSearch: {
        works: Work[];
        hitcount: number;
      };
    };

    setHitCount(resultCount);

    // If page has changed then append the new result to the existing result
    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  // Reset results when CQL query changes
  const currentQueryStr = useMemo(() => cql, [cql]);

  useEffect(() => {
    if (currentQueryStr !== lastQueryStr) {
      setResultItems([]);
      setHitCount(0);
      setIsRefetching(true);
      setCanShowZeroResults(false);
      setLastQueryStr(currentQueryStr);
    }
  }, [currentQueryStr, lastQueryStr]);

  // Update refetching state when data arrives
  useEffect(() => {
    if (!isFetching && !isLoading && isRefetching) {
      setIsRefetching(false);
      setCanShowZeroResults(true);
    }
  }, [isFetching, isLoading, isRefetching]);

  const resetResults = () => {
    setResultItems([]);
    setHitCount(0);
    setIsRefetching(false);
    setCanShowZeroResults(false);
  };

  return {
    resultItems,
    hitcount,
    isLoading,
    isFetching,
    isRefetching,
    cql,
    facetQuery,
    hasQuery,
    canShowZeroResults,
    resetResults
  };
};
