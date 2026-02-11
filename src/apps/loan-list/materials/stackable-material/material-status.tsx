import React, { FC, ReactNode } from "react";
import { isDigital, materialsAreStacked } from "../../utils/helpers";
import { LoanType } from "../../../../core/utils/types/loan-type";
import StatusCircle from "../utils/status-circle";
import StatusBadge from "../utils/status-badge";
import { useText } from "../../../../core/utils/text";
import ArrowButton from "../../../../components/Buttons/ArrowButton";
import {
  formatDate,
  formatDateTimeUtc
} from "../../../../core/utils/helpers/date";
import StatusMessage from "../selectable-material/StatusMessage";

interface MaterialStatusProps {
  loan: LoanType;
  children: ReactNode;
  additionalMaterials: number;
  openDetailsModal: (loan: LoanType) => void;
  openDueDateModal?: (dueDate: string) => void;
  arrowLabelledBy: string;
}

const MaterialStatus: FC<MaterialStatusProps> = ({
  loan,
  children,
  additionalMaterials,
  openDetailsModal,
  openDueDateModal,
  arrowLabelledBy
}) => {
  const t = useText();
  const { dueDate, loanDate } = loan;
  const isStacked = materialsAreStacked(additionalMaterials);

  const notificationClickEventHandler = () => {
    if (isStacked && openDueDateModal && dueDate) {
      openDueDateModal(dueDate);
    }
    if (!isStacked) {
      openDetailsModal(loan);
    }
  };

  if (!dueDate || !loanDate)
    return (
      <div className="list-reservation__status">
        <div className="list-reservation__counter" />
        <div className="list-reservation__deadline" />
        <ArrowButton
          arrowLabelledBy={arrowLabelledBy}
          cursorPointer
          clickEventHandler={notificationClickEventHandler}
        />
      </div>
    );

  return (
    <div className="list-reservation__status">
      <div className="list-reservation__counter">
        <StatusCircle loanDate={loanDate} dueDate={dueDate} />
      </div>
      <div>
        <div className="list-reservation__deadline">
          {dueDate && (
            <StatusBadge
              showBadgeWithDueDate
              badgeDate={dueDate}
              dangerText={t("loanListStatusBadgeDangerText")}
              warningText={t("loanListStatusBadgeWarningText")}
            />
          )}
          <p className="text-small-caption color-secondary-gray">
            {isDigital(loan)
              ? t("loanListToBeDeliveredDigitalMaterialText", {
                  placeholders: { "@date": formatDateTimeUtc(dueDate) }
                })
              : t("loanListToBeDeliveredText", {
                  placeholders: { "@date": formatDate(dueDate) }
                })}
          </p>
          {!isDigital(loan) && (
            <p className="text-small-caption color-secondary-gray mt-4">
              <StatusMessage
                className="mr-4"
                loanType={loan.loanType}
                renewalStatusList={loan.renewalStatusList}
              />
            </p>
          )}

          {children}
        </div>
      </div>
      <ArrowButton
        arrowLabelledBy={arrowLabelledBy}
        cursorPointer
        clickEventHandler={notificationClickEventHandler}
      />
    </div>
  );
};

export default MaterialStatus;
