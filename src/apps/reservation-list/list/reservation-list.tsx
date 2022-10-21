import React, { useEffect, useState, FC } from "react";
import { useText } from "../../../core/utils/text";
import { useGetReservationsV2 } from "../../../core/fbs/fbs";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  getReadyForPickup,
  sortByOldestPickupDeadline,
  getReserved
} from "../utils/helpers";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "../../../core/utils/helpers/list-mapper";
import List from "./list";

const ReservationList: FC = () => {
  const t = useText();

  // Data fetch
  const { isSuccess, data } = useGetReservationsV2();
  const { data: publizonData } = useGetV1UserReservations();

  // State
  const [readyForPickupReservationsFBS, setReadyForPickupReservationsFBS] =
    useState<ReservationType[]>([]);

  const [
    readyForPickupReservationsPublizon,
    setReadyForPickupReservationsPublizon
  ] = useState<ReservationType[]>([]);

  const [reservedReservationsFBS, setReservedReservationsFBS] = useState<
    ReservationType[]
  >([]);

  const [reservedReservationsPublizon, setReservedReservationsPublizon] =
    useState<ReservationType[]>([]);

  // Set digital reservations
  // The digital "ready for pickup"-reservations are mixed with the
  // phyiscal "ready for pickup"-reservations. The digital
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (publizonData && publizonData.reservations) {
      setReadyForPickupReservationsPublizon(
        getReadyForPickup(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
      setReservedReservationsPublizon(
        getReserved(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
    }
  }, [publizonData]);

  // Set digital reservations
  // The physical "ready for pickup"-reservations are mixed with the
  // digital "ready for pickup"-reservations. The phyiscal
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (isSuccess && data) {
      setReadyForPickupReservationsFBS(
        sortByOldestPickupDeadline(
          getReadyForPickup(mapFBSReservationToReservationType(data))
        )
      );
      setReservedReservationsFBS(
        getReserved(mapFBSReservationToReservationType(data))
      );
    }
  }, [isSuccess, data]);

  return (
    <div className="reservation-list-page">
      <h1 className="text-header-h1 m-32">{t("headerText")}</h1>
      <List
        header={t("reservationListReadyForPickupTitleText")}
        list={sortByOldestPickupDeadline([
          ...readyForPickupReservationsFBS,
          ...readyForPickupReservationsPublizon
        ])}
      />
      <List
        header={t("reservationListPhysicalReservationsHeaderText")}
        list={reservedReservationsFBS}
      />
      <List
        header={t("reservationListDigitalReservationsHeaderText")}
        list={reservedReservationsPublizon}
      />
    </div>
  );
};

export default ReservationList;
