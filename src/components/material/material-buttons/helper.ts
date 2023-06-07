import { AvailabilityV3 } from "../../../core/fbs/model/availabilityV3";
import {
  Access,
  AccessTypeCode
} from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";
import { UseTextFunction } from "../../../core/utils/text";
import { ButtonSize } from "../../../core/utils/types/button";

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
        type.specific.toLowerCase() === desiredMaterialType.toLowerCase()
    );
  });
};

export const isArticle = (manifestations: Manifestation[]) => {
  return (
    hasCorrectMaterialType("tidsskriftsartikel", manifestations) ||
    hasCorrectMaterialType("avisartikel", manifestations)
  );
};

export const areAnyAvailable = (availability: AvailabilityV3[]) => {
  return availability.some((item) => item.available);
};

// TODO: SpecialManifestationProps & SpecialManifestation type will need to be
// deleted when the Manifestation type includes the danMARC2 property.
type SpecialManifestationProps = {
  danMARC2: string;
};
export type SpecialManifestation = Manifestation & SpecialManifestationProps;

// TODO: Fix type when API has .danMARC2 property
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isFluidOrderWork = (manifestations: SpecialManifestation[]) => {
  if (manifestations.length !== 1) {
    return false;
  }

  const manifestation = manifestations[0];

  return manifestation.danMARC2 === "OVE";

  // Delete the return true; line after API has .danMARC2 property
  // return true;
  // return !!manifestations.find((manifestation) => {
  //   return manifestation.danMARC2.startsWith("OVE");
  // });
};

export const getReserveButtonLabel = ({
  t,
  isFluid,
  size,
  materialType
}: {
  t: UseTextFunction;
  isFluid: boolean;
  size?: ButtonSize;
  materialType: string;
}) => {
  // If the material is fluid we have special button texts.
  if (isFluid) {
    if (size === "small") {
      return t("reserveFromAnotherLibraryWithoutMaterialTypeText");
    }
    return t("reserveFromAnotherLibraryText", {
      placeholders: {
        "@materialType": materialType
      }
    });
  }

  // If the button is small we show a simple reserve text.
  if (size === "small") {
    return t("reserveText");
  }

  // If the button is "full" we show the material type in the button text.
  return t("reserveMaterialTypeText", {
    placeholders: {
      "@materialType": materialType
    }
  });
};

export default {};
