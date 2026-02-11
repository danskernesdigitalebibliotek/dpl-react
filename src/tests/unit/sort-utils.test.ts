import { describe, expect, it } from "vitest";
import { getSortInput } from "../../apps/advanced-search-v2/lib/sort-utils";
import { SortOption } from "../../apps/advanced-search-v2/types";
import { SortOrderEnum } from "../../core/dbc-gateway/generated/graphql";

describe("getSortInput", () => {
  it("returns undefined for Relevance (default sort)", () => {
    expect(getSortInput(SortOption.Relevance)).toBeUndefined();
  });

  it("returns correct SortInput for LatestPubDateDesc", () => {
    expect(getSortInput(SortOption.LatestPubDateDesc)).toEqual([
      {
        index: "sort.latestpublicationdate",
        order: SortOrderEnum.Desc
      }
    ]);
  });

  it("returns correct SortInput for LatestPubDateAsc", () => {
    expect(getSortInput(SortOption.LatestPubDateAsc)).toEqual([
      {
        index: "sort.latestpublicationdate",
        order: SortOrderEnum.Asc
      }
    ]);
  });

  it("returns correct SortInput for CreatorAsc", () => {
    expect(getSortInput(SortOption.CreatorAsc)).toEqual([
      {
        index: "sort.creator",
        order: SortOrderEnum.Asc
      }
    ]);
  });

  it("returns correct SortInput for TitleDesc", () => {
    expect(getSortInput(SortOption.TitleDesc)).toEqual([
      {
        index: "sort.title",
        order: SortOrderEnum.Desc
      }
    ]);
  });
});
