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
    <>
      <div>
        Viser {searchItemsShown} ud af {hitcount} resultater
      </div>
      <div>
        <button type="button" onClick={setPageHandler}>
          VIS FLERE
        </button>
      </div>
    </>
  );
}

export default SearchResultPager;
