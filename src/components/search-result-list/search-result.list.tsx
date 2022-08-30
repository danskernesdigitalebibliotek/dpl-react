import React from "react";
import { WorkSmallFragment } from "../../core/dbc-gateway/generated/graphql";
import { getCoverTint } from "../../core/utils/helpers/general";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: WorkSmallFragment[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  return (
    <ul className="search-result-page__list my-32">
      {resultItems.map((item, i) => (
        <li key={item.workId}>
          <SearchResultListItem item={item} coverTint={getCoverTint(i)} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResultList;
