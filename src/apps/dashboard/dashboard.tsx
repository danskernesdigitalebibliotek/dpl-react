import React, { FC } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import DashboardMyList from "./dashboard-mylist/dashboard-mylist";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";

const DashBoard: FC = () => {
  const t = useText();
  const {
    intermediateUrl,
    payOwedUrl,
    physicalLoansUrl,
    loansOverdueUrl,
    loansSoonOverdueUrl,
    loansNotOverdueUrl,
    reservationsUrl
  } = useUrls();
  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees
        intermediateText={t("intermediateText")}
        totalOwedText={t("totalOwedText")}
        payOwedText={t("payOwedText")}
        intermediateUrl={intermediateUrl}
        payOwedUrl={payOwedUrl}
      />
      <DashboardNotificationList
        physicalLoansText={t("physicalLoansText")}
        reservationsText={t("reservationsText")}
        loansOverdueText={t("loansOverdueText")}
        loansSoonOverdueText={t("loansSoonOverdueText")}
        loansNotOverdueText={t("loansNotOverdueText")}
        reservationsReadyText={t("reservationsReadyText")}
        noPhysicalLoansText={t("noPhysicalLoansText")}
        noReservationsText={t("noReservationsText")}
        physicalLoansUrl={physicalLoansUrl}
        loansOverdueUrl={loansOverdueUrl}
        loansSoonOverdueUrl={loansSoonOverdueUrl}
        loansNotOverdueUrl={loansNotOverdueUrl}
        reservationsUrl={reservationsUrl}
      />
      <DashboardMyList />
    </>
  );
};

export default DashBoard;
