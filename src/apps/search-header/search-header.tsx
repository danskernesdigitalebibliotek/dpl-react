import React, { useState } from "react";
import SearchBar from "../../components/search-bar/search-bar";
// import { SuggestDropdown } from "../../components/suggest-dropdown/suggest-dropdown";

interface SearchHeaderProps {
  searchHeaderUrl?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchHeaderUrl = "/search"
}) => {
  const [q, setQ] = useState("");
  // const dropDownIsVisible = q.length >= 3;

  return (
    <>
      <SearchBar q={q} setQuery={setQ} searchHeaderUrl={searchHeaderUrl} />
      {
        // dropDownIsVisible && <SuggestDropdown q={q} />
      }
    </>
  );
};

export default SearchHeader;
