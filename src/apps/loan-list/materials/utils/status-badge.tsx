import React, { FC } from "react";
import { ThresholdType } from "../../../../core/utils/types/threshold-type";
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

  const {
    colorThresholds: { danger, warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });

  const daysBetweenTodayAndDue = daysBetweenTodayAndDate(dueDate);
  if (daysBetweenTodayAndDue < danger && dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  if (daysBetweenTodayAndDue <= warning && warningText) {
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
