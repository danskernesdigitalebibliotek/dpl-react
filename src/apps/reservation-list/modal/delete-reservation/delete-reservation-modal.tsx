import React, { FC, useMemo } from "react";
import { UseMutateFunction, useQueryClient } from "react-query";
import Modal from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import DeleteReservationContent from "./delete-reservation-content";
import { useDeleteReservations } from "../../../../core/fbs/fbs";
import {
  getGetV1UserReservationsQueryKey,
  useDeleteV1UserReservationsIdentifier
} from "../../../../core/publizon/publizon";
import { useMultipleRequestsWithStatus } from "../../../../core/utils/useRequestsWithStatus";
import { requestsAndReservations } from "./helper";
import ModalMessage from "../../../../components/message/modal-message/ModalMessage";
import { DeleteReservationsParams } from "../../../../core/fbs/model";
import { ApiResult } from "../../../../core/publizon/model";

interface DeleteReservationModalProps {
  modalId: string;
  reservations: string[];
}
type ParamsDigital = {
  identifier: string;
};
type ParamsPhysical = {
  params?: DeleteReservationsParams;
};
type OperationDigital = UseMutateFunction<
  ApiResult | null,
  unknown,
  ParamsDigital,
  unknown
>;
type OperationPhysical = UseMutateFunction<
  void | null,
  unknown,
  ParamsPhysical,
  unknown
>;

const DeleteReservationModal: FC<DeleteReservationModalProps> = ({
  modalId,
  reservations
}) => {
  const t = useText();
  const queryClient = useQueryClient();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();

  const { requests, reservationsPhysical, reservationsDigital } = useMemo(
    () =>
      requestsAndReservations<OperationPhysical, OperationDigital>({
        operations: {
          digital: deleteDigitalReservation,
          physical: deletePhysicalReservation
        },
        reservations
      }),
    [deleteDigitalReservation, deletePhysicalReservation, reservations]
  );

  const {
    handler: removeReservationsHandler,
    requestStatus,
    setRequestStatus
  } = useMultipleRequestsWithStatus<
    OperationPhysical | OperationDigital,
    ParamsPhysical | ParamsDigital,
    ApiResult | void | null
  >({
    requests,
    onSuccess: () => {
      queryClient.invalidateQueries(getGetV1UserReservationsQueryKey());
    }
  });

  const removeSelectedReservationsHandler = () => {
    if (reservationsPhysical.length || reservationsDigital.length) {
      removeReservationsHandler();
    }
  };

  if (!reservations) return null;

  const ctaButtonParams = {
    text: t("deleteReservationModalButtonText"),
    closeAllModals: true,
    callback: () => {
      setRequestStatus("idle");
    }
  };

  return (
    <Modal
      modalId={modalId}
      classNames="modal-cta modal-padding"
      closeModalAriaLabelText={t("deleteReservationModalCloseModalText")}
      screenReaderModalDescriptionText={t(
        "deleteReservationModalAriaDescriptionText"
      )}
    >
      {["idle", "pending"].includes(requestStatus) && (
        <DeleteReservationContent
          deleteReservation={() => removeSelectedReservationsHandler()}
          reservationsCount={reservations.length}
          deletionStatus={requestStatus}
        />
      )}
      {requestStatus === "success" && (
        <ModalMessage
          title={t("deleteReservationModalSuccessTitleText")}
          subTitle={t("deleteReservationModalSuccessStatusText")}
          ctaButton={ctaButtonParams}
        />
      )}

      {requestStatus === "error" && (
        <ModalMessage
          title={t("deleteReservationModalErrorsTitleText")}
          subTitle={t("deleteReservationModalErrorsStatusText")}
          ctaButton={ctaButtonParams}
        />
      )}
    </Modal>
  );
};

export default DeleteReservationModal;
