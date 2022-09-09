import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonCantReserveProps {
  size?: ButtonSize;
}

const MaterialButtonCantReserve: FC<MaterialButtonCantReserveProps> = ({
  size
}) => {
  const t = useText();

  return (
    <Button
      label={t("cantReserveText")}
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size={size || "large"}
    />
  );
};

export default MaterialButtonCantReserve;
