import React, { FC } from "react";
import DashboardNotification from "../dashboard-notification/dashboard-notification";

export interface NotificationMaterialsList {
  listLength: number;
  badge?: string;
  header: string;
  color: string;
  dataCy: string;
  showNotificationDot: boolean;
  notificationClickEvent: () => void;
}

export interface NotificationsProps {
  materials: NotificationMaterialsList[];
  showOnlyNotifications: boolean;
}

const Notifications: FC<NotificationsProps> = ({
  materials,
  showOnlyNotifications
}) => {
  const displayedNotifications = showOnlyNotifications
    ? materials.filter(({ showNotificationDot }) => showNotificationDot)
    : materials;

  return (
    <>
      {displayedNotifications.map(
        ({
          listLength,
          header: headerNotification,
          color,
          notificationClickEvent,
          showNotificationDot,
          badge,
          dataCy
        }) => (
          <DashboardNotification
            notificationNumber={listLength}
            notificationText={headerNotification}
            showNotificationDot={showNotificationDot}
            badge={badge}
            dataCy={dataCy}
            key={headerNotification}
            notificationColor={color}
            notificationClickEvent={notificationClickEvent}
          />
        )
      )}
    </>
  );
};

export default Notifications;
