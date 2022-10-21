import { useEffect, useRef } from "react";
import dayjs from "dayjs";
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

export const orderManifestationsByYear = (
  manifestations: Manifestation[],
  order: "asc" | "desc" = "desc"
) => {
  return manifestations.sort((a, b) => {
    const currentDate = Number(a.publicationYear.display);
    const prevDate = Number(b.publicationYear.display);
    if (order === "desc") {
      return prevDate - currentDate;
    }
    return currentDate - prevDate;
  });
};

export const filterCreators = (
  creators: Work["creators"],
  filterBy: ["Person" | "Corporation"]
) =>
  creators.filter((creator: Work["creators"][0]) => {
    // eslint-disable-next-line no-underscore-dangle
    return creator.__typename && filterBy.includes(creator.__typename);
  });

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

export const getFirstPublishedManifestation = (
  manifestations: Manifestation[]
) => {
  const ordered = orderManifestationsByYear(manifestations);
  return ordered[0];
};

export const getFirstPublishedYear = (manifestations: Manifestation[]) => {
  return String(
    getFirstPublishedManifestation(manifestations)?.publicationYear.display
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

export const getThresholds = () => {
  return getConf("thresholds", configuration);
};

export const daysBetweenTodayAndDate = (date: string) => {
  const inputDate = dayjs(date);
  const today = dayjs();

  return inputDate.diff(today, "day");
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

// Get params if they are defined as props use those
// otherwise try to fetch them from the url.
export const getParams = <T, K extends keyof T>(props: T) => {
  const params = {} as T;

  Object.entries(props).forEach(([property, value]) => {
    params[property as K] = value || (getUrlQueryParam(property) as string);
  });

  return params;
};

export const sortByLoanDate = (list: LoanType[]) => {
  // Todo figure out what to do if loan does not have loan date
  // For now, its at the bottom of the list
  return list.sort(
    (objA, objB) =>
      new Date(objA.loanDate || new Date()).getTime() -
      new Date(objB.loanDate || new Date()).getTime()
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
    .map(({ faust }) => faust) as FaustId[];
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

export default {};
