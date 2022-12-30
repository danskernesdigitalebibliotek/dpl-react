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
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import { isDigital } from "../../../loan-list/utils/helpers";

interface DeleteReservationModalProps {
  modalId: string;
  reservation: ReservationType;
}

const DeleteReservationModal: FC<DeleteReservationModalProps> = ({
  modalId,
  reservation
}) => {
  const t = useText();
  const queryClient = useQueryClient();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();
  const { close } = useModalButtonHandler();

  const physicalDeletion = useCallback(() => {
    if (!isDigital(reservation) && reservation.faust) {
      deletePhysicalReservation(
        {
          params: { reservationid: [Number(reservation.faust)] }
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
  }, [close, deletePhysicalReservation, modalId, queryClient, reservation]);

  const digitalDeletion = useCallback(() => {
    if (isDigital(reservation) && reservation.identifier) {
      deleteDigitalReservation(
        {
          identifier: reservation.identifier
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
  }, [close, deleteDigitalReservation, modalId, reservation]);

  if (!reservation) return null;

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
          isDigital(reservation) ? digitalDeletion : physicalDeletion
        }
      />
    </Modal>
  );
};

export default DeleteReservationModal;
