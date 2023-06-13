import { handleTracking } from "./handleTracking";

export const getLinkHandler = ({
  type,
  trackClick,
  isNewTab,
  url,
  stopPropagation
}: {
  type: "click" | "keyup";
  trackClick?: () => Promise<unknown>;
  isNewTab: boolean;
  url: URL;
  stopPropagation: boolean;
}) => {
  return (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    if (stopPropagation) {
      e.stopPropagation();
    }

    // If we do not track the event do nothing.
    if (!trackClick) {
      return;
    }

    // If it is a key press make sure that it happens on key press "Enter".
    const { key } = e as React.KeyboardEvent<HTMLAnchorElement>;
    if (type === "keyup" && e.type === "keyup" && key === "Enter") {
      handleTracking({ e, isNewTab, trackClick, url });
      return;
    }

    // Otherwise track click if present.
    if (type === "click" && e.type === "click") {
      handleTracking({ e, isNewTab, trackClick, url });
    }
  };
};

export default {};
