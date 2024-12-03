import { HoldingsLogisticsV1 } from "../../core/fbs/model";
import { Manifestation } from "../../core/utils/types/entities";

// This type is preferrably supposed to be used for matching manifestation +
// holding pairs so the holding corresponds to the manifestation.
export type ManifestationHoldings = {
  manifestation: Manifestation;
  holding: HoldingsLogisticsV1;
}[];

export type SelectedPeriodicalEdition = {
  selectedYear: string;
  selectedEdition: string;
};
