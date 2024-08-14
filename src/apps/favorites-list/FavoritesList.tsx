import React, { useState, useEffect, useRef } from "react";
import EmptyList from "../../components/empty-list/empty-list";
import usePager from "../../components/result-pager/use-pager";
import { useGetList } from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import CardListItemAdapter from "../../components/card-item-list/card-list-item/card-list-item-adapter";
import MaterialListItem from "../../components/card-item-list/MaterialListItem";
import CardListItemSkeleton from "../../components/card-item-list/card-list-item/card-list-item-skeleton";

export interface FavoritesListProps {
  pageSize: number;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ pageSize }) => {
  const t = useText();
  const { data, isLoading } = useGetList("default");
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

  const skeletonList = (
    <>
      <div className="ssc">
        <div className="ssc-line w-10 my-32">&nbsp;</div>
      </div>
      <ul className="content-list">
        {/*
          We'll show 5 skeleton cards which should cover most screens.
        */}
        {[...Array(5)].map(() => (
          <li className="content-list__item">
            <CardListItemSkeleton />
          </li>
        ))}
      </ul>
    </>
  );

  const materialsCount = materials.length > 0 && (
    <p className="content-list-page__subheading">
      {t("favoritesListMaterialsText", {
        placeholders: { "@count": materials.length }
      })}
    </p>
  );

  const renderContent = () =>
    displayedMaterials.length > 0 ? (
      <ul className="content-list">
        {displayedMaterials.map((pid, i) => {
          const isFirstNewItem = i === page * pageSize;
          return (
            <MaterialListItem
              className="content-list__item"
              key={pid}
              ref={isFirstNewItem ? lastItemRef : null}
            >
              <CardListItemAdapter pid={pid} />
            </MaterialListItem>
          );
        })}
      </ul>
    ) : (
      <EmptyList
        classNames="mt-24"
        emptyListText={t("favoritesListEmptyText")}
      />
    );

  return (
    <div className="content-list-page">
      <h1 className="content-list-page__heading">
        {t("favoritesListHeaderText")}
      </h1>
      {isLoading ? (
        skeletonList
      ) : (
        <>
          {materialsCount}
          {renderContent()}
          <PagerComponent />
        </>
      )}
    </div>
  );
};

export default FavoritesList;
