import clsx from "clsx";
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
  const classes = {
    link: clsx("hide-linkstyle", { className })
  };
  return (
    <Link href={url} isNewTab={isNewTab} className={classes.link}>
      {children}
    </Link>
  );
};

export default LinkNoStyle;
