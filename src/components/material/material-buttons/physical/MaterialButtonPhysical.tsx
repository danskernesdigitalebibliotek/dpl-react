import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { useModalIdsToCloseForReservation } from "../../../../core/utils/useModalIdsToCloseForReservation";
import { reservationModalId } from "../../../../apps/material/helper";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Pid } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { useEventStatistics } from "../../../../core/statistics/useStatistics";
import { statistics } from "../../../../core/statistics/statistics";
import { first } from "lodash";
import { convertPostIdsToFaustIds } from "../../../../core/utils/helpers/general";

export interface MaterialButtonPhysicalProps {
  isSpecificManifestation?: boolean;
  manifestationMaterialType: string;
  size?: ButtonSize;
  dataCy?: string;
  pids: Pid[];
  isEditionPicker?: boolean;
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  isSpecificManifestation,
  manifestationMaterialType,
  size,
  dataCy = "material-button-physical",
  pids,
  isEditionPicker = false
}) => {
  const { track } = useEventStatistics();
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");
  const faustIds = convertPostIdsToFaustIds(pids);
  const { openGuarded } = useModalButtonHandler();
  const modalsToCloseForReservation = useModalIdsToCloseForReservation();

  const getButtonLabel = () => {
    if (isEditionPicker) {
      return t("editionSwitchButtonChooseText");
    }

    if (size === "small") {
      return t("reserveText");
    }

    return t("reserveWithMaterialTypeText", {
      placeholders: { "@materialType": manifestationMaterialType }
    });
  };

  const onClick = () => {
    if (isSpecificManifestation && first(pids)) {
      track("click", {
        id: statistics.reserveSpecificManifestation.id,
        name: statistics.reserveSpecificManifestation.name,
        trackedData: `${first(pids)}`
      });
    }

    // If we're in the edition picker, close any existing reservation modals
    const modalsToClose = isEditionPicker
      ? modalsToCloseForReservation
      : undefined;

    openGuarded({
      authUrl,
      modalId: reservationModalId(faustIds),
      options: { modalsToClose }
    });
  };

  return (
    <Button
      classNames="reserve-button"
      dataCy={dataCy}
      label={getButtonLabel()}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size={size || "large"}
      onClick={onClick}
    />
  );
};

export default MaterialButtonPhysical;
