import React, { FC } from "react";
import { calculateRoundedUpDaysUntil } from "../../../../core/utils/helpers/date";
import useLoanThresholds from "../../../../core/utils/useLoanThresholds";
import StatusBadgeContent from "./status-badge-content";

interface StatusBadgeProps {
  badgeDate?: string | null;
  warningText?: string;
  dangerText?: string;
  neutralText?: string;
  infoText?: string;
  showBadgeWithDueDate?: boolean;
  mobileVersion?: boolean;
}

const StatusBadge: FC<StatusBadgeProps> = ({
  badgeDate,
  warningText,
  showBadgeWithDueDate = false,
  dangerText,
  infoText,
  neutralText,
  mobileVersion = false
}) => {
  const threshold = useLoanThresholds();
  const daysBetweenTodayAndDue = badgeDate
    ? calculateRoundedUpDaysUntil(badgeDate)
    : 0;

  if (daysBetweenTodayAndDue < threshold.danger && dangerText) {
    return (
      <StatusBadgeContent
        isMobileVersion={mobileVersion}
        text={dangerText}
        statusLabelType="danger"
      />
    );
  }

  if (daysBetweenTodayAndDue <= threshold.warning && warningText) {
    return (
      <StatusBadgeContent
        isMobileVersion={mobileVersion}
        text={warningText}
        statusLabelType="warning"
      />
    );
  }

  if (neutralText && !showBadgeWithDueDate) {
    return (
      <StatusBadgeContent
        isMobileVersion={mobileVersion}
        text={neutralText}
        statusLabelType="neutral"
      />
    );
  }

  if (infoText && !showBadgeWithDueDate) {
    return (
      <StatusBadgeContent
        isMobileVersion={mobileVersion}
        text={infoText}
        statusLabelType="info"
      />
    );
  }

  if (dangerText && !showBadgeWithDueDate) {
    return (
      <StatusBadgeContent
        isMobileVersion={mobileVersion}
        text={dangerText}
        statusLabelType="danger"
      />
    );
  }

  return null;
};

export default StatusBadge;
