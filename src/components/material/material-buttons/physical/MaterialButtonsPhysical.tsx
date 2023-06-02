import React, { useState } from "react";
import {
  getAllFaustIds,
  getManifestationType
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
import { SpecialManifestation, isFluidOrderWork } from "../helper";
import useGetAvailability from "../../../../core/utils/useGetAvailability";
import { useConfig } from "../../../../core/utils/config";

export interface MaterialButtonsPhysicalProps {
  manifestations: SpecialManifestation[];
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  manifestations,
  size,
  dataCy = "material-buttons-physical"
}) => {
  const t = useText();
  const faustIds = getAllFaustIds(manifestations);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations
  });
  const { data: userData, isLoading } = usePatronData();
  const isUserBlocked = !!(userData?.patron && isBlocked(userData?.patron));
  const isFluidOrder = isFluidOrderWork(manifestations);
  const [isReservable, setIsReservable] = useState<boolean>(false);
  const config = useConfig();
  const { isLoading: isLoadingAvailability } = useGetAvailability({
    faustIds,
    config,
    options: {
      query: {
        onSuccess: (data) => {
          if (data?.some((item) => item.reservable)) {
            setIsReservable(true);
          }
        }
      }
    }
  });

  if (isLoading || isLoadingAvailability) {
    return <MaterialButtonLoading />;
  }

  if (
    (!reservableManifestations || reservableManifestations.length < 1) &&
    !isFluidOrder
  ) {
    return <MaterialButtonDisabled size={size} label={t("cantReserveText")} />;
  }

  if (isUserBlocked) {
    return <MaterialButtonUserBlocked size={size} dataCy={dataCy} />;
  }

  // We show the reservation button if the user isn't logged in or isn't blocked.
  // In the former case there there's no way to see if they're blocked, so we
  // redirect anonymous user to the login page.
  if (!userData || !isUserBlocked) {
    // If the material is a fluid-order material (can be ordered from a different
    // library and picked up locally) and is NOT reservable locally, we show the
    // "order from different library" button
    const isFluid = isFluidOrder && !isReservable;

    return (
      <MaterialButtonReservePhysical
        dataCy={dataCy}
        manifestationMaterialType={getManifestationType(manifestations)}
        faustIds={faustIds}
        size={size}
        isFluid={isFluid}
      />
    );
  }

  return null;
};

export default MaterialButtonsPhysical;
