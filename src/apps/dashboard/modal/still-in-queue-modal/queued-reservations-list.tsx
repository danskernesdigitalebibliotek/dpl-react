import * as React from "react";
import { FC } from "react";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import { Reservation } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import QueuedReservationItem from "./queued-reservation-item";

export interface QueuedReservationsListProps {
  physicalReservations?: ReservationDetailsV2[];
  digitalReservations?: Reservation[];
  selectedReservations: {
    [key: string]: string;
  }[];
  setCustomSelection: (elementId: string, reservationId: string) => void;
}

const QueuedReservationsList: FC<QueuedReservationsListProps> = ({
  physicalReservations,
  digitalReservations,
  selectedReservations,
  setCustomSelection
}) => (
  <ul className="modal-loan__list-materials">
    {physicalReservations &&
      physicalReservations.map(
        ({ recordId, numberInQueue = 0, reservationId = "" }) => (
          <QueuedReservationItem
            faust={recordId as FaustId}
            numberInQueue={numberInQueue}
            selectedReservations={selectedReservations}
            setCustomSelection={setCustomSelection}
            reservationId={reservationId as string}
          />
        )
      )}
    {digitalReservations &&
      digitalReservations.map(
        ({ identifier, status = 0 }) =>
          identifier && (
            <QueuedReservationItem
              identifier={identifier}
              numberInQueue={status}
              selectedReservations={selectedReservations}
              setCustomSelection={setCustomSelection}
              reservationId={identifier}
            />
          )
      )}
    )
  </ul>
);

export default QueuedReservationsList;
