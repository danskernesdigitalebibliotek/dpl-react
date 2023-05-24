import React, { FC } from "react";
import dayjs from "dayjs";
import WarningBar from "../../apps/loan-list/materials/utils/warning-bar";
import { materialIsOverdue } from "../../core/utils/helpers/general";
import { useUrls } from "../../core/utils/url";
import StatusCircle from "../../apps/loan-list/materials/utils/status-circle";
import { useText } from "../../core/utils/text";

export interface StatusCircleModalHeaderProps {
  dueDate?: string | null;
  header: string;
  subHeader?: string;
}

const StatusCircleModalHeader: FC<StatusCircleModalHeaderProps> = ({
  dueDate,
  header,
  subHeader
}) => {
  const t = useText();
  const { feesPageUrl } = useUrls();

  return (
    <>
      <div className="modal-loan__header">
        <div className="mr-32">
          {/* So, in the scenario where there are mixed loans, the design is challenged  */}
          {/* Therefore it was decided that the loandate for all the materials are "a month ago"  */}
          <StatusCircle
            loanDate={dayjs().subtract(1, "month").format("YYYY-MM-DD")}
            dueDate={dueDate}
          />
        </div>
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
