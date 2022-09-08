import React, { FC } from "react";
import { formatDate, getAuthorNames } from "../helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import {
  FetchMaterial,
  SelectableMaterialProps,
  MaterialProps
} from "./utils/material-fetch-hoc";

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
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
          {faust && onChecked && (
            <CheckBox
              onChecked={onChecked}
              id={faust}
              selected={
                materialsToRenew &&
                materialsToRenew?.indexOf(parseInt(faust, 10)) > -1
              }
              disabled={disabled}
              label={t("loanListLabelCheckboxMaterialModalText")}
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
                t("loanModalMaterialByAuthorText"),
                t("loanModalMaterialAndAuthorText")
              )}
            {year?.year && <> ({year.year})</>}
          </p>
        </div>
        <div className="list-materials__status">
          {/* todo this will be changed, everything with these statusses will be revised */}
          {renewableStatus && (
            <span className="text-small-caption">
              {renewableStatus.includes("deniedMaxRenewalsReached") && (
                <>{t("loanListDeniedMaxRenewalsReachedText")}</>
              )}
              {(renewableStatus.includes("deniedOtherReason") ||
                renewableStatus.includes("deniedReserved")) && (
                <> {t("loanListDeniedOtherReasonText")}</>
              )}
              {/* todo "Lånet er fornyet i dag" -> this information is lacking in fbs */}
              {loanType === "interLibraryLoan" && (
                <>{t("loanListDeniedInterLibraryLoanText")}</>
              )}
            </span>
          )}
          <StatusBadge
            dueDate={dueDate}
            neutralText={`${t("loanListToBeDeliveredMaterialText")}
            ${formatDate(dueDate)}`}
          />
        </div>
      </div>
    </li>
  );
};

export default FetchMaterial(SelectableMaterial);
