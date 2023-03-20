import React from "react";
import { Manifestation } from "../../core/utils/types/entities";
import DisclosureControllable from "../Disclosures/DisclosureControllable";
import InstantLoanSummary from "./InstantLoanSummary";
import { HoldingsV3 } from "../../core/fbs/model";
import InstantLoanBranch from "./InstantLoanBranch";

type InstantLoanProps = {
  manifestation: Manifestation;
  instantLoanBranches: HoldingsV3[];
};

const InstantLoan: React.FunctionComponent<InstantLoanProps> = ({
  manifestation,
  instantLoanBranches
}) => {
  const { pid, materialTypes } = manifestation;
  const materialType = materialTypes[0].specific;

  return (
    <DisclosureControllable
      id="instant-loan"
      detailsClassName="instant-loan pagefold-parent--small"
      summaryClassName="instant-loan-summary cursor-pointer p-24"
      summary={<InstantLoanSummary pid={pid} />}
    >
      <ul className="instant-loan-branches">
        {instantLoanBranches.map((branch) => {
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
