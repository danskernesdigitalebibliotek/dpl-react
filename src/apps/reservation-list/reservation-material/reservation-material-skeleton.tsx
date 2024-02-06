import React from "react";

const ReservationMaterialSkeleton: React.FC = () => {
  return (
    <li>
      <div className="list-reservation my-32 ssc">
        <div className="list-reservation__material">
          <div>
            <div className="ssc-square cover--size-small" />
          </div>
          <div className="list-reservation__information">
            <div className="ssc-head-line w-30 mb-24" />
            <div className="ssc-head-line w-100 mb-4" />
            <div className="ssc-line w-70 mb-4" />
            <div className="ssc-line w-60 mb-4" />
          </div>
        </div>
        <div className="list-reservation__status">
          <div className="list-reservation__counter">
            <div className="ssc-circle w-100" />
          </div>
          <div className="list-reservation__deadline">
            <div className="ssc-head-line w-30 mb-4" />
            <div className="ssc-line w-20 mb-4" />
            <div className="ssc-line w-20 mb-4" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReservationMaterialSkeleton;
