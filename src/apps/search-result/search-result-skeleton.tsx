import * as React from "react";
import { FC } from "react";
import FacetLineFiltersSkeleton from "../../components/facet-line/FacetLineFiltersSkeleton";
import { useText } from "../../core/utils/text";
import CardListItemSkeleton from "../../components/card-item-list/card-list-item/card-list-item-skeleton";

export interface SearchResultSkeletonProps {
  q: string;
  dataCy?: string;
  hideFacetLine?: boolean;
}

const SearchResultSkeleton: FC<SearchResultSkeletonProps> = ({
  q,
  hideFacetLine = false
}) => {
  const t = useText();
  return (
    <>
      <h1 className="content-list-page__heading text-loading">
        {!hideFacetLine &&
          t("showingResultsForText", { placeholders: { "@query": q } })}
        {hideFacetLine && t("showingResultsForWithoutQueryText")}
      </h1>
      {!hideFacetLine && <FacetLineFiltersSkeleton />}
      <ul className="content-list">
        {/* Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens. */}
        {[...Array(5)].map((_, index) => (
          <li key={index} className="content-list__item">
            <CardListItemSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResultSkeleton;
