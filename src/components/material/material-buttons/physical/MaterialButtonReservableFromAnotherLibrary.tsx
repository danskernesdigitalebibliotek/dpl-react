import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { reservationModalId } from "../../../../apps/material/helper";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonReservableFromAnotherLibraryProps {
  manifestationMaterialType: string;
  size?: ButtonSize;
  faustIds: FaustId[];
  dataCy?: string;
}

const MaterialButtonReservableFromAnotherLibrary: FC<
  MaterialButtonReservableFromAnotherLibraryProps
> = ({
  manifestationMaterialType,
  faustIds,
  size,
  dataCy = "material-button-reservable-on-another-library"
}) => {
  const t = useText();
  const { openGuarded } = useModalButtonHandler();
  const { authUrl } = useUrls();

  const onClick = () => {
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
          ? t("reservableFromAnotherLibraryText")
          : `${t(
              "reservableFromAnotherLibraryText"
            )} ${manifestationMaterialType}`
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
