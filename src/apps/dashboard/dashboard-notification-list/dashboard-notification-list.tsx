import React, { FC, useState, useCallback } from "react";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { yesterday, soon, longer } from "../util/helpers";
import NotificationColumn from "./NotificationColumn";
import { useModalButtonHandler } from "../../../core/utils/modal";
import LoansGroupModal from "../../../components/GroupModal/LoansGroupModal";
import MaterialDetailsModal, {
  loanDetailsModalId,
  reservationDetailsModalId
} from "../../loan-list/modal/material-details-modal";
import MaterialDetails from "../../loan-list/modal/material-details";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import ReservationGroupModal from "../modal/ReservationsGroupModal";
import ReservationDetails from "../../reservation-list/modal/reservation-details/reservation-details";
import DeleteReservationModal, {
  deleteReservationModalId
} from "../../reservation-list/modal/delete-reservation/delete-reservation-modal";
import Notifications from "./Notifications";
import useReservations from "../../../core/utils/useReservations";
import useLoans from "../../../core/utils/useLoans";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import {
  constructModalId,
  getModalIds
} from "../../../core/utils/helpers/modal-helpers";
import { ListType } from "../../../core/utils/types/list-type";
import { useUrls } from "../../../core/utils/url";

export interface DashboardNotificationListProps {
  pageSize: number;
  columns: boolean;
}

