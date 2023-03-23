import React from "react";
import { Manifestation } from "../../core/utils/types/entities";
import DisclosureControllable from "../Disclosures/DisclosureControllable";
import InstantLoanSummary from "./InstantLoanSummary";
import { HoldingsV3 } from "../../core/fbs/model";
import InstantLoanBranch from "./InstantLoanBranch";

type InstantLoanProps = {
  manifestation: Manifestation;
  instantLoanBranchHoldings: HoldingsV3[];
};

const InstantLoan: React.FunctionComponent<InstantLoanProps> = ({
  manifestation,
  instantLoanBranchHoldings
}) => {
  const { pid, materialTypes } = manifestation;
  const materialType = materialTypes[0].specific;

  return (
    <DisclosureControllable
      id="instant-loan"
      className="pagefold-parent--small disclosure--full-width"
      summary={
        <InstantLoanSummary
          pid={pid}
          className="instant-loan-summary cursor-pointer p-24"
        />
      }
      cyData="instant-loan"
    >
      <ul className="instant-loan-branches" data-cy="instant-loan-branches">
        {instantLoanBranchHoldings.map((branch) => {
          return (
            <li key={branch.branch.branchId}>
              <InstantLoanBranch branch={branch} materialType={materialType} />
            </li>
          );
        })}
      </ul>
    </DisclosureControllable>
  );
};

export default InstantLoan;
