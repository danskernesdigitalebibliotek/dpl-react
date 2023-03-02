import React, { memo } from "react";
import { isDataEmpty, getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";
import SearchResultListItemSkeleton from "./search-result-list-item/search-result-list-item-skeleton";

export interface SearchResultListProps {
  resultItems: Work[];
  hitcount: number;
  isLoading: boolean;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  resultItems,
  hitcount,
  isLoading
}) => {
  return (
    <ul className="search-result-page__list my-32" data-cy="search-result-list">
      {/*
          Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens.
        */}
      {isLoading &&
        [...Array(5)].map(() => (
          <li>
            <SearchResultListItemSkeleton />
          </li>
        ))}
      {/* We fill out empty page without results a little bit to visually convey
      to the user that the results are empty. */}
      {(!hitcount || isDataEmpty(resultItems)) && <div className="my-112" />}
      {resultItems.map((item, i) => (
        <li key={item.workId}>
          <SearchResultListItem
            item={item}
            coverTint={getCoverTint(i)}
            resultNumber={i + 1}
          />
        </li>
      ))}
    </ul>
  );
};

export default memo(SearchResultList);
