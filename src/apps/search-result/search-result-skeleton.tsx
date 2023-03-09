import * as React from "react";
import { FC } from "react";
import FacetLineFiltersSkeleton from "../../components/facet-line/FacetLineFiltersSkeleton";
import SearchResultListItemSkeleton from "../../components/search-result-list/search-result-list-item/search-result-list-item-skeleton";

const SearchResultSkeleton: FC = () => {
  return (
    <div className="search-result-page">
      <div className="search-result-page__skeleton-headline--desktop">
        <div className="ssc mt-48">
          <div className="ssc-head-line mb" />
        </div>
      </div>
      <FacetLineFiltersSkeleton />
      <ul className="search-result-page__list my-32">
        {[...Array(5)].map(() => (
          <li>
            <SearchResultListItemSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultSkeleton;
