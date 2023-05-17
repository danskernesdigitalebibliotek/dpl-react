import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { uniq } from "lodash";
import { CoverProps } from "../../../components/cover/cover";
import { UseTextFunction } from "../text";
import configuration, {
  getConf,
  getDeviceConf,
  ConfScope
} from "../../configuration";
import { Manifestation, Work } from "../types/entities";
import { FaustId, Pid } from "../types/ids";
import { getUrlQueryParam } from "./url";
import { LoanType } from "../types/loan-type";
import { ListType } from "../types/list-type";
import { ManifestationReviewFieldsFragment } from "../../dbc-gateway/generated/graphql";
import { FeeV2 } from "../../fbs/model/feeV2";
import { ReservationDetailsV2 } from "../../fbs/model";
import {
  dashboardReadyForPickupApiValueText,
  dashboardReservedApiValueText
} from "../../configuration/api-strings.json";
import { ReservationType } from "../types/reservation-type";
import { ManifestationMaterialType } from "../types/material-type";

export const getManifestationPublicationYear = (
  manifestation: Manifestation
): string | null => {
  return manifestation.edition?.publicationYear?.display || null;
};

export const orderManifestationsByYear = (
  manifestations: Manifestation[],
  order: "asc" | "desc" = "desc"
) => {
  return manifestations.sort((a, b) => {
    const currentDate = Number(getManifestationPublicationYear(a));
    const prevDate = Number(getManifestationPublicationYear(b));
    if (order === "desc") {
      return prevDate - currentDate;
    }
    return currentDate - prevDate;
  });
};

export const flattenCreators = (creators: Work["creators"]) =>
  creators.map((creator: Work["creators"][0]) => {
    return creator.display;
  });

const getCreatorsFromManifestations = (manifestations: Manifestation[]) => {
  const creators = manifestations.reduce<string[]>((acc: string[], curr) => {
    return [...acc, ...flattenCreators(curr.creators)];
  }, [] as string[]);

  return Array.from(new Set(creators)) as string[];
};

export const creatorsToString = (creators: string[], t: UseTextFunction) => {
  if (creators.length > 1) {
    const firstTwo = creators.slice(0, 2);
    return `${firstTwo.join(", ")} ${t("etAlText")}`;
  }

  return creators[0];
};

export const getCreatorTextFromManifestations = (
  manifestations: Manifestation[],
  t: UseTextFunction
) => {
  const creators = getCreatorsFromManifestations(manifestations);

  return creatorsToString(creators, t);
};

// We deliberately left this function here although we don't use it anywhere in the
// project. It can be used if ever needed to retrieve a chronologically oldest edition,
// provided a manifestation object.
export const getFirstPublishedManifestation = (
  manifestations: Manifestation[]
) => {
  const ordered = orderManifestationsByYear(manifestations, "asc");
  return ordered[0];
};

export const getLatestManifestation = (manifestations: Manifestation[]) => {
  const ordered = orderManifestationsByYear(manifestations, "desc");
  return ordered[0];
};

export const getFirstPublishedYear = (manifestations: Manifestation[]) => {
  return String(
    getManifestationPublicationYear(
      getFirstPublishedManifestation(manifestations)
    )
  );
};

export const getManifestationPid = (manifestations: Manifestation[]) => {
  const ordered = orderManifestationsByYear(manifestations);
  return ordered[0].pid;
};

export const getCoverTint = (index: number) => {
  const conf = getConf("coverTints", configuration);
  const { coverTints }: { coverTints?: CoverProps["tint"][] } = conf;
  if (coverTints) {
    const tintKey = index % coverTints.length;
    return coverTints[tintKey];
  }
  return undefined;
};

export const getColors = () => {
  return getConf("colors", configuration);
};

export const getRecommenderMaterialLimits = () => {
  return getConf("recommenderMaterialLimits", configuration);
};

export const getModalIds = () => {
  return getConf("modalIds", configuration);
};

