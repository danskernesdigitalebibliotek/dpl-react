import React, { Fragment, memo, useEffect } from "react";
import clsx from "clsx";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import CardListItem from "../../components/card-item-list/card-list-item/card-list-item";
import CardListItemSkeleton from "../../components/card-item-list/card-list-item/card-list-item-skeleton";
import MaterialListItem from "../../components/card-item-list/MaterialListItem";
import CardListInfoBox, {
  CardListInfoBoxProps
} from "../../components/card-item-list/CardListInfoBox";

export interface SearchResultListProps {
  resultItems?: Work[];
  isLoading?: boolean;
  page: number;
  pageSize: number;
  infoBoxProps?: CardListInfoBoxProps;
  className?: string;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  resultItems,
  isLoading,
  page,
  pageSize,
  infoBoxProps,
  className
}) => {
  const lastItemRef = React.useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (page > 0 && lastItemRef.current) {
      lastItemRef.current.focus();
    }
  }, [page, resultItems]);

  const searchInfoBoxIndex = pageSize;

  return (
    <ul
      className={clsx("content-list", className)}
      data-cy="search-result-list"
    >
      {resultItems?.map((item, i) => {
        const isFirstNewItem = i === page * pageSize;

        if (
          i === searchInfoBoxIndex &&
          infoBoxProps?.title &&
          infoBoxProps?.html
        ) {
          return (
            <Fragment key={item.workId}>
              <MaterialListItem className="content-list__item content-list__item--info-box">
                <CardListInfoBox
                  title={infoBoxProps?.title}
                  html={infoBoxProps?.html}
                  buttonLabel={infoBoxProps?.buttonLabel}
                  buttonUrl={infoBoxProps?.buttonUrl}
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
        } else {
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
        }
      })}

      {isLoading && (
        <>
          {/*
            Show skeleton search result items if no data is available yet or
            while loading additional pages. We'll show 5 items which should
            cover most screens.
          */}
          {[...Array(5)].map((_, index) => (
            <li key={index} className="content-list__item">
              <CardListItemSkeleton />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default memo(SearchResultList);
