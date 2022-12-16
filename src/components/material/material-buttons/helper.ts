import { intersection } from "lodash";
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

export const isArticle = (manifestation: Manifestation) => {
  const allMaterialTypes = manifestation.materialTypes.map((materialType) =>
    materialType.specific.toLowerCase()
  );
  return (
    intersection(allMaterialTypes, ["tidsskriftsartikel", "avisartikel"])
      .length > 0
  );
};

export const hasCorrectSource = (
  desiredSource: string[],
  manifestation: Manifestation
): boolean =>
  "source" in manifestation &&
  desiredSource.some((item) => manifestation.source.includes(item));

export default {};
