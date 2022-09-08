import React, { FC, useEffect, useState } from "react";
import { formatDate, getAuthorNames } from "../utils/helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import {
  FetchMaterial,
  SelectableMaterialProps,
  MaterialProps
} from "./utils/material-fetch-hoc";

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  loanMetaData,
  material,
  disabled,
  onChecked,
  materialsToRenew
}) => {
  const t = useText();
  const [selected, setSelected] = useState<boolean>(false);

  const { dueDate, id, loanType, renewalStatusList } = loanMetaData || {};
  const { hostPublication, materialTypes, titles, creators } =
    material?.manifestation || {};

  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  useEffect(() => {
    if (materialsToRenew) {
      setSelected(materialsToRenew?.indexOf(parseInt(id, 10)) > -1);
    }
  }, [materialsToRenew, materialsToRenew?.length, id]);

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
              selected={selected}
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
                t("loanModalMaterialByAuthorText"),
                t("loanModalMaterialAndAuthorText")
              )}
            {year?.year && <> ({year.year})</>}
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
                <>{t("LoanListDeniedInterLibraryLoanText")}</>
              )}
            </span>
          )}
          {dueDate && (
            <StatusBadge
              dueDate={dueDate}
              neutralText={`${t("LoanListToBeDeliveredMaterialText")} 
            ${formatDate(dueDate)}`}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default FetchMaterial(SelectableMaterial);
