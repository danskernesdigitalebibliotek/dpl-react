import React, { memo, useEffect } from "react";
import { isEmpty } from "lodash";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import SearchResultListItem from "./card-list-item/card-list-item";
import SearchResultListItemSkeleton from "./card-list-item/card-list-item-skeleton";

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
  const worksAreLoaded = !isEmpty(resultItems);
  const lastItemRef = React.useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (page > 0 && lastItemRef.current) {
      lastItemRef.current.focus();
    }
  }, [page, resultItems]);

  return (
    <ul className="card-list-page__list my-32" data-cy="search-result-list">
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
              // We use a ref to focus the first item in the new page programmatically when pagination occurs.
              // Set tabIndex -1 to support this without allowing keyboard focus. We have just as appropriate
              // elements within the item suitable for keyboard focus.
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
