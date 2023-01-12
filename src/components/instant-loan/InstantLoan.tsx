import React from "react";
import { Manifestation } from "../../core/utils/types/entities";
import InstantLoanBranches from "./InstantLoanBranches";
import DisclosureControllable from "../Disclosures/DisclosureControllable";
import InstantLoanSummary from "./InstantLoanSummary";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";

type InstantLoanProps = {
  manifestation: Manifestation;
};

const InstantLoan: React.FunctionComponent<InstantLoanProps> = ({
  manifestation
}) => {
  const { pid } = manifestation;
  const faustId = convertPostIdToFaustId(pid);

  return (
    <DisclosureControllable
      id="instant-loan"
      detailsClassName="instant-loan pagefold-parent--small"
      summaryClassName="instant-loan-summary cursor-pointer p-24"
      summary={<InstantLoanSummary pid={pid} />}
    >
      <InstantLoanBranches faustId={faustId} />
    </DisclosureControllable>
  );
};

export default InstantLoan;
