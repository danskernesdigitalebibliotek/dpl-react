import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { fetcher } from "../../../core/dbc-gateway/graphql-fetcher";
import {
  ComplexSearchWithPaginationDocument,
  ComplexSearchWithPaginationQuery,
  ComplexSearchWithPaginationQueryVariables,
  ComplexSearchFiltersInput,
  SortInput
} from "../../../core/dbc-gateway/generated/graphql";
import { Work } from "../../../core/utils/types/entities";

interface UseInfiniteComplexSearchParams {
  cql: string;
  limit: number;
  filters: ComplexSearchFiltersInput;
  sort?: SortInput[] | null;
}

type InfiniteQueryOptions = Omit<
  UseInfiniteQueryOptions<ComplexSearchWithPaginationQuery, unknown>,
  "queryKey" | "queryFn" | "getNextPageParam"
>;

/**
 * Infinite query hook for complex search with pagination.
 *
 * Uses react-query's useInfiniteQuery to handle:
 * - Automatic page accumulation
 * - keepPreviousData for smooth UX during query changes
 * - Built-in loading/fetching states
 */
export const useInfiniteComplexSearch = (
  { cql, limit, filters, sort }: UseInfiniteComplexSearchParams,
  options?: InfiniteQueryOptions
) => {
  return useInfiniteQuery<ComplexSearchWithPaginationQuery, unknown>(
    ["complexSearchInfinite", { cql, limit, filters, sort }],
    ({ pageParam = 0 }) => {
      const variables: ComplexSearchWithPaginationQueryVariables = {
        cql,
        offset: pageParam,
        limit,
        filters,
        ...(sort && { sort })
      };

      return fetcher<
        ComplexSearchWithPaginationQuery,
        ComplexSearchWithPaginationQueryVariables
      >(ComplexSearchWithPaginationDocument, variables)();
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.length * limit;
        const hitcount = lastPage.complexSearch.hitcount;

        // Return undefined if we've fetched all results
        if (totalFetched >= hitcount) {
          return undefined;
        }

        // Return the next offset
        return totalFetched;
      },
      ...options
    }
  );
};

/**
 * Helper to flatten pages into a single array of works.
 */
export const flattenInfiniteSearchResults = (
  pages: ComplexSearchWithPaginationQuery[] | undefined
): Work[] => {
  if (!pages) return [];

  return pages.flatMap((page) => page.complexSearch.works as unknown as Work[]);
};

/**
 * Helper to get hitcount from infinite query data.
 */
export const getHitcountFromPages = (
  pages: ComplexSearchWithPaginationQuery[] | undefined
): number => {
  if (!pages || pages.length === 0) return 0;
  return pages[0].complexSearch.hitcount;
};