export const daysBetweenTodayAndDate = (date: string) => {
  const inputDate = dayjs(new Date(date));
  const today = dayjs(new Date());

  // Math.ceil 0 diff last param true is because "diff()" rounds the number down
  // and we need it to be rounded up
  // todo figure out if ceil is correct (talk to ddb)
  return Math.ceil(inputDate.diff(today, "day", true));
};
export const daysBetweenDates = (firstDate: string, secondDate: string) => {
  const inputFirstDate = dayjs(new Date(firstDate));
  const inputSecondDate = dayjs(new Date(secondDate));

  // Math.ceil 0 diff last param true is because "diff()" rounds the number down
  // and we need it to be rounded up
  // todo figure out if ceil is correct (talk to ddb)
  return Math.ceil(inputFirstDate.diff(inputSecondDate, "day", true));
};

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const convertPostIdToFaustId = (postId: Pid) => {
  // We have seen post ids containing both letters and numbers
  // in the last part after the colon.
  // We are about to have clarified what the proper name of the element.
  // But for now we will call it faustId.
  const matches = postId.match(/^[0-9]+-[a-z]+:([a-zA-Z0-9]+)$/);
  if (matches?.[1]) {
    return matches?.[1] as FaustId;
  }
  throw new Error(`Unable to extract faust id from post id "${postId}"`);
};

export const convertPostIdsToFaustIds = (postIds: Pid[]) => {
  return postIds.map((pid) => convertPostIdToFaustId(pid));
};

// Get params if they are defined as props use those
// otherwise try to fetch them from the url.
export const getParams = <T, K extends keyof T>(props: T) => {
  const params = {} as T;

  Object.entries(props).forEach(([property, value]) => {
    params[property as K] = value || (getUrlQueryParam(property) as string);
  });

  return params;
};

export const sortByDueDate = (list: LoanType[]) => {
  // Todo figure out what to do if loan does not have loan date
  // For now, its at the bottom of the list
  return list.sort(
    (a, b) =>
      new Date(a.dueDate || new Date()).getTime() -
      new Date(b.dueDate || new Date()).getTime()
  );
};

export const sortByLoanDate = (list: LoanType[]) => {
  // Todo figure out what to do if loan does not have loan date
  // For now, its at the bottom of the list
  return list.sort(
    (a, b) =>
      new Date(a.loanDate || new Date()).getTime() -
      new Date(b.loanDate || new Date()).getTime()
  );
};

export const sortByReservationDate = (list: ReservationType[]) => {
  return list.sort(
    (objA, objB) =>
      new Date(objA.dateOfReservation || new Date()).getTime() -
      new Date(objB.dateOfReservation || new Date()).getTime()
  );
};

export const getDueDatesLoan = (list: LoanType[]) => {
  return Array.from(
    new Set(
      list
        .filter(({ dueDate }) => dueDate !== (undefined || null))
        .map(({ dueDate }) => dueDate)
    )
  ) as string[];
};

export const getDueDatesForModal = (list: LoanType[], date: string) => {
  return list.filter(({ dueDate }) => dueDate === date);
};

// If modalids are longer than 0, a modal is open.
// If a modal is open, the list should not be displayed.
export const isAModalDisplayed = (modalIds: string[]) => {
  return modalIds.length > 0;
};

export const getPageSizeFromConfiguration = (pageSizeConf: ConfScope) => {
  const { pageSize } = getDeviceConf(pageSizeConf, configuration);
  return Number(pageSize);
};

export const getRenewableMaterials = (list: LoanType[]) => {
  return list
    .filter(({ isRenewable }) => isRenewable)
    .map(({ loanId }) => loanId) as number[];
};

export const getAmountOfRenewableLoans = (list: LoanType[]) => {
  return getRenewableMaterials(list).length;
};

export const groupObjectArrayByProperty = <
  P extends string,
  T extends { [key in P]?: string },
  Result extends { [key: string]: T[] }
