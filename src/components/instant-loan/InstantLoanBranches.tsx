import React from "react";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
import { FaustId } from "../../core/utils/types/ids";
import InstantLoanBranch from "./InstantLoanBranch";

type InstantLoanBranchesProps = {
  faustId: FaustId;
  materialType: string;
  instantBooksThreshold?: number;
};

const InstantLoanBranches: React.FunctionComponent<
  InstantLoanBranchesProps
> = ({ instantBooksThreshold = 3, faustId, materialType }) => {
  const { data: holdings } = useGetHoldingsV3({
    recordid: [faustId]
  });

  if (!holdings) return null;
  const { holdings: branches } = holdings[0];

  return (
    <ul className="instant-loan-branches">
      {branches.map((branch) => {
        if (branch.materials.length >= instantBooksThreshold) {
          return (
            <li>
              <InstantLoanBranch branch={branch} materialType={materialType} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default InstantLoanBranches;
