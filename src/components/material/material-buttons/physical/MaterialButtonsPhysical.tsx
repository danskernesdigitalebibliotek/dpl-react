import React from "react";
import {
  useGetAvailabilityV3,
  useGetPatronInformationByPatronIdV2
} from "../../../../core/fbs/fbs";
import { getAllFaustIds } from "../../../../core/utils/helpers/general";
import { userIsAnonymous } from "../../../../core/utils/helpers/user";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import MaterialButtonCantReserve from "../generic/MaterialButtonCantReserve";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import { areAnyReservable } from "../helper";
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
  const { data: availabilityData, isLoading: availabilityLoading } =
    useGetAvailabilityV3({
      recordid: faustIds
    });
  const { data: userData, isLoading: userLoading } =
    useGetPatronInformationByPatronIdV2({ enabled: !userIsAnonymous() });
  if (availabilityLoading || userLoading) {
    return <MaterialButtonLoading size={size} />;
  }

  if (!availabilityData) {
    return null;
  }

  // TODO: Investigate if we could use UseReservableManifestations() instead.
  if (!areAnyReservable(availabilityData)) {
    return <MaterialButtonCantReserve size={size} />;
  }

  if (userData?.patron?.blockStatus) {
    return <MaterialButtonUserBlocked size={size} dataCy={dataCy} />;
  }

  // We show the reservation button if either
  if (!userData || !userData?.patron?.blockStatus) {
    const manifestationMaterialType =
      manifestations[0].materialTypes[0].specific;
    return (
      <MaterialButtonReservePhysical
        dataCy={dataCy}
        manifestationMaterialType={manifestationMaterialType}
        faustIds={faustIds}
        size={size}
      />
    );
  }

  return null;
};

export default MaterialButtonsPhysical;
