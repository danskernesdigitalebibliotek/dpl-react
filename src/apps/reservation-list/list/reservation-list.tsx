import React, { useEffect, useState, FC } from "react";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  sortByOldestPickupDeadline,
  getReservedDigital,
  getReservedPhysical
} from "../utils/helpers";
import { getReadyForPickup } from "../../../core/utils/helpers/general";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "../../../core/utils/helpers/list-mapper";
import List from "./list";
import ReservationPauseToggler from "./reservation-pause-toggler";
import {
  useGetPatronInformationByPatronIdV2,
  useGetReservationsV2
} from "../../../core/fbs/fbs";
import { PatronV5 } from "../../../core/fbs/model";
import EmptyList from "../../../components/empty-list/empty-list";

export interface ReservationListProps {
  pageSize: number;
}

const ReservationList: FC<ReservationListProps> = ({ pageSize }) => {
  const t = useText();

  const { data: userData } = useGetPatronInformationByPatronIdV2();

  // Data fetch
  const {
    isSuccess: isSuccessFBS,
    data,
    isLoading: isLoadingFBS,
    isError: isErrorFBS
  } = useGetReservationsV2();

  const {
    isSuccess: isSuccessPublizon,
    data: publizonData,
    isLoading: isLoadingPublizon,
    isError: isErrorPublizon
  } = useGetV1UserReservations();

  // State
  const [readyForPickupReservationsFBS, setReadyForPickupReservationsFBS] =
    useState<ReservationType[]>(null);

  const [
    readyForPickupReservationsPublizon,
    setReadyForPickupReservationsPublizon
  ] = useState<ReservationType[]>(null);

  const [reservedReservationsFBS, setReservedReservationsFBS] =
    useState<ReservationType[]>(null);
  const [user, setUser] = useState<PatronV5 | null>(null);

  const [reservedReservationsPublizon, setReservedReservationsPublizon] =
    useState<ReservationType[]>(null);

  // Set digital reservations
  // The digital "ready for pickup"-reservations are mixed with the
  // physical "ready for pickup"-reservations. The digital
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (isSuccessPublizon && publizonData && publizonData.reservations) {
      setReadyForPickupReservationsPublizon(
        getReadyForPickup(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
      setReservedReservationsPublizon(
        getReservedDigital(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
    }
  }, [publizonData, isSuccessPublizon]);

  // Set digital reservations
  // The physical "ready for pickup"-reservations are mixed with the
  // digital "ready for pickup"-reservations. The physical
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (userData && userData.patron) {
      setUser(userData.patron);
    }
  }, [userData]);

  // Set digital reservations
  // The physical "ready for pickup"-reservations are mixed with the
  // digital "ready for pickup"-reservations. The physical
  // "reserved"-reservations have their own list
  useEffect(() => {
    if (isSuccessFBS && data) {
      setReadyForPickupReservationsFBS(
        sortByOldestPickupDeadline(
          getReadyForPickup(mapFBSReservationToReservationType(data))
        )
      );
      setReservedReservationsFBS(
        getReservedPhysical(mapFBSReservationToReservationType(data))
      );
    }
  }, [isSuccessFBS, data]);

  const allListsEmpty =
    readyForPickupReservationsFBS?.length === 0 &&
    readyForPickupReservationsPublizon?.length === 0 &&
    reservedReservationsFBS?.length === 0 &&
    reservedReservationsPublizon?.length === 0 &&
    !isLoadingFBS &&
    !isLoadingPublizon;

  return (
    <div className="reservation-list-page">
      <h1 className="text-header-h1 m-32">{t("reservationListHeaderText")}</h1>
      {user && <ReservationPauseToggler user={user} />}
      {allListsEmpty ? (
        <div className="list-reservation-container m-32">
          <EmptyList emptyListText={t("reservationListAllEmptyText")} />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ReservationList;
