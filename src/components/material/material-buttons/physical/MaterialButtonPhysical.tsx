import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonPhysicalProps {
  manifestationMaterialType: string;
  faustId: string;
}

const MaterialButtonPhysical: FC<MaterialButtonPhysicalProps> = ({
  manifestationMaterialType,
  faustId
}) => {
  const t = useText();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = (manifestationId: string) => {
    // TODO: open the modal and reserve
  };

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

export default MaterialButtonPhysical;
