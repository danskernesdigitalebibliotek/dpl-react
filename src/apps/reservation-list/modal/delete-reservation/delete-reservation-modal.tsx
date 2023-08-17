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
import { isFaust, isIdentifier } from "../../../dashboard/util/helpers";

interface DeleteReservationModalProps {
  modalId: string;
  reservations: string[];
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
  const { close } = useModalButtonHandler();

  const removeSelectedReservations = () => {
    if (reservations.length > 0) {
      const reservationsToDelete = reservations
        .map((id) => Number(isFaust(id)))
        .filter((id) => id !== 0);
      const digitalMaterialsToDelete = reservations
        .map((id) => isIdentifier(id))
        .filter((id) => id !== null);
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

      digitalMaterialsToDelete.forEach((id) =>
        deleteDigitalReservation(
          {
            identifier: String(id)
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
            }
          }
        )
      );
      close(modalId as string);
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
