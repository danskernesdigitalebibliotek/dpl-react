import React from "react";
import { getLinkHandler } from "./getLinkHandler";

export interface LinkProps {
  href: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  id?: string;
  dataCy?: string;
  ariaLabelledBy?: string;
  stopPropagation?: boolean;
  isHiddenFromScreenReaders?: boolean;
  trackClick?: () => Promise<unknown>;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  isNewTab = false,
  className,
  id,
  dataCy,
  ariaLabelledBy,
  stopPropagation = false,
  isHiddenFromScreenReaders,
  trackClick
}) => {
  const handleKeyUp = getLinkHandler({
    type: "keyup",
    isNewTab,
    stopPropagation,
    url: href,
    trackClick
  });

  const handleClick = getLinkHandler({
    type: "click",
    isNewTab,
    stopPropagation,
    url: href,
    trackClick
  });

  return (
    <a
      id={id}
      data-cy={dataCy || id}
      href={href.toString()}
      target={isNewTab ? "_blank" : undefined}
      rel="noreferrer"
      className={className}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
      aria-labelledby={ariaLabelledBy}
      tabIndex={isHiddenFromScreenReaders ? -1 : 0}
      aria-hidden={isHiddenFromScreenReaders}
    >
      {children}
    </a>
  );
};

export default Link;
