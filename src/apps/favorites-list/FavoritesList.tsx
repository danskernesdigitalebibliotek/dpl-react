import React, { useState, useEffect, useRef } from "react";
import EmptyList from "../../components/empty-list/empty-list";
import usePager from "../../components/result-pager/use-pager";
import { useGetList } from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import CardListItemAdapter from "../../components/card-item-list/card-list-item/card-list-item-adapter";
import MaterialListItem from "../../components/card-item-list/MaterialListItem";
import CardListItemSkeleton from "../../components/card-item-list/card-list-item/card-list-item-skeleton";
import ContentListPage from "../../components/content-list/ContentListPage";
import ContentList from "../../components/content-list/ContentList";

export interface FavoritesListProps {
  pageSize: number;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ pageSize }) => {
  const t = useText();
  const { data, isLoading } = useGetList("default");
  const [displayedMaterials, setDisplayedMaterials] = useState<WorkId[]>([]);
  const [materials, setMaterials] = useState<WorkId[]>([]);
  const { itemsShown, PagerComponent, page } = usePager({
    hitcount: materials.length,
    pageSize
  });
  const { collections } = (data as { collections: WorkId[] }) || [];

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
      <div className="ssc content-list">
        <div className="ssc-line w-10 mt-32">&nbsp;</div>
      </div>
      <ContentList>
        {/*
          We'll show 5 skeleton cards which should cover most screens.
        */}
        {[...Array(5)].map((_, index) => (
          <li key={index} className="content-list__item">
            <CardListItemSkeleton />
          </li>
        ))}
      </ContentList>
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
      <ContentList>
        {displayedMaterials.map((id, i) => {
          const isFirstNewItem = i === page * pageSize;
          return (
            <MaterialListItem
              className="content-list__item"
              key={id}
              ref={isFirstNewItem ? lastItemRef : null}
            >
              <CardListItemAdapter id={id} />
            </MaterialListItem>
          );
        })}
      </ContentList>
    ) : (
      <EmptyList
        classNames="mt-24"
        emptyListText={t("favoritesListEmptyText")}
      />
    );

  return (
    <ContentListPage title={t("favoritesListHeaderText")}>
      {isLoading ? (
        skeletonList
      ) : (
        <>
          {materialsCount}
          {renderContent()}
          <PagerComponent />
        </>
      )}
    </ContentListPage>
  );
};

export default FavoritesList;
