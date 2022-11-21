import React from "react";
import { createJSXkey, getCoverTint } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: Work[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  return (
    <ul className="search-result-page__list my-16">
      {resultItems.map((item, i) => (
        <li key={createJSXkey([item.workId, i])}>
          <SearchResultListItem item={item} coverTint={getCoverTint(i)} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResultList;
