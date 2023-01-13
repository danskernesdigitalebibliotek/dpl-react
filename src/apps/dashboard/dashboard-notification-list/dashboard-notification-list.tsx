import React, { FC, useEffect, useState } from "react";
import { Link } from "../../../components/atoms/link";
import { useGetLoansV2, useGetReservationsV2 } from "../../../core/fbs/fbs";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue,
  filterLoansNotOverdue,
  getReadyForPickup,
  getPhysicalReservations
} from "../../../core/utils/helpers/general";
import { mapFBSLoanToLoanType } from "../../../core/utils/helpers/list-mapper";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { useUrls } from "../../../core/utils/url";
import DashboardNotification from "../dashboard-notification/dashboard-notification";

export interface DashboardNotificationListProps {
  openQueueModal: (modalId: string) => void;
}
const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  openQueueModal
}) => {
  const t = useText();
  const {
    physicalLoansUrl,
    loansOverdueUrl,
    loansSoonOverdueUrl,
    loansNotOverdueUrl,
    reservationsUrl
  } = useUrls();
  const { data: fbsData } = useGetLoansV2();
  const { data: patronReservations } = useGetReservationsV2();
  const [patronReservationCount, setPatronReservationCount] = useState(0);
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[]>([]);
  const [physicalLoansCount, setPhysicalLoansCount] = useState(0);
  const [physicalLoansOverdue, setPhysicalLoansOverdue] = useState<number>(0);
  const [physicalLoansSoonOverdue, setPhysicalLoansSoonOverdue] =
    useState<number>(0);
  const [physicalLoansNotOverdue, setPhysicalLoansNotOverdue] =
    useState<number>(0);
  const [reservationsReadyForPickup, setReservationsReadyForPickup] =
    useState<number>(0);
  const [reservationsStillInQueueFor, setReservationsStillInQueueFor] =
    useState<number>(0);

  useEffect(() => {
    if (fbsData) {
      setPhysicalLoans(mapFBSLoanToLoanType(fbsData));
    }
  }, [fbsData]);

  useEffect(() => {
    if (physicalLoans) {
      // Set count of physical loans
      setPhysicalLoansCount(physicalLoans.length);

      // Set count of physical loans overdue
      setPhysicalLoansOverdue(filterLoansOverdue(physicalLoans).length);

      // Set count of physical loans soon to be overdue
      setPhysicalLoansSoonOverdue(filterLoansSoonOverdue(physicalLoans).length);

      // Set count of physical loans not overdue
      setPhysicalLoansNotOverdue(filterLoansNotOverdue(physicalLoans).length);
    }
  }, [physicalLoans]);

  useEffect(() => {
    if (patronReservations) {
      const materialsReadyForPickup = getReadyForPickup(patronReservations);
      const materialsStillInQueue = getPhysicalReservations(patronReservations);
      setReservationsReadyForPickup(materialsReadyForPickup.length);
      setReservationsStillInQueueFor(materialsStillInQueue.length);
      setPatronReservationCount(patronReservations.length);
    }
  }, [patronReservations]);

  // Merge digital and physical loans, for easier filtration down the line.
  return (
    <div className="status-userprofile">
      <div className="status-userprofile__column">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <Link
              href={new URL(physicalLoansUrl)}
              className="link-tag link-tag link-filters__tag"
            >
              {t("physicalLoansText")}
            </Link>
            <span className="link-filters__counter">{physicalLoansCount}</span>
          </div>
        </div>
        {fbsData && physicalLoansCount === 0 && (
          <div className="dpl-list-empty">{t("noPhysicalLoansText")}</div>
        )}
        {fbsData && physicalLoansCount !== 0 && (
          <>
            {physicalLoansOverdue && physicalLoansOverdue !== 0 && (
              <DashboardNotification
                notificationNumber={physicalLoansOverdue}
                notificationText={t("loansOverdueText")}
                notificationColor="danger"
                notificationLink={new URL(loansOverdueUrl)}
              />
            )}
            {physicalLoansSoonOverdue && physicalLoansSoonOverdue !== 0 && (
              <DashboardNotification
                notificationNumber={physicalLoansSoonOverdue}
                notificationText={t("loansSoonOverdueText")}
                notificationColor="warning"
                notificationLink={new URL(loansSoonOverdueUrl)}
              />
            )}
            {physicalLoansNotOverdue && physicalLoansNotOverdue !== 0 && (
              <DashboardNotification
                notificationNumber={physicalLoansNotOverdue}
                notificationText={t("loansNotOverdueText")}
                notificationColor="neutral"
                notificationLink={new URL(loansNotOverdueUrl)}
              />
            )}
          </>
        )}
      </div>
      <div className="status-userprofile__column">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <Link
              href={reservationsUrl}
              className="link-tag link-tag link-filters__tag"
            >
              {t("reservationsText")}
            </Link>
            <span className="link-filters__counter">
              {patronReservationCount}
            </span>
          </div>
        </div>
        {patronReservations &&
          patronReservationCount === 0 &&
          reservationsStillInQueueFor === 0 && (
            <div className="dpl-list-empty">{t("noReservationsText")}</div>
          )}
        {patronReservations && reservationsReadyForPickup !== 0 && (
          <DashboardNotification
            notificationNumber={reservationsReadyForPickup}
            notificationText={t("reservationsReadyText")}
            notificationColor="info"
            notificationLink={reservationsUrl}
          />
        )}
        {patronReservations && reservationsStillInQueueFor !== 0 && (
          <DashboardNotification
            notificationNumber={reservationsStillInQueueFor}
            notificationText={t("reservationsStillInQueueForText")}
            notificationColor="neutral"
            notificationLink={reservationsUrl}
            notificationClickEvent={openQueueModal}
            notificationClickEventModalId="still-in-queue-modal"
          />
        )}
      </div>
    </div>
  );
};
export default DashboardNotificationList;
