import React, { useRef } from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant
} from "../../core/utils/types/button";
import { ButtonIcon } from "./ButtonIcon";
import { isEnterOrSpacePressed } from "../../core/utils/helpers/general";

export type ButtonProps = {
  label: string;
  buttonType: ButtonType;
  type?: "button" | "submit" | "reset";
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
  type = "button",
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
      type={type}
      className={`btn-primary btn-${variant} btn-${size} ${
        disabled ? "btn-outline" : ""
      } arrow__hover--right-small ${classNames ?? ""}`}
      disabled={disabled || isLoadingRef.current}
      onMouseUp={handleClick}
      onKeyUp={(e) => {
        if (isEnterOrSpacePressed(e.key)) {
          handleClick();
        }
      }}
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
