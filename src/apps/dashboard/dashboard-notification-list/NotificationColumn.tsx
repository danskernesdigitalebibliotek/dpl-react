import React, { FC } from "react";
import Link from "../../../components/atoms/links/Link";
import DashboardNotification from "../dashboard-notification/dashboard-notification";
import EmptyList from "../../../components/empty-list/empty-list";

interface NotificationMaterialsList {
  listLength: number;
  badge?: string;
  header: string;
  color: string;
  showNotificationDot: boolean;
  notificationClickEvent: () => void;
}

export interface NotificationColumnProps {
  materials: NotificationMaterialsList[];
  materialsCount: number;
  headerUrl: URL;
  header: string;
  emptyListText: string;
}

const NotificationColumn: FC<NotificationColumnProps> = ({
  materials,
  materialsCount,
  headerUrl,
  emptyListText,
  header
}) => {
  return (
    <div className="status-userprofile__column my-32">
      <div className="link-filters">
        <div className="link-filters__tag-wrapper">
          <h2>
            <Link
              href={headerUrl}
              className="link-tag link-tag link-filters__tag"
            >
              {header}
            </Link>
            <span className="link-filters__counter">{materialsCount}</span>
          </h2>
        </div>
      </div>
      {materialsCount === 0 && <EmptyList emptyListText={emptyListText} />}
      {materialsCount !== 0 &&
        materials.map(
          ({
            listLength,
            header: headerNotification,
            color,
            notificationClickEvent,
            showNotificationDot,
            badge
          }) => (
            <DashboardNotification
              notificationNumber={listLength}
              notificationText={header}
              showNotificationDot={showNotificationDot}
              badge={badge}
              key={headerNotification}
              notificationColor={color}
              notificationClickEvent={notificationClickEvent}
            />
          )
        )}
    </div>
  );
};

export default NotificationColumn;
