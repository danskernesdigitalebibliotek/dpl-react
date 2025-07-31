import { getFirstManifestation } from "../../apps/material/helper";
import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import { isAnonymous } from "../../core/utils/helpers/user";
import { Manifestation } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { getReaderPlayerType } from "../reader-player/helper";
import { hasCorrectMaterialType, isArticle } from "./material-buttons/helper";

export const isPhysical = (manifestations: Manifestation[]) => {
  return manifestations.some((manifestation) => {
    return manifestation.accessTypes.some((acc) => {
      return acc.code === AccessTypeCodeEnum.Physical;
    });
  });
};

export const isPeriodical = (manifestations: Manifestation[]) => {
  return (
    hasCorrectMaterialType(
      ManifestationMaterialType.magazine,
      manifestations
    ) ||
    hasCorrectMaterialType(
      ManifestationMaterialType.yearBook,
      manifestations
    ) ||
    hasCorrectMaterialType(
      ManifestationMaterialType.yearBookOnline,
      manifestations
    ) ||
    hasCorrectMaterialType(ManifestationMaterialType.newspaper, manifestations)
  );
};

export const isMaterialButtonsOnlineInternal = (
  manifestation: Manifestation
) => {
  return Boolean(getReaderPlayerType(manifestation));
};

export const shouldShowMaterialAvailabilityText = (
  manifestations: Manifestation[]
) => {
  const firstManifestation = getFirstManifestation(manifestations);
  const shouldShowOnlineAvailability =
    !isAnonymous() &&
    firstManifestation &&
    isMaterialButtonsOnlineInternal(firstManifestation);

  const shouldShowPhysicalAvailability =
    isPhysical(manifestations) &&
    !isPeriodical(manifestations) &&
    !isArticle(manifestations);

  return shouldShowOnlineAvailability || shouldShowPhysicalAvailability;
};

export const cleanCreatorName = (creator: string): string => {
  // Remove parentheses with birth years like "(f. 1972)" or "(f. 1805)" or "(f. 1953-02-05)"
  return creator.replace(/\s*\([^)]*\)\s*$/g, "").trim();
};

export default {};
