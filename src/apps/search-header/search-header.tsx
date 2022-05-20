import React, { useState } from "react";
import SearchBar from "../../components/search-bar/search-bar";
// import { SuggestDropdown } from "../../components/suggest-dropdown/suggest-dropdown";

export interface SearchHeaderProps {
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholder?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchHeaderUrl = "/search",
  altText = "search icon",
  inputPlaceholder = "Search here"
}) => {
  const [q, setQ] = useState("");
  // const dropDownIsVisible = q.length >= 3;

  return (
    <SearchBar
      q={q}
      setQuery={setQ}
      searchHeaderUrl={searchHeaderUrl}
      altText={altText}
      inputPlaceholder={inputPlaceholder}
    />
  );
};

export default SearchHeader;
