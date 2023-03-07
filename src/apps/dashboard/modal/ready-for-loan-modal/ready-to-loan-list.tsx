import * as React from "react";
import { FC } from "react";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import { Reservation } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import ReadyToLoanItem from "./ready-to-loan-item";

export interface ReadyToLoanListProps {
  physicalReservations?: ReservationDetailsV2[];
  digitalReservations?: Reservation[];
  selectedReservations: {
    [key: string]: string;
  }[];
  setCustomSelection: (elementId: string, reservationId: string) => void;
}

const ReadyToLoanList: FC<ReadyToLoanListProps> = ({
  physicalReservations,
  digitalReservations,
  selectedReservations,
  setCustomSelection
}) => {
  return (
    <>
      {physicalReservations &&
        physicalReservations.map((physicalReservation) => {
          const {
            recordId,
            expiryDate,
            reservationId = ""
          } = physicalReservation;
          return (
            <ReadyToLoanItem
              faust={recordId as FaustId}
              pickUpByDate={expiryDate}
              selectedReservations={selectedReservations}
              setCustomSelection={setCustomSelection}
              reservationId={reservationId as string}
            />
          );
        })}
      {digitalReservations &&
        digitalReservations.map((digitalReservation) => {
          const { identifier, expireDateUtc = "" } = digitalReservation;
          return (
            identifier && (
              <ReadyToLoanItem
                identifier={identifier}
                pickUpByDate={expireDateUtc}
                selectedReservations={selectedReservations}
                setCustomSelection={setCustomSelection}
                reservationId={identifier}
              />
            )
          );
        })}
    </>
  );
};

export default ReadyToLoanList;
