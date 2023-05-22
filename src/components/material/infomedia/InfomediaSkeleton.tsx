import * as React from "react";
import { FC } from "react";

const InfomediaSkeleton: FC = () => {
  return (
    <div className="scc-wrapper">
      <div className="ssc-square mb-32" />
      <div className="ssc-head-line mbs" />
      <div className="ssc-head-line mbs" />
      <div className="ssc-head-line" />
    </div>
  );
};

export default InfomediaSkeleton;
