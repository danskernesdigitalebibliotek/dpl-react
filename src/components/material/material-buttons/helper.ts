import { AvailabilityV3 } from "../../../core/fbs/model/availabilityV3";
import {
  Access,
  AccessTypeCode
} from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../../core/utils/types/material-type";

export const hasCorrectAccess = (
  desiredAccess: NonNullable<Access["__typename"]>,
  manifestations: Manifestation[]
) => {
  return manifestations.some((manifestation) => {
    return manifestation.access.some(
      ({ __typename }) =>
        __typename.toLowerCase() === desiredAccess.toLowerCase()
    );
  });
};

export const hasCorrectAccessType = (
  desiredAccessType: AccessTypeCode,
  manifestations: Manifestation[]
) => {
  return manifestations.some((manifestation) => {
    return manifestation.accessTypes.some(
      (type) => type.code === desiredAccessType
    );
  });
};

export const hasCorrectMaterialType = (
  desiredMaterialType: string,
  manifestations: Manifestation[]
) => {
  return manifestations.some((manifestation) => {
    return manifestation.materialTypes.some(
      (type) =>
        type.materialTypeSpecific.display.toLowerCase() ===
        desiredMaterialType.toLowerCase()
    );
  });
};

export const isArticle = (manifestations: Manifestation[]) => {
  return (
    hasCorrectMaterialType(ManifestationMaterialType.article, manifestations) ||
    hasCorrectMaterialType("avisartikel", manifestations)
  );
};

export const areAnyAvailable = (availability: AvailabilityV3[]) => {
  return availability.some((item) => item.available);
};

export default {};
