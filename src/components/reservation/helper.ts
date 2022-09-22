import { UseConfigFunction } from "../../core/utils/config";
import { AgencyBranch } from "../../core/fbs/model";
import { UseTextFunction } from "../../core/utils/text";

export const smsNotificationsIsEnabled = (config: UseConfigFunction) =>
  config("smsNotificationsForReservationsEnabledConfig") === "1";

export const getPreferredBranch = (id: string, array: AgencyBranch[]) => {
  const locationItem = array.find((item) => item.branchId === id);
  return locationItem ? locationItem.title : id;
};

export const hardcodedInterestPeriods = (t: UseTextFunction) => {
  return {
    "30": t("oneMonthText"),
    "60": t("twoMonthsText"),
    "90": t("threeMonthsText"),
    "180": t("sixMonthsText"),
    "360": t("oneYearText")
  };
};

export const getNoInterestAfter = (
  days: number | string,
  t: UseTextFunction
) => {
  const reservationInterestIntervals: { [key: string]: string } = {
    ...hardcodedInterestPeriods(t),
    default: `${days} ${t("daysText")}`
  } as const;

  const lookupKey = String(days);
  return (
    reservationInterestIntervals[lookupKey] ??
    reservationInterestIntervals.default
  );
};

export const getFutureDateString = (num: string | number) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + Number(num));
  return futureDate.toISOString().slice(0, 10);
};

export default {};
