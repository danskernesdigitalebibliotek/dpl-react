import { useEffect, useRef } from "react";
import { CoverProps } from "../../../components/cover/cover";
import configuration, { getConf } from "../../configuration";
import {
  ManifestationsSimpleFragment,
  WorkSmallFragment
} from "../../dbc-gateway/generated/graphql";
import { LoanV2 } from "../../fbs/model/loanV2";
import { UseTextFunction } from "../text";
import { FaustId, Pid } from "../types/ids";
import { getUrlQueryParam } from "./url";

export const orderManifestationsByYear = (
  manifestations: ManifestationsSimpleFragment,
  order: "asc" | "desc" = "desc"
) => {
  return manifestations.all.sort((a, b) => {
    const currentDate = Number(a.publicationYear.display);
    const prevDate = Number(b.publicationYear.display);
    if (order === "desc") {
      return prevDate - currentDate;
    }
    return currentDate - prevDate;
  });
};

export const filterCreators = (
  creators: WorkSmallFragment["creators"],
  filterBy: ["Person" | "Corporation"]
) =>
  creators.filter((creator: WorkSmallFragment["creators"][0]) => {
    // eslint-disable-next-line no-underscore-dangle
    return creator.__typename && filterBy.includes(creator.__typename);
  });

export const flattenCreators = (creators: WorkSmallFragment["creators"]) =>
  creators.map((creator: WorkSmallFragment["creators"][0]) => {
    return creator.display;
  });

const getCreatorsFromManifestations = (
  manifestations: ManifestationsSimpleFragment
) => {
  const creators = manifestations.all.reduce<string[]>(
    (acc: string[], curr) => {
      return [...acc, ...flattenCreators(curr.creators)];
    },
    [] as string[]
  );

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
  manifestations: ManifestationsSimpleFragment,
  t: UseTextFunction
) => {
  const creators = getCreatorsFromManifestations(manifestations);

  return creatorsToString(creators, t);
};

export const getFirstPublishedManifestation = (
  manifestations: ManifestationsSimpleFragment
) => {
  const ordered = orderManifestationsByYear(manifestations);
  return ordered[0];
};

export const getFirstPublishedYear = (
  manifestations: ManifestationsSimpleFragment
) => {
  return String(
    getFirstPublishedManifestation(manifestations)?.publicationYear.display
  );
};

export const getManifestationPid = (
  manifestations: ManifestationsSimpleFragment
) => {
  const ordered = orderManifestationsByYear(manifestations);
  return ordered[0].pid as Pid;
};

export const getCoverTint = (index: number) => {
  const conf = getConf("search", configuration);
  const { coverTints }: { coverTints?: CoverProps["tint"][] } = conf;
  if (coverTints) {
    const tintKey = index % coverTints.length;
    return coverTints[tintKey];
  }
  return undefined;
};

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const convertPostIdToFaustId = (postId: Pid): FaustId | null => {
  const matches = postId.match(/^[0-9]+-[a-z]+:([0-9]+)$/);
  return matches?.[1] ? (matches?.[1] as FaustId) : null;
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

export const sortByLoanDate = (list: LoanV2[]) => {
  return list.sort(
    (objA, objB) =>
      new Date(objA.loanDetails.loanDate).getTime() -
      new Date(objB.loanDetails.loanDate).getTime()
  );
};

// If modalids are longer than 0, a modal is open.
// If a modal is open, the list should not be displayed.
export const isAModalDisplayed = (modalIds: string[]) => {
  return modalIds.length > 0;
};

export const getRenewableMaterials = (list: LoanV2[]) => {
  return list
    .filter(({ isRenewable }) => isRenewable)
    .map(({ loanDetails }) => parseInt(loanDetails.recordId, 10));
};

export const getAmountOfRenewableLoans = (list: LoanV2[]) => {
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
