import React, { FC, useState, useEffect } from "react";
import {
  getModalIds,
  getPhysicalQueuedReservations
} from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { useUrls } from "../../../core/utils/url";
import {
  yesterday,
  soon,
  longer,
  getReservedReservations
} from "../util/helpers";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { getReadyForPickup } from "../../reservation-list/utils/helpers";
import NotificationColumn from "./NotificationColumn";

export interface DashboardNotificationListProps {
  openModalHandler: (modalId: string) => void;
  openDueDateModal: (dueDate: string) => void;
  openLoanDetailsModal: (modalId: string) => void;
  openReservationDetailsModal: (modalId: string) => void;
  physicalReservations: ReservationType[];
  digitalReservations: ReservationType[];
  physicalLoansFarFromOverdue: LoanType[];
  physicalLoansOverdue: LoanType[];
  physicalLoansSoonOverdue: LoanType[];
}

const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  openModalHandler,
  openDueDateModal,
  openLoanDetailsModal,
  openReservationDetailsModal,
  physicalReservations,
  digitalReservations,
  physicalLoansOverdue,
  physicalLoansSoonOverdue,
  physicalLoansFarFromOverdue
}) => {
  const t = useText();

  const { reservationsReady, reservationsQueued } = getModalIds();
  const [queuedReservations, setQueuedReservations] = useState<
    ReservationType[]
  >([]);
  const { physicalLoansUrl, reservationsUrl } = useUrls();

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

  const readyToLoanReservations = getReadyForPickup(physicalReservations);

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
    setQueuedReservations([
      ...getReservedReservations(digitalReservations),
      ...getPhysicalQueuedReservations(physicalReservations)
    ]);
  }, [digitalReservations, physicalReservations]);

  const physicalLoansCount =
    physicalLoansFarFromOverdue.length +
    physicalLoansOverdue.length +
    physicalLoansSoonOverdue.length;

  const reservationsCount =
    readyToLoanReservations.length + queuedReservations.length;

  // Merge digital and physical loans, for easier filtration down the line.
  return (
    <div className="status-userprofile">
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
    </div>
  );
};
export default DashboardNotificationList;
