import { useState } from "react";

type UseNotificationOptionsType = {
  timeout?: number;
  scrollToTop?: boolean;
};
type UseNotificationReturnType = [string | null, (text: string) => void];

export const useNotificationMessage = ({
  timeout,
  scrollToTop
}: UseNotificationOptionsType): UseNotificationReturnType => {
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

  return [notificationMessage, handleNotificationMessage];
};

export default {};
