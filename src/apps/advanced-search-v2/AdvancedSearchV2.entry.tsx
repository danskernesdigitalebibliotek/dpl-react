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
import { AdvancedSearchV2Args } from "../../core/storybook/advancedSearchV2Args";

interface AdvancedSearchEntryTextProps {
  byAuthorText: string;
  inSeriesText: string;
  loadingText: string;
  resultPagerStatusText: string;
  noSearchResultText: string;
  showMoreText: string;
  loadingResultsText: string;
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
    AdvancedSearchV2Args {
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
