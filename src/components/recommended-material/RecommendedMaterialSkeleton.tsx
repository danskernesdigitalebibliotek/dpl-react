import clsx from "clsx";
import React, { FC } from "react";

type RecommendedMaterialSkeletonType = {
  partOfGrid?: boolean;
};

const RecommendedMaterialSkeleton: FC<RecommendedMaterialSkeletonType> = ({
  partOfGrid
}) => {
  return (
    <div
      className={clsx("recommended-material", {
        "recommended-material--in-grid": partOfGrid
      })}
    >
      <div className="ssc-square w-30 recommended-material__icon" />
      <div className="ssc-square image-square" />
      <div className="ssc-text-wrapper">
        <div className="ssc-line" />
        <div className="ssc-line" />
      </div>
    </div>
  );
};

export default RecommendedMaterialSkeleton;
