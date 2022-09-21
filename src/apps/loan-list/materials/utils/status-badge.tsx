import React, { FC } from "react";
import dayjs from "dayjs";
import { getThresholds } from "../../../../core/utils/helpers/general";

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
  const thresholds = getThresholds();

  const daysBetweenTodayAndDue = Math.ceil(dueD.diff(today, "day", true));

  if (daysBetweenTodayAndDue <= thresholds.danger && dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  if (daysBetweenTodayAndDue <= thresholds.warning && warningText) {
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
