import React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal, getParams } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import AdvancedSearchResult from "./AdvancedSearchResult";

interface AdvancedSearchResultEntryTextProps {
  addToFavoritesAriaLabelText: string;
  alertErrorCloseText: string;
  alertErrorMessageText: string;
  byAuthorText: string;
  etAlText: string;
  inSeriesText: string;
  loadingText: string;
  numberDescriptionText: string;
  removeFromFavoritesAriaLabelText: string;
  resultPagerStatusText: string;
  noSearchResultText: string;
  showMoreText: string;
  showResultsText: string;
  showingResultsForWithoutQueryText: string;
  advancedSearchCopyToClipboardText: string;
}

interface AdvancedSearchResultEntryConfigProps {
  blacklistedAvailabilityBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  blacklistedSearchBranchesConfig?: string;
  branchesConfig: string;
}

export interface AdvancedSearchResultEntryProps
  extends GlobalUrlEntryPropsInterface,
    AdvancedSearchResultEntryConfigProps,
    AdvancedSearchResultEntryTextProps {
  q?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const AdvancedSearchResultEntry: React.FC<AdvancedSearchResultEntryProps> = ({
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
        <GuardedApp app="advanced-search-result">
          <AdvancedSearchResult q={searchQuery} pageSize={pageSize} />
        </GuardedApp>
      )}
    </div>
  );
};

export default withConfig(withUrls(withText(AdvancedSearchResultEntry)));
