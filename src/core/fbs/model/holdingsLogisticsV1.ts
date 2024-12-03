/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { AgencyBranch } from "./agencyBranch";
import type { PlacementV1 } from "./placementV1";
import type { MaterialV3 } from "./materialV3";

export interface HoldingsLogisticsV1 {
  branch: AgencyBranch;
  lmsPlacement?: PlacementV1;
  /** Logistics placement */
  logisticsPlacement?: string[];
  /** Materials that belongs to this placement */
  materials: MaterialV3[];
}
