import React, { FC } from "react";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import { reservationModalId } from "../../../../apps/material/helper";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId } from "../../../../core/utils/types/ids";
import { useUrls } from "../../../../core/utils/url";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonPhysicalProps {
  manifestationMaterialType: string;
  size?: ButtonSize;
  faustIds: FaustId[];
  dataCy?: string;
  isFluid: boolean;
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  manifestationMaterialType,
  faustIds,
  size,
  dataCy = "material-button-physical",
  isFluid
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
  const getLabel = () => {
    if (size === "small" && !isFluid) {
      return t("reserveText");
    }
    if (size === "small" && isFluid) {
      return t("reserveFromAnotherLibraryText", {
        placeholders: {
          "@materialType": ""
        }
      });
    }
    if (isFluid) {
      return t("reserveFromAnotherLibraryText", {
        placeholders: {
          "@materialType": manifestationMaterialType
        }
      });
    }
    return `${t("reserveText")} ${manifestationMaterialType}`;
  };
  const label = getLabel();

  return (
    <Button
      dataCy={dataCy}
      label={label}
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
