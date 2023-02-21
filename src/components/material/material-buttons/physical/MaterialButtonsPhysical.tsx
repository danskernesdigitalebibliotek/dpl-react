import React from "react";
import {
  getAllFaustIds,
  getManifestationType
} from "../../../../core/utils/helpers/general";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import UseReservableManifestations from "../../../../core/utils/UseReservableManifestations";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";

export interface MaterialButtonsPhysicalProps {
  manifestations: Manifestation[];
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  manifestations,
  size,
  dataCy = "material-buttons-physical"
}) => {
  const faustIds = getAllFaustIds(manifestations);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations
  });

  // TODO: use useGetPatronInformationByPatronIdV2() when we get the correctly
  // set up STORYBOOK_CLIENT_ID from Rolf. The "isUserBlocked" is temporary.
  const isUserBlocked = false;

  if (isUserBlocked) {
    return <MaterialButtonUserBlocked size={size} />;
  }

  if (!reservableManifestations || reservableManifestations.length < 1) {
    return <MaterialButtonCantReserve size={size} />;
  }

  return (
    <MaterialButtonReservePhysical
      dataCy={dataCy}
      manifestationMaterialType={getManifestationType(manifestations)}
      faustIds={faustIds}
      size={size}
    />
  );
};

export default MaterialButtonsPhysical;
