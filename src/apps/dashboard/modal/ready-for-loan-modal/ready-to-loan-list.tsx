import * as React from "react";
import { FC } from "react";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import { Reservation } from "../../../../core/publizon/model";
import { FaustId } from "../../../../core/utils/types/ids";
import ReadyToLoanItem from "./ready-to-loan-item";
import SelectableMaterial from "../../../loan-list/materials/selectable-material/selectable-material";
import { useText } from "../../../../core/utils/text";
import { formatDate } from "../../../loan-list/utils/helpers";

export interface ReadyToLoanListProps {
  physicalReservations?: ReservationDetailsV2[];
  digitalReservations?: Reservation[];
  selectedReservations: string[];
  setCustomSelection: (elementId: string, reservationId: string) => void;
}

const ReadyToLoanList: FC<ReadyToLoanListProps> = ({
  physicalReservations,
  digitalReservations,
  selectedReservations,
  setCustomSelection
}) => {
  const t = useText();
  return (
    <>
      {physicalReservations &&
        physicalReservations.map(
          ({ recordId, expiryDate, reservationId = "" }) => (
            <SelectableMaterial
              badgeText={t("pickUpLatestText", {
                placeholders: { "@date": formatDate(expiryDate) }
              })}
              id={reservationId}
              faust={recordId as FaustId}
              selectedMaterials={selectedReservations}
              openDetailsModal={setCustomSelection}
            />
          )
        )}
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