>(
  array: T[],
  property: P
) =>
  array.reduce((result: Result, current: T) => {
    const groupBy = current[property];
    // If for some reason we do not have a value we just return the accumulated result.
    if (!groupBy) {
      return result;
    }

    // Make sure that the new aggregation key is a string.
    const key = String(groupBy);

    // Merge into result if the property already exist.
    if (key in result) {
      return {
        ...result,
        [key]: [...result[key], current]
      };
    }
    // Otherwise create new property.
    return { ...result, [key]: [current] };
  }, {} as Result);

export const getManifestationsPids = (manifestations: Manifestation[]) => {
  return manifestations.map((manifestation) => manifestation.pid);
};

export const stringifyValue = (value: string | null | undefined) =>
  value ? String(value) : "";

export const materialIsFiction = ({
  fictionNonfiction
}: Work | Manifestation) => fictionNonfiction?.code === "FICTION";

export const getListItems = (list: ListType[], itemsShown: number) => {
  return [...list].splice(0, itemsShown);
};

interface PageSizeDataAttributes {
  desktop: number;
  mobile: number;
}

export const getPageSizeFromDataAttributes = ({
  desktop,
  mobile
}: Partial<PageSizeDataAttributes>) => {
  const { pageSize } = getDeviceConf("pageSize", {
    pageSize: {
      mobile: {
        pageSize: mobile
      },
      desktop: {
        pageSize: desktop
      }
    }
  });
  return Number(pageSize);
};

export const pageSizeGlobal = (
  pageSizes: Partial<PageSizeDataAttributes>,
  configName?: ConfScope
) => {
  let pageSize = 0;
  if (pageSizes?.desktop && pageSizes?.mobile) {
    pageSize = getPageSizeFromDataAttributes(pageSizes);
  } else {
    pageSize = getPageSizeFromConfiguration(configName || "pageSize");
  }

  return pageSize;
};

export const materialIsOverdue = (date: string | undefined | null) =>
  dayjs().isAfter(dayjs(date), "day");

export const getReadyForPickup = (list: ReservationDetailsV2[]) => {
  const yesterday = dayjs().subtract(1, "day");
  return [...list].filter(({ state, pickupDeadline }) => {
    const deadline = dayjs(pickupDeadline);
    if (deadline) {
      return (
        state === dashboardReadyForPickupApiValueText && deadline < yesterday
      );
    }
    return false;
  });
};
export const getPhysicalReservations = (list: ReservationDetailsV2[]) => {
  return [...list].filter(
    ({ state }) => state === dashboardReservedApiValueText
  );
};

export const tallyUpFees = (fees: FeeV2[]) => {
  return fees.reduce((total, { amount }) => total + amount, 0);
};

// Loans overdue
export const filterLoansOverdue = (loans: LoanType[]) => {
  return loans.filter(({ dueDate }) => {
    return materialIsOverdue(dueDate);
  });
};

export const filterLoansSoonOverdue = (loans: LoanType[], warning: number) => {
  return loans.filter(({ dueDate }) => {
    const due: string = dueDate || "";
    const daysUntilExpiration = daysBetweenTodayAndDate(due);
    return (
      daysUntilExpiration - warning <= 0 &&
      daysUntilExpiration - warning >= -warning
    );
  });
};

export const getMaterialTypes = (manifestations: Manifestation[]) => {
  const allMaterialTypes = manifestations
    .map((manifest) => manifest.materialTypes.map((type) => type.specific))
    .flat();
  return uniq(allMaterialTypes) as ManifestationMaterialType[];
};

export const getManifestationType = (manifestations: Manifestation[]) => {
  const uniqueTypes = getMaterialTypes(manifestations);
  return uniqueTypes[0];
};

export const getAllPids = (manifestations: Manifestation[]) => {
  return manifestations.map((manifestation) => manifestation.pid);
};

export const getAllFaustIds = (manifestations: Manifestation[]) => {
  return convertPostIdsToFaustIds(getAllPids(manifestations));
};

