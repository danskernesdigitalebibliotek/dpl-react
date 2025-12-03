import { useState, useEffect, useMemo } from "react";
import { isEqual } from "lodash";
import usePager from "../../../components/result-pager/use-pager";
import { Work } from "../../../core/utils/types/entities";
import {
  useComplexSearchWithPaginationQuery,
  HoldingsStatusEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { SortOption } from "../types";
import { getSortInput } from "../lib/sort-utils";
import useGetCleanBranches from "../../../core/utils/branches";
import { usePrevious } from "react-use";

export interface UsePaginatedResultsReturn {
  resultItems: Work[];
  hitcount: number;
  page: number;
  PagerComponent: React.FC<{ isLoading?: boolean }>;
  isLoadingOrRefetching: boolean;
  shouldShowSearchResults: boolean;
  shouldShowZeroResults: boolean;
}

interface UsePaginatedResultsProps {
  cql: string;
  isSearchEnabled: boolean;
  onShelf: boolean;
  pageSize: number;
  sort: SortOption;
}

/**
 * Hook to manage paginated search results with infinite scroll behavior.
 *
 * Key behaviors:
 * - Accumulates results across pages (infinite scroll pattern)
 * - Resets accumulated results when query parameters change (cql, sort, onShelf)
 * - Prevents "zero results" flash during query transitions
 * - Disables React Query caching to avoid stale data conflicts
 */
export const usePaginatedResults = ({
  cql,
  isSearchEnabled,
  onShelf,
  pageSize,
  sort
}: UsePaginatedResultsProps): UsePaginatedResultsReturn => {
  const cleanBranches = useGetCleanBranches();
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState(0);

  // Tracks when we're transitioning between different queries.
  // React Query's isFetching doesn't distinguish between "loading more pages"
  // and "loading fresh results after query change", so we track this separately.
  const [isRefetching, setIsRefetching] = useState(false);

  // Guards against showing "zero results" prematurely during query transitions.
  // Without this, there's a brief moment where hitcount=0 (from reset) and
  // isLoading=false (before React Query starts), which would flash the zero state.
  const [canShowZeroResults, setCanShowZeroResults] = useState(false);

  const { PagerComponent, page, resetPage } = usePager({
    hitcount,
    pageSize
  });

  const { data, isLoading, isFetching } = useComplexSearchWithPaginationQuery(
    {
      cql,
      offset: page * pageSize,
      limit: pageSize,
      filters: {
        ...(onShelf && {
          status: [HoldingsStatusEnum.Onshelf],
          branchId: cleanBranches
        })
      },
      sort: getSortInput(sort)
    },
    {
      enabled: isSearchEnabled,
      // Caching is disabled because we manually accumulate pages in resultItems.
      // Cached responses would conflict with our state management when the user
      // toggles facets or changes sort - we need fresh data each time.
      keepPreviousData: false,
      cacheTime: 0,
      staleTime: 0
    }
  );

  // Accumulate results for infinite scroll behavior.
  // Page 0 replaces results, subsequent pages append to existing results.
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

    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setResultItems(resultWorks);
  }, [data, page]);

  // Track query parameters to detect when we need to reset accumulated results.
  // Using usePrevious + isEqual provides cleaner change detection than manual state.
  // Includes onShelf to ensure filter changes reset pagination properly.
  const currentQuery = useMemo(
    () => ({ cql, sort, onShelf }),
    [cql, sort, onShelf]
  );
  const prevQuery = usePrevious(currentQuery);

  // Reset accumulated results when query parameters change.
  // This ensures users see fresh results when toggling facets or changing sort.
  useEffect(() => {
    if (prevQuery && !isEqual(prevQuery, currentQuery)) {
      setResultItems([]);
      setHitCount(0);
      setIsRefetching(true);
      setCanShowZeroResults(false);
      resetPage();
    }
  }, [currentQuery, prevQuery, resetPage]);

  // Mark refetching complete once data arrives.
  // This enables showing "zero results" only after we've actually fetched.
  useEffect(() => {
    if (!isFetching && !isLoading && isRefetching) {
      setIsRefetching(false);
      setCanShowZeroResults(true);
    }
  }, [isFetching, isLoading, isRefetching]);

  const isLoadingOrRefetching = isLoading || isFetching || isRefetching;
  const shouldShowSearchResults =
    isLoadingOrRefetching || resultItems.length > 0;
  const shouldShowZeroResults =
    !isLoadingOrRefetching && hitcount === 0 && canShowZeroResults;

  return {
    resultItems,
    hitcount,
    page,
    PagerComponent,
    isLoadingOrRefetching,
    shouldShowSearchResults,
    shouldShowZeroResults
  };
};
