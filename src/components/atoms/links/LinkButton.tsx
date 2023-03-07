import clsx from "clsx";
import React from "react";
import Link from "./Link";
import { ButtonIcon } from "../ButtonIcon";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant
} from "../../../core/utils/types/button";

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
  variant = "filled"
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
        "no-underline",
        classNames
      )}
      trackClick={trackClick}
      dataCy={dataCy}
    >
      {children}
      <ButtonIcon
        buttonType={buttonType}
        variant={variant}
        iconClassNames={iconClassNames}
      />
    </Link>
  );
};

export default LinkButton;
