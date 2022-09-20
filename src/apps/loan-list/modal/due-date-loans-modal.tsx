import React, { FC } from "react";
import dayjs from "dayjs";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import { useText } from "../../../core/utils/text";
import RenewLoansModalContent from "./renew-loans-modal-content";
import WarningBar from "../materials/utils/warning-bar";
import { formatDate, materialIsOverdue } from "../utils/helpers";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

interface DueDateLoansModalProps {
  dueDate: string;
  loansModal: MetaDataType<LoanMetaDataType>[];
}

const DueDateLoansModal: FC<DueDateLoansModalProps> = ({
  dueDate,
  loansModal
}) => {
  const t = useText();
  const aMonthAgo = dayjs().subtract(7, "month").format("YYYY-MM-DD");

  return (
    <Modal
      modalId={dueDate}
      additionalClasses="modal-loan"
      closeModalAriaLabelText={t("dueDateRenewLoanCloseModalText")}
      screenReaderModalDescriptionText={t(
        "dueDateRenewLoanModalDescriptionText"
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
                  {t("dueDateRenewLoanModalHeaderText")} {formatDate(dueDate)}
                </h1>
              </div>
            </div>
            {materialIsOverdue(dueDate) && (
              <div className="modal-details__warning">
                <WarningBar
                  linkText={t("dueDateLinkToPageWithFeesText")}
                  overdueText={t("dueDateWarningLoanOverdueText")}
                />
              </div>
            )}
            <RenewLoansModalContent
              loansModal={loansModal}
              buttonLabel={t("dueDateRenewLoanModalButtonText")}
              checkboxLabel={t("dueDateRenewLoanModalCheckboxText")}
              checkboxBottomLabel={t("bottomDueDateRenewLoanModalCheckboxText")}
              buttonBottomLabel={t("bottomDueDateRenewLoanModalButtonText")}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default DueDateLoansModal;
