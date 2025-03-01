import { AvailabilityV3 } from "../../../core/fbs/model/availabilityV3";
import { Manifestation } from "../../../core/utils/types/entities";
import articleTypes from "../../../core/utils/types/article-types";
import { AccessTypeCodeEnum } from "../../../core/dbc-gateway/generated/graphql";
import movieTypes from "../../../core/utils/types/movie-types";

export const hasCorrectAccess = (
  // TODO: This should be an enum or something more precise.
  desiredAccess: string,
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
  desiredAccessType: AccessTypeCodeEnum,
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

// We need this e.g. for articles - the material type for articles has many definitions.
export const hasCorrectPartialMaterialType = (
  desiredPartialMaterialType: string,
  manifestations: Manifestation[]
) => {
  return manifestations.some((manifestation) => {
    return manifestation.materialTypes.some((type) =>
      type.materialTypeSpecific.display
        .toLowerCase()
        .includes(desiredPartialMaterialType.toLowerCase())
    );
  });
};

export const isArticle = (manifestations: Manifestation[]) => {
  return articleTypes.some((type) =>
    hasCorrectMaterialType(type, manifestations)
  );
};

export const isMovie = (manifestations: Manifestation[]) => {
  return movieTypes.some((type) =>
    hasCorrectMaterialType(type, manifestations)
  );
};

export const areAnyAvailable = (availability: AvailabilityV3[]) => {
  return availability.some((item) => item.available);
};

export default {};
