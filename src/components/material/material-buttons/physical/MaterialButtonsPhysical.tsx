import React from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import { useGetAvailabilityV3 } from "../../../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../../../core/utils/helpers/general";
import { FaustId, Pid } from "../../../../core/utils/types/ids";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";

export interface MaterialButtonsPhysicalProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  manifestation
}) => {
  const { pid } = manifestation;
  const faustId = convertPostIdToFaustId(pid as Pid) ?? "";
  const { data, isLoading } = useGetAvailabilityV3({
    recordid: [faustId]
  });

  // TODO: use useGetPatronInformationByPatronIdV2() when we get the correctly
  // set up STORYBOOK_CLIENT_ID from Rolf. The "isUserBlocked" is temporary.
  const isUserBlocked = false;

  if (isLoading) {
    return <MaterialButtonLoading />;
  }

  if (!data) {
    return null;
  }

  if (isUserBlocked) {
    return <MaterialButtonUserBlocked />;
  }

  const manifestationAvailability = data[0];
  if (!manifestationAvailability.reservable || !faustId) {
    return <MaterialButtonCantReserve />;
  }

  const manifestationMaterialType = manifestation.materialTypes[0].specific;
  return (
    <MaterialButtonReservePhysical
      manifestationMaterialType={manifestationMaterialType}
      faustId={faustId}
    />
  );
};

export default MaterialButtonsPhysical;
