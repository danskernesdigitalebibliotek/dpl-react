import React from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant
} from "../../core/utils/types/button";
import { ButtonIcon } from "./ButtonIcon";

export type ButtonProps = {
  label: string;
  buttonType: ButtonType;
  disabled: boolean;
  collapsible: boolean;
  size: ButtonSize;
  variant: ButtonVariant;
  onClick?: () => void;
  iconClassNames?: string;
  id?: string;
  classNames?: string;
  dataCy?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  buttonType,
  disabled,
  collapsible,
  size,
  variant,
  onClick,
  iconClassNames,
  id,
  classNames,
  dataCy
}) => {
  return (
    <button
      data-cy={dataCy || "button"}
      type="button"
      className={`btn-primary btn-${variant} btn-${size} ${
        disabled ? "btn-outline" : ""
      } arrow__hover--right-small ${classNames ?? ""}`}
      disabled={disabled}
      onClick={onClick}
      id={id}
    >
      {label}
      <ButtonIcon
        buttonType={buttonType}
        iconClassNames={iconClassNames}
        collapsible={collapsible}
      />
    </button>
  );
};
