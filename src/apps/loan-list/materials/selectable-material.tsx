import React, { FC } from "react";
import { formatDate } from "../utils/helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import fetchMaterial, { MaterialProps } from "./utils/material-fetch-hoc";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { FaustId } from "../../../core/utils/types/ids";
import fetchDigitalMaterial from "./utils/digital-material-fetch-hoc";

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

  const { dueDate, loanType, renewalStatusList } =
    loanMetaData.loanSpecific || {};

  const { authors, pid, materialType, year, title } = material || {};

  return (
    <li>
      {material && (
        <div
          className={`list-materials ${
            disabled ? "list-materials--disabled" : ""
          }`}
        >
          <div className="mr-32">
            {pid && onChecked && (
              <CheckBox
                onChecked={onChecked}
                id={pid}
                selected={
                  materialsToRenew &&
                  materialsToRenew?.indexOf(parseInt(pid, 10)) > -1
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
            <p className="text-header-h5 mt-8">{title}</p>
            <p className="text-small-caption">
              {authors}
              {year && <> ({year})</>}
            </p>
          </div>
          <div className="list-materials__status">
            {/* todo this will be changed, everything with these statusses will be revised */}
            {renewalStatusList && (
              <span className="text-small-caption">
                {renewalStatusList.includes("deniedMaxRenewalsReached") && (
                  <>{t("loanListDeniedMaxRenewalsReachedText")}</>
                )}
                {(renewalStatusList.includes("deniedOtherReason") ||
                  renewalStatusList.includes("deniedReserved")) && (
                  <> {t("loanListDeniedOtherReasonText")}</>
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
      )}
    </li>
  );
};

export default fetchMaterial(fetchDigitalMaterial(SelectableMaterial));
