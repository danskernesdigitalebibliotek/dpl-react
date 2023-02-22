import React from "react";
import {
  getAllFaustIds,
  getManifestationType
} from "../../../../core/utils/helpers/general";
import { useGetPatronInformationByPatronIdV2 } from "../../../../core/fbs/fbs";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import UseReservableManifestations from "../../../../core/utils/UseReservableManifestations";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";

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
  const { data: userData, isLoading } = useGetPatronInformationByPatronIdV2();

  if (isLoading) {
    return <MaterialButtonLoading />;
  }

  if (!reservableManifestations || reservableManifestations.length < 1) {
    return <MaterialButtonCantReserve size={size} />;
  }

  if (userData?.patron?.blockStatus) {
    return <MaterialButtonUserBlocked size={size} dataCy={dataCy} />;
  }

  // We show the reservation button if either
  if (!userData || !userData?.patron?.blockStatus) {
    return (
      <MaterialButtonReservePhysical
        dataCy={dataCy}
        manifestationMaterialType={getManifestationType(manifestations)}
        faustIds={faustIds}
        size={size}
      />
    );
  }

  return null;
};

export default MaterialButtonsPhysical;
