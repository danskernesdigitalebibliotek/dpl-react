import React from "react";
import { Manifestation } from "../../core/utils/types/entities";
import InstantLoanBranches from "./InstantLoanBranches";
import DisclosureControllable from "../Disclosures/DisclosureControllable";
import InstantLoanSummary from "./InstantLoanSummary";

type InstantLoanProps = {
  manifestation: Manifestation;
};

const InstantLoan: React.FunctionComponent<InstantLoanProps> = ({
  manifestation
}) => {
  const { pid } = manifestation;

  return (
    <DisclosureControllable
      id="instant-loan"
      detailsClassName="instant-loan pagefold-parent--small"
      summaryClassName="instant-loan-summary cursor-pointer p-24"
      summary={<InstantLoanSummary pid={pid} />}
    >
      <InstantLoanBranches manifestation={manifestation} />
    </DisclosureControllable>
  );
};

export default InstantLoan;
