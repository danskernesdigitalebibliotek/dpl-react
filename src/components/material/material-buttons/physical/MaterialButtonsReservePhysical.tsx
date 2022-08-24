import React from "react";
import { ManifestationsSimpleFieldsFragment } from "../../../../core/dbc-gateway/generated/graphql";
import { useGetAvailabilityV3 } from "../../../../core/fbs/fbs";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonReservePhysical";

export interface MaterialButtonsReservePhysicalProps {
  faustId: string;
  manifestation: ManifestationsSimpleFieldsFragment;
}

const MaterialButtonsReservePhysical: React.FC<
  MaterialButtonsReservePhysicalProps
> = ({ faustId, manifestation }) => {
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
  if (!manifestationAvailability.reservable) {
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

export default MaterialButtonsReservePhysical;
