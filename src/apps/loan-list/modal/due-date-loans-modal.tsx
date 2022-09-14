import React, { FC } from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import { useText } from "../../../core/utils/text";
import RenewLoansModalContent from "./renew-loans-modal-content";
import WarningBar from "../materials/utils/warning-bar";
import { materialIsOverdue } from "../utils/helpers";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";

interface DueDateLoansModalProps {
  dueDate: string;
  loansModal: LoanMetaDataType[];
}

const DueDateLoansModal: FC<DueDateLoansModalProps> = ({
  dueDate,
  loansModal
}) => {
  const t = useText();

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
                {/* todo this status circle being discussed på fddf, as we dont know which numbers to use for the full circle, and the designers are somewhat vague about the idea  */}
                <StatusCircle loanDate="03-08-2022" dueDate={dueDate} />
              </div>
              <div>
                <h1 className="modal-loan__title text-header-h2">
                  {t("dueDateRenewLoanModalHeaderText")}{" "}
                  {dayjs(dueDate).locale(localeDa).format("DD MMMM YYYY")}
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
