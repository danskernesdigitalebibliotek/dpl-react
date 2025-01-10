import React, { FC } from "react";
import DashboardNotification from "../dashboard-notification/dashboard-notification";
import NotificationSkeleton from "../dashboard-notification/notification-skeleton";

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
  showOnlyNotifications?: boolean;
  showStatusLabel?: boolean;
  isLoading?: boolean;
}

const Notifications: FC<NotificationsProps> = ({
  materials,
  showOnlyNotifications = false,
  showStatusLabel = false,
  isLoading = false
}) => {
  const displayedNotifications = showOnlyNotifications
    ? materials.filter(({ showNotificationDot }) => showNotificationDot)
    : materials;

  // We don't want to keep loading for all the data because we don't use
  // the full extent - knowing there are any notifications is enough
  if (isLoading && displayedNotifications.length === 0) {
    return (
      <>
        {[0, 1].map((number) => {
          return <NotificationSkeleton key={number} />;
        })}
      </>
    );
  }

  return (
    <>
      {displayedNotifications.map(
        ({
          listLength,
          header: headerNotification,
          color,
          notificationClickEvent,
          badge,
          dataCy
        }) => (
          <DashboardNotification
            notificationNumber={listLength}
            notificationText={headerNotification}
            badge={badge}
            dataCy={dataCy}
            key={headerNotification}
            notificationColor={color}
            notificationClickEvent={notificationClickEvent}
            showStatusLabel={showStatusLabel}
          />
        )
      )}
    </>
  );
};

export default Notifications;
