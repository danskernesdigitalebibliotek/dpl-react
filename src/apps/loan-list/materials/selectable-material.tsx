import React from "react";
import dayjs from "dayjs";
import { useText } from "../../../core/utils/text";
import CheckBox from "./utils/checkbox";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";

interface SelectableMaterialProps {
  faust: string;
  dueDate: string;
  renewableStatus?: string[];
  loanType?: string;
  getAuthorName: Function;
  material: GetMaterialManifestationQuery;
}

const SelectableMaterial: React.FC<SelectableMaterialProps> = ({
  faust,
  dueDate,
  renewableStatus,
  loanType,
  material,
  getAuthorName
}) => {
  const t = useText();

  const { creators, hostPublication, materialTypes, titles } =
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
            {creators && creators.length > 0 && getAuthorName(creators)}
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
              {/* todo “Lånet er fornyet i dag”, hvis lånet er fornyet samme dag */}
            </span>
          )}
          {/* todo add color in design system */}
          <div className="status-label status-label--info">
            {t("LoanListToBeDeliveredMaterialText")}{" "}
            {dayjs(dueDate).format("DD-MM-YYYY")}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SelectableMaterial;
