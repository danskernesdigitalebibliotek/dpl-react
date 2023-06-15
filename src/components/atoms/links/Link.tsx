import React from "react";
import { redirectTo } from "../../../core/utils/helpers/url";

export interface LinkProps {
  href: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  id?: string;
  trackClick?: () => Promise<unknown>;
  dataCy?: string;
  ariaLabelledBy?: string;
  stopPropagation?: boolean;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  isNewTab = false,
  className,
  id,
  trackClick,
  dataCy,
  ariaLabelledBy,
  stopPropagation = false
}) => {
  const redirect = (redirectToNewTab: boolean) => {
    if (redirectToNewTab) {
      window.open(href.href, "_blank");
    }
    redirectTo(href);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (trackClick) {
      e.preventDefault();
      trackClick().then(() => {
        redirect(isNewTab);
      });
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (trackClick && e.key === "Enter") {
      e.preventDefault();
      trackClick().then(() => {
        redirect(isNewTab);
      });
    }
  };

  return (
    <a
      id={id}
      data-cy={dataCy || id}
      href={href.toString()}
      target={isNewTab ? "_blank" : undefined}
      rel="noreferrer"
      className={className}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </a>
  );
};

export default Link;
