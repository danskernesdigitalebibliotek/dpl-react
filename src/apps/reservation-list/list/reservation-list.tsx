import React, { useEffect, useState, FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useText } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  sortByOldestPickupDeadline,
  getReservedDigital,
  getReservedPhysical,
  getReadyForPickup
} from "../utils/helpers";
import {
  getModalIds,
  getScrollClass
} from "../../../core/utils/helpers/general";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import {
  mapFBSReservationGroupToReservationType,
  mapPublizonReservationToReservationType
} from "../../../core/utils/helpers/list-mapper";
import ReservationPauseToggler from "./reservation-pause-toggler";
import { PatronV5, ReservationDetailsV2 } from "../../../core/fbs/model";
import EmptyReservations from "./EmptyReservations";
import PauseReservation from "../modal/pause-reservation/pause-reservation";
import DeleteReservationModal from "../modal/delete-reservation/delete-reservation-modal";
import DisplayedReservations from "./DisplayedReservations";
import {
  useModalButtonHandler,
  ModalIdsProps
} from "../../../core/utils/modal";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import ReservationDetails from "../modal/reservation-details/reservation-details";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { getDetailsModalId } from "../../../core/utils/helpers/modal-helpers";
import { getFromListByKey } from "../../loan-list/utils/helpers";
import { usePatronData } from "../../../core/utils/helpers/user";
import useGetReservationGroups from "../../../core/utils/useGetReservationGroups";

export interface ReservationListProps {
  pageSize: number;
}

