import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { FaustId } from "../../../../core/utils/types/ids";
import { Button } from "../../../Buttons/Button";
import { reservationModalId } from "../../../reservation/ReservationModalBody";

export interface MaterialButtonPhysicalProps {
  manifestationMaterialType: string;
  size?: ButtonSize;
  faustId: FaustId;
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  manifestationMaterialType,
  faustId,
  size
}) => {
  const t = useText();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(openModal({ modalId: reservationModalId(faustId) }));
  };

  return (
    <Button
      label={
        size === "small"
          ? t("reserveText")
          : `${t("reserveText")} ${manifestationMaterialType}`
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

export default MaterialButtonPhysical;
