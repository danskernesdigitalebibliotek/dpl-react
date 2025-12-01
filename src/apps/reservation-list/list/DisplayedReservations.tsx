import * as React from "react";
import { FC } from "react";
import List from "./list";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  sortByNumberInQueue,
  sortByOldestPickupDeadline,
  sortByPickupNumber
} from "../utils/helpers";
import { useText } from "../../../core/utils/text";
import useReservations from "../../../core/utils/useReservations";

export interface DisplayedReservationsProps {
  pageSize: number;
  openReservationDetailsModal: (reservation: ReservationType) => void;
}

const DisplayedReservations: FC<DisplayedReservationsProps> = ({
  pageSize,
  openReservationDetailsModal
}) => {
  const t = useText();
  const {
    all: { readyToLoan: readyToLoanReservations },
    fbs: { queued: reservedReservationsFBS },
    publizon: { queued: reservedReservationsPublizon }
  } = useReservations();
  return (
    <>
      <List
        openReservationDetailsModal={openReservationDetailsModal}
        pageSize={pageSize}
        header={t("reservationListReadyForPickupTitleText")}
        reservations={sortByPickupNumber(readyToLoanReservations)}
        emptyListDataCy="reservation-list-ready-for-pickup-empty-list"
        emptyListLabel={t("reservationListReadyForPickupEmptyText")}
      />
      <List
        openReservationDetailsModal={openReservationDetailsModal}
        pageSize={pageSize}
        header={t("reservationListPhysicalReservationsHeaderText")}
        reservations={sortByNumberInQueue(reservedReservationsFBS)}
        emptyListDataCy="reservation-list-physical-reservations-empty-list"
        emptyListLabel={t("reservationListPhysicalReservationsEmptyText")}
      />
      <List
        openReservationDetailsModal={openReservationDetailsModal}
        pageSize={pageSize}
        header={t("reservationListDigitalReservationsHeaderText")}
        emptyListDataCy="reservation-list-digital-reservations-empty-list"
        reservations={
          sortByOldestPickupDeadline(
            reservedReservationsPublizon
          ) as ReservationType[]
        }
        emptyListLabel={t("reservationListDigitalReservationsEmptyText")}
      />
    </>
  );
};

export default DisplayedReservations;
