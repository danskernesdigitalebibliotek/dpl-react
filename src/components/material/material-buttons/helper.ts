import {
  Access,
  AccessTypeCode
} from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";

export const hasCorrectAccess = (
  desiredAccess: Access["__typename"],
  manifest: Manifestation
) => {
  return manifest.access.some(({ __typename }) => __typename === desiredAccess);
};

export const hasCorrectAccessType = (
  desiredAccessType: AccessTypeCode,
  manifest: Manifestation
) => {
  return manifest.accessTypes.some((type) => type.code === desiredAccessType);
};

export const hasCorrectMaterialType = (
  desiredMaterialType: string,
  manifestation: Manifestation
) => {
  return manifestation.materialTypes.some(
    (type) => type.specific.toLowerCase() === desiredMaterialType.toLowerCase()
  );
};

export const isArticle = (manifestation: Manifestation) => {
  return (
    hasCorrectMaterialType("tidsskriftsartikel", manifestation) ||
    hasCorrectMaterialType("avisartikel", manifestation)
  );
};

export default {};
