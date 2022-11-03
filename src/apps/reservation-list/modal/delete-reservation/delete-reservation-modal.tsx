import React, { FC } from "react";
import Modal from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import DeleteReservationContent from "./delete-reservation-content";

interface DeleteReservationModalProps {
  id: string;
  deleteReservation: () => void;
}

const DeleteReservationModal: FC<DeleteReservationModalProps> = ({
  id,
  deleteReservation
}) => {
  const t = useText();

  return (
    <Modal
      modalId={id}
      classNames="modal-cta"
      closeModalAriaLabelText={t("deleteReservationModalCloseModalText")}
      screenReaderModalDescriptionText={t(
        "deleteReservationModalAriaDescriptionText"
      )}
    >
      <DeleteReservationContent deleteReservation={deleteReservation} />
    </Modal>
  );
};

export default DeleteReservationModal;
