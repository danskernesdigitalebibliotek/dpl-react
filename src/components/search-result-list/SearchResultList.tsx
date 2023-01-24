import React from "react";
import { dataIsNotEmpty, getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";
import SearchResultListItemSkeleton from "./search-result-list-item/search-result-list-item-skeleton";

export interface SearchResultListProps {
  resultItems: Work[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  const worksAreLoaded = dataIsNotEmpty(resultItems);

  return (
    <ul className="search-result-page__list my-32" data-cy="search-result-list">
      {/*
          Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens.
        */}
      {!worksAreLoaded &&
        [...Array(5)].map(() => (
          <li>
            <SearchResultListItemSkeleton />
          </li>
        ))}
      {worksAreLoaded &&
        resultItems.map((item, i) => (
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

export default SearchResultList;
