import React, { FC } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import { LoanType } from "../../../core/utils/types/loan-type";

interface ReservationGroupModalProps {
  loansModal: LoanType[] | null;
  pageSize: number;
  openLoanDetailsModal: (modalId: string) => void;
}

const ReservationGroupModal: FC<ReservationGroupModalProps> = ({
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
                <h2 className="modal-loan__title text-header-h2">
                  {t("groupModalHeaderText")}
                </h2>
              </div>
            </div>
            <ReservationGroupModalContent
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

export default ReservationGroupModal;
