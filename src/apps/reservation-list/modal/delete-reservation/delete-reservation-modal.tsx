import React, { FC, useCallback } from "react";
import { useQueryClient } from "react-query";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import DeleteReservationContent from "./delete-reservation-content";
import {
  useDeleteReservations,
  getGetReservationsV2QueryKey
} from "../../../../core/fbs/fbs";
import { useDeleteV1UserReservationsIdentifier } from "../../../../core/publizon/publizon";

interface DeleteReservationModalProps {
  modalId: string;
  digitalReservationId: string | null;
  physicalReservationId: number | null;
}

const DeleteReservationModal: FC<DeleteReservationModalProps> = ({
  modalId,
  digitalReservationId,
  physicalReservationId
}) => {
  const t = useText();
  const queryClient = useQueryClient();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();
  const { close } = useModalButtonHandler();

  const physicalDeletion = useCallback(() => {
    if (physicalReservationId) {
      deletePhysicalReservation(
        {
          params: { reservationid: [physicalReservationId] }
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(getGetReservationsV2QueryKey());
            close(modalId);
          },
          // todo error handling, missing in figma
          onError: () => {
            close(modalId);
          }
        }
      );
    }
  }, [
    close,
    deletePhysicalReservation,
    modalId,
    physicalReservationId,
    queryClient
  ]);

  const digitalDeletion = useCallback(() => {
    if (digitalReservationId) {
      deleteDigitalReservation(
        {
          identifier: digitalReservationId
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSuccess: (result) => {
            close(modalId);
          },
          // todo error handling, missing in figma
          onError: () => {
            close(modalId);
          }
        }
      );
    }
  }, [close, deleteDigitalReservation, digitalReservationId, modalId]);

  if (!physicalReservationId && !digitalReservationId) return null;

  return (
    <Modal
      modalId={modalId}
      classNames="modal-cta"
      closeModalAriaLabelText={t("deleteReservationModalCloseModalText")}
      screenReaderModalDescriptionText={t(
        "deleteReservationModalAriaDescriptionText"
      )}
    >
      <DeleteReservationContent
        deleteReservation={
          physicalReservationId ? physicalDeletion : digitalDeletion
        }
      />
    </Modal>
  );
};

export default DeleteReservationModal;
