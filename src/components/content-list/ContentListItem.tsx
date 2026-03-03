import React, { FC, ReactNode } from "react";

type ContentListItemProps = {
  children: ReactNode;
};

const ContentListItem: FC<ContentListItemProps> = ({ children }) => (
  <li className="content-list__item">{children}</li>
);

export default ContentListItem;
