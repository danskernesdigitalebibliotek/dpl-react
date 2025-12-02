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
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  canShowZeroResults: boolean;
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

  const { data, isLoading, isFetching, fetchNextPage, isPreviousData } =
    useInfiniteComplexSearch(
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
        keepPreviousData: true
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
  const PagerComponent: React.FC<{ isLoading?: boolean }> = useMemo(
    () =>
      function Pager({ isLoading: pagerIsLoading }) {
        if (!hitcount) return null;

        return (
          <ResultPager
            itemsShown={itemsShown}
            hitcount={hitcount}
            classNames=""
            setPageHandler={() => fetchNextPage()}
            isLoading={pagerIsLoading || isFetching}
          />
        );
      },
    [hitcount, itemsShown, fetchNextPage, isFetching]
  );

  // Simplified state derivation
  // isPreviousData indicates we're showing cached data while new query loads
  const isRefetching = isPreviousData && isFetching;
  const isLoadingOrRefetching = isLoading || isFetching;

  // canShowZeroResults: only show zero state after we've actually completed a fetch
  // When isPreviousData is true, we're still showing old data, so don't show zero yet
  const canShowZeroResults = !isPreviousData && !isLoading;

  const shouldShowSearchResults =
    isLoadingOrRefetching || resultItems.length > 0;
  const shouldShowResultHeadline = hitcount > 0 && !isLoadingOrRefetching;
  const shouldShowZeroResults =
    !isLoadingOrRefetching && hitcount === 0 && canShowZeroResults;

  return {
    resultItems,
    hitcount,
    isLoading,
    isFetching,
    isRefetching,
    canShowZeroResults,
    page,
    PagerComponent,
    isLoadingOrRefetching,
    shouldShowSearchResults,
    shouldShowResultHeadline,
    shouldShowZeroResults
  };
};
