import React, { FC } from "react";
import EmptyList from "../../../components/empty-list/empty-list";
import Notifications, { NotificationMaterialsList } from "./Notifications";
import NotificationSkeleton from "../dashboard-notification/notification-skeleton";

export interface NotificationColumnProps {
  materials: NotificationMaterialsList[];
  materialsCount: number;
  header: string;
  emptyListText: string;
  isLoading?: boolean;
}

const NotificationColumn: FC<NotificationColumnProps> = ({
  materials,
  materialsCount,
  emptyListText,
  header,
  isLoading = false
}) => {
  return (
    <div className="status-userprofile__column my-64">
      <div className="link-filters">
        <div className="link-filters__tag-wrapper mb-16">
          <h2
            data-cy={`dashboard-${header.toLowerCase()}-header`}
            className="text-header-h3"
          >
            {header}
          </h2>
        </div>
      </div>
      {/* We don't want to keep loading for all the data because we don't use */}
      {/* the full extent - knowing at least the materialCount is enough */}
      {isLoading && materialsCount === 0 && <NotificationSkeleton />}
      {!isLoading && materialsCount === 0 && (
        <EmptyList emptyListText={emptyListText} />
      )}
      {materialsCount !== 0 && (
        <Notifications materials={materials} showStatusLabel />
      )}
    </div>
  );
};

export default NotificationColumn;
