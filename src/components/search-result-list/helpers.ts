import configuration, { getConf } from "../../core/configuration";
import {
  ManifestationsSimpleFragment,
  WorkSimpleFragment
} from "../../core/dbc-gateway/generated/graphql";
import { UseTextFunction } from "../../core/utils/text";
import { CoverProps } from "../cover/cover";

export const orderManifestationsByYear = (
  manifestations: ManifestationsSimpleFragment,
  order: "asc" | "desc" = "desc"
) => {
  return manifestations.all.sort((a, b) => {
    const currentDate = Number(a.publicationYear);
    const prevDate = Number(b.publicationYear);
    if (order === "desc") {
      return prevDate - currentDate;
    }
    return currentDate - prevDate;
  });
};

export const flattenCreators = (creators: WorkSimpleFragment["creators"]) =>
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
    getFirstPublishedManifestation(manifestations)?.publicationYear
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
