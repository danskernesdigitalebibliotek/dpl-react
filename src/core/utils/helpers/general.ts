import { useEffect, useRef } from "react";
import { first, orderBy, uniq } from "lodash";
import { vi } from "vitest";
import { CoverProps } from "../../../components/cover/cover";
import { UseTextFunction } from "../text";
import configuration, {
  ConfScope,
  getConf,
  getDeviceConf
} from "../../configuration";
import { Manifestation, Work, WorkSmall } from "../types/entities";
import { FaustId, Pid } from "../types/ids";
import { getUrlQueryParam } from "./url";
import { LoanType } from "../types/loan-type";
import { ListType } from "../types/list-type";
import { ManifestationReviewFieldsFragment } from "../../dbc-gateway/generated/graphql";
import { FeeV2 } from "../../fbs/model/feeV2";
import { ReservationType } from "../types/reservation-type";
import { ManifestationMaterialType } from "../types/material-type";
import { store } from "../../store";
import { constructModalId } from "./modal-helpers";
import { formatCurrency } from "./currency";
import {
  dateHasPassed,
  calculateDateYearsDifference,
  getUnixTimestamp
} from "./date";

export const capitalizeFirstLetters = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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

export const flattenCreators = (creators: WorkSmall["creators"]) =>
  creators.map((creator) => {
    return creator.display;
  });

export const flattenCreatorsLastNameFirst = (creators: Work["creators"]) =>
  creators.map((creator) => {
    return creator.nameSort;
  });

export const divideFirstNameByComma = (creatorString: string) => {
  const parts = creatorString.split(" ");
  parts[0] += ",";
  return parts.join(" ");
};

const getCreatorsFromManifestations = (manifestations: Manifestation[]) => {
  const creators = manifestations.reduce<string[]>((acc: string[], curr) => {
    return [...acc, ...flattenCreators(curr.creators)];
  }, [] as string[]);

  return Array.from(new Set(creators)) as string[];
};

