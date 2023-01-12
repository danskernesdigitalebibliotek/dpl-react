import React from "react";
import { HoldingsV3 } from "../../core/fbs/model";
import AvailabilityLabel from "../availability-label/availability-label";

type InstantLoanBranchProps = {
  branch: HoldingsV3;
};

const InstantLoanBranch: React.FunctionComponent<InstantLoanBranchProps> = ({
  branch: {
    branch: { title }
  }
}) => {
  return (
    <div className="instant-loan-branch cursor-pointer px-24">
      <p className="text-header-h5">{title}</p>
      <AvailabilityLabel
        manifestText=""
        accessTypes={[]}
        faustIds={[]}
        isbn=""
      />
    </div>
  );
};

export default InstantLoanBranch;
