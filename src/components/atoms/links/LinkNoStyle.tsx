import React from "react";
import Link from "./Link";

export interface LinkNoStyleProps {
  url: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  dataCy?: string;
  ariaLabelledBy?: string;
  isHiddenFromScreenReaders?: boolean;
  trackClick?: () => Promise<unknown>;
}

const LinkNoStyle: React.FC<LinkNoStyleProps> = ({
  url,
  children,
  isNewTab = false,
  className,
  dataCy = "link-no-style",
  ariaLabelledBy,
  isHiddenFromScreenReaders,
  trackClick
}) => {
  return (
    <Link
      href={url}
      isNewTab={isNewTab}
      className={`hide-linkstyle ${className || ""}`}
      dataCy={dataCy}
      ariaLabelledBy={ariaLabelledBy}
      isHiddenFromScreenReaders={isHiddenFromScreenReaders}
      trackClick={trackClick}
    >
      {children}
    </Link>
  );
};

export default LinkNoStyle;
