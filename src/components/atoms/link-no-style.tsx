import React from "react";
import { Link } from "./link";

export interface LinkNoStyleProps {
  url: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
  trackClick?: () => void;
}

export const LinkNoStyle: React.FC<LinkNoStyleProps> = ({
  url,
  children,
  isNewTab = false,
  className,
  trackClick
}) => {
  return (
    <Link
      href={url}
      isNewTab={isNewTab}
      className={`hide-linkstyle ${className || ""}`}
      trackClick={trackClick}
    >
      {children}
    </Link>
  );
};

export default LinkNoStyle;
