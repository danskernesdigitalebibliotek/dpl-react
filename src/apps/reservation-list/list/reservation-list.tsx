import React, { useState, FC } from "react";
import { useSelector } from "react-redux";
import { useDeepCompareEffect } from "react-use";
import { useText } from "../../../core/utils/text";
import {
  reservationId,
  ReservationType
} from "../../../core/utils/types/reservation-type";
import { getScrollClass } from "../../../core/utils/helpers/general";
import ReservationPauseToggler from "./reservation-pause-toggler";
import EmptyReservations from "./EmptyReservations";
import PauseReservation from "../modal/pause-reservation/pause-reservation";
import DeleteReservationModal, {
  deleteReservationModalId
} from "../modal/delete-reservation/delete-reservation-modal";
import DisplayedReservations from "./DisplayedReservations";
import {
  useModalButtonHandler,
  ModalIdsProps
} from "../../../core/utils/modal";
import MaterialDetailsModal, {
  reservationDetailsModalId
} from "../../loan-list/modal/material-details-modal";
import ReservationDetails from "../modal/reservation-details/reservation-details";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import {
  getDetailsModalId,
  getModalIds
} from "../../../core/utils/helpers/modal-helpers";
import useReservations from "../../../core/utils/useReservations";
import ReservationListSkeleton from "./reservation-list-skeleton";
import { usePatronData } from "../../../core/utils/helpers/usePatronData";

export interface ReservationListProps {
  pageSize: number;
}

const ReservationList: FC<ReservationListProps> = ({ pageSize }) => {
  const t = useText();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);
  const { open } = useModalButtonHandler();
  const { pauseReservation, deleteReservation, reservationDetails } =
    getModalIds();
  const [reservationWithDetails, setReservationWithDetails] =
    useState<ReservationType | null>(null);
  const [reservationToDelete, setReservationToDelete] =
    useState<ReservationType | null>(null);
  const { data: userData, isLoading: isLoadingUserData } = usePatronData();

  const {
    all: { reservations: allReservations, isLoading }
  } = useReservations();

  const allListsEmpty = allReservations.length === 0 && !isLoading;

  const openReservationDeleteModal = (reservationForModal: ReservationType) => {
    setReservationToDelete(reservationForModal);
    open(deleteReservationModalId(reservationForModal));
  };

  const openReservationDetailsModal = (
    reservationForModal: ReservationType
  ) => {
    setReservationWithDetails(reservationForModal);
    open(reservationDetailsModalId(reservationForModal));
  };

  useDeepCompareEffect(() => {
    const modalUrlParam = getUrlQueryParam("modal");
    // If there is a reservation details query param, loan details modal should be opened
    const resDetails = reservationDetails as string;
    if (modalUrlParam && modalUrlParam.includes(resDetails as string)) {
      const queryReservationId = getDetailsModalId(modalUrlParam, resDetails);
      if (queryReservationId) {
        const reservationFromQuery = allReservations
          .filter((reservation) => {
            return reservationId(reservation) === queryReservationId;
          })
          .at(0);
        if (reservationFromQuery) {
          setReservationWithDetails(reservationFromQuery);
        }
      }
    }
    // If there is a reservation delete query param, loan details modal should be opened
    const deleteRes = deleteReservation as string;
    if (modalUrlParam && modalUrlParam.includes(deleteRes as string)) {
      const queryReservationId = getDetailsModalId(modalUrlParam, deleteRes);
      if (queryReservationId) {
        const reservationFromQuery = allReservations
          .filter((reservation) => {
            return reservationId(reservation) === queryReservationId;
          })
          .at(0);
        if (reservationFromQuery) {
          setReservationWithDetails(reservationFromQuery);
        }
      }
    }
  }, [allReservations, reservationDetails, deleteReservation]);

  return (
    <>
      <div className={`reservation-list-page ${getScrollClass(modalIds)}`}>
        <h1 className="text-header-h1 m-32">
          {t("reservationListHeaderText")}
        </h1>
        {/* Loading skeleton version of <ReservationPauseToggler /> */}
        {isLoadingUserData && (
          <div className="ssc">
            <div className="ssc-square w-90 ml-32 my-32" />
          </div>
        )}

        {userData?.patron && <ReservationPauseToggler user={userData.patron} />}

        {isLoading && allReservations.length === 0 && (
          <ReservationListSkeleton />
        )}

        {allListsEmpty && <EmptyReservations />}

        {!allListsEmpty && (
          <DisplayedReservations
            openReservationDetailsModal={openReservationDetailsModal}
            pageSize={pageSize}
          />
        )}
      </div>

      {/* Modals */}
      {userData?.patron && (
        <PauseReservation
          user={userData.patron}
          id={pauseReservation as string}
        />
      )}
      {reservationToDelete && (
        <DeleteReservationModal
          modalId={deleteReservationModalId(reservationToDelete)}
          reservations={[reservationToDelete]}
        />
      )}
      {reservationWithDetails && (
        <MaterialDetailsModal
          modalId={reservationDetailsModalId(reservationWithDetails)}
        >
          <ReservationDetails
            openReservationDeleteModal={openReservationDeleteModal}
            item={reservationWithDetails}
            reservation={reservationWithDetails}
          />
        </MaterialDetailsModal>
      )}
    </>
  );
};

export default ReservationList;
