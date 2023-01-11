import React from "react";
import { Manifestation } from "../../core/utils/types/entities";
import InstantLoanBranch from "./InstantLoanBranch";

type InstantLoanBranchesProps = {
  manifestation: Manifestation;
};

const InstantLoanBranches: React.FunctionComponent<
  InstantLoanBranchesProps
> = ({ manifestation }) => {
  return (
    <ul className="instant-loan-branches">
      <li>
        <InstantLoanBranch
          manifestation={manifestation}
          branch="Østerbro Bibliotek"
        />
      </li>
    </ul>
  );
};

export default InstantLoanBranches;
