import React from "react";
import { SearchWithPaginationQuery } from "../../core/dbc-gateway/generated/graphql";
import SearchResultListItem from "./search-result-list-item";

export interface SearchResultListProps {
  works: SearchWithPaginationQuery["search"]["works"];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ works }) => {
  let num = 0;
  return (
    <ul>
      {works.map((work) => {
        num += 1;
        return (
          <li key={work.id}>
            <SearchResultListItem title={`${num} - ${work.title}`} />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResultList;
