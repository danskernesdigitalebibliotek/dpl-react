// Replace cypress/fixtures/cover/cover.json
import { Factory } from "fishery";
import { GetCoversByPidsQuery } from "../../../src/core/dbc-gateway/generated/graphql";

// Type for individual manifestation with cover (non-null)
export type ManifestationWithCover = NonNullable<
  GetCoversByPidsQuery["manifestations"][number]
>;

// Factory for individual manifestation with cover
const GetCoversByPidsFactory = Factory.define<ManifestationWithCover>(() => ({
  pid: "870970-basis:53292968",
  cover: {
    xSmall: {
      url: "https://fbiinfo-present.dbc.dk/images/evYcIXyXTpq9g_uJhVmLAg/120px!AKou-y-SegbAfUWos6Saq_i66VssLVeVtbwed3Uyyj_iWg",
      width: 120,
      height: 188
    },
    small: {
      url: "https://fbiinfo-present.dbc.dk/images/evYcIXyXTpq9g_uJhVmLAg/240px!AKrOMzx_VH6ye-JbaSdbm3oXVpAV3ImYHn10BopekjL_UQ",
      width: 240,
      height: 377
    },
    medium: {
      url: "https://fbiinfo-present.dbc.dk/images/evYcIXyXTpq9g_uJhVmLAg/480px!AKr_xhMeWNuSM9XUBvi6lcMVUO_euoCliYcls1KRKkb74g",
      width: 480,
      height: 754
    },
    large: {
      url: "https://fbiinfo-present.dbc.dk/images/evYcIXyXTpq9g_uJhVmLAg/960px!AKq8BXjTj7s5o2Nz9JlnHk8SfS5Isdx05ymqbDp0C5KmqQ",
      width: 500,
      height: 785
    }
  }
}));

export default GetCoversByPidsFactory;
