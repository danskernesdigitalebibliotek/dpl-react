import React, { FC } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import StillInQueueModal from "./modal/still-in-queue-modal";

const DashBoard: FC = () => {
  const t = useText();
  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList />
      <StillInQueueModal modalId="HelloWorld123">
        <h3>Hello WOrld!</h3>
      </StillInQueueModal>
    </>
  );
};

export default DashBoard;
