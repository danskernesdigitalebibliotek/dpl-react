import React, { FC, useCallback } from "react";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";
import { useDeleteReservations } from "../../../../core/fbs/fbs";
import DeleteReservationModal from "../delete-reservation/delete-reservation-modal";
import { getModalIds } from "../../../../core/utils/helpers/general";
import { useModalButtonHandler } from "../../../../core/utils/modal";

export interface ReservationDetailsButtonProps {
  reservationId: number;
  numberInQueue?: number | null;
}

const ReservationDetailsButton: FC<
  ReservationDetailsButtonProps & MaterialProps
> = ({ reservationId, numberInQueue }) => {
  const t = useText();
  const modalIds = getModalIds();
  const { mutate } = useDeleteReservations();
  const { open, close } = useModalButtonHandler();
  const modalId = `${modalIds.deleteReservation}${reservationId}`;

  const deleteReservation = useCallback(() => {
    if (reservationId) {
      mutate(
        {
          params: { reservationid: [reservationId] }
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
  }, [close, modalId, mutate, reservationId]);

  return (
    <>
      <div className="modal-details__buttons">
        {numberInQueue && numberInQueue > 0 && (
          <div className="my-8 mx-16 text-body-medium-regular">
            {t("reservationDetailsOthersInQueueText")}
          </div>
        )}
        <button
          type="button"
          onClick={() => open(modalId)}
          className="btn-primary btn-filled btn-small arrow__hover--right-small"
        >
          {t("reservationDetailsButtonRemoveText")}
        </button>
      </div>
      <DeleteReservationModal
        deleteReservation={deleteReservation}
        id={modalId}
      />
    </>
  );
};

export default ReservationDetailsButton;
