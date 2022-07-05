import React from "react";
import { useText } from "../../core/utils/text";

export interface SearchResultPagerProps {
  setPageHandler: () => void;
  searchItemsShown: number;
  hitcount: number;
}
function SearchResultPager({
  setPageHandler,
  searchItemsShown,
  hitcount
}: SearchResultPagerProps) {
  const t = useText();
  return (
    <div className="search-result-pager">
      <p className="text-small-caption search-result-pager__title">
        {t("showingText")} {searchItemsShown} {t("outOfText")} {hitcount}{" "}
        {t("resultsText")}
      </p>
      <button
        type="button"
        className="btn-primary btn-outline btn-medium arrow__hover--right-small"
        onClick={setPageHandler}
      >
        {/* TODO: Solve casing in CSS */}
        {t("showMoreText").toUpperCase()}
      </button>
    </div>
  );
}

export default SearchResultPager;
