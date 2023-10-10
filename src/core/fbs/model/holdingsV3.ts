/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { AgencyBranch } from "./agencyBranch";
import type { AgencyDepartment } from "./agencyDepartment";
import type { AgencyLocation } from "./agencyLocation";
import type { MaterialV3 } from "./materialV3";
import type { AgencySublocation } from "./agencySublocation";

export interface HoldingsV3 {
  branch: AgencyBranch;
  department?: AgencyDepartment;
  location?: AgencyLocation;
  /** Materials that belongs to this placement */
  materials: MaterialV3[];
  sublocation?: AgencySublocation;
}
