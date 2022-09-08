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
  autosuggestBookCategoryText: string;
  autosuggestEbookCategoryText: string;
  autosuggestFilmCategoryText: string;
  autosuggestAudioBookCategoryText: string;
  autosuggestMusicCategoryText: string;
  autosuggestGameCategoryText: string;
  autosuggestAnimatedSeriesCategoryText: string;
  inText: string;
  loadingText: string;
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
