import {
  SortInput,
  SortOrderEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { SortOption } from "../types";

/**
 * Convert a SortOption to the GraphQL SortInput format.
 * Returns undefined for Relevance (default sort).
 */
export function getSortInput(sort: SortOption): SortInput[] | undefined {
  if (sort === SortOption.Relevance) {
    return undefined;
  }

  const [, index, direction] = sort.split(".");
  return [
    {
      index: `sort.${index}`,
      order: direction === "asc" ? SortOrderEnum.Asc : SortOrderEnum.Desc
    }
  ];
}
