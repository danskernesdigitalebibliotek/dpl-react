import dayjs from "dayjs";
import { UseTextFunction } from "../../core/utils/text";
import {
  AgencyBranch,
  CreateReservation,
  CreateReservationBatchV2
} from "../../core/fbs/model";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPublicationYear,
  materialIsFiction
} from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { PeriodicalEdition } from "../material/periodical/helper";

export const smsNotificationsIsEnabled = (
  configValue: string | undefined | string[]
) => configValue === "1";

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

type Periodical = Pick<PeriodicalEdition, "volumeNumber" | "volumeYear">;

const constructReservation = ({
  manifestation: { pid },
  pickupBranch,
  expiryDate,
  periodical
}: {
  manifestation: Manifestation;
  pickupBranch?: string;
  expiryDate?: string;
  periodical?: Periodical;
}): CreateReservation => {
  const faustId = convertPostIdToFaustId(pid);

  return {
    recordId: faustId,
    ...(pickupBranch ? { pickupBranch } : {}),
    ...(expiryDate ? { expiryDate } : {}),
    ...(periodical ? { periodical } : {})
  };
};

const constructReservations = ({
  manifestations,
  pickupBranch,
  expiryDate,
  periodical
}: {
  manifestations: Manifestation[];
  pickupBranch?: string;
  expiryDate?: string;
  periodical?: Periodical;
}): CreateReservation[] =>
  manifestations.map((manifestation) =>
    constructReservation({
      manifestation,
      pickupBranch,
      expiryDate,
      periodical
    })
  );

export const constructReservationData = ({
  manifestations,
  selectedBranch,
  expiryDate,
  periodical
}: {
  manifestations: Manifestation[];
  selectedBranch: string | null;
  expiryDate: string | null;
  periodical: PeriodicalEdition | null;
}): CreateReservationBatchV2 => {
  return {
    reservations: constructReservations({
      manifestations,
      ...(selectedBranch ? { pickupBranch: selectedBranch } : {}),
      ...(expiryDate ? { expiryDate } : {}),
      ...(periodical
        ? {
            periodical: {
              volumeNumber: periodical.volumeNumber,
              volumeYear: periodical.volumeYear
            }
          }
        : {})
    }),
    ...(manifestations.length > 1 ? { type: "parallel" } : {})
  };
};

export const getAuthorLine = (
  manifestation: Manifestation,
  t: UseTextFunction
) => {
  const { creators } = manifestation;
  const publicationYear = getManifestationPublicationYear(manifestation);
  const author =
    creatorsToString(
      flattenCreators(filterCreators(creators, ["Person"])),
      t
    ) || null;

  let year = "";
  if (publicationYear) {
    year = publicationYear;
  }
  if (materialIsFiction(manifestation)) {
    year = `(${t("materialHeaderAllEditionsText")})`;
  }
  return !author
    ? null
    : [t("materialHeaderAuthorByText"), author, year].join(" ");
};

export default {};
