import React from "react";
import { getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: Work[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  const worksAreLoaded = Boolean(resultItems.length);

  return (
    <ul className="search-result-page__list my-32">
      {worksAreLoaded && (
        <>
          {resultItems.map((item, i) => (
            <li key={item.workId}>
              <SearchResultListItem item={item} coverTint={getCoverTint(i)} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default SearchResultList;
