import { WorkMediumFragment } from "../../../src/core/dbc-gateway/generated/graphql";
import WorkMediumFactory from "./WorkMedium";

// Builds the GraphQL response envelope for the getMaterial operation
export const buildGetMaterialResponse = (
  overrides?: Partial<WorkMediumFragment>
) => ({
  data: {
    work: WorkMediumFactory.build(overrides ?? {})
  }
});
