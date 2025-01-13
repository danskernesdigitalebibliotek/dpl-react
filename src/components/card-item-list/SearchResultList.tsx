import React, { memo, useEffect } from "react";
import { isEmpty } from "lodash";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import CardListItem from "./card-list-item/card-list-item";
import CardListItemSkeleton from "./card-list-item/card-list-item-skeleton";
import MaterialListItem from "./MaterialListItem";

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
    <ul className="content-list" data-cy="search-result-list">
      {/*
          Show skeleton search result items if no data is available yet.
          We'll show 5 items which should cover most screens.
        */}
      {!worksAreLoaded &&
        [...Array(5)].map((_, index) => (
          <li key={index} className="content-list__item">
            <CardListItemSkeleton />
          </li>
        ))}
      {worksAreLoaded &&
        resultItems.map((item, i) => {
          const isFirstNewItem = i === page * pageSize;
          return (
            <MaterialListItem
              className="content-list__item"
              key={item.workId}
              ref={isFirstNewItem ? lastItemRef : null}
            >
              <CardListItem
                item={item}
                coverTint={getCoverTint(i)}
                resultNumber={i + 1}
              />
            </MaterialListItem>
          );
        })}
    </ul>
  );
};

export default memo(SearchResultList);
