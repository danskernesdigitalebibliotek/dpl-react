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
  inText: string;
}

export interface SearchHeaderUrlProps {
  searchUrl: string;
  materialUrl: string;
}

export interface SearchHeaderEntryProps
  extends SearchHeaderTextProps,
    SearchHeaderUrlProps {}

// default value here prevents variable names to show if undefined
const SearchHeaderEntry: React.FC<SearchHeaderEntryProps> = ({
  altText = "search icon",
  inputPlaceholderText = "Search here",
  stringSuggestionAuthorText = "author",
  stringSuggestionWorkText = "work",
  stringSuggestionTopicText = "topic",
  etAlText = "et al.",
  bookCategoryText = "Books",
  ebookCategoryText = "Ebooks",
  filmCategoryText = "Movies",
  audioBookCategoryText = "Audio Books",
  musicCategoryText = "Music",
  gameCategoryText = "Games",
  animatedSeriesCategoryText = "Animated Series",
  inText = "i"
}) => {
  return <SearchHeader />;
};

export default withUrls(withText(SearchHeaderEntry));
