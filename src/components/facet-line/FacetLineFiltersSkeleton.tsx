import * as React from "react";
import { FC } from "react";

const FacetLineFiltersSkeleton: FC = () => {
  return (
    <>
      <div className="card-list-page__skeleton-facet-line--mobile">
        <div className="ssc mt-48">
          <div className="ssc-head-line mb" />
          <div className="ssc-head-line mb" />
          <div className="ssc-head-line mb" />
        </div>
      </div>
      <div className="card-list-page__skeleton-facet-line--desktop">
        <div className="ssc mt-48">
          <div className="ssc-head-line mb" />
        </div>
      </div>
    </>
  );
};

export default FacetLineFiltersSkeleton;
