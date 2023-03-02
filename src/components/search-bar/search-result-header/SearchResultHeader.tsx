import clsx from "clsx";
import React, { memo } from "react";
import { useText } from "../../../core/utils/text";

export interface SearchResultHeaderProps {
  hitcount: number;
  q: string;
  isLoading: boolean;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  hitcount,
  q,
  isLoading
}) => {
  const t = useText();
  const hasResults = Boolean(hitcount);
  const classes = clsx(["text-header-h2", "mb-16", "search-result-title"], {
    "text-loading": isLoading
  });

  return (
    <h1 className={classes} data-cy="search-result-title">
      {hasResults && `${t("showingResultsForText")} “${q}” (${hitcount})`}
      {!hasResults && t("noSearchResultText")}
    </h1>
  );
};

export default memo(SearchResultHeader);
