import React from "react";
import ListMaterialSkeleton from "../../reservation-list/reservation-material/list-material-skeleton";

const LoanListSkeleton: React.FC = () => {
  return (
    <>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-64 mb-35" />
        <ListMaterialSkeleton />
        <ListMaterialSkeleton />
      </ul>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-64 mb-35" />
        <ListMaterialSkeleton />
        <ListMaterialSkeleton />
      </ul>
    </>
  );
};

export default LoanListSkeleton;
