import React, { FC, useCallback } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import StillInQueueModal from "./modal/still-in-queue-modal/still-in-queue-modal";
import { useModalButtonHandler } from "../../core/utils/modal";
import StillInQueueModalContent from "./modal/still-in-queue-modal/still-in-queue-modal-content";

const DashBoard: FC = () => {
  const t = useText();
  const { open } = useModalButtonHandler();

  const openQueueModal = useCallback(() => {
    open(`still-in-queue-modal`);
  }, [open]);
  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList openQueueModal={openQueueModal} />
      <StillInQueueModal modalId="still-in-queue-modal">
        <StillInQueueModalContent />
      </StillInQueueModal>
    </>
  );
};

export default DashBoard;
