import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import RenewLoansModalContent from "./renew-loans-modal-content";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import { LoanType } from "../../../core/utils/types/loan-type";

interface RenewLoansModalProps {
  loansModal: LoanType[];
}

const RenewLoansModal: FC<RenewLoansModalProps> = ({ loansModal }) => {
  const t = useText();

  return (
    <Modal
      modalId={modalIdsConf.allLoansId}
      classNames="modal-loan"
      closeModalAriaLabelText={t("renewLoanModalCloseModalText")}
      screenReaderModalDescriptionText={t("renewLoanModalDescriptionText")}
    >
      <div className="modal-loan__container">
        {loansModal && (
          <>
            <div className="modal-loan__header">
              <div>
                <h1 className="modal-loan__title text-header-h2">
                  {t("renewLoanModalHeaderText")}
                </h1>
              </div>
            </div>
            <RenewLoansModalContent
              loansModal={loansModal}
              buttonLabel={t("renewLoanModalButtonText")}
              checkboxLabel={t("renewLoanModalCheckboxText")}
              buttonBottomLabel={t("bottomRenewLoanModalButtonText")}
              checkboxBottomLabel={t("bottomRenewLoanModalCheckboxText")}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default RenewLoansModal;
