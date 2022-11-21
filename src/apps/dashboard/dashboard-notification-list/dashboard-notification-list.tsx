import React, { FC, useEffect, useState } from "react";
import { Link } from "../../../components/atoms/link";
import { useGetLoansV2, useGetReservationsV2 } from "../../../core/fbs/fbs";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue,
  filterLoansNotOverdue,
  getReadyForPickup
} from "../../../core/utils/helpers/general";
import { mapFBSLoanToLoanType } from "../../../core/utils/helpers/list-mapper";
import { LoanType } from "../../../core/utils/types/loan-type";
import DashboardNotification from "../dashboard-notification/dashboard-notification";

interface DashboardNotificationListProps {
  physicalLoansText: string;
  reservationsText: string;
  loansOverdueText: string;
  loansSoonOverdueText: string;
  loansNotOverdueText: string;
  reservationsReadyText: string;
  noPhysicalLoansText: string;
  noReservationsText: string;
  physicalLoansUrl: URL;
  loansOverdueUrl: URL;
  loansSoonOverdueUrl: URL;
  loansNotOverdueUrl: URL;
  reservationsUrl: URL;
}
const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  physicalLoansText,
  reservationsText,
  loansOverdueText,
  loansSoonOverdueText,
  loansNotOverdueText,
  reservationsReadyText,
  noPhysicalLoansText,
  noReservationsText,
  physicalLoansUrl,
  loansOverdueUrl,
  loansSoonOverdueUrl,
  loansNotOverdueUrl,
  reservationsUrl
}) => {
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
      setReservationsReadyForPickup(
        getReadyForPickup(patronReservations).length
      );
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
              {physicalLoansText}
            </Link>
            <span className="link-filters__counter">{physicalLoansCount}</span>
          </div>
        </div>
        {fbsData && physicalLoansCount === 0 && (
          <div className="dpl-list-empty">{noPhysicalLoansText}</div>
        )}
        {fbsData && physicalLoansCount !== 0 && (
          <>
            {physicalLoansOverdue && physicalLoansOverdue !== 0 && (
              <DashboardNotification
                notificationNumber={physicalLoansOverdue}
                notificationText={loansOverdueText}
                notificationColor="danger"
                notificationLink={new URL(loansOverdueUrl)}
              />
            )}
            {physicalLoansSoonOverdue && physicalLoansSoonOverdue !== 0 && (
              <DashboardNotification
                notificationNumber={physicalLoansSoonOverdue}
                notificationText={loansSoonOverdueText}
                notificationColor="warning"
                notificationLink={new URL(loansSoonOverdueUrl)}
              />
            )}
            {physicalLoansNotOverdue && physicalLoansNotOverdue !== 0 && (
              <DashboardNotification
                notificationNumber={physicalLoansNotOverdue}
                notificationText={loansNotOverdueText}
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
              href={new URL(reservationsUrl)}
              className="link-tag link-tag link-filters__tag"
            >
              {reservationsText}
            </Link>
            <span className="link-filters__counter">
              {patronReservationCount}
            </span>
          </div>
        </div>
        {patronReservations && patronReservationCount === 0 && (
          <div className="dpl-list-empty">{noReservationsText}</div>
        )}
        {patronReservations && reservationsReadyForPickup !== 0 && (
          <DashboardNotification
            notificationNumber={reservationsReadyForPickup}
            notificationText={reservationsReadyText}
            notificationColor="info"
            notificationLink={new URL(reservationsUrl)}
          />
        )}
        {/* <DashboardNotification
              notificationNumber={5}
              notificationText="test5"
              notificationColor="neutral"
              notificationLink={new URL("https://www.google.dk")}
            /> */}
      </div>
    </div>
  );
};
export default DashboardNotificationList;
