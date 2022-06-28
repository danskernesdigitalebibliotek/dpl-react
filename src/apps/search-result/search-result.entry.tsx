import * as React from "react";
import { getUrlQueryParam } from "../../core/utils/helpers";
import { getNumberOfResultItems } from "./helpers";
import SearchResult from "./search-result";

export interface ResultItemsProps {
  numberOfResultItemsDesktop?: number;
  numberOfResultItemsMobile?: number;
}

export interface SearchResultEntryProps extends ResultItemsProps {
  q?: string;
}

const SearchResultEntry: React.FC<SearchResultEntryProps> = ({
  q: attrQ,
  numberOfResultItemsDesktop: attrNumberOfResultItemsDesktop,
  numberOfResultItemsMobile: attrNumberOfResultItemsMobile
}) => {
  // If a q string has been defined as a data attribute use that
  // otherwise use the one from the url query parameter.
  const searchQuery = attrQ || (getUrlQueryParam() as string);
  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  const numberOfResultItems = getNumberOfResultItems({
    desktop: attrNumberOfResultItemsDesktop,
    mobile: attrNumberOfResultItemsMobile
  });

  return (
    <div>
      {searchQuery && (
        <SearchResult
          q={searchQuery}
          numberOfResultItems={numberOfResultItems as number}
        />
      )}
    </div>
  );
};

export default SearchResultEntry;
