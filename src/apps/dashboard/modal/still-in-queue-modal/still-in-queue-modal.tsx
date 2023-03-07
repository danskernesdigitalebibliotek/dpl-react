import * as React from "react";
import { FC } from "react";
import { useDeleteReservations } from "../../../../core/fbs/fbs";
import { useDeleteV1UserReservationsIdentifier } from "../../../../core/publizon/publizon";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { getReservationType } from "../../util/helpers";
import StillInQueueModalContent from "./still-in-queue-modal-content";

export interface StillInQueueModalProps {
  modalId?: string;
}

const StillInQueueModal: FC<StillInQueueModalProps> = ({ modalId = "" }) => {
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
            deletePhysicalReservation(
              {
                params: { reservationid: [Number(reservationToDelete)] }
              },
              {
                // todo error handling, missing in figma
                onError: () => {
                  close(modalId);
                }
              }
            );
            break;
          case "digital":
            deleteDigitalReservation(
              {
                identifier: String(selectedReservationsValues)
              },
              {
                // todo error handling, missing in figma
                onError: () => {
                  close(modalId);
                }
              }
            );
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
      closeModalAriaLabelText={t("materialDetailsCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalAriaDescriptionText"
      )}
    >
      <StillInQueueModalContent
        removeReservationsClickEvent={removeSelectedReservations}
      />
    </Modal>
  );
};

export default StillInQueueModal;
