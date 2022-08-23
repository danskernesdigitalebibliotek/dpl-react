import * as React from "react";
import { FC } from "react";
import { useText } from "../../../core/utils/text";
import { Button } from "../../Buttons/Button";

export interface MaterialButtonReservePhysicalProps {
  manifestationMaterialType: string;
}

const MaterialButtonReservePhysical: FC<MaterialButtonReservePhysicalProps> = ({
  manifestationMaterialType
}) => {
  const t = useText();
  return (
    <Button
      label={`${t("reserveText")} ${manifestationMaterialType}`}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonReservePhysical;
