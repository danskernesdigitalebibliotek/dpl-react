import React from "react";

export interface SearchResultListItemProps {
  title: string;
}

const SearchResultListItem: React.FC<SearchResultListItemProps> = ({
  title
}) => {
  return <div>{title}</div>;
};

export default SearchResultListItem;
