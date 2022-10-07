import React, { FC, useCallback } from "react";
import { useText } from "../../../core/utils/text";
import { MaterialProps } from "../../loan-list/materials/utils/material-fetch-hoc";
import { useDeleteReservations } from "../../../core/fbs/fbs";

export interface ReservationDetailsButtonProps {
  reservationId: number;
}

const ReservationDetailsButton: FC<
  ReservationDetailsButtonProps & MaterialProps
> = ({ reservationId }) => {
  const t = useText();
  const { mutate } = useDeleteReservations();

  const deleteReservation = useCallback(() => {
    if (reservationId) {
      mutate(
        {
          params: { reservationid: [reservationId] }
        },
        {
          onSuccess: (result) => {
            debugger
            // todo
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [mutate, reservationId]);

  return (
    <div className="modal-details__buttons">
      <div className="my-8 mx-16 text-body-medium-regular">
        {t("reservationDetailsOthersInQueueText")}
      </div>
      <button
        type="button"
        onClick={deleteReservation}
        className="btn-primary btn-filled btn-small arrow__hover--right-small"
      >
        {t("reservationDetailsButtonText")}
      </button>
    </div>
  );
};

export default ReservationDetailsButton;
