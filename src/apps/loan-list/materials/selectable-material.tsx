import React from "react";
import { formatDate } from "../helpers";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import StatusBadge from "./utils/status-badge";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";

interface SelectableMaterialProps {
  faust: string;
  dueDate: string;
  renewableStatus?: string[];
  loanType?: string;
  authorString: string;
  material: GetMaterialManifestationQuery;
}

const SelectableMaterial: React.FC<SelectableMaterialProps> = ({
  faust,
  dueDate,
  renewableStatus,
  loanType,
  material,
  authorString
}) => {
  const t = useText();

  const { hostPublication, materialTypes, titles } =
    material?.manifestation || {};

  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  return (
    <li>
      <div className="list-materials">
        {/* todo make fixed in design system  */}
        <CheckBox
          additionalClasses="mr-32"
          id={faust}
          label={t("LoanListLabelCheckboxMaterialModalText")}
          hideLabel
        />

        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
              {specific}
            </div>
          </div>
          <p className="text-header-h5 mt-8">{mainText}</p>
          <p className="text-small-caption">
            {authorString}
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
