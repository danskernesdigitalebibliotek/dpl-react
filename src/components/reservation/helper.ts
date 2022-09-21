import { UseConfigFunction } from "../../core/utils/config";
import { AgencyBranch } from "../../core/fbs/model";

export const smsNotificationsIsEnabled = (config: UseConfigFunction) =>
  config("smsNotificationsForReservationsEnabledConfig") === "1";

export const getPreferredBranch = (id: string, array: AgencyBranch[]) => {
  const locationItem = array.find((item) => item.branchId === id);
  return locationItem ? locationItem.title : id;
};

export default {};
