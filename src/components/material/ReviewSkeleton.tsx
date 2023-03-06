import * as React from "react";
import { FC } from "react";

const ReviewSkeleton: FC = () => {
  return (
    <div className="ssc my-48 mx-32">
      <div className="ssc-head-line w-40 my-8" />
      <div className="ssc-line my-8" />
      <div className="ssc-line my-8" />
    </div>
  );
};

export default ReviewSkeleton;
