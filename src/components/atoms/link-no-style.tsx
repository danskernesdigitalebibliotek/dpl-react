import React from "react";
import { Link } from "./link";

export interface LinkNoStyleProps {
  url: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
}

export const LinkNoStyle: React.FC<LinkNoStyleProps> = ({
  url,
  children,
  isNewTab = false,
  className
}) => {
  return (
    <Link
      href={url}
      isNewTab={isNewTab}
      className={`"hide-linkstyle" ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkNoStyle;
