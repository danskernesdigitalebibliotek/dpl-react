import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import { useText } from "../../../../core/utils/text";
import { FaustId } from "../../../../core/utils/types/ids";
import { Button } from "../../../Buttons/Button";
import { reservationModalId } from "../../../reservation/reservation-modal";

export interface MaterialButtonPhysicalProps {
  manifestationMaterialType: string;
  faustId: FaustId;
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  manifestationMaterialType,
  faustId
}) => {
  const t = useText();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(openModal({ modalId: reservationModalId(faustId) }));
  };

  return (
    <Button
      label={`${t("reserveText")} ${manifestationMaterialType}`}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
      onClick={onClick}
    />
  );
};

export default MaterialButtonPhysical;
