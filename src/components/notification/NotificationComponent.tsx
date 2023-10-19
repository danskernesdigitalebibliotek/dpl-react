import React from "react";
import PromoBar from "../promo-bar/PromoBar";

interface NotificationComponentProps {
  notificationMessage: string;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notificationMessage
}) => {
  return <PromoBar text={notificationMessage} type="info" />;
};

export default NotificationComponent;
