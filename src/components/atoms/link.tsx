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

  if (!trackClick) {
    return (
      <a
        id={id}
        href={String(href)}
        target={isNewTab ? "_blank" : ""}
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      onClick={() => {
        trackClick();
        redirect();
      }}
      role="button"
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          trackClick();
          redirect();
        }
      }}
    >
      {children}
    </span>
  );
};

export default Link;
