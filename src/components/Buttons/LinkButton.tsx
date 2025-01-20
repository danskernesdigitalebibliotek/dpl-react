import clsx from "clsx";
import React from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant
} from "../../core/utils/types/button";
import Link from "../atoms/links/Link";
import { ButtonIcon } from "./ButtonIcon";

export interface LinkButtonProps {
  buttonType?: ButtonType;
  children: React.ReactNode;
  classNames?: string;
  dataCy?: string;
  iconClassNames?: string;
  isNewTab?: boolean;
  size: ButtonSize;
  trackClick?: () => Promise<unknown>;
  url: URL;
  variant: ButtonVariant;
  ariaLabelledBy?: string;
  id?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  buttonType,
  children,
  classNames,
  dataCy = "link-button",
  iconClassNames,
  isNewTab = false,
  size = "medium",
  trackClick,
  url,
  variant = "filled",
  ariaLabelledBy,
  id
}) => {
  return (
    <Link
      href={url}
      isNewTab={isNewTab}
      className={clsx(
        "btn-primary",
        `btn-${variant}`,
        `btn-${size}`,
        "arrow__hover--right-small",
        "hide-linkstyle",
        classNames
      )}
      trackClick={trackClick}
      dataCy={dataCy}
      ariaLabelledBy={ariaLabelledBy}
      id={id}
      canOnlyBeClickedOnce
    >
      {children}
      <ButtonIcon buttonType={buttonType} iconClassNames={iconClassNames} />
    </Link>
  );
};

export default LinkButton;
