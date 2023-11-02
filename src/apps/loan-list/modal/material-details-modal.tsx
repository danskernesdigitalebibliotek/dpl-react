import React, { FC, ReactNode } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  constructModalId,
  getModalIds
} from "../../../core/utils/helpers/general";
import { LoanType } from "../../../core/utils/types/loan-type";

interface MaterialDetailsModalProps {
  modalId?: string;
  children: ReactNode;
}

export function reservationDetailsModalId(
  reservation: ReservationType
): string {
  const prefix = String(getModalIds().reservationDetails);
  const fragment = String(reservation.identifier || reservation.faust);
  return constructModalId(prefix, [fragment]);
}

export function loanDetailsModalId(loan: LoanType) {
  const prefix = String(getModalIds().loanDetails);
  const fragment = String(loan.loanId);
  return constructModalId(prefix, [fragment]);
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
  modalId,
  children
}) => {
  const t = useText();

  if (!modalId) {
    return null;
  }

  return (
    <Modal
      modalId={modalId}
      classNames="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalAriaDescriptionText"
      )}
    >
      {children}
    </Modal>
  );
};

export default MaterialDetailsModal;
