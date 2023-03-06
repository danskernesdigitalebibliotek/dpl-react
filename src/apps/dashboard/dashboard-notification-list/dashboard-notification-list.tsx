import React, { FC, useEffect, useState } from "react";
import { Link } from "../../../components/atoms/link";
import { useGetLoansV2, useGetReservationsV2 } from "../../../core/fbs/fbs";
import { useConfig } from "../../../core/utils/config";
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
import { ThresholdType } from "../../../core/utils/types/threshold-type";
import { useUrls } from "../../../core/utils/url";
import DashboardNotification from "../dashboard-notification/dashboard-notification";
import { yesterday, soon, longer } from "../util/helpers";

export interface DashboardNotificationListProps {
  openModalHandler: (modalId: string) => void;
  openDueDateModal: (dueDate: string) => void;
}
const DashboardNotificationList: FC<DashboardNotificationListProps> = ({
  openModalHandler,
  openDueDateModal
}) => {
  const t = useText();
  const config = useConfig();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });
  const {
    physicalLoansUrl,
    loansOverdueUrl,
    loansSoonOverdueUrl,
    loansNotOverdueUrl,
    reservationsUrl
  } = useUrls();
  const { data: fbsData } = useGetLoansV2();
  const { data: patronReservations } = useGetReservationsV2();
  const [patronReservationCount, setPatronReservationCount] =
    useState<number>();
  const [physicalLoans, setPhysicalLoans] = useState<LoanType[]>([]);
  const [physicalLoansCount, setPhysicalLoansCount] = useState<number>();
  const [physicalLoansOverdue, setPhysicalLoansOverdue] = useState<number>();
  const [physicalLoansSoonOverdue, setPhysicalLoansSoonOverdue] =
    useState<number>();
  const [physicalLoansNotOverdue, setPhysicalLoansNotOverdue] =
    useState<number>();
  const [reservationsReadyForPickup, setReservationsReadyForPickup] =
    useState<number>();
  const [reservationsStillInQueueFor, setReservationsStillInQueueFor] =
    useState<number>();
  useEffect(() => {
    if (fbsData) {
      setPhysicalLoans(mapFBSLoanToLoanType(fbsData));
    }
  }, [fbsData]);

  useEffect(() => {
    if (physicalLoans && warning) {
      // Set count of physical loans
      setPhysicalLoansCount(physicalLoans.length);

      // Set count of physical loans overdue
      setPhysicalLoansOverdue(filterLoansOverdue(physicalLoans).length);

      // Set count of physical loans soon to be overdue
      setPhysicalLoansSoonOverdue(
        filterLoansSoonOverdue(physicalLoans, warning).length
      );

      // Set count of physical loans not overdue
      setPhysicalLoansNotOverdue(
        filterLoansNotOverdue(physicalLoans, warning).length
      );
    }
  }, [physicalLoans, warning]);

  useEffect(() => {
    if (patronReservations) {
      const materialsReadyForPickup = getReadyForPickup(patronReservations);
      const materialsStillInQueue = getPhysicalReservations(patronReservations);
      setReservationsReadyForPickup(materialsReadyForPickup.length);
      setReservationsStillInQueueFor(materialsStillInQueue.length);
      setPatronReservationCount(patronReservations.length);
    }
  }, [patronReservations]);

  console.log(!!physicalLoansOverdue);
  console.log(physicalLoansOverdue);
  // Merge digital and physical loans, for easier filtration down the line.
  return (
    <div className="status-userprofile">
      <div className="status-userprofile__column">
        <div className="link-filters">
          <div className="link-filters__tag-wrapper">
            <Link
              href={physicalLoansUrl}
              className="link-tag link-tag link-filters__tag"
            >
              {t("physicalLoansText")}
            </Link>
            <span className="link-filters__counter">{physicalLoansCount}</span>
          </div>
        </div>
        {fbsData && !physicalLoansCount && physicalLoansCount !== 0 && (
          <div className="dpl-list-empty">{t("noPhysicalLoansText")}</div>
        )}
        {fbsData && physicalLoansCount !== 0 && (
          <>
            {!!physicalLoansOverdue && (
              <DashboardNotification
                notificationNumber={physicalLoansOverdue}
                notificationText={t("loansOverdueText")}
                notificationColor="danger"
                notificationLink={loansOverdueUrl}
                notificationClickEvent={openDueDateModal}
                notificationClickEventParam={yesterday}
              />
            )}
            {!!physicalLoansSoonOverdue && (
              <DashboardNotification
                notificationNumber={physicalLoansSoonOverdue}
                notificationText={t("loansSoonOverdueText")}
                notificationColor="warning"
                notificationLink={loansSoonOverdueUrl}
                notificationClickEvent={openDueDateModal}
                notificationClickEventParam={soon}
              />
            )}
            {!!physicalLoansNotOverdue && (
              <DashboardNotification
                notificationNumber={physicalLoansNotOverdue}
                notificationText={t("loansNotOverdueText")}
                notificationColor="neutral"
                notificationLink={loansNotOverdueUrl}
                notificationClickEvent={openDueDateModal}
                notificationClickEventParam={longer}
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
          !patronReservationCount &&
          !reservationsStillInQueueFor && (
            <div className="dpl-list-empty">{t("noReservationsText")}</div>
          )}
        {patronReservations && !!reservationsReadyForPickup && (
          <DashboardNotification
            notificationNumber={reservationsReadyForPickup}
            notificationText={t("reservationsReadyText")}
            notificationColor="info"
            notificationLink={reservationsUrl}
            notificationClickEvent={openModalHandler}
            notificationClickEventParam="ready-to-loan-modal"
          />
        )}
        {patronReservations && !!reservationsStillInQueueFor && (
          <DashboardNotification
            notificationNumber={reservationsStillInQueueFor}
            notificationText={t("reservationsStillInQueueForText")}
            notificationColor="neutral"
            notificationLink={reservationsUrl}
            notificationClickEvent={openModalHandler}
            notificationClickEventParam="still-in-queue-modal"
          />
        )}
      </div>
    </div>
  );
};
export default DashboardNotificationList;
