import React, { useEffect } from "react";
import { formatDate, getAuthorNames } from "../helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import {
  FetchMaterial,
  SelectableMaterialProps,
  MaterialProps
} from "./utils/material-fetch-hoc";

const SelectableMaterial: React.FC<SelectableMaterialProps & MaterialProps> = ({
  loanDetails,
  renewableStatus,
  loanType,
  material,
  disabled,
  onChecked,
  materialsToRenew
}) => {
  const t = useText();
  const { dueDate, recordId: faust } = loanDetails || {};
  const { hostPublication, materialTypes, titles, creators } =
    material?.manifestation || {};

  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  return (
    <li>
      <div
        className={`list-materials ${
          disabled ? "list-materials--disabled" : ""
        }`}
      >
        <div className="mr-32">
          {faust && (
            <CheckBox
              onChecked={onChecked}
              id={faust}
              selected={
                materialsToRenew &&
                materialsToRenew?.indexOf(parseInt(faust, 10)) > -1
              }
              disabled={disabled}
              label={t("LoanListLabelCheckboxMaterialModalText")}
              hideLabel
            />
          )}
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
              {specific}
            </div>
          </div>
          <p className="text-header-h5 mt-8">{mainText}</p>
          <p className="text-small-caption">
            {creators &&
              getAuthorNames(
                creators,
                t("loanListMaterialByAuthorText"),
                t("loanListMaterialAndAuthorText")
              )}
            {year?.year && <> ({year.year})</>}
          </p>
        </div>
        <div className="list-materials__status">
          {renewableStatus && (
            <span className="text-small-caption">
              {renewableStatus.indexOf("deniedMaxRenewalsReached") > -1 && (
                <>{t("LoanListDeniedMaxRenewalsReachedText")}</>
              )}
              {(renewableStatus.indexOf("deniedOtherReason") > -1 ||
                renewableStatus.indexOf("deniedReserved") > -1) && (
                <> {t("LoanListDeniedOtherReasonText")}</>
              )}
              {/* todo "Lånet er fornyet i dag" -> this information is lacking in fbs */}
              {loanType === "interLibraryLoan" && (
                <>{t("LoanListDeniedInterLibraryLoanText")}</>
              )}
            </span>
          )}
          <StatusBadge
            dueDate={dueDate}
            neutralText={`${t("LoanListToBeDeliveredMaterialText")} 
            ${formatDate(dueDate)}`}
          />
        </div>
      </div>
    </li>
  );
};

export default FetchMaterial(SelectableMaterial);
