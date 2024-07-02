import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import React from "react";
import { useText } from "../../../core/utils/text";

interface MaterialSearchBaseErrorProps {
  children: React.ReactNode;
}

const MaterialSearchBaseError: React.FC<MaterialSearchBaseErrorProps> = ({
  children
}) => {
  const t = useText();

  return (
    <div className="material-search__error">
      <div className="material-search__error-header">
        <img src={WarningIcon} className="material-search__error-icon" alt="" />
        <div>{t("materialSearchErrorHeaderText")}</div>
      </div>
      {children}
    </div>
  );
};

export default MaterialSearchBaseError;
