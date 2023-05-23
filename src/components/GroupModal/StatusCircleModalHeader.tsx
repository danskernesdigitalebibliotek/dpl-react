import React, { FC } from "react";
import dayjs from "dayjs";
import StatusCircle from "../materials/utils/status-circle";
import { useText } from "../../../core/utils/text";
import WarningBar from "../materials/utils/warning-bar";
import { formatDate } from "../utils/helpers";
import { materialIsOverdue } from "../../../core/utils/helpers/general";
import { useUrls } from "../../../core/utils/url";

export interface StatusCircleModalHeaderProps {
  dueDate?: string | null;
}

const StatusCircleModalHeader: FC<StatusCircleModalHeaderProps> = ({
  dueDate
}) => {
  const t = useText();
  const { feesPageUrl } = useUrls();
  if (!dueDate) return null;

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
          <h2 className="modal-loan__title text-header-h2">
            {t("groupModalDueDateHeaderText", {
              placeholders: { "@date": formatDate(dueDate) }
            })}
          </h2>
          <div className="text-body-large">
            {t("groupModalReturnLibraryText")}
          </div>
        </div>
      </div>
      {materialIsOverdue(dueDate) && (
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
