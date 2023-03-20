import React from "react";
import { HoldingsV3 } from "../../core/fbs/model";
import AvailabilityLabelVisual from "../availability-label/availability-label-visual";

type InstantLoanBranchProps = {
  branch: HoldingsV3;
  materialType: string;
};

const InstantLoanBranch: React.FunctionComponent<InstantLoanBranchProps> = ({
  branch: {
    branch: { title },
    materials
  },
  materialType
}) => {
  return (
    <div className="instant-loan-branch cursor-pointer px-24">
      <p className="text-header-h5">{title}</p>
      <AvailabilityLabelVisual
        manifestText={materialType}
        isAvailable
        quantity={materials.filter(({ available }) => available).length}
      />
    </div>
  );
};

export default InstantLoanBranch;
