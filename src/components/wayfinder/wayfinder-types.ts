export interface HoldingDataInterface {
  branchId: string;
  departmentId: string | undefined;
  locationId: string | undefined;
  subLocationId: string | undefined;
}

export type WayfinderReaponse = {
  viewId: string | undefined;
  map?: string;
  markId?: string;
  link: string | undefined;
};
