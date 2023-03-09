import React, { useEffect, FC, useState } from "react";
import usePager from "../../components/result-pager/use-pager";
import { useGetList } from "../../core/material-list-api/material-list";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import SearchResultListItemAdapter from "./materials/SearchResultListItemAdapter";

export interface FavoritesMaterialComponentListProps {
  pageSize: number;
}

const FavoritesMaterialComponentList: FC<
  FavoritesMaterialComponentListProps
> = ({ pageSize }) => {
  const t = useText();
  const { data } = useGetList("default");
  const [recommendView, setRecommendView] = useState<boolean>(true);
  const [displayedMaterials, setDisplayedMaterials] = useState<Pid[]>([]);
  const [materials, setMaterials] = useState<Pid[]>([]);
  const { itemsShown } = usePager(materials.length, pageSize);

  useEffect(
    () => setDisplayedMaterials([...materials].splice(0, itemsShown)),
    [itemsShown, materials]
  );
  useEffect(() => {
    if (data && data.collections) {
      setMaterials(data.collections as Pid[]);
    }
  }, [data]);
  console.log(displayedMaterials);
  return (
    <>
      <h2 className="recommender__title text-header-h1 recommender__title--left">
        {t("favoritesMaterialComponentTitleText")}
      </h2>
      <div className="recommender__buttons">
        <button
          onClick={() => setRecommendView(false)}
          type="button"
          className={`button-link ${
            !recommendView ? "button-link--selected" : ""
          }`}
        >
          {t("goToYourFavoritesListText")}
        </button>
      </div>
      <ul className="recommender__grid">
        {displayedMaterials.length > 0 && (
          <ul className="search-result-page__list my-32">
            {displayedMaterials.map((pid) => (
              <li key={pid}>
                <SearchResultListItemAdapter key={pid} pid={pid} />
              </li>
            ))}
          </ul>
        )}
      </ul>
    </>
  );
};

export default FavoritesMaterialComponentList;
