import React, { Fragment, memo, useEffect } from "react";
import { isEmpty } from "lodash";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import CardListItem from "./card-list-item/card-list-item";
import CardListItemSkeleton from "./card-list-item/card-list-item-skeleton";
import MaterialListItem from "./MaterialListItem";
import CardListInfoBox from "./CardListInfoBox";

export interface SearchResultListProps {
  resultItems: Work[];
  page: number;
  pageSize: number;
  // Info box props
  infoBoxTitle?: string;
  infoBoxHtml?: string;
  infoBoxButtonLabel?: string;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  resultItems,
  page,
  pageSize,
  infoBoxTitle,
  infoBoxHtml,
  infoBoxButtonLabel
}) => {
  const worksAreLoaded = !isEmpty(resultItems);
  const lastItemRef = React.useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (page > 0 && lastItemRef.current) {
      lastItemRef.current.focus();
    }
  }, [page, resultItems]);

  const searchInfoBoxIndex = pageSize + 1;

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

          if (i === searchInfoBoxIndex && infoBoxTitle && infoBoxHtml) {
            return (
              <Fragment key={item.workId}>
                <MaterialListItem className="content-list__item">
                  <CardListInfoBox
                    title={infoBoxTitle}
                    html={infoBoxHtml}
                    buttonLabel={infoBoxButtonLabel}
                  />
                </MaterialListItem>
                <MaterialListItem
                  className="content-list__item"
                  ref={isFirstNewItem ? lastItemRef : null}
                >
                  <CardListItem
                    item={item}
                    coverTint={getCoverTint(i)}
                    resultNumber={i + 1}
                  />
                </MaterialListItem>
              </Fragment>
            );
          }

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