const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  pageSize,
  columns
}) => {
  const t = useText();
  const u = useUrls();
  const physicalLoansUrl = u("physicalLoansUrl");
  const reservationsUrl = u("reservationsUrl");
  const {
    all: {
      reservations,
      readyToLoan: reservationsReadyToLoan,
      queued: reservationsQueued,
      isLoading: isLoadingReservations
    }
  } = useReservations();
  const {
    all: { loans, isLoading: isLoadingLoans },
    fbs: {
      overdue: loansOverduePhysical,
      soonOverdue: loansSoonOverduePhysical,
      farFromOverdue: loansFarFromOverduePhysical,
      isLoading: isLoadingLoansPhysical
    },
    publizon: {
      soonOverdue: loansSoonOverdueDigital,
      farFromOverdue: loansFarFromOverdueDigital,
      isLoading: isLoadingLoansDigital
    }
  } = useLoans();

  const [reservationsForDeleting, setReservationsForDeleting] = useState<
    ReservationType[]
  >([]);
  const [loansToDisplay, setLoansToDisplay] = useState<LoanType[] | null>(null);
  const [modalHeader, setModalHeader] = useState("");
  const { open } = useModalButtonHandler();
  const { dueDateModal, deleteReservations } = getModalIds();
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [modalLoan, setModalLoan] = useState<LoanType | null>(null);
  const [reservationForModal, setReservationForModal] =
    useState<ListType | null>(null);
  const [reservationModalId, setReservationModalId] = useState<string>("");
  const openModalHandler = useCallback(
    (modalId: string) => {
      setReservationModalId(modalId);
      open(modalId);
    },
    [open]
  );
  const {
    reservationsReady: reservationsReadyID,
    reservationsQueued: reservationsQueueID
  } = getModalIds();

  const openLoanDetailsModal = useCallback(
    (loan: LoanType) => {
      setModalLoan(loan);
      open(loanDetailsModalId(loan));
    },
    [open]
  );

  const openReservationDetailsModal = useCallback(
    (reservation: ReservationType) => {
      setReservationForModal(reservation);
      open(reservationDetailsModalId(reservation));
    },
    [open]
  );

  const openReservationDeleteModal = useCallback(() => {
    if (reservationForModal) {
      open(deleteReservationModalId(reservationForModal));
    }
  }, [open, reservationForModal]);

  const setReservationsToDelete = (resForDeleting: ReservationType[]) => {
    setReservationsForDeleting(resForDeleting);
    open(deleteReservations as string);
  };

  const openDueDateModal = useCallback(
    (dueDateInput: string) => {
      setDueDate(dueDateInput);

      switch (dueDateInput) {
        case yesterday:
          setLoansToDisplay(loansOverduePhysical);
          setModalHeader(t("loansOverdueText"));
          break;

        case soon:
          setLoansToDisplay(
            loansSoonOverduePhysical.concat(loansSoonOverdueDigital)
          );
          setModalHeader(t("loansSoonOverdueText"));
          break;

        case longer:
          setLoansToDisplay(
            loansFarFromOverduePhysical.concat(loansFarFromOverdueDigital)
          );
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
      loansFarFromOverduePhysical,
      loansOverduePhysical,
      loansSoonOverduePhysical,
      loansSoonOverdueDigital,
      loansFarFromOverdueDigital,
      t
    ]
  );

  const dashboardNotificationsLoan = [
    {
      listLength: loansOverduePhysical.length,
      badge: t("materialDetailsOverdueText"),
      header: t("loansOverdueText"),
      color: "danger",
      dataCy: "physical-loans-overdue",
      showNotificationDot: true,
      notificationClickEvent: () =>
        loansOverduePhysical.length === 1
          ? openLoanDetailsModal(loansOverduePhysical[0])
          : openDueDateModal(yesterday)
    },
    {
      listLength:
        loansSoonOverduePhysical.length + loansSoonOverdueDigital.length,
      badge: t("statusBadgeWarningText"),
      header: t("loansSoonOverdueText"),
      color: "warning",
      dataCy: "physical-loans-soon-overdue",
      showNotificationDot: true,
      notificationClickEvent: () =>
        loansSoonOverduePhysical.length === 1
          ? openLoanDetailsModal(loansSoonOverduePhysical[0])
          : openDueDateModal(soon)
    },
    {
      listLength:
        loansFarFromOverduePhysical.length + loansFarFromOverdueDigital.length,
      header: t("loansNotOverdueText"),
      dataCy: "loans-not-overdue",
      color: "neutral",
      showNotificationDot: false,
      notificationClickEvent: () =>
        loansFarFromOverduePhysical.length === 1
          ? openLoanDetailsModal(loansFarFromOverduePhysical[0])
          : openDueDateModal(longer)
    }
  ];

  const dashboardNotificationsReservations = [
    {
      listLength: reservationsReadyToLoan.length,
      header: t("reservationsReadyText"),
      badge: t("readyForLoanText"),
      dataCy: "reservations-ready",
      showNotificationDot: true,
      color: "info",
      notificationClickEvent: () =>
        reservationsReadyToLoan.length === 1
          ? openReservationDetailsModal(reservationsReadyToLoan[0])
          : openModalHandler(reservationsReadyID as string)
    },
    {
      listLength: reservationsQueued.length,
      header: t("reservationsStillInQueueForText"),
      dataCy: "reservations-queued",
      color: "neutral",
      showNotificationDot: false,
      notificationClickEvent: () =>
        reservationsQueued.length === 1
          ? openReservationDetailsModal(reservationsQueued[0])
          : openModalHandler(reservationsQueueID as string)
    }
  ];

  return (
    <>
      <div className="status-userprofile">
        {columns && (
          <>
            <NotificationColumn
              materials={dashboardNotificationsLoan}
              materialsCount={loans.length}
              header={t("physicalLoansText")}
              emptyListText={t("noPhysicalLoansText")}
              isLoading={
                isLoadingLoans ||
                isLoadingLoansPhysical ||
                isLoadingLoansDigital
              }
              linkText={t("dashboardLoansLinkText")}
              linkUrl={physicalLoansUrl}
            />
            <NotificationColumn
              materials={dashboardNotificationsReservations}
              materialsCount={reservations.length}
              header={t("reservationsText")}
              emptyListText={t("noReservationsText")}
              isLoading={isLoadingReservations}
              linkText={t("dashboardReservationsLinkText")}
              linkUrl={reservationsUrl}
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
          isLoading={
            isLoadingLoans ||
            isLoadingLoansPhysical ||
            isLoadingLoansDigital ||
            isLoadingReservations
          }
        />
      )}

      {modalLoan && (
        <MaterialDetailsModal modalId={loanDetailsModalId(modalLoan)}>
          <MaterialDetails
            item={modalLoan}
            loan={modalLoan}
            modalId={loanDetailsModalId(modalLoan)}
          />
        </MaterialDetailsModal>
      )}
      {dueDate && loans && loansToDisplay && (
        <LoansGroupModal
          pageSize={pageSize}
          openDetailsModal={openLoanDetailsModal}
          dueDate={dueDate}
          loansModal={loansToDisplay}
        >
          <SimpleModalHeader header={modalHeader} />
        </LoansGroupModal>
      )}
      {reservations && (
        <ReservationGroupModal
          openDetailsModal={openReservationDetailsModal}
          modalId={reservationModalId}
          setReservationsToDelete={setReservationsToDelete}
          pageSize={pageSize}
        />
      )}
      {reservationForModal && (
        <DeleteReservationModal
          modalId={deleteReservationModalId(reservationForModal)}
          reservations={[reservationForModal]}
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
          modalId={reservationDetailsModalId(reservationForModal)}
        >
          <ReservationDetails
            openReservationDeleteModal={openReservationDeleteModal}
            item={reservationForModal}
            reservation={reservationForModal}
          />
        </MaterialDetailsModal>
      )}
    </>
  );
};
export default DashboardNotificationList;
