import React from "react";
import {
  useGetAvailabilityV3,
  useGetPatronInformationByPatronIdV2
} from "../../../../core/fbs/fbs";
import { getAllFaustIds } from "../../../../core/utils/helpers/general";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { ErrorFbs } from "../../../../core/utils/types/error";
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
  const { data, isLoading } = useGetAvailabilityV3({
    recordid: faustIds
  });
  const {
    data: userData,
    isLoading: userLoading,
    error
  } = useGetPatronInformationByPatronIdV2();
  const userError = error as unknown as ErrorFbs;
  if (isLoading || userLoading) {
    return <MaterialButtonLoading size={size} />;
  }

  if (!data) {
    return null;
  }

  // TODO: Investigate if we could use UseReservableManifestations() instead.
  if (!areAnyReservable(data)) {
    return <MaterialButtonCantReserve size={size} />;
  }

  const manifestationMaterialType = manifestations[0].materialTypes[0].specific;

  // We show the reservation button if the user isn't logged in OR isn't blocked
  if (
    (userError && userError.message.toLowerCase().includes("403: forbidden")) ||
    (userData && !userData.patron?.blockStatus)
  ) {
    return (
      <MaterialButtonReservePhysical
        dataCy={dataCy}
        manifestationMaterialType={manifestationMaterialType}
        faustIds={faustIds}
        size={size}
      />
    );
  }

  if (!userData) {
    return null;
  }

  return <MaterialButtonUserBlocked size={size} dataCy={dataCy} />;
};

export default MaterialButtonsPhysical;
