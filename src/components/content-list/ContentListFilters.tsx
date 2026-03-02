import React, { FC, ReactNode } from "react";

type ContentListFiltersProps = {
  children: ReactNode;
};

const ContentListFilters: FC<ContentListFiltersProps> = ({ children }) => (
  <div className="content-list-page__filters">{children}</div>
);

export default ContentListFilters;
