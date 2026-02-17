import React, { FC, ReactNode } from "react";

type ContentListProps = {
  children: ReactNode;
};

const ContentList: FC<ContentListProps> = ({ children }) => (
  <ul className="content-list">{children}</ul>
);

export default ContentList;
