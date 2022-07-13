import * as React from "react";
import { FC } from "react";
import { Button } from "./Button";

export interface ButtonLargeOutlineProps {
  label: string;
  disabled: boolean;
}

const ButtonLargeOutline: FC<ButtonLargeOutlineProps> = ({
  label,
  disabled
}) => {
  return (
    <Button
      label={label}
      buttonType="none"
      variant="filled"
      disabled={disabled}
      collapsible={false}
      size="large"
    />
  );
};

export default ButtonLargeOutline;
