import React from "react";
import { useText } from "../../../core/utils/text";
import MaterialSearchBaseError from "./MaterialSearchBaseError";

const WorkNotFoundError: React.FC = () => {
  const t = useText();

  return (
    <MaterialSearchBaseError>
      <div className="material-search__error-content">
        <p className="material-search__error-description">
          {t("materialSearchErrorWorkNotFoundText")}
        </p>
      </div>
    </MaterialSearchBaseError>
  );
};

export default WorkNotFoundError;
