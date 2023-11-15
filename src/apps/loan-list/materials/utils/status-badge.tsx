import React, { FC } from "react";
import { daysBetweenTodayAndDate } from "../../../../core/utils/helpers/general";
import useLoanThresholds from "../../../../core/utils/useLoanThresholds";

interface StatusBadgeProps {
  badgeDate?: string | null;
  warningText?: string;
  dangerText?: string;
  neutralText?: string;
  infoText?: string;
  showBadgeWithDueDate?: boolean;
}

const StatusBadge: FC<StatusBadgeProps> = ({
  badgeDate,
  warningText,
  showBadgeWithDueDate = false,
  dangerText,
  infoText,
  neutralText
}) => {
  const threshold = useLoanThresholds();
  const daysBetweenTodayAndDue = badgeDate
    ? daysBetweenTodayAndDate(badgeDate)
    : 0;

  if (daysBetweenTodayAndDue < threshold.danger && dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  if (daysBetweenTodayAndDue <= threshold.warning && warningText) {
    return (
      <div className="status-label status-label--warning">{warningText}</div>
    );
  }

  if (neutralText && !showBadgeWithDueDate) {
    return (
      <div className="status-label status-label--neutral">{neutralText}</div>
    );
  }

  if (infoText && !showBadgeWithDueDate) {
    return <div className="status-label status-label--info">{infoText}</div>;
  }

  if (dangerText && !showBadgeWithDueDate) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  return null;
};

export default StatusBadge;