const ReservationList: FC<ReservationListProps> = ({ pageSize }) => {
  const t = useText();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);
  const { open } = useModalButtonHandler();
  const { pauseReservation, deleteReservation, reservationDetails } =
    getModalIds();
  const [reservation, setReservation] = useState<ReservationType | null>(null);
  const [reservationToDelete, setReservationToDelete] =
    useState<ReservationType | null>(null);
  const { data: userData } = usePatronData();
  const [modalDetailsId, setModalDetailsId] = useState<string | null>(null);
  const [modalDeleteId, setModalDeleteId] = useState<string | null>(null);
  // Data fetch
  const {
    isSuccess: isSuccessFBS,
    data,
    isLoading: isLoadingFBS
  } = useGetReservationGroups();

  const {
    isSuccess: isSuccessPublizon,
    data: publizonData,
    isLoading: isLoadingPublizon
  } = useGetV1UserReservations();

  // State
  const [readyForPickupReservationsFBS, setReadyForPickupReservationsFBS] =
    useState<ReservationType[] | ReservationDetailsV2[] | null>(null);

  const [
    readyForPickupReservationsPublizon,
    setReadyForPickupReservationsPublizon
  ] = useState<ReservationType[] | ReservationDetailsV2[] | null>(null);

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
      const reservationType = mapPublizonReservationToReservationType(
        publizonData.reservations
      );
      const readyForPickup = getReadyForPickup(reservationType);
      setReadyForPickupReservationsPublizon(readyForPickup);
      setReservedReservationsPublizon(
        getReservedDigital(
          mapPublizonReservationToReservationType(publizonData.reservations)
        )
      );
    } else if (!isSuccessPublizon) {
      setReservedReservationsPublizon([]);
      setReadyForPickupReservationsPublizon([]);
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
      const fbsToReservationType =
        mapFBSReservationGroupToReservationType(data);
      const readyForPickup = getReadyForPickup(fbsToReservationType);
      const sortedByOldest = sortByOldestPickupDeadline(readyForPickup);
      setReadyForPickupReservationsFBS(sortedByOldest);
      setReservedReservationsFBS(
        getReservedPhysical(mapFBSReservationGroupToReservationType(data))
      );
    } else if (!isSuccessFBS) {
      setReservedReservationsFBS([]);
      setReadyForPickupReservationsFBS([]);
    }
  }, [isSuccessFBS, data]);

  const allListsEmpty =
    readyForPickupReservationsFBS?.length === 0 &&
    readyForPickupReservationsPublizon?.length === 0 &&
    reservedReservationsFBS?.length === 0 &&
    reservedReservationsPublizon?.length === 0 &&
    isLoadingFBS &&
    isLoadingPublizon;

  const findReservationInLists = useCallback(
    (id: string) => {
      let reservationFound = null;
      if (readyForPickupReservationsFBS) {
        reservationFound = getFromListByKey(
          [...readyForPickupReservationsFBS] as [],
          "reservationId",
          id
        );
      }
      if (reservationFound?.length === 0 && reservedReservationsFBS) {
        reservationFound = getFromListByKey(
          [...reservedReservationsFBS],
          "reservationId",
          id
        );
      }
      if (reservationFound?.length === 0 && reservedReservationsPublizon) {
        reservationFound = getFromListByKey(
          [...(reservedReservationsPublizon as [])],
          "identifier",
          id
        );
      }
      if (
        reservationFound?.length === 0 &&
        readyForPickupReservationsPublizon
      ) {
        reservationFound = getFromListByKey(
          [...(readyForPickupReservationsPublizon as [])],
          "identifier",
          id
        );
      }
      if (reservationFound && reservationFound.length > 0) {
        return reservationFound[0];
      }
      return null;
    },
    [
      readyForPickupReservationsFBS,
      readyForPickupReservationsPublizon,
      reservedReservationsFBS,
      reservedReservationsPublizon
    ]
  );

  const openReservationDeleteModal = useCallback(
    (deleteReservationInput: ReservationType) => {
      const reservationForModal = findReservationInLists(
        String(
          deleteReservationInput.reservationId ||
            deleteReservationInput.identifier
        )
      );
      if (reservationForModal) {
        setReservationToDelete(reservationForModal);
      }
      open(
        `${deleteReservation}${
          deleteReservationInput.reservationId ||
          deleteReservationInput.identifier
        }`
      );
    },
    [deleteReservation, findReservationInLists, open]
  );

  const openReservationDetailsModal = useCallback(
    (reservationInput: ReservationType) => {
      setReservation(reservationInput);
      open(
        `${reservationDetails}${
          reservationInput.faust || reservationInput.identifier
        }`
      );
    },
    [open, reservationDetails]
  );

  useEffect(() => {
    if (modalDetailsId) {
      const reservationForModal = findReservationInLists(modalDetailsId);

      if (reservationForModal) {
        setReservation(reservationForModal);
      }
    }
  }, [findReservationInLists, modalDetailsId]);

  useEffect(() => {
    if (modalDeleteId) {
      const reservationForModal = findReservationInLists(
        modalDeleteId.toString()
      );

      if (reservationForModal) {
        setReservationToDelete(reservationForModal);
        openReservationDeleteModal(reservationForModal);
      }
    }
  }, [findReservationInLists, modalDeleteId, openReservationDeleteModal]);

  useEffect(() => {
    const modalUrlParam = getUrlQueryParam("modal");
    // if there is a loan details query param, loan details modal should be opened
    const resDetails = reservationDetails as string;
    if (modalUrlParam && modalUrlParam.includes(resDetails as string)) {
      const reservationDetailsModalId = getDetailsModalId(
        modalUrlParam,
        resDetails
      );
      if (reservationDetailsModalId) {
        setModalDetailsId(reservationDetailsModalId);
      }
    }
    const deleteRes = deleteReservation as string;
    if (modalUrlParam && modalUrlParam.includes(deleteRes as string)) {
      const deleteReservationModalId = getDetailsModalId(
        modalUrlParam,
        deleteRes
      );
      if (deleteReservationModalId) {
        setModalDeleteId(deleteReservationModalId);
      }
    }
  }, [deleteReservation, reservationDetails]);

  return (
    <>
      <div className={`reservation-list-page ${getScrollClass(modalIds)}`}>
        <h1 className="text-header-h1 m-32">
          {t("reservationListHeaderText")}
        </h1>
        {user && <ReservationPauseToggler user={user} />}
        {allListsEmpty && <EmptyReservations />}
        {!allListsEmpty && (
          <DisplayedReservations
            openReservationDetailsModal={openReservationDetailsModal}
            readyForPickupReservationsFBS={readyForPickupReservationsFBS as []}
            readyForPickupReservationsPublizon={
              readyForPickupReservationsPublizon as []
            }
            reservedReservationsFBS={reservedReservationsFBS}
            reservedReservationsPublizon={reservedReservationsPublizon}
            pageSize={pageSize}
          />
        )}
      </div>
      {user && <PauseReservation user={user} id={pauseReservation as string} />}
      {reservationToDelete && (
        <DeleteReservationModal
          modalId={`${deleteReservation}${
            reservationToDelete.reservationId || reservationToDelete.identifier
          }`}
          reservations={[
            reservationToDelete.identifier ||
              String(reservationToDelete.reservationId)
          ]}
        />
      )}
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
