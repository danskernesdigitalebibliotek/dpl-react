import React, { FC, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { tallyUpFees } from "../../../core/utils/helpers/general";
import Link from "../../../components/atoms/links/Link";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import WarningBar from "../../loan-list/materials/utils/warning-bar";

const DashboardFees: FC = () => {
  const t = useText();
  const { intermediateUrl, payOwedUrl, feesPageUrl } = useUrls();
  const { data: fbsFees } = useGetFeesV2();
  const [feeCount, setFeeCount] = useState<number>();
  const [totalFeeAmount, setTotalFeeAmount] = useState<number>();

  useDeepCompareEffect(() => {
    if (fbsFees && !feeCount && !totalFeeAmount) {
      setFeeCount(fbsFees.length);
      setTotalFeeAmount(tallyUpFees(fbsFees));
    }
  }, [fbsFees, feeCount, totalFeeAmount]);

  return (
    <div className="fee-container">
      {fbsFees && !!feeCount && (
        <div>
          <div className="status-userprofile__column my-16">
            <div className="link-filters">
              <div className="link-filters__tag-wrapper">
                <Link
                  href={intermediateUrl}
                  className="link-tag link-tag link-filters__tag"
                >
                  {t("intermediateText")}
                </Link>
                <span className="link-filters__counter">{feeCount}</span>
              </div>
            </div>
            <WarningBar
              linkText={t("totalOwedText")}
              rightText={`${totalFeeAmount},-`}
              rightButtonText={t("payOwedText")}
              leftLink={payOwedUrl}
              rightLink={feesPageUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardFees;
