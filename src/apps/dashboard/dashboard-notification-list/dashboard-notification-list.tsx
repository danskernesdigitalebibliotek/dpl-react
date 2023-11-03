import React, { FC, useState, useCallback } from "react";
import {
  getModalIds,
  constructModalId
} from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { useUrls } from "../../../core/utils/url";
import { yesterday, soon, longer } from "../util/helpers";
import NotificationColumn from "./NotificationColumn";
import { useModalButtonHandler } from "../../../core/utils/modal";
import LoansGroupModal from "../../../components/GroupModal/LoansGroupModal";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import MaterialDetails, {
  constructMaterialDetailsModalId
} from "../../loan-list/modal/material-details";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import ReservationGroupModal from "../modal/ReservationsGroupModal";
import ReservationDetails from "../../reservation-list/modal/reservation-details/reservation-details";
import DeleteReservationModal from "../../reservation-list/modal/delete-reservation/delete-reservation-modal";
import Notifications from "./Notifications";
import AcceptModal from "../../../components/accept-fees-modal/AcceptFeesModal";
import useReservations from "../../../core/utils/useReservations";
import useLoans from "../../../core/utils/useLoans";

export interface DashboardNotificationListProps {
  pageSize: number;
  columns: boolean;
}

const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  pageSize,
  columns
}) => {
  const t = useText();
  const { allReservations, allReadyToLoanReservations, allQueuedReservations } =
    useReservations();
  const {
    allLoans,
    allOverdueLoans,
    allSoonOverdueLoans,
    allFarFromOverdueLoans
  } = useLoans();
  const [accepted, setAccepted] = useState<boolean>(false);
  const [modalReservationDetailsId, setModalReservationDetailsId] = useState<
    string | null
  >(null);
  const [reservationsForDeleting, setReservationsForDeleting] = useState<
    string[]
  >([]);
  const [loansToDisplay, setLoansToDisplay] = useState<LoanType[] | null>(null);
  const [modalHeader, setModalHeader] = useState("");

  const { open } = useModalButtonHandler();
  const {
    loanDetails,
    acceptModal,
    dueDateModal,
    reservationDetails,
    deleteReservation,
    deleteReservations
  } = getModalIds();
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [reservationModalId, setReservationModalId] = useState<string>("");
  const [modalLoanDetailsId, setModalLoanDetailsId] = useState<string | null>(
    null
  );

  const openModalHandler = useCallback(
    (modalId: string) => {
      setReservationModalId(modalId);
      open(modalId);
    },
    [open]
  );

  const { reservationsReady, reservationsQueued } = getModalIds();
  const { physicalLoansUrl, reservationsUrl } = useUrls();

  const openLoanDetailsModal = useCallback(
    (modalId: string) => {
      setModalLoanDetailsId(modalId);
      open(`${loanDetails}${modalId}`);
    },
    [loanDetails, open]
  );

  const openReservationDetailsModal = useCallback(
    (modalId: string) => {
      setModalReservationDetailsId(modalId);
      open(`${reservationDetails}${modalId}`);
    },
    [open, reservationDetails]
  );

  const modalLoan = allLoans.find(
    ({ loanId }) => String(loanId) === modalLoanDetailsId
  );

  const reservationForModal = allReservations.find(
    ({ faust, reservationId }) =>
      String(modalReservationDetailsId) === String(faust) ||
      String(modalReservationDetailsId) === String(reservationId)
  );

  const openReservationDeleteModal = useCallback(() => {
    if (reservationForModal) {
      open(
        `${deleteReservation}${
          reservationForModal.reservationId || reservationForModal.identifier
        }`
      );
    }
  }, [deleteReservation, open, reservationForModal]);

  const setReservationsToDelete = (resForDeleting: string[]) => {
    setReservationsForDeleting(resForDeleting);
    open(deleteReservations as string);
  };

  const openDueDateModal = useCallback(
    (dueDateInput: string) => {
      setDueDate(dueDateInput);

      switch (dueDateInput) {
        case yesterday:
          setLoansToDisplay(allOverdueLoans);
          setModalHeader(t("loansOverdueText"));
          break;

        case soon:
          setLoansToDisplay(allSoonOverdueLoans);
          setModalHeader(t("loansSoonOverdueText"));
          break;

        case longer:
          setLoansToDisplay(allFarFromOverdueLoans);
          setModalHeader(t("loansNotOverdueText"));
          break;

        default:
          throw new Error("Invalid due date input");
      }
      open(constructModalId(dueDateModal as string, [dueDateInput]));
    },
    [
      dueDateModal,
      open,
      allFarFromOverdueLoans,
      allOverdueLoans,
      allSoonOverdueLoans,
      t
    ]
  );

  const dashboardNotificationsLoan = [
    {
      listLength: allOverdueLoans.length,
      badge: t("materialDetailsOverdueText"),
      header: t("loansOverdueText"),
      color: "danger",
      dataCy: "physical-loans-overdue",
      showNotificationDot: true,
      notificationClickEvent: () =>
        allOverdueLoans.length === 1
          ? openLoanDetailsModal(String(allOverdueLoans[0].loanId))
          : openDueDateModal(yesterday)
    },
    {
      listLength: allSoonOverdueLoans.length,
      badge: t("statusBadgeWarningText"),
      header: t("loansSoonOverdueText"),
      color: "warning",
      dataCy: "physical-loans-soon-overdue",
      showNotificationDot: true,
      notificationClickEvent: () =>
        allSoonOverdueLoans.length === 1
          ? openLoanDetailsModal(String(allSoonOverdueLoans[0].loanId))
          : openDueDateModal(soon)
    },
    {
      listLength: allFarFromOverdueLoans.length,
      header: t("loansNotOverdueText"),
      dataCy: "loans-not-overdue",
      color: "neutral",
      showNotificationDot: false,
      notificationClickEvent: () =>
        allFarFromOverdueLoans.length === 1
          ? openLoanDetailsModal(String(allFarFromOverdueLoans[0].loanId))
          : openDueDateModal(longer)
    }
  ];

  const openAcceptModal = useCallback(() => {
    open(`${acceptModal}`);
  }, [acceptModal, open]);

  const dashboardNotificationsReservations = [
    {
      listLength: allReadyToLoanReservations.length,
      header: t("reservationsReadyText"),
      badge: t("readyForLoanText"),
      dataCy: "reservations-ready",
      showNotificationDot: true,
      color: "info",
      notificationClickEvent: () =>
        allReadyToLoanReservations.length === 1
          ? openReservationDetailsModal(
              String(allReadyToLoanReservations[0].faust)
            )
          : openModalHandler(reservationsReady as string)
    },
    {
      listLength: allQueuedReservations.length,
      header: t("reservationsStillInQueueForText"),
      dataCy: "reservations-queued",
      color: "neutral",
      showNotificationDot: false,
      notificationClickEvent: () =>
        allQueuedReservations.length === 1
          ? openReservationDetailsModal(
              String(
                allQueuedReservations[0].identifier ||
                  allQueuedReservations[0].faust
              )
            )
          : openModalHandler(reservationsQueued as string)
    }
  ];
  const resetAccepted = () => {
    setAccepted(false);
  };

  return (
    <>
      <div className="status-userprofile">
        {columns && (
          <>
            <NotificationColumn
              materials={dashboardNotificationsLoan}
              materialsCount={allLoans.length}
              headerUrl={physicalLoansUrl}
              header={t("physicalLoansText")}
              emptyListText={t("noPhysicalLoansText")}
            />
            <NotificationColumn
              materials={dashboardNotificationsReservations}
              materialsCount={allReservations.length}
              headerUrl={reservationsUrl}
              header={t("reservationsText")}
              emptyListText={t("noReservationsText")}
            />
          </>
        )}
      </div>
      {!columns && (
        <Notifications
          showOnlyNotifications
          materials={[
            ...dashboardNotificationsLoan,
            ...dashboardNotificationsReservations
          ]}
        />
      )}

      <MaterialDetailsModal
        modalId={constructMaterialDetailsModalId(
          loanDetails,
          modalLoanDetailsId
        )}
      >
        <MaterialDetails
          faust={modalLoan?.faust}
          identifier={modalLoan?.identifier}
          loan={modalLoan as LoanType}
          modalId={constructMaterialDetailsModalId(
            loanDetails,
            modalLoanDetailsId
          )}
        />
      </MaterialDetailsModal>
      {dueDate && allLoans && loansToDisplay && (
        <LoansGroupModal
          accepted={accepted}
          resetAccepted={() => resetAccepted()}
          openAcceptModal={openAcceptModal}
          pageSize={pageSize}
          openDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          loansModal={loansToDisplay}
        >
          <SimpleModalHeader header={modalHeader} />
        </LoansGroupModal>
      )}
      {allReservations && (
        <ReservationGroupModal
          openDetailsModal={openReservationDetailsModal}
          modalId={reservationModalId}
          setReservationsToDelete={setReservationsToDelete}
          pageSize={pageSize}
        />
      )}
      {reservationForModal && (
        <DeleteReservationModal
          modalId={`${deleteReservation}${
            reservationForModal.reservationId || reservationForModal.identifier
          }`}
          reservations={[
            String(reservationForModal.reservationId) ||
              reservationForModal.identifier ||
              ""
          ]}
        />
      )}
      {reservationsForDeleting && (
        <DeleteReservationModal
          modalId={`${deleteReservations}`}
          reservations={reservationsForDeleting}
        />
      )}
      {reservationForModal && (
        <MaterialDetailsModal
          modalId={`${reservationDetails}${String(modalReservationDetailsId)}`}
        >
          <ReservationDetails
            openReservationDeleteModal={openReservationDeleteModal}
            faust={reservationForModal.faust}
            identifier={reservationForModal.identifier}
            reservation={reservationForModal}
          />
        </MaterialDetailsModal>
      )}
      <AcceptModal accept={() => setAccepted(true)} />
    </>
  );
};
export default DashboardNotificationList;
