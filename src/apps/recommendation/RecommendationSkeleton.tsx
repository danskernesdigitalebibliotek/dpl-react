import React from "react";
import clsx from "clsx";
import RecommendedMaterialSkeleton from "../../components/recommended-material/RecommendedMaterialSkeleton";

export type RecommendationSkeletonProps = {
  positionImageRight?: boolean;
};

const RecommendationSkeleton: React.FC<RecommendationSkeletonProps> = ({
  positionImageRight
}) => {
  return (
    <div
      className={clsx(
        "recommendation",
        positionImageRight && "recommendation--reversed"
      )}
    >
      <RecommendedMaterialSkeleton />
      <div className="recommendation__texts ssc-text-wrapper">
        <div className="recommendation__title ssc-text-wrapper">
          <div className="ssc-line ssc-header" />
          <div className="ssc-line ssc-header" />
        </div>
        <div className="recommendation__description">
          <div className="ssc-line" />
          <div className="ssc-line" />
          <div className="ssc-line" />
          <div className="ssc-line" />
        </div>
      </div>
    </div>
  );
};

export default RecommendationSkeleton;
