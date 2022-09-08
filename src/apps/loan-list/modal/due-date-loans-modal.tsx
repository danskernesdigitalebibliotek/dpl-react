import React, { FC } from "react";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import Modal from "../../../core/utils/modal";
import StatusCircle from "../materials/utils/status-circle";
import { useText } from "../../../core/utils/text";
import { LoanV2 } from "../../../core/fbs/model";
import RenewLoansModalContent from "./renew-loans-modal-content";
import WarningBar from "../materials/utils/warning-bar";
import { materialIsOverdue } from "../helpers";

interface DueDateLoansModalProps {
  dueDate: string;
  renewable: number | null;
  loansModal: LoanV2[] | undefined | null;
}

const DueDateLoansModal: FC<DueDateLoansModalProps> = ({
  dueDate,
  renewable,
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
              renewable={renewable}
              buttonLabel={t("dueDateRenewLoanModalButtonText")}
              checkboxLabel={t("dueDateRenewLoanModalCheckboxText")}
              buttonBottomLabel={t("bottomDueDateRenewLoanModalCheckboxText")}
              checkboxBottomLabel={t("bottomDueDateRenewLoanModalButtonText")}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default DueDateLoansModal;
