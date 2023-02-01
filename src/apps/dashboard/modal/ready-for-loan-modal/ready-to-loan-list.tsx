import * as React from "react";
import { FC } from "react";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import { Reservation } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import ReadyToLoanItem from "./ready-to-loan-item";

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
  console.log(physicalReservations);
  console.log(digitalReservations);
  return (
    <>
      {physicalReservations &&
        physicalReservations.map((physicalReservation) => {
          const { recordId, expiryDate } = physicalReservation;
          return (
            <ReadyToLoanItem
              faust={recordId as FaustId}
              pickUpByDate={expiryDate}
              selectedReservations={selectedReservations}
              setCustomSelection={setCustomSelection}
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
              />
            )
          );
        })}
    </>
  );
};

export default ReadyToLoanList;
