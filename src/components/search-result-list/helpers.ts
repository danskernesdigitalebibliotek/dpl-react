import {
  ManifestationSimpleFragment,
  WorkSimpleFragment
} from "../../core/dbc-gateway/generated/graphql";

export const orderManifestationsByYear = (
  manifestations: ManifestationSimpleFragment[],
  order: "asc" | "desc" = "desc"
) => {
  return manifestations.sort((a, b) => {
    const currentDate = Number(a.datePublished);
    const prevDate = Number(b.datePublished);
    if (order === "desc") {
      return prevDate - currentDate;
    }
    return currentDate - prevDate;
  });
};

export const flattenCreators = (creators: WorkSimpleFragment["creators"]) =>
  creators.map((creator) => {
    return creator.name;
  });

const getCreatorsFromManifestations = (
  manifestations: ManifestationSimpleFragment[]
) => {
  const creators = manifestations.reduce<string[]>((acc, curr) => {
    return [...acc, ...flattenCreators(curr.creators)];
  }, [] as string[]);

  return Array.from(new Set(creators));
};

export const creatorsToString = (creators: string[]) => {
  if (creators.length > 1) {
    const firstTwo = creators.slice(0, 2);
    return `${firstTwo.join(", ")} et al.`;
  }

  return creators[0];
};

export const getCreatorTextFromManifestations = (
  manifestations: ManifestationSimpleFragment[]
) => {
  const creators = getCreatorsFromManifestations(manifestations);

  return creatorsToString(creators);
};

const getFirstPublishedManifestation = (
  manifestations: ManifestationSimpleFragment[]
) => {
  const ordered = orderManifestationsByYear(manifestations);
  return ordered[0];
};

export const getFirstPublishedYear = (
  manifestations: ManifestationSimpleFragment[]
) => {
  return String(getFirstPublishedManifestation(manifestations)?.datePublished);
};

export const getManifestationPid = (
  manifestations: ManifestationSimpleFragment[]
) => {
  const ordered = orderManifestationsByYear(manifestations);
  return ordered[0].pid;
};
