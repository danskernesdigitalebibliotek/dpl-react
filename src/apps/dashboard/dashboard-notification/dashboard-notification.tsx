import React, { FC } from "react";
import Arrow from "../../../components/atoms/icons/arrow/arrow";
import Link from "../../../components/atoms/links/Link";
import StatusBadge from "../../loan-list/materials/utils/status-badge";

interface DashboardNotificationProps {
  notificationNumber: number;
  showNotificationDot: boolean;
  notificationText: string;
  notificationColor: string;
  badge?: string;
  notificationLink: URL;
  notificationClickEvent?: () => void;
  notificationClickEventParam?: string;
}

const DashboardNotification: FC<DashboardNotificationProps> = ({
  notificationNumber,
  notificationText,
  notificationColor,
  notificationLink,
  notificationClickEvent,
  showNotificationDot,
  badge
}) => {
  if (notificationNumber === 0) return null;

  return (
    <button type="button" onClick={notificationClickEvent}>
      {!notificationClickEvent && (
        <Link
          href={notificationLink}
          className="list-dashboard shadow-medium-hover arrow__hover--right-small"
        >
          <div className={`number number--${notificationColor}`}>
            {notificationNumber}
          </div>
          <span className="list-dashboard__title text-header-h4">
            {notificationText}
          </span>
          <div className="list-dashboard__dot" />
          <div className="list-dashboard__arrow">
            <Arrow />
          </div>
        </Link>
      )}
      {notificationClickEvent && (
        <div className="list-dashboard shadow-medium-hover arrow__hover--right-small">
          <div className={`number number--${notificationColor}`}>
            {notificationNumber}
          </div>
          <span className="list-dashboard__title text-header-h4">
            {notificationText}
          </span>
          {notificationColor === "danger" && <StatusBadge dangerText={badge} />}
          {notificationColor === "warning" && (
            <StatusBadge warningText={badge} />
          )}
          {notificationColor === "info" && <StatusBadge infoText={badge} />}
          {showNotificationDot && <div className="list-dashboard__dot" />}
          <div className="list-dashboard__arrow">
            <Arrow />
          </div>
        </div>
      )}
    </button>
  );
};
export default DashboardNotification;
