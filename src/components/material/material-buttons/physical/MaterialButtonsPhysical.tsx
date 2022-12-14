import React from "react";
import { useGetAvailabilityV3 } from "../../../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../../../core/utils/helpers/general";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";

export interface MaterialButtonsPhysicalProps {
  manifestation: Manifestation;
  size?: ButtonSize;
  dataCy?: string;
  isMainButton?: boolean;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  manifestation: { pid, materialTypes },
  size,
  dataCy = "material-buttons-physical",
  isMainButton
}) => {
  const faustId = convertPostIdToFaustId(pid);
  const { data, isLoading } = useGetAvailabilityV3({
    recordid: [faustId]
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

  const manifestationMaterialType = materialTypes[0].specific;
  return (
    <MaterialButtonReservePhysical
      dataCy={dataCy}
      manifestationMaterialType={manifestationMaterialType}
      faustId={faustId}
      size={size}
      isMainButton={isMainButton}
    />
  );
};

export default MaterialButtonsPhysical;
