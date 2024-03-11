import React, { FC } from "react";
import iconCloaseLarge from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { useText } from "../../core/utils/text";
import IconWarning from "../icon-warning/icon-warning";

export interface ErrorBoundaryAlertBodyProps {
  message: string;
  resetErrorBoundary: () => void;
  showCloseButton?: boolean;
}

/**
 * A simple alert that serves as the foundation of all alerts.
 */
const ErrorBoundaryAlertBody: FC<ErrorBoundaryAlertBodyProps> = ({
  message,
  resetErrorBoundary,
  showCloseButton
}) => {
  const t = useText();

  return (
    <div className="error-message">
      <div className="error-message__icon">
        <IconWarning />
      </div>
      <div className="error-message__description">{message}</div>
      {showCloseButton && (
        <button
          type="button"
          className="error-message__btn-close"
          aria-label={t("errorBoundaryAlertBodyButtonAriaText")}
          onClick={resetErrorBoundary}
        >
          <img
            src={iconCloaseLarge}
            alt={t("errorBoundaryAlertBodyButtonAriaText")}
          />
        </button>
      )}
    </div>
  );
};

export default ErrorBoundaryAlertBody;
