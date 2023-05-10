import React from "react";
import ArrowSmallRight from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/arrow-ui/icon-arrow-ui-small-right.svg";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import clsx from "clsx";
import { ButtonType } from "../../core/utils/types/button";

export interface ButtonIconProps {
  buttonType?: ButtonType;
  collapsible?: boolean;
  iconClassNames?: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  buttonType,
  collapsible,
  iconClassNames
}) => {
  const iconClassName = `btn-icon ${clsx({ "btn-collapsible": collapsible }, [
    iconClassNames
  ])}`;

  if (buttonType === "default") {
    return (
      <div className="ml-16">
        <img className={iconClassName} src={ArrowSmallRight} alt="" />
      </div>
    );
  }

  if (buttonType === "external-link") {
    return <img className={iconClassName} src={ExternalLinkIcon} alt="" />;
  }

  return null;
};
