import React from "react";
import dayjs from "dayjs";
import statusThreshold from "../../../../core/configuration/status-thresholds.json";
import { useText } from "../../../../core/utils/text";

interface StatusBadgeProps {
  dueDate: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ dueDate }) => {
  const t = useText();
  const dueD = dayjs(dueDate);
  const today = dayjs();

  const daysBetweenTodayAndDue = Math.floor(dueD.diff(today, "day", true));

  if (daysBetweenTodayAndDue <= statusThreshold.danger) {
    return (
      <div className="status-label status-label--danger">
        {t("loanListStatusBadgeDangerText")}
      </div>
    );
  }
  if (daysBetweenTodayAndDue <= statusThreshold.warning) {
    return (
      <div className="status-label status-label--warning">
        {t("loanListStatusBadgeWarningText")}
      </div>
    );
  }

  return null;
};

export default StatusBadge;
