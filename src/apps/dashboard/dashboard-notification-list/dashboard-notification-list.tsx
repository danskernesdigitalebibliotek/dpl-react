import React, { FC, useState, useEffect, useCallback } from "react";
import {
  getPhysicalQueuedReservations,
  filterLoansNotOverdue,
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getModalIds,
  constructModalId
} from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { useUrls } from "../../../core/utils/url";
import { yesterday, soon, longer } from "../util/helpers";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { getReadyForPickup } from "../../reservation-list/utils/helpers";
import NotificationColumn from "./NotificationColumn";
import { useConfig } from "../../../core/utils/config";
import { ThresholdType } from "../../../core/utils/types/threshold-type";
import { useModalButtonHandler } from "../../../core/utils/modal";
import LoansGroupModal from "../../../components/GroupModal/LoansGroupModal";
import MaterialDetailsModal from "../../loan-list/modal/material-details-modal";
import MaterialDetails from "../../loan-list/modal/material-details";
import { ListType } from "../../../core/utils/types/list-type";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import ReservationGroupModal from "../modal/ReservationsGroupModal";
import ReservationDetails from "../../reservation-list/modal/reservation-details/reservation-details";
import DeleteReservationModal from "../../reservation-list/modal/delete-reservation/delete-reservation-modal";
import Notifications from "./Notifications";

export interface DashboardNotificationListProps {
  reservations: ReservationType[] | null;
  loans: LoanType[] | null;
  pageSize: number;
  columns: boolean;
}

