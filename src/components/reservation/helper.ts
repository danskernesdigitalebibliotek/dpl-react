import dayjs from "dayjs";
import { UseConfigFunction } from "../../core/utils/config";
import { UseTextFunction } from "../../core/utils/text";
import { AgencyBranch, CreateReservationBatchV2 } from "../../core/fbs/model";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  materialIsFiction
} from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";

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

export const getNoInterestAfter = (days: number, t: UseTextFunction) => {
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

export const getFutureDateString = (num: number) => {
  const futureDate = dayjs().add(num, "day").format("YYYY-MM-DD");
  return futureDate;
};

const constructReservation = ({
  pid
}: Manifestation): CreateReservationBatchV2["reservations"][0] => {
  const faustId = convertPostIdToFaustId(pid);

  return { recordId: faustId };
};

const constructReservations = (manifestations: Manifestation[]) =>
  manifestations.map((manifestation) => constructReservation(manifestation));

export const constructReservationData = ({
  manifestations,
  selectedBranch,
  expiryDate
}: {
  manifestations: Manifestation[];
  selectedBranch: string | null;
  expiryDate: string | null;
}): CreateReservationBatchV2 => {
  return {
    reservations: constructReservations(manifestations),
    ...(manifestations.length > 1 ? { type: "parallel" } : {}),
    ...(selectedBranch ? { pickupBranch: selectedBranch } : {}),
    ...(expiryDate ? { expiryDate } : {})
  };
};

export const getAuthorLine = (
  manifestation: Manifestation,
  t: UseTextFunction
) => {
  const { creators, publicationYear } = manifestation;
  const author =
    creatorsToString(
      flattenCreators(filterCreators(creators, ["Person"])),
      t
    ) || t("creatorsAreMissingText");

  let year = "";
  if (publicationYear) {
    year = `(${publicationYear.display})`;
  }
  if (materialIsFiction(manifestation)) {
    year = `(${t("materialHeaderAllEditionsText")})`;
  }
  return [t("materialHeaderAuthorByText"), author, year].join(" ");
};

export default {};
