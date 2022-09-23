import React, { useEffect, useState, FC } from "react";
import { useText } from "../../../core/utils/text";
import { useGetReservationsV2 } from "../../../core/fbs/fbs";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import {
  getReadyForPickup,
  sortByOldestPickupDeadline,
  getReserved
} from "../utils/helpers";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import List from "./list";
import {
  mapFBSReservationToLoanMetaDataType,
  mapPublizonReservationToLoanMetaDataType
} from "../../../core/utils/helpers/mapper";

const ReservationList: FC = () => {
  const t = useText();

  // Date fetch
  const { isSuccess, data } = useGetReservationsV2();
  const { data: publizonData } = useGetV1UserReservations();

  // State
  const [readyForPickupReservationsFBS, setReadyForPickupReservationsFBS] =
    useState<MetaDataType<ReservationMetaDataType>[]>([]);

  const [
    readyForPickupReservationsPublizon,
    setReadyForPickupReservationsPublizon
  ] = useState<MetaDataType<ReservationMetaDataType>[]>([]);

  const [reservedReservationsFBS, setReservedReservationsFBS] = useState<
    MetaDataType<ReservationMetaDataType>[]
  >([]);

  const [reservedReservationsPublizon, setReservedReservationsPublizon] =
    useState<MetaDataType<ReservationMetaDataType>[]>([]);

  // Set digital reservations
  // The digital "ready for pickup"-reservations are mixed with the
  // phyiscal "ready for pickup"-reservations. The digital
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (publizonData && publizonData.reservations) {
      setReadyForPickupReservationsPublizon(
        getReadyForPickup(
          mapPublizonReservationToLoanMetaDataType(publizonData.reservations)
        )
      );
      setReservedReservationsPublizon(
        getReserved(
          mapPublizonReservationToLoanMetaDataType(publizonData.reservations)
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
          getReadyForPickup(mapFBSReservationToLoanMetaDataType(data))
        )
      );
      setReservedReservationsFBS(
        getReserved(mapFBSReservationToLoanMetaDataType(data))
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
