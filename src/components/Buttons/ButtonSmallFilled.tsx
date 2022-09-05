import * as React from "react";
import { FC } from "react";
import { Button } from "./Button";

export interface ButtonSmallFilledProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const ButtonSmallFilled: FC<ButtonSmallFilledProps> = ({
  label,
  disabled,
  onClick
}) => {
  return (
    <Button
      label={label}
      buttonType="none"
      variant="filled"
      disabled={disabled}
      collapsible={false}
      size="small"
      onClick={onClick}
    />
  );
};

export default ButtonSmallFilled;
