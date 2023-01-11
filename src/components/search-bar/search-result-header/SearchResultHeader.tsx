import clsx from "clsx";
import * as React from "react";
import { useText } from "../../../core/utils/text";

export interface SearchResultHeaderProps {
  hitcount: number;
  q: string;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  hitcount,
  q
}) => {
  const t = useText();
  const hasResults = Boolean(hitcount);
  const classes = clsx(["text-header-h2", "mb-16", "search-result-title"]);
  const status = hasResults ? hitcount : "...";

  return (
    <h1 className={classes} data-cy="search-result-title">
      {`${t("showingResultsForText")} “${q}” (${status})`}
    </h1>
  );
};

export default SearchResultHeader;
