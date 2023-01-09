import React, { FC, useEffect, useState } from "react";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { tallyUpFees } from "../../../core/utils/helpers/general";
import { Link } from "../../../components/atoms/link";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";

const DashboardFees: FC = () => {
  const t = useText();
  const { intermediateUrl, payOwedUrl } = useUrls();
  const { data: fbsFees } = useGetFeesV2();
  const [feeCount, setFeeCount] = useState(0);
  const [totalFeeAmount, setTotalFeeAmount] = useState(0);
  useEffect(() => {
    if (fbsFees) {
      setFeeCount(fbsFees.length);
      setTotalFeeAmount(tallyUpFees(fbsFees));
    }
  }, [fbsFees]);
  return (
    <div className="fee-container">
      {fbsFees && feeCount !== 0 && (
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
                  <img src={WarningIcon} alt="close modal button" />
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
                <button
                  type="button"
                  className="btn-primary btn-filled btn-small arrow__hover--right-small undefined"
                >
                  {t("payOwedText")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardFees;
