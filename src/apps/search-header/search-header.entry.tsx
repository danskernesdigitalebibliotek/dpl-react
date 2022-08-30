import * as React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import SearchHeader from "./search-header";

export interface SearchHeaderTextProps {
  altText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
  etAlText?: string;
}

export interface SearchHeaderUrlProps {
  searchUrl: string;
  materialUrl: string;
}

export interface SearchHeaderEntryProps
  extends SearchHeaderTextProps,
    SearchHeaderUrlProps {}

const SearchHeaderEntry: React.FC<SearchHeaderEntryProps> = ({
  altText = "search icon",
  inputPlaceholderText = "Search here",
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic",
  etAlText = "et al."
}) => {
  return <SearchHeader />;
};

export default withUrls(withText(SearchHeaderEntry));
