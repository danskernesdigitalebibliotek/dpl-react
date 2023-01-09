import React from "react";
import { getAllPids } from "../../../../apps/material/helper";
import { useGetAvailabilityV3 } from "../../../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../../../core/utils/helpers/general";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";

export interface MaterialButtonsPhysicalProps {
  selectedManifestations: Manifestation[];
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  selectedManifestations,
  size,
  dataCy = "material-buttons-physical"
}) => {
  const pids = getAllPids(selectedManifestations);
  const faustIds = pids.map((pid) => convertPostIdToFaustId(pid));
  const { data, isLoading } = useGetAvailabilityV3({
    recordid: faustIds
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
  const manifestationMaterialType =
    selectedManifestations[0].materialTypes[0].specific;

  return (
    <MaterialButtonReservePhysical
      dataCy={dataCy}
      manifestationMaterialType={manifestationMaterialType}
      faustIds={faustIds}
      size={size}
    />
  );
};

export default MaterialButtonsPhysical;
