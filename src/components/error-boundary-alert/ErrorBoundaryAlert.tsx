import React, { FC } from "react";
import ReachAlert from "@reach/alert";
import { useText } from "../../core/utils/text";

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
  return (
    <ReachAlert
      className={`dpl-alert dpl-alert--${variant} ${className}`}
      type={type}
    >
      <>
        {t("alertErrorMessageText")}
        <button
          type="button"
          aria-label={t("closeErrorWindow")}
          onClick={resetErrorBoundary}
        >
          ({t("alertErrorCloseText")})
        </button>
      </>
    </ReachAlert>
  );
};

export default ErrorBoundaryAlert;
