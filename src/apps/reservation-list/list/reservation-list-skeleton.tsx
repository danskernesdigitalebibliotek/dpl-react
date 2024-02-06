import React from "react";
import ListMaterialSkeleton from "../reservation-material/list-material-skeleton";

const ReservationListSkeleton: React.FC = () => {
  return (
    <>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-48" />
        <ListMaterialSkeleton />
      </ul>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-80" />
        <ListMaterialSkeleton />
      </ul>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-80" />
        <ListMaterialSkeleton />
      </ul>
    </>
  );
};

export default ReservationListSkeleton;
