import React from "react";
import PromoBar from "../promo-bar/PromoBar";

interface NotificationComponentProps {
  notificationMessage: string | null;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notificationMessage
}) => {
  if (!notificationMessage) return null;
  return <PromoBar text={notificationMessage} type="info" />;
};

export default NotificationComponent;
