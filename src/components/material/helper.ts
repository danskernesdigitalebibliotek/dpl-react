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
  return hasCorrectMaterialType(
    ManifestationMaterialType.magazine,
    manifestations
  );
};

export const isMaterialButtonsOnlineInternal = (
  manifestations: Manifestation[]
) => {
  return Boolean(getReaderPlayerType(manifestations));
};

export const shouldShowMaterialAvailabilityText = (
  manifestations: Manifestation[]
) => {
  const shouldShowOnlineAvailability =
    !isAnonymous() && isMaterialButtonsOnlineInternal(manifestations);

  const shouldShowPhysicalAvailability =
    isPhysical(manifestations) &&
    !isPeriodical(manifestations) &&
    !isArticle(manifestations);

  return shouldShowOnlineAvailability || shouldShowPhysicalAvailability;
};

export default {};
