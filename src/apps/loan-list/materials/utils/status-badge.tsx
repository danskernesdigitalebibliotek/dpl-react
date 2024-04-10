import React, { FC } from "react";
import { daysBetweenTodayAndDate } from "../../../../core/utils/helpers/general";
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
    ? daysBetweenTodayAndDate(badgeDate)
    : 0;

  if (daysBetweenTodayAndDue < threshold.danger && dangerText) {
    return (
      <StatusBadgeContent
        mobileVersion={mobileVersion}
        text={dangerText}
        statusLabelType="danger"
      />
    );
  }

  if (daysBetweenTodayAndDue <= threshold.warning && warningText) {
    return (
      <StatusBadgeContent
        mobileVersion={mobileVersion}
        text={warningText}
        statusLabelType="warning"
      />
    );
  }

  if (neutralText && !showBadgeWithDueDate) {
    return (
      <StatusBadgeContent
        mobileVersion={mobileVersion}
        text={neutralText}
        statusLabelType="neutral"
      />
    );
  }

  if (infoText && !showBadgeWithDueDate) {
    return (
      <StatusBadgeContent
        mobileVersion={mobileVersion}
        text={infoText}
        statusLabelType="info"
      />
    );
  }

  if (dangerText && !showBadgeWithDueDate) {
    return (
      <StatusBadgeContent
        mobileVersion={mobileVersion}
        text={dangerText}
        statusLabelType="danger"
      />
    );
  }

  return null;
};

export default StatusBadge;
