import React, { useEffect, useState, FC } from "react";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  sortByOldestPickupDeadline,
  getReservedDigital,
  getReservedPhysical
} from "../utils/helpers";
import {
  getModalIds,
  getReadyForPickup
} from "../../../core/utils/helpers/general";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "../../../core/utils/helpers/list-mapper";
import ReservationPauseToggler from "./reservation-pause-toggler";
import {
  useGetPatronInformationByPatronIdV2,
  useGetReservationsV2
} from "../../../core/fbs/fbs";
import { PatronV5 } from "../../../core/fbs/model";
import EmptyReservations from "./EmptyReservations";
import PauseReservation from "../modal/pause-reservation/pause-reservation";
import DeleteReservationModal from "../modal/delete-reservation/delete-reservation-modal";
import DisplayedReservations from "./DisplayedReservations";
import { useModalButtonHandler } from "../../../core/utils/modal";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import ReservationDetails from "../modal/reservation-details/reservation-details";

export interface ReservationListProps {
  pageSize: number;
}

const ReservationList: FC<ReservationListProps> = ({ pageSize }) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { pauseReservation, deleteReservation, reservationDetails } =
    getModalIds();
  const [physicalReservationToDelete, setPhysicalReservationToDelete] =
    useState<number | null>(null);
  const [digitalReservationToDelete, setDigitalReservationToDelete] = useState<
    string | null
  >(null);
  const [reservation, setReservation] = useState<ReservationType | null>(null);
  const { data: userData } = useGetPatronInformationByPatronIdV2();

  // Data fetch
  const {
    isSuccess: isSuccessFBS,
    data,
    isLoading: isLoadingFBS
  } = useGetReservationsV2();

  const {
    isSuccess: isSuccessPublizon,
    data: publizonData,
    isLoading: isLoadingPublizon
  } = useGetV1UserReservations();

  // State
  const [readyForPickupReservationsFBS, setReadyForPickupReservationsFBS] =
    useState<ReservationType[] | null>(null);

  const [
    readyForPickupReservationsPublizon,
    setReadyForPickupReservationsPublizon
  ] = useState<ReservationType[] | null>(null);

  const [reservedReservationsFBS, setReservedReservationsFBS] = useState<
    ReservationType[] | null
  >(null);
  const [user, setUser] = useState<PatronV5 | null>(null);

  const [reservedReservationsPublizon, setReservedReservationsPublizon] =
    useState<ReservationType[] | null>(null);

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

  const openReservationDeleteModal = (
    digitalReservationId: string | null,
    physicalReservationId: number | null
  ) => {
    if (physicalReservationId) {
      setPhysicalReservationToDelete(physicalReservationId);
      open(`${deleteReservation}${physicalReservationId}`);
    } else {
      setDigitalReservationToDelete(digitalReservationId);
      open(`${deleteReservation}${digitalReservationId}`);
    }
  };
  const openReservationDetailsModal = (reservationInput: ReservationType) => {
    setReservation(reservationInput);
    open(
      `${reservationDetails}${
        reservationInput.faust || reservationInput.identifier
      }`
    );
  };

  return (
    <>
      <div className="reservation-list-page">
        <h1 className="text-header-h1 m-32">
          {t("reservationListHeaderText")}
        </h1>
        {user && <ReservationPauseToggler user={user} />}
        {allListsEmpty && <EmptyReservations />}
        {!allListsEmpty && (
          <DisplayedReservations
            openReservationDetailsModal={openReservationDetailsModal}
            readyForPickupReservationsFBS={readyForPickupReservationsFBS}
            readyForPickupReservationsPublizon={
              readyForPickupReservationsPublizon
            }
            reservedReservationsFBS={reservedReservationsFBS}
            reservedReservationsPublizon={reservedReservationsPublizon}
            pageSize={pageSize}
          />
        )}
      </div>
      {user && <PauseReservation user={user} id={pauseReservation as string} />}
      <DeleteReservationModal
        modalId={`${deleteReservation}${
          physicalReservationToDelete || digitalReservationToDelete
        }`}
        physicalReservationId={physicalReservationToDelete}
        digitalReservationId={digitalReservationToDelete}
      />
      {reservation && (
        <MaterialDetailsModal
          modalId={`${reservationDetails}${
            reservation.faust || reservation.identifier
          }`}
        >
          <ReservationDetails
            openReservationDeleteModal={openReservationDeleteModal}
            faust={reservation.faust}
            identifier={reservation.identifier}
            reservation={reservation}
          />
        </MaterialDetailsModal>
      )}
    </>
  );
};

export default ReservationList;