export const creatorsToString = (
  creators: string[],
  t: UseTextFunction
): string => {
  if (creators.length > 1) {
    const firstTwo = creators.slice(0, 2);
    return `${firstTwo.join(", ")} ${t("etAlText")}`;
  }
  if (creators.length === 1) {
    return first(creators) as string;
  }
  return "";
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

// This function is used to find the most representative pid of a work.
export const getWorkPid = (work: WorkSmall) => {
  return work.manifestations.bestRepresentation.pid || null;
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

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const convertPostIdToFaustId = (postId: Pid) => {
  // We have seen post ids containing both letters and numbers
  // in the last part after the colon, but it can also have a dash.
  // We are about to have clarified what the proper name of the element.
  // But for now we will call it faustId.
  const matches = postId.match(/^[0-9]+-[a-z]+:([a-zA-Z0-9-_.]+)$/);
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
export const getParams = (props: Record<string, string | undefined>) =>
  Object.entries(props).reduce<Record<string, string>>(
    (acc, [property, value]) => {
      const paramValue = value || getUrlQueryParam(property);
      return {
        ...acc,
        [property]: paramValue ? String(paramValue) : ""
      };
    },
    {}
  );

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

export const sortByDueDate = (list: LoanType[]) => {
  //  We use orderBy from lodash to avoid mutating the original list
  return orderBy(
    list,
    (item) => (item.dueDate ? getUnixTimestamp(item.dueDate) : Infinity),
    "asc"
  );
};

export const sortByRenewable = (list: LoanType[]) => {
  return orderBy(list, (item) => Number(!!item.isRenewable), "desc");
};

export const sortLoansByIsRenewableThenDueDate = (list: LoanType[]) => {
  const sortedByDueDate = sortByDueDate(list);
  return sortByRenewable(sortedByDueDate);
};

export const getDueDatesLoan = (list: LoanType[]) => {
  return Array.from(
    new Set(
      list
        .filter(({ dueDate }) => dueDate !== undefined && dueDate !== null)
        .map(({ dueDate }) => dueDate)
        .sort()
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

export const getRenewableMaterials = (list: LoanType[]): ListType[] => {
  return list.filter(({ isRenewable }) => isRenewable);
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
  date ? dateHasPassed(date) : false;

export const loansOverdue = (loans: LoanType[]): boolean => {
  return loans.every((loan) => materialIsOverdue(loan.dueDate));
};

export const sameLoanDate = (loans: string[]): boolean => {
  return loans.every((loanDate, i, arr) => loanDate === arr[0]);
};

export const tallyUpFees = (fees: FeeV2[]) => {
  return formatCurrency(fees.reduce((total, { amount }) => total + amount, 0));
};

export const getMaterialTypes = (
  manifestations: Manifestation[],
  onlyFirstType = true
) => {
  // If the manifestation has several types we only are interested in the first one.
  if (onlyFirstType) {
    return uniq(
      manifestations
        .map((manifest) =>
          manifest.materialTypes.map((type, i) =>
            i === 0 ? type.materialTypeSpecific.display : null
          )
        )
        .flat()
        .filter((type) => type !== null)
    ) as ManifestationMaterialType[];
  }

  // In this case we aggreate all types even if a manifestation has multiple types.
  return uniq(
    manifestations
      .map((manifest) =>
        manifest.materialTypes.map((type) => {
          return type.materialTypeSpecific?.display;
        })
      )
      .flat()
  ) as ManifestationMaterialType[];
};

export const getMaterialType = (manifestations: Manifestation[]) => {
  const uniqueTypes = getMaterialTypes(manifestations);
  const firstUniqueType = first(uniqueTypes);
  if (firstUniqueType) {
    return firstUniqueType;
  }
  // This should never happen.
  return "Unknown" as ManifestationMaterialType;
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

  const age = calculateDateYearsDifference(cprDate);
  return age >= minAge;
};

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

export const createEtAlAuthors = (
  creators: string[],
  byText: string,
  etAlText: string
) => {
  const firstTwo = creators.slice(0, 2);
  return `${byText} ${firstTwo.join(", ")} ${etAlText}`;
};
export const createAndAuthors = (
  creators: string[],
  byText: string,
  andText: string
) => {
  return `${byText} ${creators
    .slice(0, -1)
    .join(", ")} ${andText} ${creators.slice(-1)}`;
};

// Creates a "by author, author and author"-string, or by author, author et al.
export const getContributors = (short: boolean, creators: string[]) => {
  // Todo this is sortof a hack, but using t: UseTextFunction as argument
  // makes the components re-render.
  const {
    text: { data: texts }
  } = store.getState();

  if (creators && creators.length > 0) {
    if (creators.length === 2) {
      return `${texts.materialByAuthorText} ${creators.join(
        ` ${texts.materialAndAuthorText} `
      )}`;
    }
    if (creators.length > 2) {
      if (short) {
        return createEtAlAuthors(
          creators,
          texts.materialByAuthorText,
          texts.etAlText
        );
      }
      return createAndAuthors(
        creators,
        texts.materialByAuthorText,
        texts.materialAndAuthorText
      );
    }
  }
  return creators[0];
};

export const formatDanishPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.match(/^\+\d{2}/)
    ? phoneNumber // Keep the number unchanged if it already starts with +XX
    : `+45${phoneNumber}`; // Prepend +45 if no country code is present
};

export const parseBoolean = (value?: string): boolean =>
  value?.toLowerCase() === "true";

export default {};

/* ********************************* Vitest Section  ********************************* */
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("getMaterialTypes", () => {
    const manifestations = [
      {
        materialTypes: [
          {
            materialTypeSpecific: {
              display: "artikel"
            }
          },
          {
            materialTypeSpecific: {
              display: "artikel (online)"
            }
          }
        ]
      }
    ] as Manifestation[];

    it("should be able to return only first entry material types from manifestations (default)", () => {
      const types = getMaterialTypes(manifestations);
      expect(types).toEqual(["artikel"]);
    });

    it("should be able to return all available material types from manifestations", () => {
      const types = getMaterialTypes(manifestations, false);
      expect(types).toEqual(["artikel", "artikel (online)"]);
    });
  });

  describe("constructModalId", () => {
    it("should create a modal id with hypens", () => {
      expect(constructModalId("some-modal-id", ["one", "two"])).toBe(
        "some-modal-id-one-two"
      );
    });
  });

  describe("getParams", () => {
    it("should fill in with url params if property value is undefined", () => {
      // We'll fake the url param getter to return a value.
      // So when we request the url param, we'll get the value: "some-url-param-value"
      vi.mock("./url", () => ({
        getUrlQueryParam: vi
          .fn()
          .mockImplementation(() => "some-url-param-value")
      }));

      // We'll test the undefined value will be replaced with the url param equivalent.
      expect(getParams({ "some-url-param": undefined, foo: "bar" })).toEqual({
        "some-url-param": "some-url-param-value",
        foo: "bar"
      });
    });
  });
}
