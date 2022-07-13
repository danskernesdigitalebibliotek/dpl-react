import * as React from "react";
import { FC } from "react";
import { Button } from "./Button";

export interface ButtonLargeFilledProps {
  label: string;
  disabled: boolean;
}

const ButtonLargeFilled: FC<ButtonLargeFilledProps> = ({ label, disabled }) => {
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

export default ButtonLargeFilled;
