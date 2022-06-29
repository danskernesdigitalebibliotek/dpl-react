import React from "react";
import { WorkSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: WorkSimpleFragment[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  return (
    <ul className="search-result-page__list my-32">
      {resultItems.map((item) => {
        return (
          <li key={item.id}>
            <SearchResultListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResultList;
