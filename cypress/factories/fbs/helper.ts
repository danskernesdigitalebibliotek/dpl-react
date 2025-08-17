import { WorkMediumFragment } from "../../../src/core/dbc-gateway/generated/graphql";
import WorkMediumFactory from "./WorkMedium";
import WorkRecommendationsFactory, {
  RecommendData
} from "./WorkRecommendations";
import GetCoversByPidsFactory, {
  ManifestationWithCover
} from "./GetCoversByPids";

// Builds the GraphQL response envelope for the getMaterial operation
export const buildGetMaterialResponse = (
  overrides?: Partial<WorkMediumFragment>
) => ({
  data: {
    work: WorkMediumFactory.build(overrides ?? {})
  }
});

// Builds the GraphQL response envelope for the WorkRecommendations operation
export const buildWorkRecommendationsResponse = (
  overrides?: Partial<RecommendData>
) => ({
  data: {
    recommend: WorkRecommendationsFactory.build(overrides ?? {})
  }
});

// Builds the GraphQL response envelope for the GetCoversByPids operation
export const buildGetCoversByPidsResponse = (
  count: number = 1,
  overrides?: Partial<ManifestationWithCover>
) => ({
  data: {
    manifestations: GetCoversByPidsFactory.buildList(count, overrides)
  }
});
