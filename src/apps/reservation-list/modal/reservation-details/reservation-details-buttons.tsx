import React, { FC } from "react";
import { Button } from "../../../../components/Buttons/Button";
import { useText } from "../../../../core/utils/text";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import { MaterialProps } from "../../../loan-list/materials/utils/material-fetch-hoc";

export interface ReservationDetailsButtonProps {
  reservation: ReservationType;
  numberInQueue?: number | null;
  classNames?: string;
  buttonClassNames?: string;
  openReservationDeleteModal: (deleteReservation: ReservationType) => void;
}

const ReservationDetailsButton: FC<
  ReservationDetailsButtonProps & MaterialProps
> = ({
  numberInQueue,
  openReservationDeleteModal,
  classNames,
  buttonClassNames,
  reservation
}) => {
  const t = useText();

  return (
    <div className={`modal-details__buttons ${classNames}`}>
      {numberInQueue && numberInQueue > 0 && (
        <div className="my-8 mr-16 text-body-medium-regular">
          {t("reservationDetailsOthersInQueueText")}
        </div>
      )}
      <Button
        label={t("reservationDetailsButtonRemoveText")}
        onClick={() => openReservationDeleteModal(reservation)}
        classNames={buttonClassNames}
        buttonType="none"
        disabled={false}
        collapsible={false}
        size="small"
        variant="filled"
      />
    </div>
  );
};

export default ReservationDetailsButton;
