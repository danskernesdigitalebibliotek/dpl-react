import React, { FC } from "react";
import { getStatusText } from "../../utils/helpers";
import { useText } from "../../../../core/utils/text";
import { LoanType } from "../../../../core/utils/types/loan-type";

interface StatusMessageProps {
  loan: LoanType;
  className: string;
}

const StatusMessage: FC<StatusMessageProps> = ({ loan, className }) => {
  const t = useText();
  const { loanType, renewalStatusList } = loan;

  return (
    <>
      {renewalStatusList &&
        renewalStatusList.map((text) => (
          <span className={className}>{getStatusText(text, t)}</span>
        ))}
      {loanType === "interLibraryLoan" && (
        <span className={className}>
          {t("groupModalRenewLoanDeniedInterLibraryLoanText")}
        </span>
      )}
    </>
  );
};

export default StatusMessage;
