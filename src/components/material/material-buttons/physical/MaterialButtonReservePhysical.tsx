import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonReservePhysicalProps {
  manifestationMaterialType: string;
  faustId: string;
}

const MaterialButtonReservePhysical: FC<MaterialButtonReservePhysicalProps> = ({
  manifestationMaterialType,
  faustId
}) => {
  const t = useText();

  const onClick = (manifestationId: string) => {
    // TODO: open the modal and reserve
  };

  // TODO: use faustId to open the reservation flow
  return (
    <Button
      label={`${t("reserveText")} ${manifestationMaterialType}`}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
      onClick={() => {
        onClick(faustId);
      }}
    />
  );
};

export default MaterialButtonReservePhysical;
