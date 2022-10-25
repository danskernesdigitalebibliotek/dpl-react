import React from "react";
import ArrowSmallRight from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/arrow-ui/icon-arrow-ui-small-right.svg";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import clsx from "clsx";
import { ButtonSize } from "../../core/utils/types/button";

export type ButtonProps = {
  label: string;
  buttonType: "none" | "default" | "external-link" | "search" | "submit";
  disabled: boolean;
  collapsible: boolean;
  size: ButtonSize;
  variant: "outline" | "filled";
  onClick?: () => void;
  iconClassNames?: string;
  id?: string;
  classNames?: string;
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
  classNames
}) => {
  const iconClassName = `btn-icon ${clsx({ "btn-collapsible": collapsible }, [
    iconClassNames
  ])}`;

  const Icon = React.useCallback(() => {
    if (variant === "outline") {
      return null;
    }

    if (buttonType === "default") {
      return (
        <div className="ml-16">
          <ArrowSmallRight />
        </div>
      );
    }

    if (buttonType === "external-link") {
      return <img className={iconClassName} src={ExternalLinkIcon} alt="" />;
    }

    return null;
  }, [buttonType, iconClassName, variant]);

  return (
    <button
      type="button"
      className={`btn-primary btn-${variant} btn-${size} arrow__hover--right-small ${
        classNames ?? ""
      }`}
      disabled={disabled}
      onClick={onClick}
      id={id}
    >
      {/* TODO find out what should be instead (6) */}
      {`${label}${buttonType === "search" ? " (6)" : ""}`}
      <Icon />
    </button>
  );
};
