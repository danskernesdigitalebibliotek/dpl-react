import React, { FC, ReactNode } from "react";
import { formatDate, getMaterialInfo } from "../../utils/helpers";
import { LoanMetaDataType } from "../../../../core/utils/helpers/LoanMetaDataType";
import { GetMaterialManifestationQuery } from "../../../../core/dbc-gateway/generated/graphql";
import StatusCircle from "../utils/status-circle";
import StatusBadge from "../utils/status-badge";
import { useText } from "../../../../core/utils/text";

interface MaterialStatusProps {
  loanMetaData: LoanMetaDataType;
  material: GetMaterialManifestationQuery;
  dueDateLabel: string;
  children: ReactNode;
}

const MaterialStatus: FC<MaterialStatusProps> = ({
  loanMetaData,
  material,
  dueDateLabel,
  children
}) => {
  const t = useText();
  const { dueDate, loanDate } = getMaterialInfo(loanMetaData, material);

  if (!dueDate || !loanDate) return <div />;

  return (
    <div className="list-reservation__status">
      <StatusCircle loanDate={loanDate} dueDate={dueDate} />
      <div>
        <div className="list-reservation__deadline">
          <StatusBadge
            dueDate={dueDate}
            dangerText={t("loanListStatusBadgeDangerText")}
            warningText={t("loanListStatusBadgeWarningText")}
          />
          <p className="text-small-caption" id="due-date">
            {dueDateLabel} {formatDate(dueDate)}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MaterialStatus;
