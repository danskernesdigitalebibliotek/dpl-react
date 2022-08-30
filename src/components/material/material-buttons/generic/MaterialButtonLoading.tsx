import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonLoadingProps {
  isOnEditionCard?: boolean;
}

const MaterialButtonLoading: FC<MaterialButtonLoadingProps> = ({
  isOnEditionCard
}) => {
  const t = useText();

  if (isOnEditionCard) {
    return (
      <Button
        label={t("loadingText")}
        buttonType="none"
        variant="filled"
        disabled
        collapsible={false}
        size="small"
      />
    );
  }

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
