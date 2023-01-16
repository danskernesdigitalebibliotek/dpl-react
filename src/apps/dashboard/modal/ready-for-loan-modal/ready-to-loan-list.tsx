import * as React from "react";
import { FC } from "react";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import { Reservation } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import QueuedReservationItem from "./ready-to-loan-item";

export interface ReadyToLoanListProps {
  physicalReservations?: ReservationDetailsV2[];
  digitalReservations?: Reservation[];
  selectedReservations: string[];
  setCustomSelection: (elementId: string | number) => void;
}

const ReadyToLoanList: FC<ReadyToLoanListProps> = ({
  physicalReservations,
  digitalReservations,
  selectedReservations,
  setCustomSelection
}) => {
  return (
    <ul className="modal-loan__list-materials">
      {physicalReservations &&
        physicalReservations.map((physicalReservation) => {
          const { recordId, numberInQueue = "" } = physicalReservation;
          return (
            <QueuedReservationItem
              faust={recordId as FaustId}
              numberInQueue={numberInQueue}
              selectedReservations={selectedReservations}
              setCustomSelection={setCustomSelection}
            />
          );
        })}
      {digitalReservations &&
        digitalReservations.map((digitalReservation) => {
          const { identifier, status = "" } = digitalReservation;
          return (
            identifier && (
              <QueuedReservationItem
                identifier={identifier}
                numberInQueue={status}
                selectedReservations={selectedReservations}
                setCustomSelection={setCustomSelection}
              />
            )
          );
        })}
    </ul>
  );
};

export default ReadyToLoanList;
