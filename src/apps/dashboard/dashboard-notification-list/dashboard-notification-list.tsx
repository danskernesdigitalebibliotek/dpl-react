import React, { FC, useState, useEffect } from "react";
import Link from "../../../components/atoms/links/Link";
import {
  getModalIds,
  getPhysicalQueuedReservations
} from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { useUrls } from "../../../core/utils/url";
import DashboardNotification from "../dashboard-notification/dashboard-notification";
import {
  yesterday,
  soon,
  longer,
  getReservedReservations
} from "../util/helpers";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import { getReadyForPickup } from "../../reservation-list/utils/helpers";

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
  const {
    physicalLoansUrl,
    loansOverdueUrl,
    loansSoonOverdueUrl,
    loansNotOverdueUrl,
    reservationsUrl
  } = useUrls();

  const dashboardNotificationsLoan = [
    {
      list: physicalLoansOverdue,
      header: t("loansOverdueText"),
      color: "danger",
      url: loansOverdueUrl,
      showNotificationDot: true,
      clickEvent: () =>
        physicalLoansOverdue.length === 1
          ? openLoanDetailsModal(String(physicalLoansOverdue[0].loanId))
          : openDueDateModal(yesterday)
    },
    {
      list: physicalLoansSoonOverdue,
      header: t("loansSoonOverdueText"),
      color: "warning",
      url: loansSoonOverdueUrl,
      showNotificationDot: true,
      clickEvent: () =>
        physicalLoansSoonOverdue.length === 1
          ? openLoanDetailsModal(String(physicalLoansSoonOverdue[0].loanId))
          : openDueDateModal(soon)
    },
    {
      list: physicalLoansFarFromOverdue,
      header: t("loansNotOverdueText"),
      color: "neutral",
      url: loansNotOverdueUrl,
      showNotificationDot: false,
      clickEvent: () =>
        physicalLoansFarFromOverdue.length === 1
          ? openLoanDetailsModal(String(physicalLoansFarFromOverdue[0].loanId))
          : openDueDateModal(longer)
    }
  ];

  const readyToLoanReservations = getReadyForPickup(physicalReservations);

  const dashboardNotificationsReservations = [
    {
      list: readyToLoanReservations,
      header: t("reservationsReadyText"),
      showNotificationDot: true,
      color: "info",
      url: reservationsUrl,
      clickEvent: () =>
        readyToLoanReservations.length === 1
          ? openReservationDetailsModal(
              String(readyToLoanReservations[0].faust)
            )
          : openModalHandler(reservationsReady as string)
    },
    {
      list: queuedReservations,
      header: t("reservationsStillInQueueForText"),
      color: "neutral",
      showNotificationDot: false,
      url: reservationsUrl,
      clickEvent: () =>
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
      <div className="status-userprofile__column my-32">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <h2>
              <Link
                href={physicalLoansUrl}
                className="link-tag link-tag link-filters__tag"
              >
                {t("physicalLoansText")}
              </Link>
              <span className="link-filters__counter">
                {physicalLoansCount}
              </span>
            </h2>
          </div>
        </div>
        {physicalLoansCount === 0 && (
          <div className="dpl-list-empty">{t("noPhysicalLoansText")}</div>
        )}
        {physicalLoansCount !== 0 &&
          dashboardNotificationsLoan.map(
            ({ list, header, color, url, clickEvent, showNotificationDot }) => (
              <DashboardNotification
                showNotificationDot={showNotificationDot}
                notificationNumber={list.length}
                notificationText={header}
                key={header}
                notificationColor={color}
                notificationLink={url}
                notificationClickEvent={clickEvent}
              />
            )
          )}
      </div>
      <div className="status-userprofile__column my-32">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <h2>
              <Link
                href={reservationsUrl}
                className="link-tag link-tag link-filters__tag"
              >
                {t("reservationsText")}
              </Link>
              <span className="link-filters__counter">{reservationsCount}</span>
            </h2>
          </div>
        </div>
        {reservationsCount === 0 && (
          <div className="dpl-list-empty">{t("noReservationsText")}</div>
        )}
        {reservationsCount !== 0 &&
          dashboardNotificationsReservations.map(
            ({ list, header, color, url, clickEvent, showNotificationDot }) => (
              <DashboardNotification
                notificationNumber={list.length}
                notificationText={header}
                showNotificationDot={showNotificationDot}
                key={header}
                notificationColor={color}
                notificationLink={url}
                notificationClickEvent={clickEvent}
              />
            )
          )}
      </div>
    </div>
  );
};
export default DashboardNotificationList;
