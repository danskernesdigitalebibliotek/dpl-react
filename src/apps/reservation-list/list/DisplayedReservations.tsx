import * as React from "react";
import { FC } from "react";
import List from "./list";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { sortByOldestPickupDeadline } from "../utils/helpers";
import { useText } from "../../../core/utils/text";

export interface DisplayedReservationsProps {
  readyForPickupReservationsFBS: ReservationType[] | null;
  readyForPickupReservationsPublizon: ReservationType[] | null;
  reservedReservationsFBS: ReservationType[] | null;
  reservedReservationsPublizon: ReservationType[] | null;
  pageSize: number;
}

const DisplayedReservations: FC<DisplayedReservationsProps> = ({
  readyForPickupReservationsFBS,
  readyForPickupReservationsPublizon,
  reservedReservationsFBS,
  reservedReservationsPublizon,
  pageSize
}) => {
  const t = useText();

  return (
    <>
      {readyForPickupReservationsFBS !== null &&
        readyForPickupReservationsPublizon !== null && (
          <List
            pageSize={pageSize}
            header={t("reservationListReadyForPickupTitleText")}
            reservations={sortByOldestPickupDeadline([
              ...readyForPickupReservationsFBS,
              ...readyForPickupReservationsPublizon
            ])}
            emptyListLabel={t("reservationListReadyForPickupEmptyText")}
          />
        )}
      {reservedReservationsFBS !== null && (
        <List
          pageSize={pageSize}
          header={t("reservationListPhysicalReservationsHeaderText")}
          reservations={reservedReservationsFBS}
          emptyListLabel={t("reservationListPhysicalReservationsEmptyText")}
        />
      )}
      {reservedReservationsPublizon !== null && (
        <List
          pageSize={pageSize}
          header={t("reservationListDigitalReservationsHeaderText")}
          reservations={reservedReservationsPublizon}
          emptyListLabel={t("reservationListDigitalReservationsEmptyText")}
        />
      )}
    </>
  );
};

export default DisplayedReservations;
