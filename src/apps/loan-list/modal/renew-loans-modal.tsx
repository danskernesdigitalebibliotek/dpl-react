import React, { useState, useEffect } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import RenewLoansModalContent from "./renew-loans-modal-content";

interface RenewLoansModalProps {
  renewable: number | null;
  loansModal: LoanV2[] | undefined | null;
}

const RenewLoansModal: React.FC<RenewLoansModalProps> = ({
  renewable,
  loansModal
}) => {
  const t = useText();

  return (
    <Modal
      modalId="all"
      additionalClasses="modal-loan"
      closeModalAriaLabelText={t("LoanListCloseModalText")}
      screenReaderModalDescriptionText={t("LoanListModalDescriptionText")}
    >
      <div className="modal-loan__container">
        {loansModal && (
          <>
            <div className="modal-loan__header">
              <div>
                <h1 className="modal-loan__title text-header-h2">
                  {t("loanListToBeDeliveredModalText")}
                </h1>
              </div>
            </div>
            <RenewLoansModalContent
              loansModal={loansModal}
              renewable={renewable}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default RenewLoansModal;
