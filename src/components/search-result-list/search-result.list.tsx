import React from "react";
import { WorkSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { MaterialProps } from "../material/material";
import SearchResultListItem from "./search-result-list-item/search-result-list-item";

export interface SearchResultListProps {
  resultItems: WorkSimpleFragment[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ resultItems }) => {
  const tints: MaterialProps["tint"][] = ["20", "40", "60", "80", "120"];

  return (
    <ul className="search-result-page__list my-32">
      {resultItems.map((item, i) => {
        const tintKey = i % tints.length;
        const coverTint = tints[tintKey];

        return (
          <li key={item.id}>
            <SearchResultListItem item={item} coverTint={coverTint} />
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResultList;
