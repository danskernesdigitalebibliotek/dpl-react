import React from "react";
import { formatDate, getAuthorNames } from "../helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";

interface SelectableMaterialProps {
  recordId: string;
  dueDate: string;
  renewableStatus?: string[];
  loanType?: string;
  material: GetMaterialManifestationQuery;
}

const SelectableMaterial: React.FC<SelectableMaterialProps> = ({
  recordId,
  dueDate,
  renewableStatus,
  loanType,
  material,
}) => {
  const t = useText();

  const { hostPublication, materialTypes, titles, creators } =
    material?.manifestation || {};

  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  return (
    <li>
      <div className="list-materials">
        <div className="mr-32">
          <CheckBox
            id={recordId}
            label={t("LoanListLabelCheckboxMaterialModalText")}
            hideLabel
          />
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
              {renewableStatus.includes("deniedMaxRenewalsReached") && (
                <>{t("LoanListDeniedMaxRenewalsReachedText")}</>
              )}
              {renewableStatus.includes("deniedReserved") && (
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
          <div className="status-label status-label--neutral">
            {t("LoanListToBeDeliveredMaterialText")} {formatDate(dueDate)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SelectableMaterial;
