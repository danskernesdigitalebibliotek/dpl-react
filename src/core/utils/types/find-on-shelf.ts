import { HoldingsV3 } from "../../fbs/model";
import { Manifestation } from "./entities";

export type ManifestationHoldings = {
  manifestation: Manifestation;
  holding: HoldingsV3;
}[];
