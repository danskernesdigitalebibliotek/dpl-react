import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { reservationModalId } from "../../../../apps/material/helper";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId, WorkId } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";
import { useStatistics } from "../../../../core/statistics/useStatistics";
import { statistics } from "../../../../core/statistics/statistics";

export interface MaterialButtonReservableFromAnotherLibraryProps {
  manifestationMaterialType: string;
  size?: ButtonSize;
  faustIds: FaustId[];
  dataCy?: string;
  workId: WorkId;
}

const MaterialButtonReservableFromAnotherLibrary: FC<
  MaterialButtonReservableFromAnotherLibraryProps
> = ({
  manifestationMaterialType,
  faustIds,
  size,
  dataCy = "material-button-reservable-on-another-library",
  workId
}) => {
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");
  const { track } = useStatistics();
  const { openGuarded } = useModalButtonHandler();

  const onClick = () => {
    track("click", {
      id: statistics.orderFromAnotherLibrary.id,
      name: statistics.orderFromAnotherLibrary.name,
      trackedData: `${workId} ${manifestationMaterialType}`
    });
    openGuarded({
      authUrl,
      modalId: reservationModalId(faustIds)
    });
  };

  return (
    <Button
      dataCy={dataCy}
      label={
        size === "small"
          ? t("reserveText")
          : `${t("reserveWithMaterialTypeText", {
              placeholders: { "@materialType": manifestationMaterialType }
            })}`
      }
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size={size || "large"}
      onClick={onClick}
    />
  );
};

export default MaterialButtonReservableFromAnotherLibrary;
