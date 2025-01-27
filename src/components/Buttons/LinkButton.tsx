import React from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant
} from "../../core/utils/types/button";
import { Button } from "./Button";
import { redirectTo } from "../../core/utils/helpers/url";

export interface LinkButtonProps {
  buttonType?: ButtonType;
  children: string;
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
    <Button
      variant={variant}
      size={size}
      buttonType={buttonType || "none"}
      classNames={classNames}
      iconClassNames={iconClassNames}
      onClick={() => {
        if (trackClick) trackClick?.().then(() => redirectTo(url, isNewTab));
        if (!trackClick) redirectTo(url, isNewTab);
      }}
      dataCy={dataCy}
      ariaDescribedBy={ariaLabelledBy}
      id={id}
      canOnlyBeClickedOnce
      label={children}
      collapsible={false}
    />
  );
};

export default LinkButton;
