import React, { useState, useEffect } from "react";
import EmptyList from "../../components/empty-list/empty-list";
import usePager from "../../components/result-pager/use-pager";
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
  const [displayedMaterials, setDisplayedMaterials] = useState<Pid[]>([]);
  const [materials, setMaterials] = useState([]);
  const { itemsShown, PagerComponent } = usePager(materials.length, pageSize);

  useEffect(() => {
    setDisplayedMaterials([...materials].splice(0, itemsShown));
  }, [itemsShown, materials]);

  useEffect(() => {
    if (data && data.materials) {
      setMaterials(data.materials);
    }
  }, [data]);

  return (
    <div className="search-result-page">
      <h1 className="text-header-h2 mb-16 search-result-title">
        {t("favoritesListHeaderText")}
      </h1>
      {materials.length > 0 && (
        <p className="text-small-caption my-32">
          {/* todo string interpolation */}
          {materials.length} {t("favoritesListMaterialsText")}
        </p>
      )}
      <ul className="search-result-page__list my-32">
        {displayedMaterials.length > 0 &&
          displayedMaterials.map((pid) => {
            return (
              <li key={pid}>
                <SearchResultListItemAdapter key={pid} pid={pid} />
              </li>
            );
          })}
      </ul>
      {displayedMaterials.length === 0 && <EmptyList emptyListText="todo" />}
      {PagerComponent}
    </div>
  );
};

export default FavoritesList;
