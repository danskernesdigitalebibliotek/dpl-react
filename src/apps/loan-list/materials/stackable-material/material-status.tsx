import React, { FC, ReactNode, useCallback } from "react";
import {
  formatDate,
  isDigital,
  materialsAreStacked
} from "../../utils/helpers";
import { LoanType } from "../../../../core/utils/types/loan-type";
import StatusCircle from "../utils/status-circle";
import StatusBadge from "../utils/status-badge";
import { useText } from "../../../../core/utils/text";
import ArrowButton from "../../../../components/Buttons/ArrowButton";

interface MaterialStatusProps {
  loan: LoanType;
  children: ReactNode;
  additionalMaterials: number;
  openDetailsModal: (modalId: string) => void;
  openDueDateModal?: (dueDate: string) => void;
}

const MaterialStatus: FC<MaterialStatusProps> = ({
  loan,
  children,
  additionalMaterials,
  openDetailsModal,
  openDueDateModal
}) => {
  const t = useText();
  const { dueDate, loanDate, faust, identifier } = loan;
  const isStacked = materialsAreStacked(additionalMaterials);

  const notificationClickEventHandler = useCallback(() => {
    if (isStacked && openDueDateModal && dueDate) {
      openDueDateModal(dueDate);
    }
    if (!isStacked && faust) {
      openDetailsModal(faust);
    }
    if (!isStacked && identifier) {
      openDetailsModal(identifier);
    }
  }, [
    isStacked,
    openDueDateModal,
    dueDate,
    openDetailsModal,
    faust,
    identifier
  ]);
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
      <ArrowButton
        cursorPointer
        clickEventHandler={notificationClickEventHandler}
      />
    </div>
  );
};

export default MaterialStatus;
