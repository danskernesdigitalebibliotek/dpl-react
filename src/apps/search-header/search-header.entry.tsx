import * as React from "react";
import { withText } from "../../core/utils/text";
import SearchHeader from "./search-header";

export interface SearchHeaderProps {
  baseUrl: string;
  altText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
  etAlText?: string;
}

const SearchHeaderEntry: React.FC<SearchHeaderProps> = ({
  baseUrl = "https://bibliotek.dk"
}) => <SearchHeader baseUrl={baseUrl} />;

export default withText(SearchHeaderEntry);
