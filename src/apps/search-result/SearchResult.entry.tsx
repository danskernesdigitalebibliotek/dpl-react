import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal, getParams } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import SearchResult from "./SearchResult";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { MappArgs } from "../../core/storybook/mappArgs";
import withPageStatistics from "../../core/statistics/withPageStatistics";
import { NuqsAdapter } from "nuqs/adapters/react";

interface SearchResultEntryTextProps {
  addMoreFiltersText: string;
  searchFilterMaterialsText: string;
  searchShowResultsText: string;
  searchShowLessText: string;
  searchShowAllText: string;
  searchOnShelfText: string;
  searchOnShelfDescriptionText: string;
  searchCanAlwaysBeLoanedText: string;
  searchCanAlwaysBeLoanedDescriptionText: string;
  searchDialogFilterMaterialsText: string;
  webSearchConfig: string;
  webSearchLinkText: string;
  byAuthorText: string;
  etAlText: string;
  facetAccessTypesText: string;
  facetCanAlwaysBeLoanedText: string;
  facetChildrenOrAdultsText: string;
  facetCreatorsText: string;
  facetDk5Text: string;
  facetFictionalCharactersText: string;
  facetFictionNonfictionText: string;
  facetGamePlatformText: string;
  facetGenreAndFormText: string;
  facetMainLanguagesText: string;
  facetMaterialTypesText: string;
  facetMaterialTypesGeneralText: string;
  facetMaterialTypesSpecificText: string;
  facetSubjectsText: string;
  facetWorkTypesText: string;
  facetYearText: string;
  facetAgeText: string;
  facetGeneralAudienceText: string;
  facetLixText: string;
  facetLetText: string;
  facetLibraryRecommendationText: string;
  filterListText: string;
  inSeriesText: string;
  loadingText: string;
  numberDescriptionText: string;
  resultPagerStatusText: string;
  searchShowingMaterialsText: string;
  showingAllMaterialsText: string;
  showingResultsForText: string;
  showMoreText: string;
  showResultsText: string;
  invalidSearchText: string;
  invalidSearchDescriptionText: string;
}

interface SearchResultEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
  searchInfoboxConfig: string;
}

export interface SearchResultEntryProps
  extends GlobalUrlEntryPropsInterface,
    SearchResultEntryConfigProps,
    GlobalEntryTextProps,
    SearchResultEntryTextProps,
    MappArgs {
  q?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
  searchShowingMaterialsText: string;
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
    <>
      {/* We still want to render the app, even if the search query is an empty string */}
      {(searchQuery || searchQuery === "") && (
        <GuardedApp app="search-result">
          <NuqsAdapter>
            <SearchResult q={searchQuery} pageSize={pageSize} />
          </NuqsAdapter>
        </GuardedApp>
      )}
    </>
  );
};

export default withConfig(
  withUrls(withText(withPageStatistics(SearchResultEntry)))
);
