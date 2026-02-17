import React, { FC, ReactNode } from "react";
import clsx from "clsx";

type ContentListProps = {
  children: ReactNode;
  className?: string;
  dataCy?: string;
};

const ContentList: FC<ContentListProps> = ({ children, className, dataCy }) => (
  <ul className={clsx("content-list", className)} data-cy={dataCy}>
    {children}
  </ul>
);

export default ContentList;
