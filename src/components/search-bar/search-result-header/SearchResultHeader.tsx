import clsx from "clsx";
import React, { memo } from "react";
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
  const classes = clsx(["text-header-h2", "mb-16", "search-result-title"]);

  return (
    <h1 className={classes} data-cy="search-result-header">
      {`${t("showingResultsForText", {
        placeholders: { "@query": q }
      })} (${hitcount})`}
    </h1>
  );
};

export default memo(SearchResultHeader);
