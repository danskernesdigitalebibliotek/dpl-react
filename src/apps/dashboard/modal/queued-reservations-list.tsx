import * as React from "react";
import { FC } from "react";
import { ReservationDetailsV2 } from "../../../core/fbs/model";
import QueuedReservationItem from "./queued-reservation-item";

export interface QueuedReservationsListProps {
  reservations: ReservationDetailsV2[];
}

const QueuedReservationsList: FC<QueuedReservationsListProps> = ({
  reservations
}) => {
  return (
    <ul className="modal-loan__list-materials">
      {reservations.map((reservation) => {
        console.log(reservation);
        return <QueuedReservationItem hest="test" />;
      })}
    </ul>
  );
};

export default QueuedReservationsList;
