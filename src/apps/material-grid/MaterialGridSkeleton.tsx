import React from "react";
import RecommendedMaterialSkeleton from "../recommended-material/RecommendedMaterialSkeleton";

const MaterialGridAutomaticSkeleton: React.FC = () => {
  return (
    <div className="material-grid">
      <div className="material-grid__title ssc-line" />
      <div className="material-grid__items">
        {[...Array(4)].map(() => (
          <div className="material-grid__item">
            <RecommendedMaterialSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialGridAutomaticSkeleton;
