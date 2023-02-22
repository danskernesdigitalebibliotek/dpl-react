import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonCantReserveProps {
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonCantReserve: FC<MaterialButtonCantReserveProps> = ({
  size,
  dataCy = "material-header-buttons-cant-reserve"
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
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonCantReserve;
