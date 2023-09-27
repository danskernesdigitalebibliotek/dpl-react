import * as React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import SearchHeader from "./search-header";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";

export interface SearchHeaderTextProps {
  alertErrorCloseText: string;
  alertErrorMessageText: string;
  searchHeaderIconAltText?: string;
  searchHeaderInputLabelText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
  advancedSearchSubmitButtonText: string;
  advancedSearchMinimalLengthErrorText: string;
  advancedSearchExplanationText: string;
  searchHeaderAdvancedSearchIconText: string;
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
  searchNoValidCharactersErrorText: string;
  advancedSearchModalHeaderText: string;
  advancedSearchModalScreenReaderModalDescriptionText: string;
  advancedSearchModalCloseModalAriaLabelText: string;
}

export interface SearchHeaderEntryProps
  extends SearchHeaderTextProps,
    GlobalUrlEntryPropsInterface {}

const SearchHeaderEntry: React.FC<SearchHeaderEntryProps> = () => {
  return <SearchHeader />;
};

export default withUrls(withText(SearchHeaderEntry));
