import React, { FC } from "react";
import Link from "../../../components/atoms/links/Link";
import EmptyList from "../../../components/empty-list/empty-list";
import Notifications, { NotificationMaterialsList } from "./Notifications";

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
        <div className="link-filters__tag-wrapper mb-16">
          <h2 data-cy={`dashboard-${header.toLowerCase()}-header`}>
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
      {materialsCount !== 0 && (
        <Notifications
          showOnlyNotifications={false}
          materials={materials}
          showStatusLabel
        />
      )}
    </div>
  );
};

export default NotificationColumn;
