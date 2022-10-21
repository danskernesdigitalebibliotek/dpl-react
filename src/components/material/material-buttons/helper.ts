import { AccessTypeCode } from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";

export const hasCorrectAccessType = (
  desiredAccessType: AccessTypeCode,
  manifest: Manifestation
) => {
  return !!manifest.accessTypes.some((type) => type.code === desiredAccessType);
};

export default {};
