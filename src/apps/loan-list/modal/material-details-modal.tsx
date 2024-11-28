//  Todo: Fix infinite loop in MaterialDetailsModal
import React, { FC, ReactNode } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { loanId, LoanType } from "../../../core/utils/types/loan-type";
import { getModalIds } from "../../../core/utils/helpers/modal-helpers";

interface MaterialDetailsModalProps {
  modalId?: string;
  children: ReactNode;
}

export function reservationDetailsModalId(
  reservation: ReservationType
): string {
  const prefix = String(getModalIds().reservationDetails);
  const fragment = String(reservation.identifier || reservation.faust);
  // TODO: Use constructModalId() instead of string concatenation.
  // This should done once we get around the manually added suffix in
  // src/core/configuration/modal-ids.json.
  return `${prefix}${fragment}`;
}

export function loanDetailsModalId(loan: LoanType): string {
  const prefix = String(getModalIds().loanDetails);
  const fragment = loanId(loan);
  // TODO: Use constructModalId() instead of string concatenation.
  return `${prefix}${fragment}`;
}

const MaterialDetailsModal: FC<MaterialDetailsModalProps> = ({
  modalId,
  children
}) => {
  const t = useText();
  // console.log("Rendering MaterialDetailsModal:");

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
