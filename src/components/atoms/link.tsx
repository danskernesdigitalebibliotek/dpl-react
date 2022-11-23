import React from "react";
import { redirectTo } from "../../core/utils/helpers/url";

export interface LinkProps {
  href: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  id?: string;
  trackClick?: () => void;
  dataCy?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  isNewTab,
  className,
  id,
  trackClick,
  dataCy
}) => {
  const redirect = (redirectToNewTab: boolean) => {
    if (redirectToNewTab) {
      window.open(href.href, "_blank");
    }
    redirectTo(href);
  };

  if (!trackClick) {
    return (
      <a
        id={id}
        data-cy={id}
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
      id={id}
      data-cy={dataCy || id}
      role="button"
      tabIndex={0}
      onClick={() => {
        trackClick();
        redirect(isNewTab || false);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          trackClick();
          redirect(isNewTab || false);
        }
      }}
      className={className}
    >
      {children}
    </span>
  );
};

export default Link;
