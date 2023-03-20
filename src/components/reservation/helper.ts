import dayjs from "dayjs";
import { UseTextFunction } from "../../core/utils/text";
import {
  AgencyBranch,
  CreateReservation,
  CreateReservationBatchV2,
  HoldingsForBibliographicalRecordV3
} from "../../core/fbs/model";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  getLatestManifestation,
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

export const getManifestationsToReserve = (
  reservableManifestations: Manifestation[],
  isPeriodical?: boolean
) => {
  if (isPeriodical) {
    // Specific issues of periodical works usually don't have multiple
    // manifestations - eg. there only is one version of Vogue January 2023.
    return reservableManifestations;
  }
  if (!reservableManifestations || reservableManifestations.length < 1) {
    return [];
  }
  // Newer nonfiction-work's editions have updated more accurate content, so we
  // want to always reserve the latest edition.
  if (!materialIsFiction(reservableManifestations[0])) {
    return [getLatestManifestation(reservableManifestations)];
  }
  // Fictional work editions don't change content, only appearance, and so we can
  // reserve whichever one of the reservable manifestations will be home soonest.
  return reservableManifestations;
};

export const getInstantLoanBranches = (
  holdings: HoldingsForBibliographicalRecordV3[],
  whitelist: AgencyBranch[],
  instantLoanString: string
) => {
  const { holdings: branches } = holdings[0];
  const instantBooksThreshold = 1;
  const whitelistIds = whitelist.map(({ branchId }) => branchId);

  return branches.filter(({ branch, materials }) => {
    if (whitelistIds.includes(branch.branchId)) {
      const instantMaterials = materials.filter(
        (material) =>
          material.available &&
          material.materialGroup.description === instantLoanString
      );

      return instantMaterials.length >= instantBooksThreshold;
    }
    return false;
  });
};

export default {};
