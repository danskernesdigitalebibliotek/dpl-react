import * as React from "react";
import { getUrlQueryParam } from "../../core/utils/helpers";
import { getPageSize } from "./helpers";
import SearchResult from "./search-result";

export interface SearchResultEntryProps {
  q?: string;
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const SearchResultEntry: React.FC<SearchResultEntryProps> = ({
  q: attrQ,
  pageSizeDesktop: attrPageSizeDesktop,
  pageSizeMobile: attrPageSizeMobile
}) => {
  // If a q string has been defined as a data attribute use that
  // otherwise use the one from the url query parameter.
  const searchQuery = attrQ || (getUrlQueryParam() as string);
  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  const pageSize = getPageSize({
    desktop: attrPageSizeDesktop,
    mobile: attrPageSizeMobile
  });

  return (
    <div>
      {searchQuery && (
        <SearchResult q={searchQuery} pageSize={pageSize as number} />
      )}
    </div>
  );
};

export default SearchResultEntry;
