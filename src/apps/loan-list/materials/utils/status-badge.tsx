import React, { FC } from "react";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";
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
  if (!dueDate) return null;

  const daysBetweenTodayAndDue = daysBetweenTodayAndDate(dueDate);
  if (daysBetweenTodayAndDue < statusThreshold.danger && dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  if (daysBetweenTodayAndDue <= statusThreshold.warning && warningText) {
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
