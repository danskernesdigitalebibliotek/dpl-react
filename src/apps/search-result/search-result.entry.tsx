import React from "react";
import GuardedApp from "../../components/guarded-app";
import { getParams } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import { getPageSize } from "./helpers";
import SearchResult from "./search-result";

interface SearchResultEntryTextProps {
  etAlText: string;
  byAuthorText: string;
  showMoreText: string;
  showingText: string;
  outOfText: string;
  resultsText: string;
  numberDescriptionText: string;
  inSeriesText: string;
  showingResultsForText: string;
}

interface SearchResultEntryUrlProps {
  searchUrl: string;
  materialUrl: string;
  authUrl: string;
}

export interface SearchResultEntryProps
  extends SearchResultEntryUrlProps,
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
  const pageSize = getPageSize({
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

export default withUrls(withText(SearchResultEntry));
