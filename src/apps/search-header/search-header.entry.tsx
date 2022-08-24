import * as React from "react";
import GuardedApp from "../../components/guarded-app";
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
  searchUrl?: string;
  materialUrl?: string;
}

export interface SearchHeaderEntryProps
  extends SearchHeaderTextProps,
    SearchHeaderUrlProps {}

const WrappedSearchHeader: React.FC<SearchHeaderEntryProps> = () => (
  <GuardedApp app="search-header">
    <SearchHeader />
  </GuardedApp>
);
export default withUrls(withText(WrappedSearchHeader));
