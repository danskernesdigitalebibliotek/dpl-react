import React, { FC } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";

const DashBoard: FC = () => {
  const t = useText();
  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList />
    </>
  );
};

export default DashBoard;
