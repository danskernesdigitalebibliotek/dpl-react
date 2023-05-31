import React, { useState, useEffect, useRef } from "react";
import EmptyList from "../../components/empty-list/empty-list";
import usePager from "../../components/result-pager/use-pager";
import { useGetList } from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import CardListItemAdapter from "../../components/card-item-list/card-list-item/card-list-item-adapter";

export interface FavoritesListProps {
  pageSize: number;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ pageSize }) => {
  const t = useText();
  const { data } = useGetList("default");
  const [displayedMaterials, setDisplayedMaterials] = useState<Pid[]>([]);
  const [materials, setMaterials] = useState<Pid[]>([]);
  const { itemsShown, PagerComponent, page } = usePager({
    hitcount: materials.length,
    pageSize
  });
  const { collections } = (data as { collections: Pid[] }) || [];

  const lastItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (page > 0 && lastItemRef.current) {
      lastItemRef.current.focus();
    }
  }, [page, displayedMaterials]);

  useEffect(
    () => setDisplayedMaterials([...materials].splice(0, itemsShown)),
    [itemsShown, materials]
  );

  useEffect(() => {
    if (data && data.collections) {
      setMaterials(collections);
    }
  }, [collections, data]);

  return (
    <div className="card-list-page">
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
        <ul className="card-list-page__list my-32">
          {displayedMaterials.map((pid, i) => {
            const isFirstNewItem = i === page * pageSize;
            return (
              // We use a ref to focus the first item in the new page programmatically when pagination occurs.
              // Set tabIndex -1 to support this without allowing keyboard focus. We have just as appropriate
              // elements within the item suitable for keyboard focus.
              <li
                key={pid}
                tabIndex={-1}
                ref={isFirstNewItem ? lastItemRef : null}
              >
                <CardListItemAdapter key={pid} pid={pid} />
              </li>
            );
          })}
        </ul>
      )}
      {displayedMaterials.length === 0 && (
        <EmptyList emptyListText={t("favoritesListEmptyText")} />
      )}
      <PagerComponent />
    </div>
  );
};

export default FavoritesList;
