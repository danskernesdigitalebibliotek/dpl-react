import React from "react";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  isNewTab?: boolean;
}

export const Link: React.FC<LinkProps> = ({ href, children, isNewTab }) => {
  return (
    <a
      href={href}
      target={isNewTab ? "_blank" : ""}
      rel="noreferrer"
      className="hide-linkstyle"
    >
      {children}
    </a>
  );
};

export default Link;
