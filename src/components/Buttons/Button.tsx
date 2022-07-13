import React from "react";
import ArrowSmallRight from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/arrow-ui/icon-arrow-ui-small-right.svg";

export type ButtonProps = {
  label: string;
  buttonType: "none" | "default" | "external-link" | "search";
  disabled: boolean;
  collapsible: boolean;
  size: "large" | "medium" | "small" | "xsmall";
  variant: "outline" | "filled";
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  buttonType,
  disabled,
  collapsible,
  size,
  variant,
  onClick
}) => {
  const iconClassName = `btn-icon ${collapsible ? "btn-collapsible" : ""}`;

  const Icon = React.useCallback(() => {
    if (variant !== "outline") return null;

    if (buttonType === "default") {
      return (
        <div className="ml-16">
          <ArrowSmallRight />
        </div>
      );
    }

    if (buttonType === "external-link") {
      return (
        <img
          className={iconClassName}
          src="icons/buttons/icon-btn-external-link.svg"
          alt="external-link"
        />
      );
    }

    return null;
  }, [buttonType, iconClassName, variant]);

  return (
    <button
      type="button"
      className={`btn-primary btn-${variant} btn-${size} arrow__hover--right-small`}
      disabled={disabled}
      onClick={onClick}
    >
      {/* TODO find out what should be instead (6) */}
      {`${label} ${buttonType === "search" ? "(6)" : ""}`}
      <Icon />
    </button>
  );
};
