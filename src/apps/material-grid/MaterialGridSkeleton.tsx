import React, { FC } from "react";
import RecommendedMaterialSkeleton from "../recommended-material/RecommendedMaterialSkeleton";

type MaterialGridSkeletonType = {
  title?: string;
};

const MaterialGridSkeleton: FC<MaterialGridSkeletonType> = ({ title }) => {
  return (
    <div className="material-grid">
      {title && <div className="material-grid__title">{title}</div>}
      <div className="material-grid__items">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="material-grid__item">
            <RecommendedMaterialSkeleton partOfGrid />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialGridSkeleton;
