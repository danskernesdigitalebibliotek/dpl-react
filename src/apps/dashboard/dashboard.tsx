import React, { FC } from "react";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";

const DashBoard: FC = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <DashboardNotificationList />
    </>
  );
};

export default DashBoard;
