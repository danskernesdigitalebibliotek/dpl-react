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
import AdvancedSearchV2 from "./AdvancedSearchV2";
import { NuqsAdapter } from "nuqs/adapters/react";

interface AdvancedSearchEntryTextProps {
  byAuthorText: string;
  inSeriesText: string;
  loadingText: string;
  resultPagerStatusText: string;
  noSearchResultText: string;
  showMoreText: string;
  advancedSearchAddRowText: string;
  advancedSearchSearchButtonText: string;
  loadingResultsText: string;
  clauseAndText: string;
  clauseOrText: string;
  clauseNotText: string;
  advancedSearchRemoveRowText: string;
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
  advancedSearchLabelDefaultText: string;
  advancedSearchLabelTitleText: string;
  advancedSearchLabelCreatorText: string;
  advancedSearchLabelSubjectText: string;
  advancedSearchLabelPublisherText: string;
  advancedSearchLabelDk5Text: string;
  advancedSearchLabelIsbnText: string;
  advancedSearchLabelSeriesText: string;
  advancedSearchEditSearchText: string;
  advancedSearchOnShelfText: string;
  advancedSearchOnShelfDescriptionText: string;
  advancedSearchOnlyExtraTitlesText: string;
  advancedSearchOnlyExtraTitlesDescriptionText: string;
  advancedSearchShowAllText: string;
  advancedSearchShowLessText: string;
  advancedSearchResetText: string;
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
    MappArgs {
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
          <AdvancedSearchV2 pageSize={pageSize} />
        </NuqsAdapter>
      </GuardedApp>
    </div>
  );
};

export default withConfig(
  withUrls(withText(withPageStatistics(AdvancedSearchEntry)))
);
