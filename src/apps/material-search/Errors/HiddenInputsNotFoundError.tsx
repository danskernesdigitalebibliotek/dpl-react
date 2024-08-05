import React from "react";
import { useText } from "../../../core/utils/text";
import MaterialSearchBaseError from "./MaterialSearchBaseError";

const HiddenInputsNotFoundError: React.FC = () => {
  const t = useText();

  return (
    <MaterialSearchBaseError
      headingText={t("materialSearchErrorHiddenInputsNotFoundHeadingText")}
    >
      <div className="material-search__error-content">
        <p className="material-search__error-description">
          {t("materialSearchErrorHiddenInputsNotFoundDescriptionText")}
        </p>
      </div>
    </MaterialSearchBaseError>
  );
};

export default HiddenInputsNotFoundError;
