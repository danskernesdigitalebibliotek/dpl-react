import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import React from "react";

interface MaterialSearchBaseErrorProps {
  headingText: string;
  children?: React.ReactNode;
}

const MaterialSearchBaseError: React.FC<MaterialSearchBaseErrorProps> = ({
  headingText,
  children
}) => {
  return (
    <div className="material-search__error">
      <div className="material-search__error-header">
        <img src={WarningIcon} className="material-search__error-icon" alt="" />
        <h3 className="material-search__error-header-text">{headingText}</h3>
      </div>
      {children}
    </div>
  );
};

export default MaterialSearchBaseError;
