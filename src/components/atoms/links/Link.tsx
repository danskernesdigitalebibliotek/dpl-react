import React, { useState } from "react";
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
  canOnlyBeClickedOnce?: boolean;
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
  isHiddenFromScreenReaders,
  canOnlyBeClickedOnce = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

  // We need to use a custom onClick & onKeyUp handlers as opposed to just native <a> behaviour
  // because we in some cases have to track these clicks. So we need to wait to fire a call
  // before we can redirect the user.
  const onclickHandler = onClick
    ? async (
        e:
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>
      ) => {
        if (canOnlyBeClickedOnce && isLoading) return; // Prevent further clicks
        if (canOnlyBeClickedOnce) setIsLoading(true);
        try {
          await onClick(); // Await the provided onClick
          handleClick(e); // Call handleClick after onClick resolves
        } finally {
          if (canOnlyBeClickedOnce) setIsLoading(false);
        }
      }
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
