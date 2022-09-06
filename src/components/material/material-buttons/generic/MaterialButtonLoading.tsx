import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonLoadingProps {
  size?: ButtonSize;
}

const MaterialButtonLoading: FC<MaterialButtonLoadingProps> = ({ size }) => {
  const t = useText();

  return (
    <Button
      label={t("loadingText")}
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size={size || "large"}
    />
  );
};

export default MaterialButtonLoading;
