import { intersection } from "lodash";
import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";

export const isDigitalArticleService = (manifest: Manifestation) =>
  manifest.access.some(
    ({ __typename }) => __typename === "DigitalArticleService"
  );

export const hasCorrectAccessType = (
  desiredAccessType: AccessTypeCode,
  manifest: Manifestation
) => {
  if (isDigitalArticleService(manifest)) return true;
  return manifest.accessTypes.some((type) => type.code === desiredAccessType);
};

export const isArticle = (manifestation: Manifestation) => {
  const allMaterialTypes = manifestation.materialTypes.map((materialType) =>
    materialType.specific.toLowerCase()
  );
  return (
    intersection(allMaterialTypes, ["tidsskriftsartikel", "avisartikel"])
      .length > 0
  );
};

export default {};
