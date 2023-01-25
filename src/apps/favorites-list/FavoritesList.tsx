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
    // todo fix below
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (data && data.materials) {
      // todo fix below
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
          {t("favoritesListMaterialsText", {
            placeholders: { "@count": materials.length }
          })}
        </p>
      )}
      {displayedMaterials.length > 0 && (
        <ul className="search-result-page__list my-32">
          {displayedMaterials.map((pid) => (
            <li key={pid}>
              <SearchResultListItemAdapter key={pid} pid={pid} />
            </li>
          ))}
        </ul>
      )}
      {displayedMaterials.length === 0 && (
        <EmptyList emptyListText={t("favoritesListEmptyText")} />
      )}
      {PagerComponent}
    </div>
  );
};

export default FavoritesList;
