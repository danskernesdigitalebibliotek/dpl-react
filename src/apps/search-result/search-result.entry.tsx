import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal, getParams } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import SearchResult from "./search-result";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

interface SearchResultEntryTextProps {
  addMoreFiltersText: string;
  addToFavoritesAriaLabelText: string;
  byAuthorText: string;
  etAlText: string;
  facetAccessTypesText: string;
  facetBrowserModalCloseModalAriaLabelText: string;
  facetBrowserModalScreenReaderModalDescriptionText: string;
  facetCanAlwaysBeLoanedText: string;
  facetChildrenOrAdultsText: string;
  facetCreatorsText: string;
  facetDk5Text: string;
  facetFictionalCharactersText: string;
  facetFictionNonfictionText: string;
  facetGenreAndFormText: string;
  facetMainLanguagesText: string;
  facetMaterialTypesGeneralText: string;
  facetMaterialTypesSpecificText: string;
  facetSubjectsText: string;
  facetWorkTypesText: string;
  facetYearText: string;
  filterListText: string;
  inSeriesText: string;
  loadingText: string;
  numberDescriptionText: string;
  removeFromFavoritesAriaLabelText: string;
  resultPagerStatusText: string;
  showingResultsForText: string;
  noSearchResultText: string;
  showMoreText: string;
  showResultsText: string;
}

interface SearchResultEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
}

export interface SearchResultEntryProps
  extends GlobalUrlEntryPropsInterface,
    SearchResultEntryConfigProps,
    GlobalEntryTextProps,
    SearchResultEntryTextProps {
  q?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const SearchResultEntry: React.FC<SearchResultEntryProps> = ({
  q,
  pageSizeDesktop,
  pageSizeMobile
}) => {
  // If a q string has been defined as a data attribute use that
  // otherwise use the one from the url query parameter.
  const { q: searchQuery } = getParams({ q });
  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  const pageSize = pageSizeGlobal({
    desktop: pageSizeDesktop,
    mobile: pageSizeMobile
  });

  return (
    <div>
      {searchQuery && (
        <GuardedApp app="search-result">
          <SearchResult q={searchQuery} pageSize={pageSize} />
        </GuardedApp>
      )}
    </div>
  );
};

export default withConfig(withUrls(withText(SearchResultEntry)));
