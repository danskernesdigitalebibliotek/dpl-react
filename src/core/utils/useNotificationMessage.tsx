import React, { useState } from "react";
import NotificationComponent from "../../components/notification/NotificationComponent";

type UseNotificationOptionsType = {
  timeout?: number;
  scrollToTop?: boolean;
};
type UseNotificationReturnType = [React.FC, (text: string) => void];

export const useNotificationMessage = ({
  timeout = 5000,
  scrollToTop = true
}: UseNotificationOptionsType = {}): UseNotificationReturnType => {
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  const handleNotificationMessage = (text: string) => {
    setNotificationMessage(text);
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
    if (timeout) {
      setTimeout(() => {
        setNotificationMessage(null);
      }, timeout);
    }
  };

  return [
    () =>
      notificationMessage ? (
        <NotificationComponent notificationMessage={notificationMessage} />
      ) : null,
    handleNotificationMessage
  ];
};

export default {};
