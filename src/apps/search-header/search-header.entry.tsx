import * as React from "react";
import SearchHeader, { SearchHeaderProps } from "./search-header";

const SearchHeaderEntry: React.FC<SearchHeaderProps> = ({
  searchHeaderUrl,
  altText,
  inputPlaceholderText,
  stringSuggestionAuthorText,
  stringSuggestionWorkText,
  stringSuggestionTopicText
}) => (
  <SearchHeader
    searchHeaderUrl={searchHeaderUrl}
    altText={altText}
    inputPlaceholderText={inputPlaceholderText}
    stringSuggestionAuthorText={stringSuggestionAuthorText}
    stringSuggestionWorkText={stringSuggestionWorkText}
    stringSuggestionTopicText={stringSuggestionTopicText}
  />
);

export default SearchHeaderEntry;
