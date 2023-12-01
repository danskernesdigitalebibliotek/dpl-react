import React, { FC, ReactNode } from "react";
import WarningBar from "../../apps/loan-list/materials/utils/warning-bar";
import { materialIsOverdue } from "../../core/utils/helpers/general";
import { useUrls } from "../../core/utils/url";
import { useText } from "../../core/utils/text";

export interface StatusCircleModalHeaderProps {
  dueDate?: string | null;
  header: string;
  subHeader?: string;
  statusCircleComponent: ReactNode;
}

const StatusCircleModalHeader: FC<StatusCircleModalHeaderProps> = ({
  dueDate,
  header,
  subHeader,
  statusCircleComponent
}) => {
  const t = useText();
  const u = useUrls();
  const feesPageUrl = u("feesPageUrl");

  return (
    <>
      <div className="modal-loan__header">
        <div className="mr-32">{statusCircleComponent}</div>
        <div>
          <h2 className="modal-loan__title text-header-h2">{header}</h2>
          {subHeader && <div className="text-body-large">{subHeader}</div>}
        </div>
      </div>
      {dueDate && materialIsOverdue(dueDate) && (
        <div className="modal-details__warning">
          <WarningBar
            leftLink={feesPageUrl}
            linkText={t("groupModalDueDateLinkToPageWithFeesText")}
            overdueText={t("groupModalDueDateWarningLoanOverdueText")}
          />
        </div>
      )}
    </>
  );
};

export default StatusCircleModalHeader;
