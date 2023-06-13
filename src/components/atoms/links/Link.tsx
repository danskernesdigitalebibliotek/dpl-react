import React from "react";
import { getLinkHandler } from "./getLinkHandler";

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
  const handleClick = getLinkHandler({
    type: "click",
    isNewTab,
    stopPropagation,
    url: href,
    trackClick
  });

  const handleKeyUp = getLinkHandler({
    type: "keyup",
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
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </a>
  );
};

export default Link;
