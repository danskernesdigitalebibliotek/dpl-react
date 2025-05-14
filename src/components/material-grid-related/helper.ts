import {
  WorkRecommendationsQuery,
  ComplexSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { WorkId } from "../../core/utils/types/ids";
import { MaterialGridItemProps } from "../material-grid/MaterialGrid";
import {
  MaterialGridFilterOption,
  MaterialGridFilterType
} from "./MaterialGridRelated.types";

export function prepareCreatorCql(creators: string[]): string {
  if (creators.length === 0) return "";
  return creators.map((name) => `term.creator='${name}'`).join(" OR ");
}

export function extractMaterialsFromRecommendations(
  data?: WorkRecommendationsQuery
): MaterialGridItemProps[] {
  if (!data?.recommend?.result) return [];
  return data.recommend.result.map(({ work }) => ({
    wid: work.workId as WorkId
  }));
}
export function extractMaterialsFromComplexSearch(
  data?: ComplexSearchWithPaginationQuery
): MaterialGridItemProps[] {
  if (!data?.complexSearch?.works) return [];
  return data.complexSearch.works.map((work) => ({
    wid: work.workId as WorkId
  }));
}
export function getPreferredFallback(
  options: MaterialGridFilterOption[]
): MaterialGridFilterType | undefined {
  const preferred: MaterialGridFilterType[] = [
    "recommendation",
    "series",
    "author"
  ];
  return preferred.find((f) => options.some((o) => o.value === f));
}
