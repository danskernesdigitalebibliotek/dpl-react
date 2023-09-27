import React from "react";
import {
  getAllFaustIds,
  getManifestationType,
  getReservableOnAnotherLibrary
} from "../../../../core/utils/helpers/general";
import { isBlocked } from "../../../../core/utils/helpers/user";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import UseReservableManifestations from "../../../../core/utils/UseReservableManifestations";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonDisabled from "../generic/MaterialButtonDisabled";
import { useText } from "../../../../core/utils/text";
import { usePatronData } from "../../helper";
import MaterialButtonReservableOnAnotherLibrary from "./MaterialButtonReservableOnAnotherLibrary";

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
  const { isReservable: isReservableOnAnotherLibrar } =
    getReservableOnAnotherLibrary(manifestations);
  const t = useText();
  const faustIds = getAllFaustIds(manifestations);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations
  });
  const { data: userData, isLoading } = usePatronData();
  const isUserBlocked = !!(userData?.patron && isBlocked(userData?.patron));

  if (isLoading) {
    return <MaterialButtonLoading />;
  }

  if (!reservableManifestations || reservableManifestations.length < 1) {
    return <MaterialButtonDisabled size={size} label={t("cantReserveText")} />;
  }

  if (isUserBlocked) {
    return <MaterialButtonUserBlocked size={size} dataCy={dataCy} />;
  }

  if (isReservableOnAnotherLibrar) {
    return (
      <MaterialButtonReservableOnAnotherLibrary
        size={size}
        manifestationMaterialType={getManifestationType(manifestations)}
        faustIds={faustIds}
      />
    );
  }

  // We show the reservation button if the user isn't logged in or isn't blocked.
  // In the former case there there's no way to see if they're blocked, so we
  // redirect anonymous user to the login page.

  if (!userData || !isUserBlocked) {
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
