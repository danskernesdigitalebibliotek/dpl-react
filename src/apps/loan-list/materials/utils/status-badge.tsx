import React, { FC } from "react";
import clsx from "clsx";
import { daysBetweenTodayAndDate } from "../../../../core/utils/helpers/general";
import useLoanThresholds from "../../../../core/utils/useLoanThresholds";

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
      <div
        className={clsx("status-label status-label--danger", [
          { "hide-on-desktop ml-16": mobileVersion }
        ])}
      >
        {dangerText}
      </div>
    );
  }

  if (daysBetweenTodayAndDue <= threshold.warning && warningText) {
    return (
      <div
        className={clsx("status-label status-label--warning", [
          { "hide-on-desktop ml-16": mobileVersion }
        ])}
      >
        {warningText}
      </div>
    );
  }

  if (neutralText && !showBadgeWithDueDate) {
    return (
      <div
        className={clsx("status-label status-label--neutral", [
          { "hide-on-desktop ml-16": mobileVersion }
        ])}
      >
        {neutralText}
      </div>
    );
  }

  if (infoText && !showBadgeWithDueDate) {
    return (
      <div
        className={clsx("status-label status-label--info", [
          { "hide-on-desktop ml-16": mobileVersion }
        ])}
      >
        {infoText}
      </div>
    );
  }

  if (dangerText && !showBadgeWithDueDate) {
    return (
      <div
        className={clsx("status-label status-label--danger", [
          { "hide-on-desktop ml-16": mobileVersion }
        ])}
      >
        {dangerText}
      </div>
    );
  }

  return null;
};

export default StatusBadge;
