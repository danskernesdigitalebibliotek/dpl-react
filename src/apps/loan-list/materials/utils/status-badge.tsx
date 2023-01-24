import React, { FC } from "react";
import { useConfig } from "../../../../core/utils/config";
import { daysBetweenTodayAndDate } from "../../../../core/utils/helpers/general";

interface StatusBadgeProps {
  dueDate?: string | null;
  warningText?: string;
  dangerText?: string;
  neutralText?: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({
  dueDate,
  warningText,
  dangerText,
  neutralText
}) => {
  const config = useConfig();
  if (!dueDate) return null;
  const dangerThreshold = Number(config("dangerThresholdConfig"));
  const warningThreshold = Number(config("warningThresholdConfig"));
  const daysBetweenTodayAndDue = daysBetweenTodayAndDate(dueDate);
  if (daysBetweenTodayAndDue < dangerThreshold && dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  if (daysBetweenTodayAndDue <= warningThreshold && warningText) {
    return (
      <div className="status-label status-label--warning">{warningText}</div>
    );
  }

  if (neutralText) {
    return (
      <div className="status-label status-label--neutral">{neutralText}</div>
    );
  }

  return null;
};

export default StatusBadge;
