import React, { FC, useCallback } from "react";
import DashboardFees from "./dashboard-fees/dashboard-fees";
import DashboardNotificationList from "./dashboard-notification-list/dashboard-notification-list";
import { useText } from "../../core/utils/text";
import StillInQueueModal from "./modal/still-in-queue-modal/still-in-queue-modal";
import { useModalButtonHandler } from "../../core/utils/modal";
import StillInQueueModalContent from "./modal/still-in-queue-modal/still-in-queue-modal-content";
import ReadyToLoanModalContent from "./modal/ready-for-loan-modal/ready-to-loan-modal-content";
import ReadyToLoanModal from "./modal/ready-for-loan-modal/ready-to-loan-modal";

const DashBoard: FC = () => {
  const t = useText();
  const { open } = useModalButtonHandler();

  const OpenModalHandler = useCallback(
    (modalId: string) => {
      if (modalId) {
        open(modalId);
      }
    },
    [open]
  );

  return (
    <>
      <h1>{t("yourProfileText")}</h1>
      <DashboardFees />
      <DashboardNotificationList OpenModalHandler={OpenModalHandler} />
      <StillInQueueModal modalId="still-in-queue-modal">
        <StillInQueueModalContent />
      </StillInQueueModal>
      <ReadyToLoanModal modalId="ready-to-loan-modal">
        <ReadyToLoanModalContent />
      </ReadyToLoanModal>
    </>
  );
};

export default DashBoard;
