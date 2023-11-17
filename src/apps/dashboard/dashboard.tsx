import React, { FC } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";

interface DashboardProps {
  pageSize: number;
}

const DashBoard: FC<DashboardProps> = ({ pageSize }) => {
  const t = useText();

  return (
    <div className="dashboard-page">
      <h1 className="text-header-h1 my-32" data-cy="dashboard-header">
        {t("yourProfileText")}
      </h1>
      <DashboardFees />
      <DashboardNotificationList columns pageSize={pageSize} />
    </div>
  );
};

export default DashBoard;
