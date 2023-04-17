import React, { FC, useState } from "react";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import { useDeepCompareEffect } from "react-use";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { tallyUpFees } from "../../../core/utils/helpers/general";
import Link from "../../../components/atoms/links/Link";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import { Button } from "../../../components/Buttons/Button";

const DashboardFees: FC = () => {
  const t = useText();
  const { intermediateUrl, payOwedUrl } = useUrls();
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
      {fbsFees && feeCount && (
        <div>
          <div className="status-userprofile__column mb-16">
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
            <div className="warning-bar bg-global-secondary">
              <div className="warning-bar__left">
                <div className="warning-bar__icon">
                  <img src={WarningIcon} alt={t("warningIconAltText")} />
                </div>
                <div>
                  <Link
                    href={payOwedUrl}
                    className="text-body-medium-regular color-primary-black"
                  >
                    {t("totalOwedText")}
                  </Link>
                </div>
              </div>
              <div className="warning-bar__right">
                <p className="text-body-medium-medium warning-bar__owes">
                  {totalFeeAmount},-
                </p>
                <Button
                  label={t("payOwedText")}
                  buttonType="default"
                  disabled={false}
                  collapsible={false}
                  size="small"
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardFees;
