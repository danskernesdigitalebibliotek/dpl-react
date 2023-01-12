import React from "react";
import { AccessTypeCode } from "../../core/dbc-gateway/generated/graphql";
import { HoldingsV3 } from "../../core/fbs/model";
import AvailabilityLabel from "../availability-label/availability-label";
import { FaustId } from "../../core/utils/types/ids";

type InstantLoanBranchProps = {
  branch: HoldingsV3;
  materialType: string;
  accessTypesCodes: AccessTypeCode[];
  isbn: string;
  faustId: FaustId;
};

const InstantLoanBranch: React.FunctionComponent<InstantLoanBranchProps> = ({
  branch: {
    branch: { title },
    materials
  },
  faustId,
  accessTypesCodes,
  materialType,
  isbn
}) => {
  return (
    <div className="instant-loan-branch cursor-pointer px-24">
      <p className="text-header-h5">{title}</p>
      <AvailabilityLabel
        manifestText={materialType}
        accessTypes={accessTypesCodes}
        faustIds={[faustId]}
        isbn={isbn}
        quantity={materials.length}
      />
    </div>
  );
};

export default InstantLoanBranch;
