import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import { orderManifestationsByYear } from "../../core/utils/helpers/general";

export const getManifestationType = (
  manifestation: ManifestationsSimpleFieldsFragment | undefined
) => String(manifestation?.materialTypes?.[0]?.specific);

export const getWorkManifestation = (work: WorkMediumFragment) => {
  return work.manifestations.latest;
};

export const getManifestationFromType = (
  type: string,
  work: WorkMediumFragment
) => {
  const allManifestations = orderManifestationsByYear(work.manifestations);

  const allManifestationsThatMatchType = allManifestations.filter(
    (item) => getManifestationType(item) === type
  );

  return allManifestationsThatMatchType[0];
};
