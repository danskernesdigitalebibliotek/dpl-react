import React, { useState, useEffect } from "react";
import { useGetList } from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import SearchResultListItemAdapter from "./materials/SearchResultListItemAdapter";

export interface FavoritesListProps {
  pageSize: number;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ pageSize }) => {
  const t = useText();
  const { data } = useGetList("default");
  const [materials, setMaterials] = useState<Pid[]>([
    "870970-basis:51374975",
    "870970-basis:53063403",
    "870970-basis:51363035",
    "870970-basis:29630364"
  ]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="search-result-page">
      <h1 className="text-header-h2 mb-16 search-result-title">
        {t("favoritesListHeaderText")}
      </h1>
      <p className="text-small-caption my-32">
        {/* todo string interpolation */}
        {materials.length} {t("favoritesListMaterialsText")}
      </p>
      <ul className="search-result-page__list my-32">
        {materials.map((pid) => {
          return (
            <li key={pid}>
              <SearchResultListItemAdapter key={pid} pid={pid} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoritesList;
