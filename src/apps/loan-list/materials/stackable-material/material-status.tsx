import React, { FC, ReactNode } from "react";
import { formatDate, isDigital } from "../../utils/helpers";
import { LoanType } from "../../../../core/utils/types/loan-type";
import StatusCircle from "../utils/status-circle";
import StatusBadge from "../utils/status-badge";
import { useText } from "../../../../core/utils/text";
import Arrow from "../../../../components/atoms/icons/arrow/arrow";

interface MaterialStatusProps {
  loan: LoanType;
  children: ReactNode;
}

const MaterialStatus: FC<MaterialStatusProps> = ({ loan, children }) => {
  const t = useText();
  const { dueDate, loanDate } = loan;

  if (!dueDate || !loanDate) return <div />;

  return (
    <div className="list-reservation__status">
      <div className="list-reservation__counter">
        <StatusCircle loanDate={loanDate} dueDate={dueDate} />
      </div>
      <div>
        <div className="list-reservation__deadline">
          <StatusBadge
            dueDate={dueDate}
            dangerText={t("loanListStatusBadgeDangerText")}
            warningText={t("loanListStatusBadgeWarningText")}
          />
          <p className="text-small-caption color-secondary-gray">
            {isDigital(loan)
              ? t("loanListToBeDeliveredDigitalMaterialText", {
                  placeholders: { "@date": formatDate(dueDate) }
                })
              : t("loanListToBeDeliveredText", {
                  placeholders: { "@date": formatDate(dueDate) }
                })}
          </p>
          {children}
        </div>
      </div>
      <Arrow />
    </div>
  );
};

export default MaterialStatus;
