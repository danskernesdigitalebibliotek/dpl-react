import React, { FC } from "react";
import { useQueryClient } from "react-query";
import Modal from "../../../../core/utils/modal";
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
  useRequestWithStatus,
  useRequestsWithStatus
} from "../../../../core/utils/useRequestWithStatus";
import { getDeleteReservationStatus, getReservationsToDelete } from "./helper";
import ModalMessage from "../../../../components/message/modal-message/ModalMessage";

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

  const { physical: reservationsPhysical, digital: reservationsDigital } =
    getReservationsToDelete(reservations);

  const {
    handler: removePhysicalReservationsHandler,
    requestStatus: statusRemovingPhysicalReservations,
    setRequestStatus: setStatusRemovingPhysicalReservations
  } = useRequestWithStatus<typeof deletePhysicalReservation, void | null>({
    operation: deletePhysicalReservation,
    request: {
      params: { reservationid: reservationsPhysical }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getGetReservationsV2QueryKey());
    }
  });

  const {
    handler: removeDigitallReservationsHandler,
    requestStatus: statusRemovingDigitallReservations,
    setRequestStatus: setStatusRemovingDigitalReservations
  } = useRequestsWithStatus<typeof deleteDigitalReservation, void | null>({
    operation: deleteDigitalReservation,
    requests: reservationsDigital
      ? reservationsDigital.map((id) => ({
          identifier: String(id)
        }))
      : [],
    onSuccess: () => {
      queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
    }
  });

  const removeSelectedReservationsHandler = () => {
    if (reservationsPhysical.length) {
      removePhysicalReservationsHandler();
    }
    if (reservationsDigital.length) {
      removeDigitallReservationsHandler();
    }
  };

  const deletionStatus = getDeleteReservationStatus({
    physical: statusRemovingPhysicalReservations,
    digital: statusRemovingDigitallReservations
  });

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
      {["idle", "pending"].includes(deletionStatus) && (
        <DeleteReservationContent
          deleteReservation={() => removeSelectedReservationsHandler()}
          reservationsCount={reservations.length}
          deletionStatus={deletionStatus}
        />
      )}
      {deletionStatus === "success" && (
        <ModalMessage
          title={t("deleteReservationModalSuccessTitleText")}
          subTitle={t("deleteReservationModalSuccessStatusText")}
          ctaButton={{
            text: t("deleteReservationModalButtonText"),
            closeAllModals: true,
            callback: () => {
              setStatusRemovingPhysicalReservations("idle");
              setStatusRemovingDigitalReservations("idle");
            }
          }}
        />
      )}

      {deletionStatus === "error" && (
        <ModalMessage
          title={t("deleteReservationModalErrorsTitleText")}
          subTitle={t("deleteReservationModalErrorsStatusText")}
          ctaButton={{
            text: t("deleteReservationModalButtonText"),
            closeAllModals: true,
            callback: () => {
              setStatusRemovingPhysicalReservations("idle");
              setStatusRemovingDigitalReservations("idle");
            }
          }}
        />
      )}
    </Modal>
  );
};

export default DeleteReservationModal;
