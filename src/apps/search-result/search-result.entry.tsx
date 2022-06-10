import * as React from "react";
import SearchResult from "./search-result";

const SearchResultEntry: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const q = queryParams.get("q");

  return <SearchResult q={q} />;
};

export default SearchResultEntry;
