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

  const onclickHandler = onClick
    ? async (
        e:
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>
      ) => {
        if (isLoading) return; // Prevent further clicks
        setIsLoading(true); // Set loading state to true
        try {
          await onClick(); // Await the provided onClick
          handleClick(e); // Call handleClick after onClick resolves
        } finally {
          setIsLoading(false); // Reset loading state
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
