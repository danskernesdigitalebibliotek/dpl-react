import * as React from "react";
import SearchHeader, { SearchHeaderProps } from "./search-header";

const SearchHeaderEntry: React.FC<SearchHeaderProps> = ({
  searchHeaderUrl,
  altText,
  inputPlaceholder
}) => (
  <SearchHeader
    searchHeaderUrl={searchHeaderUrl}
    altText={altText}
    inputPlaceholder={inputPlaceholder}
  />
);

export default SearchHeaderEntry;
