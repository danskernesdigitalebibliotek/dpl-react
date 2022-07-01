import React from "react";
import { Link } from "./link";

export interface LinkNoStyleProps {
  href: string;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
}

export const LinkNoStyle: React.FC<LinkNoStyleProps> = ({
  href,
  children,
  isNewTab = false,
  className
}) => {
  return (
    <Link
      href={href}
      isNewTab={isNewTab}
      className={`"hide-linkstyle" ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkNoStyle;
