import { UseConfigFunction } from "../../core/utils/config";
import { AgencyBranch } from "../../core/fbs/model";

export const smsNotificationsIsEnabled = (config: UseConfigFunction) =>
  config("smsNotificationsForReservationsEnabledConfig") === "1";

export const getPreferredLocation = (id: string, array: AgencyBranch[]) => {
  const locationItem = array.find((item) => item.branchId === id);
  return locationItem ? locationItem.title : id;
};

export const getPreferredLocationText = (
  preferred: string,
  selected: string,
  branches: AgencyBranch[]
) =>
  selected
    ? getPreferredLocation(selected, branches)
    : getPreferredLocation(preferred, branches);

export default {};
