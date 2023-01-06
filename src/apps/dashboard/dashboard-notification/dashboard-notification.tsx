import React, { FC } from "react";
import Arrow from "../../../components/atoms/icons/arrow/arrow";
import { Link } from "../../../components/atoms/link";

interface DashboardNotificationProps {
  notificationNumber: number;
  notificationText: string;
  notificationColor: string;
  notificationLink: URL;
}

const DashboardNotification: FC<DashboardNotificationProps> = ({
  notificationNumber,
  notificationText,
  notificationColor,
  notificationLink
}) => {
  return (
    <div className="m-24">
      <Link
        href={new URL(notificationLink)}
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
    </div>
  );
};
export default DashboardNotification;
