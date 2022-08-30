import React from "react";

export interface LinkProps {
  href: URL;
  children: React.ReactNode;
  isNewTab?: boolean;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  isNewTab,
  className
}) => {
  return (
    <a
      href={String(href)}
      target={isNewTab ? "_blank" : ""}
      rel="noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

export default Link;
