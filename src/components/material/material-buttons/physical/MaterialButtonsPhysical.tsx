import React from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import { useGetAvailabilityV3 } from "../../../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../../../core/utils/helpers/general";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Pid } from "../../../../core/utils/types/ids";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";

export interface MaterialButtonsPhysicalProps {
  manifestation: ManifestationsSimpleFieldsFragment;
  size?: ButtonSize;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  manifestation,
  size
}) => {
  const { pid } = manifestation;
  const faustId = convertPostIdToFaustId(pid as Pid);
  const { data, isLoading } = useGetAvailabilityV3({
    recordid: [faustId as string]
  });

  // TODO: use useGetPatronInformationByPatronIdV2() when we get the correctly
  // set up STORYBOOK_CLIENT_ID from Rolf. The "isUserBlocked" is temporary.
  const isUserBlocked = false;

  if (isLoading) {
    return <MaterialButtonLoading size={size} />;
  }

  if (!data) {
    return null;
  }

  if (isUserBlocked) {
    return <MaterialButtonUserBlocked size={size} />;
  }

  const manifestationAvailability = data[0];
  if (!manifestationAvailability.reservable) {
    return <MaterialButtonCantReserve size={size} />;
  }

  const manifestationMaterialType = manifestation.materialTypes[0].specific;
  return (
    <MaterialButtonReservePhysical
      manifestationMaterialType={manifestationMaterialType}
      faustId={faustId as string}
      size={size}
    />
  );
};

export default MaterialButtonsPhysical;
