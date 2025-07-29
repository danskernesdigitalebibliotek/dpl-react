import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal, getParams } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import SearchResult from "./search-result";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { MappArgs } from "../../core/storybook/mappArgs";
import withPageStatistics from "../../core/statistics/withPageStatistics";

interface SearchResultEntryTextProps {
  addMoreFiltersText: string;
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
  facetGamePlatformText: string;
  facetGenreAndFormText: string;
  facetMainLanguagesText: string;
  facetMaterialTypesText: string;
  facetMaterialTypesGeneralText: string;
  facetMaterialTypesSpecificText: string;
  facetSubjectsText: string;
  facetWorkTypesText: string;
  facetYearText: string;
  filterListText: string;
  inSeriesText: string;
  loadingText: string;
  numberDescriptionText: string;
  resultPagerStatusText: string;
  showingResultsForText: string;
  noSearchResultText: string;
  showMoreText: string;
  showResultsText: string;
  invalidSearchText: string;
  invalidSearchDescriptionText: string;
  intelligentFiltersAccessibleHeadlineText: string;
  intelligentFiltersSelectedAccessibleHeadlineText: string;
  webSearchLinkText: string;
  webSearchConfig: string;
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
    SearchResultEntryTextProps,
    MappArgs {
  q?: string;
  creator?: string;
  subject?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const SearchResultEntry: React.FC<SearchResultEntryProps> = ({
  q,
  creator,
  subject,
  pageSizeDesktop,
  pageSizeMobile
}) => {
  // If search parameters have been defined as data attributes use those,
  // otherwise use the ones from the url query parameters.
  const {
    q: searchQuery,
    creator: creatorQuery,
    subject: subjectQuery
  } = getParams({ q, creator, subject });

  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  const pageSize = pageSizeGlobal({
    desktop: pageSizeDesktop,
    mobile: pageSizeMobile
  });

  const hasSearchQuery =
    searchQuery !== undefined ||
    creatorQuery !== undefined ||
    subjectQuery !== undefined;

  return (
    <div>
      {/* We still want to render the app, even if the search query is an empty string */}
      {hasSearchQuery && (
        <GuardedApp app="search-result">
          <SearchResult
            q={searchQuery}
            creator={creatorQuery}
            subject={subjectQuery}
            pageSize={pageSize}
          />
        </GuardedApp>
      )}
    </div>
  );
};

export default withConfig(
  withUrls(withText(withPageStatistics(SearchResultEntry)))
);
