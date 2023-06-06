import React, { FC } from "react";
import Link from "../../../components/atoms/links/Link";
import Arrow from "../../../components/atoms/icons/arrow/arrow";

interface MenuNotificationProps {
  notificationNumber: number;
  notificationText: string;
  notificationColor: string;
  notificationLink: URL;
}

const MenuNotification: FC<MenuNotificationProps> = ({
  notificationNumber,
  notificationText,
  notificationColor,
  notificationLink
}) => {
  return (
    <li className="modal-profile__notification-item">
      <Link
        href={new URL(notificationLink)}
        className="list-dashboard shadow-medium-hover arrow__hover--right-small"
      >
        <div
          className={`color-secondary-gray number number--${notificationColor}`}
        >
          {notificationNumber}
        </div>
        <span className="list-dashboard__title text-header-h4 color-secondary-gray">
          {notificationText}
        </span>
        <div className="list-dashboard__dot" />
        <Arrow />
      </Link>
    </li>
  );
};
export default MenuNotification;
