import React, { FC } from "react";
import { ThresholdType } from "../../../../core/utils/types/threshold-type";
import { useConfig } from "../../../../core/utils/config";
import { daysBetweenTodayAndDate } from "../../../../core/utils/helpers/general";

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
  const config = useConfig();

  const {
    colorThresholds: { danger, warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });

  let daysBetweenTodayAndDue = 0;
  if (badgeDate) {
    daysBetweenTodayAndDue = daysBetweenTodayAndDate(badgeDate);
  }

  if (daysBetweenTodayAndDue < Number(danger) && dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  if (daysBetweenTodayAndDue <= Number(warning) && warningText) {
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
