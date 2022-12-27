import React, { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";

export interface ReservationDetailsButtonProps {
  reservationId: number;
  numberInQueue?: number | null;
  openReservationDeleteModal: (
    digitalReservationId: string | null,
    physicalReservationId: number | null
  ) => void;
}

const ReservationDetailsButton: FC<
  ReservationDetailsButtonProps & MaterialProps
> = ({ reservationId, numberInQueue, openReservationDeleteModal }) => {
  const t = useText();

  return (
    <div className="modal-details__buttons">
      {numberInQueue && numberInQueue > 0 && (
        <div className="my-8 mx-16 text-body-medium-regular">
          {t("reservationDetailsOthersInQueueText")}
        </div>
      )}
      <button
        type="button"
        onClick={() => openReservationDeleteModal(null, reservationId)}
        className="btn-primary btn-filled btn-small arrow__hover--right-small"
      >
        {t("reservationDetailsButtonRemoveText")}
      </button>
    </div>
  );
};

export default ReservationDetailsButton;
