import React, { FC, useState, useEffect } from "react";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { tallyUpFees } from "../../../core/utils/helpers/general";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import WarningBar from "../../loan-list/materials/utils/warning-bar";
import { FeeV2 } from "../../../core/fbs/model/feeV2";

const DashboardFees: FC = () => {
  const t = useText();
  const u = useUrls();

  const feesPageUrl = u("feesPageUrl");
  const { data: fbsFees = [], isLoading } = useGetFeesV2<FeeV2[]>({
    includepaid: false,
    includenonpayable: true
  });
  const [totalFeeAmount, setTotalFeeAmount] = useState<string>("0");

  useEffect(() => {
    if (fbsFees && Array.isArray(fbsFees)) {
      setTotalFeeAmount(tallyUpFees(fbsFees));
    }
  }, [fbsFees, totalFeeAmount]);

  if (isLoading || (!isLoading && fbsFees.length === 0)) return null;

  return (
    <div className="fee-container">
      <div>
        <div className="status-userprofile__column">
          <div className="link-filters">
            <div className="link-filters__tag-wrapper">
              <h2
                className="text-header-h3 mb-16"
                data-cy="dashboard-fees-header"
              >
                {t("feesText")}
              </h2>
            </div>
          </div>
          <WarningBar
            overdueText={`${t("totalOwedText")} ${t("totalAmountFeeText", {
              placeholders: { "@total": totalFeeAmount }
            })}`}
            rightButtonText={t("dashboardSeeMoreFeesText")}
            rightButtonAriaLabelText={t("dashboardSeeMoreFeesAriaLabelText")}
            rightLink={feesPageUrl}
          />
        </div>
      </div>
    </div>
  );
};
export default DashboardFees;
