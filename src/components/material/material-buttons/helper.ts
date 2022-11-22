import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";

export const hasCorrectAccessType = (
  desiredAccessType: AccessTypeCode,
  manifest: Manifestation
) => {
  return manifest.accessTypes.some((type) => type.code === desiredAccessType);
};

export const isArticle = (manifestation: Manifestation) => {
  const allMaterialTypes = manifestation.materialTypes.map((materialType) =>
    materialType.specific.toLowerCase()
  );
  if (
    allMaterialTypes.includes("tidsskriftartikel") ||
    allMaterialTypes.includes("avisartikel")
  ) {
    return true;
  }
  return false;
};

export default {};
