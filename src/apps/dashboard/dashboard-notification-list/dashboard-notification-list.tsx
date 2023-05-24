import React, { FC, useEffect, useState } from "react";
import Link from "../../../components/atoms/links/Link";
import { useGetLoansV2, useGetReservationsV2 } from "../../../core/fbs/fbs";
import { useConfig } from "../../../core/utils/config";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue,
  filterLoansNotOverdue,
  getPhysicalQueuedReservations,
  getModalIds,
  getColors
} from "../../../core/utils/helpers/general";
import {
  mapFBSLoanToLoanType,
  mapFBSReservationToReservationType
} from "../../../core/utils/helpers/list-mapper";
import { useText } from "../../../core/utils/text";
import { LoanType } from "../../../core/utils/types/loan-type";
import { ThresholdType } from "../../../core/utils/types/threshold-type";
import { useUrls } from "../../../core/utils/url";
import DashboardNotification from "../dashboard-notification/dashboard-notification";
import { yesterday, soon, longer } from "../util/helpers";
import { getReadyForPickup } from "../../reservation-list/utils/helpers";

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

  const { reservationsReady, reservationsQueued } = getModalIds();
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
    useState<number>(0);
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
    useState<number>(0);
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
      const materialsReadyForPickup = getReadyForPickup(
        mapFBSReservationToReservationType(patronReservations)
      );
      const materialsStillInQueue =
        getPhysicalQueuedReservations(patronReservations);
      setReservationsReadyForPickup(materialsReadyForPickup.length);
      setReservationsStillInQueueFor(materialsStillInQueue.length);
      setPatronReservationCount(patronReservations.length);
    }
  }, [patronReservations]);

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
        {fbsData && !physicalLoansCount && (
          <div className="dpl-list-empty">{t("noPhysicalLoansText")}</div>
        )}
        {fbsData && !!physicalLoansCount && (
          <>
            {physicalLoansOverdue && physicalLoansOverdue && (
              <DashboardNotification
                notificationNumber={physicalLoansOverdue}
                notificationText={t("loansOverdueText")}
                notificationColor="danger"
                notificationLink={loansOverdueUrl}
                notificationClickEvent={() => openDueDateModal(yesterday)}
              />
            )}
            {physicalLoansSoonOverdue && physicalLoansSoonOverdue && (
              <DashboardNotification
                notificationNumber={physicalLoansSoonOverdue}
                notificationText={t("loansSoonOverdueText")}
                notificationColor="warning"
                notificationLink={loansSoonOverdueUrl}
                notificationClickEvent={() => openDueDateModal(soon)}
              />
            )}
            {physicalLoansNotOverdue && !!physicalLoansNotOverdue && (
              <DashboardNotification
                notificationNumber={physicalLoansNotOverdue}
                notificationText={t("loansNotOverdueText")}
                notificationColor="neutral"
                notificationLink={loansNotOverdueUrl}
                notificationClickEvent={() => openDueDateModal(longer)}
              />
            )}
          </>
        )}
      </div>
      <div className="status-userprofile__column my-32">
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
        {patronReservationCount === 0 && reservationsStillInQueueFor === 0 && (
          <div className="dpl-list-empty">{t("noReservationsText")}</div>
        )}
        {!!reservationsReadyForPickup && (
          <DashboardNotification
            notificationNumber={reservationsReadyForPickup}
            notificationText={t("reservationsReadyText")}
            notificationColor="info"
            notificationLink={reservationsUrl}
            notificationClickEvent={() =>
              openModalHandler(reservationsReady as string)
            }
          />
        )}
        {!!reservationsStillInQueueFor && (
          <DashboardNotification
            notificationNumber={reservationsStillInQueueFor}
            notificationText={t("reservationsStillInQueueForText")}
            notificationColor="neutral"
            notificationLink={reservationsUrl}
            notificationClickEvent={() =>
              openModalHandler(reservationsQueued as string)
            }
          />
        )}
      </div>
    </div>
  );
};
export default DashboardNotificationList;
