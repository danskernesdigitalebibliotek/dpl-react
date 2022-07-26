import * as React from "react";
import { withText } from "../../core/utils/text";
import SearchHeader from "./search-header";

export interface SearchHeaderProps {
  searchHeaderUrlText?: string;
  altText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
  etAlText?: string;
}

const SearchHeaderEntry: React.FC<SearchHeaderProps> = ({
  searchHeaderUrlText = "https://bibliotek.dk/search",
  altText = "search icon",
  inputPlaceholderText = "Search here",
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic",
  etAlText = "et al."
}) => <SearchHeader />;

export default withText(SearchHeaderEntry);
