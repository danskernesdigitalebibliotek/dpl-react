import React, { FC } from "react";
import Arrow from "../../../components/atoms/icons/arrow/arrow";
import StatusBadge from "../../loan-list/materials/utils/status-badge";

interface DashboardNotificationProps {
  notificationNumber: number;
  showNotificationDot: boolean;
  notificationText: string;
  notificationColor: string;
  badge?: string;
  notificationClickEvent: () => void;
  notificationClickEventParam?: string;
}

const DashboardNotification: FC<DashboardNotificationProps> = ({
  notificationNumber,
  notificationText,
  notificationColor,
  notificationClickEvent,
  showNotificationDot,
  badge
}) => {
  if (notificationNumber === 0) return null;

  return (
    <button type="button" onClick={notificationClickEvent}>
      <div className="list-dashboard shadow-medium-hover arrow__hover--right-small">
        <div className={`number number--${notificationColor}`}>
          {notificationNumber}
        </div>
        <span className="list-dashboard__title text-header-h4">
          {notificationText}
        </span>
        {notificationColor === "danger" && <StatusBadge dangerText={badge} />}
        {notificationColor === "warning" && <StatusBadge warningText={badge} />}
        {notificationColor === "info" && <StatusBadge infoText={badge} />}
        {showNotificationDot && <div className="list-dashboard__dot" />}
        <div className="list-dashboard__arrow">
          <Arrow />
        </div>
      </div>
    </button>
  );
};
export default DashboardNotification;
