import React, { FC } from "react";
import { getStatusText } from "../../utils/helpers";
import { useText } from "../../../../core/utils/text";

interface StatusMessageProps {
  className: string;
  loanType: string | null;
  renewalStatusList: string[];
}

const StatusMessage: FC<StatusMessageProps> = ({
  className,
  loanType,
  renewalStatusList
}) => {
  const t = useText();

  return (
    <>
      {renewalStatusList &&
        renewalStatusList.map((text, index) => {
          if (text !== "deniedOtherReason") {
            return (
              <span key={index} className={className}>
                {getStatusText(text, t)}
              </span>
            );
          }
          return null;
        })}
      {loanType === "interLibraryLoan" && (
        <span className={className}>
          {t("groupModalRenewLoanDeniedInterLibraryLoanText")}
        </span>
      )}
    </>
  );
};

export default StatusMessage;
