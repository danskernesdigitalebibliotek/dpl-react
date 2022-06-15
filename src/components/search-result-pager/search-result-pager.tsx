import React from "react";

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
  return (
    <div className="search-result-pager">
      <p className="text-small-caption search-result-pager__title">
        Viser {searchItemsShown} ud af {hitcount} resultater
      </p>
      <button
        type="button"
        className="btn-primary btn-outline btn-medium arrow__hover--right-small"
        onClick={setPageHandler}
      >
        VIS FLERE
      </button>
    </div>
  );
}

export default SearchResultPager;
