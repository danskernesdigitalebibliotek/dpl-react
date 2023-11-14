import React, { FC } from "react";
import { useQueryClient } from "react-query";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import DeleteReservationContent from "./delete-reservation-content";
import {
  useDeleteReservations,
  getGetReservationsV2QueryKey
} from "../../../../core/fbs/fbs";
import {
  getGetV1UserReservationsQueryKey,
  useDeleteV1UserReservationsIdentifier
} from "../../../../core/publizon/publizon";
import {
  isDigitalReservation,
  isPhysicalReservation,
  reservationId,
  ReservationType
} from "../../../../core/utils/types/reservation-type";
import { getModalIds } from "../../../../core/utils/helpers/modal-helpers";

interface DeleteReservationModalProps {
  modalId: string;
  reservations: ReservationType[];
}

export function deleteReservationModalId(reservation: ReservationType): string {
  const prefix = String(getModalIds().reservationDelete);
  const fragment = reservationId(reservation);
  // TODO: Use constructModalId() instead of string concatenation.
  return `${prefix}${fragment}`;
}

const DeleteReservationModal: FC<DeleteReservationModalProps> = ({
  modalId,
  reservations
}) => {
  const t = useText();
  const queryClient = useQueryClient();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();
  const { closeAll: closeAllModals } = useModalButtonHandler();

  const removeSelectedReservations = () => {
    if (reservations.length > 0) {
      const reservationsToDelete = reservations
        .filter(isPhysicalReservation)
        .map(({ reservationIds }) => reservationIds)
        .flat();

      const digitalMaterialsToDelete = reservations
        .filter(isDigitalReservation)
        .map(({ identifier }) => identifier);

      if (reservationsToDelete.length > 0) {
        deletePhysicalReservation(
          {
            params: { reservationid: reservationsToDelete }
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(getGetReservationsV2QueryKey());
            }
          }
        );
      }

      digitalMaterialsToDelete.forEach((id) =>
        deleteDigitalReservation(
          {
            identifier: id
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
            }
          }
        )
      );

      closeAllModals();
    }
  };

  if (!reservations) return null;

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
        deleteReservation={() => removeSelectedReservations()}
        reservationsCount={reservations.length}
      />
    </Modal>
  );
};

export default DeleteReservationModal;
