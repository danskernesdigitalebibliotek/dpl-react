import React, { FC } from "react";
import FavoritesMaterialComponentList from "./FavoritesMaterialComponentList";

const FavoritesMC: FC = () => {
  return (
    <div className="recommender recommender--bright">
      <FavoritesMaterialComponentList />
    </div>
  );
};

export default FavoritesMC;
