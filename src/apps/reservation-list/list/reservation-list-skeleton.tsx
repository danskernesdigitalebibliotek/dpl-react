import React from "react";
import ReservationMaterialSkeleton from "../reservation-material/reservation-material-skeleton";

const ReservationListSkeleton: React.FC = () => {
  return (
    <>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-48" />
        <ReservationMaterialSkeleton />
      </ul>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-80" />
        <ReservationMaterialSkeleton />
      </ul>
      <ul className="ssc">
        <div className="ssc-head-line w-10 mx-32 mt-80" />
        <ReservationMaterialSkeleton />
      </ul>
    </>
  );
};

export default ReservationListSkeleton;
