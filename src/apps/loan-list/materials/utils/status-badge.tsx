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
}

const StatusBadge: FC<StatusBadgeProps> = ({
  badgeDate,
  warningText,
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

  if (infoText) {
    return <div className="status-label status-label--info">{infoText}</div>;
  }

  if (dangerText) {
    return (
      <div className="status-label status-label--danger">{dangerText}</div>
    );
  }

  return null;
};

export default StatusBadge;
