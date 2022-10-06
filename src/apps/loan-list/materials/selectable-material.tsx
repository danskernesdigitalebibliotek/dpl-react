import React, { FC } from "react";
import { formatDate } from "../utils/helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import { LoanType } from "../../../core/utils/types/loan-type";
import { FaustId } from "../../../core/utils/types/ids";
import fetchMaterial, { MaterialProps } from "./utils/material-fetch-hoc";
import fetchDigitalMaterial from "./utils/digital-material-fetch-hoc";

interface SelectableMaterialProps {
  loan: LoanType;
  disabled?: boolean;
  materialsToRenew?: FaustId[];
  onChecked?: (faust: FaustId) => void;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  loan,
  material,
  disabled,
  onChecked,
  materialsToRenew
}) => {
  const t = useText();
  const { dueDate, faust, identifier, loanType, renewalStatusList } = loan;
  const { authors, materialType, year, title } = material || {};

  return (
    <li>
      <div
        className={`list-materials ${
          disabled ? "list-materials--disabled" : ""
        }`}
      >
        <div className="mr-32">
          {faust && onChecked && (
            <CheckBox
              onChecked={onChecked}
              id={faust}
              selected={
                materialsToRenew && materialsToRenew?.indexOf(faust) > -1
              }
              disabled={disabled}
              label={t("loanListLabelCheckboxMaterialModalText")}
              hideLabel
            />
          )}
          {identifier && (
            <CheckBox
              selected={false}
              id={identifier}
              disabled
              label={t("loanListLabelCheckboxMaterialModalText")}
              hideLabel
            />
          )}
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
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

export default fetchDigitalMaterial(fetchMaterial(SelectableMaterial));
