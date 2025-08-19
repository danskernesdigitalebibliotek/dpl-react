import React, { FC } from "react";
import Arrow from "../../../components/atoms/icons/arrow/arrow";
import StatusBadge from "../../loan-list/materials/utils/status-badge";
import { isEnterOrSpacePressed } from "../../../core/utils/helpers/general";

interface DashboardNotificationProps {
  notificationNumber: number;
  showStatusLabel?: boolean;
  notificationText: string;
  dataCy: string;
  notificationColor: string;
  badge?: string;
  notificationClickEvent: () => void;
  notificationClickEventParam?: string;
}

const DashboardNotification: FC<DashboardNotificationProps> = ({
  notificationNumber,
  notificationText,
  dataCy,
  notificationColor,
  notificationClickEvent,
  showStatusLabel = false,
  badge
}) => {
  if (notificationNumber === 0) return null;

  return (
    <button
      type="button"
      data-cy={dataCy}
      onMouseUp={notificationClickEvent}
      onKeyUp={(e) => {
        if (isEnterOrSpacePressed(e.key)) {
          notificationClickEvent();
        }
      }}
      className="mb-16"
    >
      <div className="list-dashboard shadow-medium-hover arrow__hover--right-small">
        <div
          className={`color-secondary-gray number number--${notificationColor}`}
        >
          {notificationNumber}
        </div>
        <span className="list-dashboard__title text-header-h4 color-secondary-gray">
          {notificationText}
        </span>
        {showStatusLabel && (
          <>
            {notificationColor === "danger" && (
              <StatusBadge dangerText={badge} />
            )}
            {notificationColor === "warning" && (
              <StatusBadge warningText={badge} />
            )}
            {notificationColor === "info" && <StatusBadge infoText={badge} />}
          </>
        )}
        <div className="list-dashboard__arrow">
          <Arrow />
        </div>
      </div>
    </button>
  );
};
export default DashboardNotification;
