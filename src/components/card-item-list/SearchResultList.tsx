import React, { memo, useEffect } from "react";
import { isEmpty } from "lodash";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import CardListItem from "./card-list-item/card-list-item";
import CardListItemSkeleton from "./card-list-item/card-list-item-skeleton";
import MaterialListItem from "./MaterialListItem";
import CardListInfoBox from "./CardListInfoBox";
import { useConfig } from "../../core/utils/config";

export interface SearchResultListProps {
  resultItems: Work[];
  page: number;
  pageSize: number;
}

type InfoBox = {
  title?: string;
  content: { value?: string };
  buttonText?: string;
};

const SearchResultList: React.FC<SearchResultListProps> = ({
  resultItems,
  page,
  pageSize
}) => {
  const worksAreLoaded = !isEmpty(resultItems);
  const lastItemRef = React.useRef<HTMLLIElement>(null);
  const config = useConfig();

  // Get search info box data from config
  const {
    title: infoBoxTitle,
    content: { value: infoBoxHtml },
    buttonText: infoBoxButtonText
  } = config<InfoBox>("searchInfoboxConfig", {
    transformer: "jsonParse"
  });

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

          if (i === searchInfoBoxIndex) {
            return (
              <>
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
                <div className="content-list__item">
                  <CardListInfoBox
                    title={infoBoxTitle}
                    html={infoBoxHtml}
                    buttonText={infoBoxButtonText}
                  />
                </div>
              </>
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
