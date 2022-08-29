import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

const MaterialButtonLoading: FC = () => {
  const t = useText();
  return (
    <Button
      label={t("loadingText")}
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonLoading;
