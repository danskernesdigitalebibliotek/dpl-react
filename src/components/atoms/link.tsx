import React from "react";
import { redirectTo } from "../../core/utils/helpers/url";

export interface LinkProps {
  href: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  id?: string;
  trackClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  isNewTab,
  className,
  id,
  trackClick
}) => {
  const redirect = () => {
    redirectTo(href);
  };

  return (
    // If we want to track this click we have to first NOT set the href attribute
    // & instead redirect through an onclick handler
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      id={id}
      // eslint-disable-next-line no-script-url
      href={trackClick ? "javascript:void(0)" : String(href)}
      target={isNewTab ? "_blank" : ""}
      rel="noreferrer"
      className={className}
      onClick={
        trackClick
          ? () => {
              trackClick();
              redirect();
            }
          : undefined
      }
    >
      {children}
    </a>
  );
};

export default Link;
