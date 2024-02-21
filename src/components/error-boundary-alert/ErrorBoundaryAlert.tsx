import React, { FC } from "react";
import ReachAlert from "@reach/alert";
import ReactDOM from "react-dom";
import { useText } from "../../core/utils/text";
import { useConfig } from "../../core/utils/config";

interface ErrorBoundaryAlertProps {
  className?: string;
  type?: "assertive" | "polite";
  variant?: "info" | "success" | "warning" | "blank";
  resetErrorBoundary: () => void;
}

/**
 * A simple alert that serves as the foundation of all alerts.
 */
const ErrorBoundaryAlert: FC<ErrorBoundaryAlertProps> = ({
  className,
  type,
  variant,
  resetErrorBoundary
}) => {
  const t = useText();
  const config = useConfig();
  const errorMessagesConfig = config<{
    containerId: string;
    shouldOnlyShowOneError?: boolean;
  }>("errorMessagesConfig", {
    transformer: "jsonParse"
  });

  // We need to have a container to render the alert in.
  if (errorMessagesConfig.containerId === undefined) {
    return null;
  }
  const { containerId } = errorMessagesConfig;
  const container = document.getElementById(containerId);

  // If we do not have configured if we should only show one error, we default to true.
  const shouldOnlyShowOneError =
    errorMessagesConfig.shouldOnlyShowOneError !== undefined
      ? errorMessagesConfig.shouldOnlyShowOneError
      : true;

  // If container is not present, we don't want to render the alert.
  if (!container) {
    return null;
  }
  // If we should only show one error and there is already an error message
  // we don't want to render multiple error messages.
  if (
    shouldOnlyShowOneError &&
    (container?.textContent ?? "").trim().length > 0
  ) {
    return null;
  }

  return ReactDOM.createPortal(
    <ReachAlert
      className={`dpl-alert dpl-alert--${variant} ${className}`}
      type={type}
    >
      <>
        {t("alertErrorMessageText")}
        <button
          type="button"
          aria-label={t("alertErrorMessageText")}
          onClick={resetErrorBoundary}
        >
          ({t("alertErrorCloseText")})
        </button>
      </>
    </ReachAlert>,
    container
  );
};

export default ErrorBoundaryAlert;
