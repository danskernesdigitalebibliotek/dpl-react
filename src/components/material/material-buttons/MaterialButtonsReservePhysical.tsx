import React from "react";
import {
  useGetAvailabilityV3,
  useGetPatronInformationByPatronIdV2
} from "../../../core/fbs/fbs";
import MaterialButtonCantReserve from "./MaterialButtonCantReserve";
import MaterialButtonLoading from "./MaterialButtonLoading";
import MaterialButtonReservePhysical from "./MaterialButtonReservePhysical";

export interface MaterialButtonsReservePhysicalProps {
  faustId: string;
  manifestationMaterialType: string;
}

const MaterialButtonsReservePhysical: React.FC<
  MaterialButtonsReservePhysicalProps
> = ({ faustId, manifestationMaterialType }) => {
  const { data, isLoading } = useGetAvailabilityV3({
    recordid: [faustId]
  });
  const isUserBlocked = false;

  const userData = useGetPatronInformationByPatronIdV2();
  console.log(userData);

  if (isLoading) {
    return <MaterialButtonLoading />;
  }
  if (!data) {
    return null;
  }
  // the user is blocked
  if (isUserBlocked) {
    <MaterialButtonCantReserve />;
  }

  // Manifestation isn't reservable.
  if (!data[0].reservable) {
    return <MaterialButtonCantReserve />;
  }

  // Manifestation is reservable.
  return (
    <MaterialButtonReservePhysical
      manifestationMaterialType={manifestationMaterialType}
    />
  );
};

export default MaterialButtonsReservePhysical;
