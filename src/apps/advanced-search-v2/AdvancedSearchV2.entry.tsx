import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { MappArgs } from "../../core/storybook/mappArgs";
import withPageStatistics from "../../core/statistics/withPageStatistics";
import { AdvancedSortSelectArgs } from "../../core/storybook/AdvancedSortSelect";
import AdvancedSearchV2 from "./AdvancedSearchV2";
import { NuqsAdapter } from "nuqs/adapters/react";

interface AdvancedSearchEntryTextProps {
  byAuthorText: string;
  etAlText: string;
  inSeriesText: string;
  loadingText: string;
  numberDescriptionText: string;
  resultPagerStatusText: string;
  noSearchResultText: string;
  showMoreText: string;
  showingResultsForWithoutQueryText: string;
  advancedSearchLinkToThisSearchText: string;
  advancedSearchAllIndexesText: string;
  advancedSearchCreatorText: string;
  advancedSearchSubjectText: string;
  advancedSearchGenreText: string;
  advancedSearchLanguageText: string;
  advancedSearchDateText: string;
  advancedSearchMainCreatorText: string;
  advancedSearchMainTitleText: string;
  advancedSearchSourceText: string;
  advancedSearchDateFirstEditionText: string;
  advancedSearchDecimalDk5Text: string;
  advancedSearchTypeText: string;
  advancedSearchAudienceText: string;
  advancedSearchPublisherText: string;
  advancedSearchIdentifierText: string;
  advancedSearchAcSourceText: string;
  advancedSearchAddRowText: string;
  advancedSearchTitleText: string;
  advancedSearchPreviewHeadlineText: string;
  advancedSearchPreviewEmptyText: string;
  advancedSearchResetText: string;
  advancedSearchCopyStringText: string;
  advancedSearchEditCqlText: string;
  advancedSearchSearchButtonText: string;
  loadingResultsText: string;
  toAdvancedSearchButtonText: string;
  cqlSearchTitleText: string;
  copiedToClipboardText: string;
  copiedLinkToThisSearchText: string;
  clauseAndText: string;
  clauseOrText: string;
  clauseNotText: string;
  advancedSearchFilterMaterialTypeText: string;
  advancedSearchFilterLiteratureFormText: string;
  advancedSearchFilterAccessText: string;
  advancedSearchFilterBookText: string;
  advancedSearchFilterEbookText: string;
  advancedSearchFilterAudioBookText: string;
  advancedSearchFilterArticleText: string;
  advancedSearchFilterMovieText: string;
  advancedSearchFilterMusicText: string;
  advancedSearchFilterPhysicalText: string;
  advancedSearchFilterOnlineText: string;
  advancedSearchFilterFictionText: string;
  advancedSearchFilterNonFictionText: string;
  advancedSearchFilterHoldingStatusText: string;
  advancedSearchInputLabelText: string;
  advancedSearchInputPlaceholderText: string;
  advancedSearchRemoveRowText: string;
  advancedSearchFilterLocationText: string;
  advancedSearchFilterLocationDescriptionText: string;
  advancedSearchFilterSublocationText: string;
  advancedSearchFilterSublocationDescriptionText: string;
  advancedSearchFilterBranchText: string;
  advancedSearchFilterBranchDescriptionText: string;
  advancedSearchFilterDepartmentText: string;
  advancedSearchFilterDepartmentDescriptionText: string;
  advancedSearchFirstAccessionDateText: string;
  advancedSearchFirstAccessionDateOperatorText: string;
  advancedSearchFilterLaterThanText: string;
  advancedSearchFilterExactDateText: string;
  advancedSearchFilterEarlierThanText: string;
  advancedSearchFirstAccessionDateDescriptionText: string;
  advancedSearchFirstAccessionDateSpecifyDateText: string;
  cqlSearchExternalHelpLinkText: string;
  // NOTE: The following properties are newly added and not inherited from the previous advanced search implementation.
  advancedSearchSelectedText: string;
  advancedSearchAllText: string;
  advancedSearchPlaceholderDefaultText: string;
  advancedSearchPlaceholderTitleText: string;
  advancedSearchPlaceholderCreatorText: string;
  advancedSearchPlaceholderSubjectText: string;
  advancedSearchPlaceholderPublisherText: string;
  advancedSearchPlaceholderDk5Text: string;
  advancedSearchPlaceholderIsbnText: string;
  advancedSearchPlaceholderSeriesText: string;
  advancedSearchPlaceholderFictionalCharacterText: string;
  advancedSearchPlaceholderHostPublicationText: string;
  advancedSearchLabelDefaultText: string;
  advancedSearchLabelTitleText: string;
  advancedSearchLabelCreatorText: string;
  advancedSearchLabelSubjectText: string;
  advancedSearchLabelPublisherText: string;
  advancedSearchLabelDk5Text: string;
  advancedSearchLabelIsbnText: string;
  advancedSearchLabelSeriesText: string;
  advancedSearchLabelFictionalCharacterText: string;
  advancedSearchLabelHostPublicationText: string;
  advancedSearchEditSearchText: string;
}

interface AdvancedSearchEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
}

export interface AdvancedSearchEntryProps
  extends GlobalUrlEntryPropsInterface,
    GlobalEntryTextProps,
    AdvancedSearchEntryConfigProps,
    AdvancedSearchEntryTextProps,
    MappArgs,
    AdvancedSortSelectArgs {
  pageSizeDesktop: number;
  pageSizeMobile: number;
  showingMaterialsText: string;
}

const AdvancedSearchEntry: React.FC<AdvancedSearchEntryProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  const pageSize = pageSizeGlobal({
    desktop: pageSizeDesktop,
    mobile: pageSizeMobile
  });

  return (
    <div>
      <GuardedApp app="advanced-search">
        <NuqsAdapter>
          <AdvancedSearchV2 />
        </NuqsAdapter>
      </GuardedApp>
    </div>
  );
};

export default withConfig(
  withUrls(withText(withPageStatistics(AdvancedSearchEntry)))
);
