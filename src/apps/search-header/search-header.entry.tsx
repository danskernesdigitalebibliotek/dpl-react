import * as React from "react";
import SearchHeader from "./search-header";

export interface SearchHeaderEntryProps {
  searchHeaderUrl?: string;
}

const SearchHeaderEntry: React.FC<SearchHeaderEntryProps> = ({
  searchHeaderUrl
}) => <SearchHeader searchHeaderUrl={searchHeaderUrl} />;

export default SearchHeaderEntry;
