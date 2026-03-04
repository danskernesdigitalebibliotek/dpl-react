import * as React from "react";
import { FC } from "react";
import FacetLineFiltersSkeleton from "../../components/facet-line/FacetLineFiltersSkeleton";
import CardListItemSkeleton from "../../components/card-item-list/card-list-item/card-list-item-skeleton";
import ContentList from "../../components/content-list/ContentList";

const SearchResultSkeleton: FC = () => {
  return (
    <>
      <FacetLineFiltersSkeleton />
      <ContentList>
        {/* Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens. */}
        {[...Array(5)].map((_, index) => (
          <li key={index} className="content-list__item">
            <CardListItemSkeleton />
          </li>
        ))}
      </ContentList>
    </>
  );
};

export default SearchResultSkeleton;
