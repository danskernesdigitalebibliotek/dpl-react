import React, { useMemo } from "react";
import { HoldingsStatusEnum } from "../../../core/dbc-gateway/generated/graphql";
import { Work } from "../../../core/utils/types/entities";
import { SortOption } from "../types";
import { getSortInput } from "../lib/sort-utils";
import useGetCleanBranches from "../../../core/utils/branches";
import ResultPager from "../../../components/result-pager/result-pager";
import {
  useInfiniteComplexSearch,
  flattenInfiniteSearchResults,
  getHitcountFromPages
} from "./use-infinite-complex-search";

export interface UsePaginatedResultsReturn {
  resultItems: Work[];
  hitcount: number;
  page: number;
  PagerComponent: React.FC<{ isLoading?: boolean }>;
  isLoadingOrRefetching: boolean;
  shouldShowSearchResults: boolean;
  shouldShowResultHeadline: boolean;
  shouldShowZeroResults: boolean;
}

interface UsePaginatedResultsProps {
  cql: string;
  hasQuery: boolean;
  onShelf: boolean;
  pageSize: number;
  sort: SortOption;
}

/**
 * Hook to manage paginated search results with infinite scroll behavior.
 *
 * Uses react-query's useInfiniteQuery for:
 * - Automatic page accumulation
 * - Built-in keepPreviousData for smooth UX during query changes
 * - Simplified state management
 */
export const usePaginatedResults = ({
  cql,
  hasQuery,
  onShelf,
  pageSize,
  sort
}: UsePaginatedResultsProps): UsePaginatedResultsReturn => {
  const cleanBranches = useGetCleanBranches();

  const sortInput = getSortInput(sort);

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteComplexSearch(
    {
      cql,
      limit: pageSize,
      filters: {
        ...(onShelf && {
          status: [HoldingsStatusEnum.Onshelf],
          branchId: cleanBranches
        })
      },
      sort: sortInput
    },
    {
      enabled: hasQuery,
      // Caching is disabled to prevent scroll jumps when onShelf change.
      // With caching, toggling filters would briefly show old multi-page data,
      // then collapse to page 0 when new data arrives, causing a jarring jump.
      // Disabling cache ensures a clean loading → fresh content transition.
      keepPreviousData: false,
      cacheTime: 0,
      staleTime: 0
    }
  );

  // Derive values from infinite query data
  const resultItems = useMemo(
    () => flattenInfiniteSearchResults(data?.pages),
    [data?.pages]
  );

  const hitcount = getHitcountFromPages(data?.pages);

  // Page is 0-indexed, represents how many "load more" actions have occurred
  const page = data?.pages ? data.pages.length - 1 : 0;

  // Items shown for the pager display
  const itemsShown = Math.min(resultItems.length, hitcount);

  // Create PagerComponent that uses fetchNextPage
  // Following TanStack Query best practices:
  // - Guard fetchNextPage with hasNextPage && !isFetching to prevent overwrites
  // - Use isFetchingNextPage to show loading state (distinguishes from background refresh)
  const PagerComponent: React.FC<{ isLoading?: boolean }> = useMemo(
    () =>
      function Pager({ isLoading: pagerIsLoading }) {
        if (!hitcount) return null;

        return (
          <ResultPager
            itemsShown={itemsShown}
            hitcount={hitcount}
            classNames=""
            setPageHandler={() => {
              if (hasNextPage && !isFetching) {
                fetchNextPage();
              }
            }}
            isLoading={pagerIsLoading || isFetchingNextPage}
          />
        );
      },
    [
      hitcount,
      itemsShown,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage
    ]
  );

  const isLoadingOrRefetching = isLoading || isFetching;
  const shouldShowSearchResults =
    isLoadingOrRefetching || resultItems.length > 0;
  const shouldShowResultHeadline = hitcount > 0 && !isLoadingOrRefetching;
  const shouldShowZeroResults = !isLoadingOrRefetching && hitcount === 0;

  return {
    resultItems,
    hitcount,
    page,
    PagerComponent,
    isLoadingOrRefetching,
    shouldShowSearchResults,
    shouldShowResultHeadline,
    shouldShowZeroResults
  };
};
