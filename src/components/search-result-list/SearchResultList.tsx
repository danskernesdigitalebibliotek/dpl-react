import React, { memo, useEffect } from "react";
import { dataIsNotEmpty, getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";
import SearchResultListItemSkeleton from "./search-result-list-item/search-result-list-item-skeleton";

export interface SearchResultListProps {
  resultItems: Work[];
  page: number;
  pageSize: number;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  resultItems,
  page,
  pageSize
}) => {
  const worksAreLoaded = dataIsNotEmpty(resultItems);
  const lastItemRef = React.useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (page > 0 && lastItemRef.current) {
      lastItemRef.current.focus();
    }
  }, [page, resultItems]);

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
        resultItems.map((item, i) => {
          const isFirstNewItem = i === page * pageSize;
          return (
            <li
              key={item.workId}
              ref={isFirstNewItem ? lastItemRef : null}
              // Because we're using a ref to focus the first item in the new page when pagination occurs.
              // we need to remove focus ( set tabIndex -1), so that it can be set programmatically.
              tabIndex={-1}
            >
              <SearchResultListItem
                item={item}
                coverTint={getCoverTint(i)}
                resultNumber={i + 1}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default memo(SearchResultList);
