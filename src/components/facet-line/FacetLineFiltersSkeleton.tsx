import * as React from "react";
import { FC } from "react";

const FacetLineFiltersSkeleton: FC = () => {
  return (
    <>
      <div className="search-result-page__skeleton-facet-line--mobile">
        <div className="ssc mt-48">
          <div className="ssc-head-line mb" />
          <div className="ssc-head-line mb" />
          <div className="ssc-head-line mb" />
        </div>
      </div>
      <div className="search-result-page__skeleton-facet-line--desktop">
        <div className="ssc mt-48">
          <div className="ssc-head-line mb" />
        </div>
      </div>
    </>
  );
};

export default FacetLineFiltersSkeleton;
