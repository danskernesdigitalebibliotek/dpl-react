import * as React from "react";
import { FC } from "react";
import FacetLineFiltersSkeleton from "../../components/facet-line/FacetLineFiltersSkeleton";
import { useText } from "../../core/utils/text";
import CardListItemSkeleton from "../../components/card-item-list/card-list-item/card-list-item-skeleton";

export interface SearchResultSkeletonProps {
  q: string;
  dataCy?: string;
}

const SearchResultSkeleton: FC<SearchResultSkeletonProps> = ({
  q,
  dataCy = "search-header-skeleton"
}) => {
  const t = useText();
  return (
    <div className="card-list-page" data-cy={dataCy}>
      <h1 className="text-header-h2 mb-16 search-result-title text-loading">
        {t("showingResultsForText", { placeholders: { "@query": q } })}
      </h1>
      <FacetLineFiltersSkeleton />
      <ul className="card-list-page__list my-32">
        {/* Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens. */}
        {[...Array(5)].map(() => (
          <li>
            <CardListItemSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultSkeleton;
