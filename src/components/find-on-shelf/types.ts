import { HoldingsV3 } from "../../core/fbs/model";
import { Manifestation } from "../../core/utils/types/entities";

export type ManifestationHoldings = {
  manifestation: Manifestation;
  holding: HoldingsV3;
}[];
