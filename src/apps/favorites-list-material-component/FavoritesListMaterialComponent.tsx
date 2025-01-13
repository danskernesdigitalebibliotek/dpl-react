import React, { useEffect, FC, useState } from "react";
import { useText } from "../../core/utils/text";
import { useGetList } from "../../core/material-list-api/material-list";
import { Pid } from "../../core/utils/types/ids";
import SimpleMaterialAdapter from "../../components/simple-material/SimpleMaterialAdapter";
import Link from "../../components/atoms/links/Link";
import { useUrls } from "../../core/utils/url";

const FavoritesListMaterialComponent: FC = () => {
  const t = useText();
  const [materials, setMaterials] = useState<Pid[]>([]);
  const u = useUrls();
  const favoritesListMaterialComponentGoToListUrl = u(
    "favoritesListMaterialComponentGoToListUrl"
  );

  const { data } = useGetList("default");
  const { collections } = (data as { collections: Pid[] }) || [];

  useEffect(() => {
    if (data && data.collections) {
      setMaterials(collections.slice(0, 4));
    }
  }, [collections, data]);

  if (materials.length === 0) return null;

  return (
    <div className="recommender recommender--bright">
      <h2 className="recommender__left-title text-header-h1">
        {t("favoritesListMaterialComponentTitleText")}
      </h2>
      <div className="recommender__buttons">
        <Link
          href={favoritesListMaterialComponentGoToListUrl}
          className="button-link button-link--bright button-link--selected"
        >
          {t("favoritesListMaterialComponentGoToListText")}
        </Link>
      </div>
      <ul className="recommender__grid">
        {materials.map((pid) => (
          <SimpleMaterialAdapter
            key={pid}
            app="favorites-list-mc"
            bright
            pid={pid}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavoritesListMaterialComponent;
