import * as React from "react";
import { FC } from "react";
import { useDeleteReservations } from "../../../../core/fbs/fbs";
import { useDeleteV1UserReservationsIdentifier } from "../../../../core/publizon/publizon";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { getReservationType } from "../../util/helpers";
import ReadyToLoanModalContent from "./ready-to-loan-modal-content";

export interface ReadyToLoanModalProps {
  modalId?: string;
}

const ReadyToLoanModal: FC<ReadyToLoanModalProps> = ({ modalId = "" }) => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();

  const removeSelectedReservations = (
    selectedReservations: {
      [key: string]: string;
    }[]
  ) => {
    const selectedReservationsKeys = Object.keys(selectedReservations);
    const selectedReservationsValues = Object.values(selectedReservations);
    if (selectedReservationsKeys.length > 0) {
      selectedReservationsKeys.map((reservation) => {
        const index = selectedReservationsKeys.indexOf(reservation);
        const reservationToDelete = selectedReservationsValues[index];
        const reservationType = getReservationType(reservation);
        switch (reservationType) {
          case "physical":
            deletePhysicalReservation({
              params: { reservationid: [Number(reservationToDelete)] }
            });
            break;
          case "digital":
            deleteDigitalReservation({
              identifier: String(selectedReservationsValues)
            });
            break;
          default:
            return false;
        }
        close(modalId);
        return false;
      });
    }
  };

  if (!modalId) {
    return null;
  }
  return (
    <Modal
      modalId={modalId}
      classNames="modal-details"
      closeModalAriaLabelText={t("readyToLoanCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t(
        "readyForLoanModalAriaDescriptionText"
      )}
    >
      <ReadyToLoanModalContent
        removeSelectedReservations={removeSelectedReservations}
      />
    </Modal>
  );
};

export default ReadyToLoanModal;
