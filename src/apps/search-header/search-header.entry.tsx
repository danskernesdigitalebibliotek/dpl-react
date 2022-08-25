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
  bookCategoryText: string;
  ebookCategoryText: string;
  filmCategoryText: string;
  audioBookCategoryText: string;
  musicCategoryText: string;
  gameCategoryText: string;
  animatedSeriesCategoryText: string;
}

export interface SearchHeaderUrlProps {
  searchUrl?: string;
  materialUrl?: string;
}

export interface SearchHeaderEntryProps
  extends SearchHeaderTextProps,
    SearchHeaderUrlProps {}

const SearchHeaderEntry: React.FC<SearchHeaderEntryProps> = () => {
  return <SearchHeader />;
};

export default withUrls(withText(SearchHeaderEntry));
