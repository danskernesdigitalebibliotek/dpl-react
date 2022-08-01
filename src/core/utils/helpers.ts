import { useEffect, useRef } from "react";
import { CoverProps } from "../../components/cover/cover";
import configuration, { getConf } from "../configuration";
import { UseTextFunction } from "./text";
import {
  WorkSmallFragment,
  ManifestationsSimpleFragment
} from "../dbc-gateway/generated/graphql";
import { FaustId, Pid } from "./types/ids";

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
  creators.filter((creator) => {
    // eslint-disable-next-line no-underscore-dangle
    return creator.__typename && filterBy.includes(creator.__typename);
  });

export const flattenCreators = (creators: WorkSmallFragment["creators"]) =>
  creators.map((creator) => {
    return creator.display;
  });

const getCreatorsFromManifestations = (
  manifestations: ManifestationsSimpleFragment
) => {
  const creators = manifestations.all.reduce<string[]>((acc, curr) => {
    return [...acc, ...flattenCreators(curr.creators)];
  }, [] as string[]);

  return Array.from(new Set(creators));
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

const getFirstPublishedManifestation = (
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
  return ordered[0].pid;
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

//

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const getUrlQueryParam = (param: string): null | string => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(param);
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

export const dateMatchesUsFormat = (date: string | null) => {
  // regex for finding date string from modal query param
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const dateFound = date ? date.toString().match(regex) : null;
  const returnValue = dateFound && dateFound.length > 0 ? dateFound[0] : null;
  return returnValue;
};

export function generateMapId(index: number | string) {
  const randomId = Math.random().toString(36);
  return randomId.concat(index.toString());
}
