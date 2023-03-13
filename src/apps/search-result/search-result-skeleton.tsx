import * as React from "react";
import { FC } from "react";
import FacetLineFiltersSkeleton from "../../components/facet-line/FacetLineFiltersSkeleton";
import SearchResultListItemSkeleton from "../../components/search-result-list/search-result-list-item/search-result-list-item-skeleton";
import { useText } from "../../core/utils/text";

export interface SearchResultSkeletonProps {
  q: string;
}

const SearchResultSkeleton: FC<SearchResultSkeletonProps> = ({ q }) => {
  const t = useText();
  return (
    <div className="search-result-page">
      <h1 className="text-header-h2 mb-16 search-result-title text-loading">
        {t("showingResultsForText", { placeholders: { "@query": q } })}
      </h1>
      <FacetLineFiltersSkeleton />
      <ul className="search-result-page__list my-32">
        {/* Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens. */}
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
