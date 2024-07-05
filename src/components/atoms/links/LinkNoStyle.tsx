import React from "react";
import Link from "./Link";

export interface LinkNoStyleProps {
  url: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  trackClick?: () => Promise<unknown>;
  dataCy?: string;
  ariaLabelledBy?: string;
  isHiddenFromScreenReaders?: boolean;
}

const LinkNoStyle: React.FC<LinkNoStyleProps> = ({
  url,
  children,
  isNewTab = false,
  className,
  trackClick,
  dataCy = "link-no-style",
  ariaLabelledBy,
  isHiddenFromScreenReaders
}) => {
  return (
    <Link
      href={url}
      isNewTab={isNewTab}
      className={`hide-linkstyle ${className || ""}`}
      trackClick={trackClick}
      dataCy={dataCy}
      ariaLabelledBy={ariaLabelledBy}
      isHiddenFromScreenReaders={isHiddenFromScreenReaders}
    >
      {children}
    </Link>
  );
};

export default LinkNoStyle;
