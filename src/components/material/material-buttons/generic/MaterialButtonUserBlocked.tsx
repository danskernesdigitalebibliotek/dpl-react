import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonUserBlockedProps {
  isOnEditionCard?: boolean;
}

const MaterialButtonUserBlocked: FC<MaterialButtonUserBlockedProps> = ({
  isOnEditionCard
}) => {
  const t = useText();

  if (isOnEditionCard) {
    return (
      <Button
        label={t("reserveText")}
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
      label={t("reserveText")}
      buttonType="none"
      variant="filled"
      disabled
      collapsible={false}
      size="large"
    />
  );
};

export default MaterialButtonUserBlocked;
