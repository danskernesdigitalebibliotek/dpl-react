import React, { useRef } from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant
} from "../../core/utils/types/button";
import { ButtonIcon } from "./ButtonIcon";

export type ButtonProps = {
  label: string;
  buttonType: ButtonType;
  collapsible: boolean;
  size: ButtonSize;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  iconClassNames?: string;
  id?: string;
  classNames?: string;
  dataCy?: string;
  ariaDescribedBy?: string;
  canOnlyBeClickedOnce?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  buttonType,
  collapsible,
  size,
  variant,
  disabled = false,
  onClick,
  iconClassNames,
  id,
  classNames,
  dataCy,
  ariaDescribedBy,
  canOnlyBeClickedOnce = false
}) => {
  const isLoadingRef = useRef(false);
  const handleClick = () => {
    if (isLoadingRef.current) return;
    if (canOnlyBeClickedOnce) isLoadingRef.current = true;
    if (onClick) onClick();
  };

  return (
    <button
      data-cy={dataCy || "button"}
      type="button"
      className={`btn-primary btn-${variant} btn-${size} ${
        disabled ? "btn-outline" : ""
      } arrow__hover--right-small ${classNames ?? ""}`}
      disabled={disabled || isLoadingRef.current}
      onClick={handleClick}
      id={id}
      aria-describedby={ariaDescribedBy}
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
