import React from "react";

const SearchResultListItemSkeleton: React.FC = () => {
  return (
    <article className="search-result-item ssc">
      <div className="ssc-square">&nbsp;</div>
      <div className="ssc-wrapper">
        <div className="ssc-head-line w-60 mb" />
        <div className="ssc-line w-60 mbs">&nbsp;</div>
        <div className="ssc-line w-60 mbs">&nbsp;</div>
      </div>
    </article>
  );
};

export default SearchResultListItemSkeleton;
