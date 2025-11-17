import { useState, useEffect, useMemo } from "react";
import usePager from "../../../components/result-pager/use-pager";
import { Work } from "../../../core/utils/types/entities";
import { useComplexSearchWithPaginationQuery } from "../../../core/dbc-gateway/generated/graphql";

export interface UsePaginatedResultsReturn {
  resultItems: Work[];
  hitcount: number;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  canShowZeroResults: boolean;
  page: number;
  PagerComponent: React.FC<{ isLoading?: boolean }>;
}

interface UsePaginatedResultsProps {
  cql: string;
  hasQuery: boolean;
  pageSize: number;
}

/**
 * Hook to manage paginated search results from GraphQL query
 */
export const usePaginatedResults = ({
  cql,
  hasQuery,
  pageSize
}: UsePaginatedResultsProps): UsePaginatedResultsReturn => {
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);
  const [lastQueryStr, setLastQueryStr] = useState("");
  const [canShowZeroResults, setCanShowZeroResults] = useState(false);

  const { PagerComponent, page, resetPage } = usePager({
    hitcount,
    pageSize
  });

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
      resetPage();
    }
  }, [currentQueryStr, lastQueryStr, resetPage]);

  // Update refetching state when data arrives
  useEffect(() => {
    if (!isFetching && !isLoading && isRefetching) {
      setIsRefetching(false);
      setCanShowZeroResults(true);
    }
  }, [isFetching, isLoading, isRefetching]);

  return {
    resultItems,
    hitcount,
    isLoading,
    isFetching,
    isRefetching,
    canShowZeroResults,
    page,
    PagerComponent
  };
};
