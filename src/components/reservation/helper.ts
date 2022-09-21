import { UseConfigFunction } from "../../core/utils/config";

export const smsNotificationsIsEnabled = (config: UseConfigFunction) =>
  config("smsNotificationsForReservationsEnabledConfig") === "1";

export default {};
