import React, { FC, useCallback, MouseEvent } from "react";
import Arrow from "../../../components/atoms/icons/arrow/arrow";
import Link from "../../../components/atoms/links/Link";

interface DashboardNotificationProps {
  notificationNumber: number;
  notificationText: string;
  notificationColor: string;
  notificationLink: URL;
  notificationClickEvent?: (modalId: string) => void | null;
  notificationClickEventParam?: string;
}

const DashboardNotification: FC<DashboardNotificationProps> = ({
  notificationNumber,
  notificationText,
  notificationColor,
  notificationLink,
  notificationClickEvent,
  notificationClickEventParam
}) => {
  const notificationClickEventHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (notificationClickEvent && notificationClickEventParam) {
        notificationClickEvent(notificationClickEventParam);
      }
    },
    [notificationClickEvent, notificationClickEventParam]
  );
  return (
    <button
      type="button"
      className="m-24"
      onClick={(e) => notificationClickEventHandler(e)}
    >
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
          <div className="list-dashboard__dot" />
          <div className="list-dashboard__arrow">
            <Arrow />
          </div>
        </div>
      )}
    </button>
  );
};
export default DashboardNotification;
