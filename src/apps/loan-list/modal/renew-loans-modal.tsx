import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import RenewLoansModalContent from "./renew-loans-modal-content";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import { LoanType } from "../../../core/utils/types/loan-type";

interface RenewLoansModalProps {
  loansModal: LoanType[] | null;
  pageSize: number;
  openLoanDetailsModal: (modalId: string) => void;
}

const RenewLoansModal: FC<RenewLoansModalProps> = ({
  loansModal,
  pageSize,
  openLoanDetailsModal
}) => {
  const t = useText();

  return (
    <Modal
      modalId={modalIdsConf.allLoansId}
      classNames="modal-loan"
      closeModalAriaLabelText={t("groupModalCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t("groupModalAriaDescriptionText")}
    >
      <div className="modal-loan__container">
        {loansModal && (
          <>
            <div className="modal-loan__header">
              <div>
                <h1 className="modal-loan__title text-header-h2">
                  {t("groupModalHeaderText")}
                </h1>
              </div>
            </div>
            <RenewLoansModalContent
              pageSize={pageSize}
              loansModal={loansModal}
              openLoanDetailsModal={openLoanDetailsModal}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default RenewLoansModal;