export const getScrollClass = (modalIds: string[]) => {
  return modalIds.length > 0 ? "scroll-lock-background" : "";
};
// Loans with more than warning-threshold days until due
export const filterLoansNotOverdue = (loans: LoanType[], warning: number) => {
  return loans.filter(({ dueDate }) => {
    const due: string = dueDate || "";
    const daysUntilExpiration = daysBetweenTodayAndDate(due);
    return daysUntilExpiration - warning > 0;
  });
};

function getDateFromCpr(cprInput: string) {
  const cpr = cprInput.replace(/[^\d]/g, "");
  const dateSegments = cpr.substring(0, 6).match(/.{1,2}/g);

  if (dateSegments) {
    const [day, month, year] = dateSegments;
    let prefix = "";
    if (Number(year) < 21) {
      prefix = "20";
    } else {
      prefix = "19";
    }
    const yearWithPrefix = Number(`${prefix}${year}`);

    return new Date(
      Date.UTC(yearWithPrefix, Number(month) - 1, Number(day), 0, 0, 0, 0)
    );
  }

  return null;
}

export const patronAgeValid = (cpr: string, minAge: number) => {
  const cprDate = getDateFromCpr(cpr);
  if (cprDate === null) return false;

  const age = dayjs().diff(dayjs(cprDate), "year");
  return age > minAge;
};

export const constructModalId = (prefix: string, fragments: string[]) =>
  `${prefix ? `${prefix}-` : ""}${fragments.join("-")}`;

// Create a string of authors with commas and a conjunction
export const getAuthorNames = (
  creators: {
    display: string;
  }[],
  by?: string,
  and?: string
) => {
  const names = creators.map(({ display }) => display);
  let returnContentString = "";
  if (names.length === 0) {
    return returnContentString;
  }
  if (names.length === 1) {
    returnContentString = `${by ? `${by} ` : ""}${names.join(", ")}`;
  } else {
    returnContentString = `${by ? `${by} ` : ""} ${names
      .slice(0, -1)
      .join(", ")} ${and ? `${and} ` : ""}${names.slice(-1)}`;
  }
  return returnContentString;
};
export const getPublicationName = (
  hostPublication: { title: string } | null | undefined
) => {
  if (!hostPublication) {
    return "";
  }
  return hostPublication.title;
};

export const getReviewRelease = (
  dateFirstEdition: ManifestationReviewFieldsFragment["dateFirstEdition"],
  workYear: ManifestationReviewFieldsFragment["workYear"],
  edition: ManifestationReviewFieldsFragment["edition"]
) => {
  return (
    dateFirstEdition?.display ||
    workYear?.display ||
    edition?.publicationYear?.display ||
    null
  );
};

// The rendered release year for search results is picked based on
// whether the work is fiction or not. Non-fictional works contain
// factual information that can be updated between editions - thus it
// is important to show the latest edition the library has.
export const getReleaseYearSearchResult = (work: Work) => {
  const { latest, bestRepresentation } = work.manifestations;
  const manifestation = bestRepresentation || latest;
  if (materialIsFiction(work)) {
    return work.workYear?.year;
  }
  if (materialIsFiction(manifestation)) {
    return (
      work.workYear?.year ||
      manifestation.workYear?.year ||
      manifestation.dateFirstEdition?.year ||
      manifestation.edition?.publicationYear?.display
    );
  }
  return getManifestationPublicationYear(latest) || "";
};

// Creates a "by author, author and author"-string
export const getContributors = (
  creators: string[],
  by: string,
  and: string
) => {
  let returnContentString = "";
  if (creators && creators.length > 0) {
    if (creators.length === 1) {
      returnContentString = `${by} ${creators.join(", ")}`;
    } else {
      returnContentString = `${by} ${creators
        .slice(0, -1)
        .join(", ")} ${and} ${creators.slice(-1)}`;
    }
  }
  return returnContentString;
};

export default {};
