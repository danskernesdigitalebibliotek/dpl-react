import React, { FC } from "react";
import dayjs from "dayjs";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";

interface StatusBadgeProps {
  dueDate: string;
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
  const dueD = dayjs(dueDate);
  const today = dayjs();

  const daysBetweenTodayAndDue = Math.ceil(dueD.diff(today, "day", true));

  if (daysBetweenTodayAndDue <= statusThreshold.danger && dangerText) {
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
