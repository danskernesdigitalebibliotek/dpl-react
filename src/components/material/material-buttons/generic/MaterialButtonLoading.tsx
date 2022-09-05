import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonLoadingProps {
  size?: "large" | "medium" | "small" | "xsmall";
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
