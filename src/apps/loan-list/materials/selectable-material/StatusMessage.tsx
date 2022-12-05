import React, { FC } from "react";
import { getStatusText } from "../../utils/helpers";
import { useText } from "../../../../core/utils/text";
import { LoanType } from "../../../../core/utils/types/loan-type";

interface StatusMessageProps {
  loan: LoanType;
}

const StatusMessage: FC<StatusMessageProps> = ({ loan }) => {
  const t = useText();
  const { loanType, renewalStatusList } = loan;

  return (
    <>
      {renewalStatusList &&
        renewalStatusList.map((text) => (
          <span className="text-small-caption">{getStatusText(text, t)}</span>
        ))}
      {loanType === "interLibraryLoan" && (
        <span className="text-small-caption">
          {t("groupModalRenewLoanDeniedInterLibraryLoanText")}
        </span>
      )}
    </>
  );
};

export default StatusMessage;