const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  reservations,
  loans,
  pageSize,
  columns
}) => {
  const t = useText();

  const config = useConfig();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });
  const [modalReservationDetailsId, setModalReservationDetailsId] = useState<
    string | null
  >(null);
  const [physicalLoansFarFromOverdue, setPhysicalLoansFarFromOverdue] =
    useState<LoanType[]>([]);
  const [physicalLoansSoonOverdue, setPhysicalLoansSoonOverdue] = useState<
    LoanType[]
  >([]);
  const [physicalLoansOverdue, setPhysicalLoansOverdue] = useState<LoanType[]>(
    []
  );
  const [loansToDisplay, setLoansToDisplay] = useState<LoanType[] | null>(null);
  const [modalHeader, setModalHealer] = useState("");

  const { open } = useModalButtonHandler();
  const { loanDetails, dueDateModal, reservationDetails, deleteReservation } =
    getModalIds();
  const [dueDate, setDueDate] = useState<string | null>(null);

  const [modalLoan, setModalLoan] = useState<ListType | null>(null);
  const [reservationForModal, setReservationForModal] =
    useState<ListType | null>(null);
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

  useEffect(() => {
    if (loans) {
      setPhysicalLoansOverdue(filterLoansOverdue(loans));
      setPhysicalLoansSoonOverdue(filterLoansSoonOverdue(loans, warning));
      setPhysicalLoansFarFromOverdue(filterLoansNotOverdue(loans, warning));
    }
  }, [loans, warning]);

  const { reservationsReady, reservationsQueued } = getModalIds();
  const [queuedReservations, setQueuedReservations] = useState<
    ReservationType[]
  >([]);
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

  useEffect(() => {
    const loanForModal = loans?.find(
      ({ loanId }) => String(loanId) === modalLoanDetailsId
    );

    if (loanForModal) {
      setModalLoan(loanForModal);
    }
  }, [modalLoanDetailsId, loans]);

  useEffect(() => {
    const reservation = reservations?.find(
      ({ faust }) => String(faust) === modalReservationDetailsId
    );

    if (reservation) {
      setReservationForModal(reservation);
    }
  }, [modalReservationDetailsId, reservations]);

  const openReservationDeleteModal = useCallback(() => {
    if (reservationForModal) {
      open(
        `${deleteReservation}${
          reservationForModal.reservationId || reservationForModal.identifier
        }`
      );
    }
  }, [deleteReservation, open, reservationForModal]);

  const openDueDateModal = useCallback(
    (dueDateInput: string) => {
      setDueDate(dueDateInput);

      switch (dueDateInput) {
        case yesterday:
          setLoansToDisplay(physicalLoansOverdue);
          setModalHealer(t("loansOverdueText"));
          break;

        case soon:
          setLoansToDisplay(physicalLoansSoonOverdue);
          setModalHealer(t("loansSoonOverdueText"));
          break;

        case longer:
          setLoansToDisplay(physicalLoansFarFromOverdue);
          setModalHealer(t("loansNotOverdueText"));
          break;

        default:
          throw new Error("Invalid due date input");
      }
      open(constructModalId(dueDateModal as string, [dueDateInput]));
    },
    [
      dueDateModal,
      open,
      physicalLoansFarFromOverdue,
      physicalLoansOverdue,
      physicalLoansSoonOverdue,
      t
    ]
  );

  const dashboardNotificationsLoan = [
    {
      listLength: physicalLoansOverdue.length,
      badge: t("materialDetailsOverdueText"),
      header: t("loansOverdueText"),
      color: "danger",
      dataCy: "physical-loans-overdue",
      showNotificationDot: true,
      notificationClickEvent: () =>
        physicalLoansOverdue.length === 1
          ? openLoanDetailsModal(String(physicalLoansOverdue[0].loanId))
          : openDueDateModal(yesterday)
    },
    {
      listLength: physicalLoansSoonOverdue.length,
      badge: t("statusBadgeWarningText"),
      header: t("loansSoonOverdueText"),
      color: "warning",
      dataCy: "physical-loans-soon-overdue",
      showNotificationDot: true,
      notificationClickEvent: () =>
        physicalLoansSoonOverdue.length === 1
          ? openLoanDetailsModal(String(physicalLoansSoonOverdue[0].loanId))
          : openDueDateModal(soon)
    },
    {
      listLength: physicalLoansFarFromOverdue.length,
      header: t("loansNotOverdueText"),
      dataCy: "loans-not-overdue",
      color: "neutral",
      showNotificationDot: false,
      notificationClickEvent: () =>
        physicalLoansFarFromOverdue.length === 1
          ? openLoanDetailsModal(String(physicalLoansFarFromOverdue[0].loanId))
          : openDueDateModal(longer)
    }
  ];

  const readyToLoanReservations = reservations
    ? getReadyForPickup(reservations)
    : [];

  const dashboardNotificationsReservations = [
    {
      listLength: readyToLoanReservations.length,
      header: t("reservationsReadyText"),
      badge: t("readyForLoanText"),
      dataCy: "reservations-ready",
      showNotificationDot: true,
      color: "info",
      notificationClickEvent: () =>
        readyToLoanReservations.length === 1
          ? openReservationDetailsModal(
              String(readyToLoanReservations[0].faust)
            )
          : openModalHandler(reservationsReady as string)
    },
    {
      listLength: queuedReservations.length,
      header: t("reservationsStillInQueueForText"),
      dataCy: "reservations-queued",
      color: "neutral",
      showNotificationDot: false,
      notificationClickEvent: () =>
        readyToLoanReservations.length === 1
          ? openReservationDetailsModal(
              String(
                queuedReservations[0].identifier || queuedReservations[0].faust
              )
            )
          : openModalHandler(reservationsQueued as string)
    }
  ];

  useEffect(() => {
    if (reservations) {
      setQueuedReservations(getPhysicalQueuedReservations(reservations));
    }
  }, [reservations]);

  const physicalLoansCount =
    physicalLoansFarFromOverdue.length +
    physicalLoansOverdue.length +
    physicalLoansSoonOverdue.length;

  const reservationsCount =
    readyToLoanReservations.length + queuedReservations.length;

  return (
    <>
      <div className="status-userprofile">
        {columns && (
          <>
            <NotificationColumn
              materials={dashboardNotificationsLoan}
              materialsCount={physicalLoansCount}
              headerUrl={physicalLoansUrl}
              header={t("physicalLoansText")}
              emptyListText={t("noPhysicalLoansText")}
            />
            <NotificationColumn
              materials={dashboardNotificationsReservations}
              materialsCount={reservationsCount}
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

      <MaterialDetailsModal modalId={`${loanDetails}${modalLoanDetailsId}`}>
        <MaterialDetails
          faust={modalLoan?.faust}
          identifier={modalLoan?.identifier}
          loan={modalLoan as LoanType}
        />
      </MaterialDetailsModal>
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
          modalId={reservationModalId}
          reservations={reservations}
          pageSize={pageSize}
        />
      )}
      {reservationForModal && (
        <DeleteReservationModal
          modalId={`${deleteReservation}${
            reservationForModal.reservationId || reservationForModal.identifier
          }`}
          reservation={reservationForModal}
        />
      )}
      {reservationForModal && (
        <MaterialDetailsModal
          modalId={`${reservationDetails}${
            reservationForModal.faust || reservationForModal.identifier
          }`}
        >
          <ReservationDetails
            openReservationDeleteModal={openReservationDeleteModal}
            faust={reservationForModal.faust}
            identifier={reservationForModal.identifier}
            reservation={reservationForModal}
          />
        </MaterialDetailsModal>
      )}
    </>
  );
};
export default DashboardNotificationList;
