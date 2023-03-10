import React, { useEffect, FC, useState } from "react";
import { Link } from "../../components/atoms/link";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import SearchResultListItemAdapter from "./materials/SearchResultListItemAdapter";

const FavoritesMaterialComponentList: FC = () => {
  const t = useText();
  const { goToYourFavoritesListUrl } = useUrls();
  // const { data } = useGetList("default");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const test = [
    `${870970 as number}-${"basis" as string}:${53063403 as number}`,
    `${870970 as number}-${"basis" as string}:${51363035 as number}`,
    `${870970 as number}-${"basis" as string}:${29630364 as number}`
  ];
  const [materials, setMaterials] = useState<Pid[]>([]);

  useEffect(() => setMaterials(test as unknown as any), []);
  return (
    <>
      <h2 className="recommender__title text-header-h2 recommender__title--left">
        {t("favoritesMaterialComponentTitleText")}
      </h2>
      <div className="recommender__buttons">
        <Link href={goToYourFavoritesListUrl}>
          {t("goToYourFavoritesListText")}
        </Link>
      </div>

      {materials.length > 0 && (
        <ul className="recommender__grid">
          {materials.map((pid) => (
            <SearchResultListItemAdapter key={pid} pid={pid} />
          ))}
        </ul>
      )}
    </>
  );
};

export default FavoritesMaterialComponentList;
