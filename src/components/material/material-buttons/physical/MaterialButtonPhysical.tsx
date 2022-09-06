import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonPhysicalProps {
  manifestationMaterialType: string;
  faustId: string;
  size?: ButtonSize;
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  manifestationMaterialType,
  faustId,
  size
}) => {
  const t = useText();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = () => {
    // TODO: open the modal and reserve + remove console.log()
    // eslint-disable-next-line no-console
    console.log(faustId);
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
