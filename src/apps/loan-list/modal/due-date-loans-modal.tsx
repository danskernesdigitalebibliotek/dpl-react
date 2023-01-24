import React, { FC } from "react";
import dayjs from "dayjs";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import { useText } from "../../../core/utils/text";
import RenewLoansModalContent from "./renew-loans-modal-content";
import WarningBar from "../materials/utils/warning-bar";
import { formatDate } from "../utils/helpers";
import {
  getModalIds,
  materialIsOverdue
} from "../../../core/utils/helpers/general";
import { LoanType } from "../../../core/utils/types/loan-type";

interface DueDateLoansModalProps {
  dueDate?: string | null;
  loansModal?: LoanType[];
  pageSize: number;
  openLoanDetailsModal: (modalId: string) => void;
  hideStatusCircle?: boolean;
  customHeader?: string;
}

const DueDateLoansModal: FC<DueDateLoansModalProps> = ({
  dueDate,
  loansModal,
  openLoanDetailsModal,
  pageSize,
  hideStatusCircle,
  customHeader
}) => {
  const t = useText();
  const aMonthAgo = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const { dueDateModal } = getModalIds();
  return (
    <Modal
      modalId={`${dueDateModal}${dueDate}`}
      classNames="modal-loan"
      closeModalAriaLabelText={t(
        "groupModalDueDateRenewLoanCloseModalAriaLabelText"
      )}
      screenReaderModalDescriptionText={t(
        "groupModalDueDateAriaDescriptionText"
      )}
    >
      <div className="modal-loan__container">
        {loansModal && dueDate && (
          <>
            <div className="modal-loan__header">
              {!hideStatusCircle && (
                <div className="mr-32">
                  {/* So, in the scenario where there are mixed loans, the design is challenged  */}
                  {/* Therefore it was decided that the loandate for all the materials are "a month ago"  */}
                  <StatusCircle loanDate={aMonthAgo} dueDate={dueDate} />
                </div>
              )}
              <div>
                {customHeader && (
                  <h1 className="modal-loan__title text-header-h2">
                    {customHeader}
                  </h1>
                )}
                {!customHeader && (
                  <h1 className="modal-loan__title text-header-h2">
                    {t("groupModalDueDateHeaderText", {
                      placeholders: { "@date": formatDate(dueDate) }
                    })}
                  </h1>
                )}
                <div className="text-body-large">
                  {t("groupModalReturnLibraryText")}
                </div>
              </div>
            </div>
            {materialIsOverdue(dueDate) && (
              <div className="modal-details__warning">
                <WarningBar
                  linkText={t("groupModalDueDateLinkToPageWithFeesText")}
                  overdueText={t("groupModalDueDateWarningLoanOverdueText")}
                />
              </div>
            )}
            <RenewLoansModalContent
              openLoanDetailsModal={openLoanDetailsModal}
              pageSize={pageSize}
              loansModal={loansModal}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default DueDateLoansModal;
