import React, { FC } from "react";
import dayjs from "dayjs";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import { useText } from "../../../core/utils/text";
import RenewLoansModalContent from "./renew-loans-modal-content";
import WarningBar from "../materials/utils/warning-bar";
import { formatDate, materialIsOverdue } from "../utils/helpers";
import { LoanType } from "../../../core/utils/types/loan-type";

interface DueDateLoansModalProps {
  dueDate: string;
  loansModal: LoanType[];
  pageSize: number;
}

const DueDateLoansModal: FC<DueDateLoansModalProps> = ({
  dueDate,
  loansModal,
  pageSize
}) => {
  const t = useText();
  const aMonthAgo = dayjs().subtract(1, "month").format("YYYY-MM-DD");

  return (
    <Modal
      modalId={dueDate}
      classNames="modal-loan"
      closeModalAriaLabelText={t(
        "groupModalDueDateRenewLoanCloseModalAriaLabelText"
      )}
      screenReaderModalDescriptionText={t(
        "groupModalDueDateAriaDescriptionText"
      )}
    >
      <div className="modal-loan__container">
        {loansModal && (
          <>
            <div className="modal-loan__header">
              <div className="mr-32">
                {/* So, in the scenario where there are mixed loans, the design is challenged  */}
                {/* Therefore it was decided that the loandate for all the materials are "a month ago"  */}
                <StatusCircle loanDate={aMonthAgo} dueDate={dueDate} />
              </div>
              <div>
                <h1 className="modal-loan__title text-header-h2">
                  {t("groupModalDueDateHeaderText", {
                    placeholders: { "@date": formatDate(dueDate) }
                  })}
                </h1>
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
