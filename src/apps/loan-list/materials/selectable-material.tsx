import React, { FC } from "react";
import { formatDate, getAuthorNames, getMaterialInfo } from "../utils/helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import fetchMaterial, { MaterialProps } from "./utils/material-fetch-hoc";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { FaustId } from "../../../core/utils/types/ids";

interface SelectableMaterialProps {
  loanMetaData: MetaDataType<LoanMetaDataType>;
  disabled?: boolean;
  materialsToRenew?: number[];
  onChecked?: (faust: FaustId) => void;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  loanMetaData,
  material,
  disabled,
  onChecked,
  materialsToRenew
}) => {
  const t = useText();

  const {
    creators,
    year,
    materialType,
    materialTitle,
    loanType,
    dueDate,
    id,
    renewalStatusList
  } = getMaterialInfo(material, loanMetaData);

  return (
    <li>
      <div
        className={`list-materials ${
          disabled ? "list-materials--disabled" : ""
        }`}
      >
        <div className="mr-32">
          {id && onChecked && (
            <CheckBox
              onChecked={onChecked}
              id={id}
              selected={
                materialsToRenew &&
                materialsToRenew?.indexOf(parseInt(id, 10)) > -1
              }
              disabled={disabled}
              label={t("loanListLabelCheckboxMaterialModalText")}
              hideLabel
            />
          )}
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline">
              {materialType}
            </div>
          </div>
          <p className="text-header-h5 mt-8">{materialTitle}</p>
          <p className="text-small-caption">
            {creators &&
              getAuthorNames(
                creators,
                t("loanModalMaterialByAuthorText"),
                t("loanModalMaterialAndAuthorText")
              )}
            {year && <> ({year})</>}
          </p>
        </div>
        <div className="list-materials__status">
          {/* todo this will be changed, everything with these statusses will be revised */}
          {renewalStatusList && (
            <span className="text-small-caption">
              {renewalStatusList.includes("deniedMaxRenewalsReached") && (
                <>{t("LoanListDeniedMaxRenewalsReachedText")}</>
              )}
              {(renewalStatusList.includes("deniedOtherReason") ||
                renewalStatusList.includes("deniedReserved")) && (
                <> {t("LoanListDeniedOtherReasonText")}</>
              )}
              {/* todo "Lånet er fornyet i dag" -> this information is lacking in fbs */}
              {loanType === "interLibraryLoan" && (
                <>{t("loanListDeniedInterLibraryLoanText")}</>
              )}
            </span>
          )}
          {dueDate && (
            <StatusBadge
              dueDate={dueDate}
              neutralText={`${t("loanListToBeDeliveredMaterialText")} 
            ${formatDate(dueDate)}`}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default fetchMaterial(SelectableMaterial);
