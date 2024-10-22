import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
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

export const shouldShowMaterialAvailabilityText = (
  manifestations: Manifestation[]
) => {
  return (
    isPhysical(manifestations) &&
    !isPeriodical(manifestations) &&
    !isArticle(manifestations)
  );
};

export default {};
