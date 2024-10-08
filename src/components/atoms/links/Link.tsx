import React from "react";
import { getLinkHandler } from "./getLinkHandler";

export interface LinkProps {
  href: URL;
  onClick?: () => Promise<void>;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  id?: string;
  trackClick?: () => Promise<unknown>;
  dataCy?: string;
  ariaLabelledBy?: string;
  stopPropagation?: boolean;
  isHiddenFromScreenReaders?: boolean;
}

const Link: React.FC<LinkProps> = ({
  href,
  onClick,
  children,
  isNewTab = false,
  className,
  id,
  trackClick,
  dataCy,
  ariaLabelledBy,
  stopPropagation = false,
  isHiddenFromScreenReaders
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

  const onclickHandler = onClick
    ? (
        e:
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>
      ) => onClick().then(() => handleClick(e))
    : handleClick;

  return (
    <a
      id={id}
      data-cy={dataCy || id}
      href={href.toString()}
      target={isNewTab ? "_blank" : undefined}
      rel="noreferrer"
      className={className}
      onClick={onclickHandler}
      onKeyUp={handleKeyUp}
      aria-labelledby={ariaLabelledBy}
      tabIndex={isHiddenFromScreenReaders ? -1 : 0}
      aria-hidden={isHiddenFromScreenReaders}
    >
      {children}
    </a>
  );
};

export default Link;
