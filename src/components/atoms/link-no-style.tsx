import React from "react";
import { Link } from "./link";

export interface LinkNoStyleProps {
  url: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  trackClick?: () => void;
  dataCy?: string;
}

export const LinkNoStyle: React.FC<LinkNoStyleProps> = ({
  url,
  children,
  isNewTab = false,
  className,
  trackClick
  dataCy = "link-no-style"
}) => {
  return (
    <Link
      href={url}
      isNewTab={isNewTab}
      className={`hide-linkstyle ${className || ""}`}
      trackClick={trackClick}
      dataCy={dataCy}
    >
      {children}
    </Link>
  );
};

export default LinkNoStyle;
