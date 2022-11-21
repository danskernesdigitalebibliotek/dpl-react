import React, { FC, useEffect, useState } from "react";
import WarningIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import { Url } from "url";
import { url } from "inspector";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { tallyUpFees } from "../../../core/utils/helpers/general";
import { Link } from "../../../components/atoms/link";

interface DashBoardFeesProps {
  intermediateText: string;
  totalOwedText: string;
  payOwedText: string;
  intermediateUrl: Url;
  payOwedUrl: Url;
}

const DashboardFees: FC<DashBoardFeesProps> = ({
  intermediateText,
  totalOwedText,
  payOwedText,
  intermediateUrl,
  payOwedUrl
}) => {
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
    <div>
      {fbsFees && feeCount !== 0 && (
        <div>
          <div className="status-userprofile__column">
            <div className="link-filters">
              <div className="link-filters__tag-wrapper">
                <Link
                  href={{ intermediateUrl }}
                  className="link-tag link-tag link-filters__tag"
                >
                  {intermediateText}
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
                    href={{ payOwedUrl }}
                    className="text-body-medium-regular color-primary-black"
                  >
                    {totalOwedText}
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
                  {payOwedText}
                  <div className="ml-16">
                    <svg
                      width="61"
                      height="9"
                      viewBox="0 0 61 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="arrow__body"
                        d="M60 4.5H0"
                        stroke="currentColor"
                      />
                      <path
                        className="arrow__head"
                        d="M60.3537 4.85355C60.5489 4.65829 60.5489 4.34171 60.3537 4.14645L57.1717 0.96447C56.9764 0.769208 56.6598 0.769208 56.4646 0.96447C56.2693 1.15973 56.2693 1.47631 56.4646 1.67157L59.293 4.5L56.4646 7.32843C56.2693 7.52369 56.2693 7.84027 56.4646 8.03553C56.6598 8.2308 56.9764 8.2308 57.1717 8.03553L60.3537 4.85355ZM60.0001 4H57.0001V5H60.0001V4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
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
