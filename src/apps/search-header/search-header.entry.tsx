import * as React from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import SearchHeader from "./search-header";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { GlobalConfigProps } from "../../core/storybook/globalConfigArgs";

export interface SearchHeaderTextProps {
  searchHeaderIconAltText?: string;
  searchHeaderInputLabelText?: string;
  inputPlaceholderText?: string;
  stringSuggestionAuthorText?: string;
  stringSuggestionWorkText?: string;
  stringSuggestionTopicText?: string;
  searchHeaderDropdownText: string;
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
  headerDropdownItemAdvancedSearchText: string;
  isEnabledAdvancedSearch: boolean;
}

export interface SearchHeaderEntryProps
  extends SearchHeaderTextProps,
    GlobalEntryTextProps,
    GlobalConfigProps,
    GlobalUrlEntryPropsInterface {}

const SearchHeaderEntry: React.FC<SearchHeaderEntryProps> = ({
  isEnabledAdvancedSearch
}) => {
  return <SearchHeader isEnabledAdvancedSearch={isEnabledAdvancedSearch} />;
};

export default withUrls(withText(SearchHeaderEntry));
