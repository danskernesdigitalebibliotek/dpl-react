import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";

export interface TotalPaymentPayProps {
  prePaymentTypeChange: boolean;
  total: number;
}

const TotalPaymentPay: FC<TotalPaymentPayProps> = ({
  prePaymentTypeChange,
  total
}) => {
  const [check, setCheck] = useState(false);
  const t = useText();
  const { termsOfTradeUrl } = useUrls();
  const { open } = useModalButtonHandler();
  const openIntermediatePaymentModal = () => {
    open("intermediate-payment-modal" || "");
  };
  const handleAcceptedTerms = () => {
    setCheck(!check);
  };

  return (
    <div className="intermediate-list-bottom">
      <div className="intermediate-list-bottom__paymenttypes">
        {prePaymentTypeChange && <img width="300" height="35" alt="" />}
        {!prePaymentTypeChange && <span>{t("alreadyPaidText")}</span>}
      </div>
      <div className="intermediate-list-bottom__actions">
        <p>
          {t("totalText")} {total},-
        </p>
        <div className="checkbox">
          <input
            id={`checkbox_terms__${
              (prePaymentTypeChange && "prepaymentchange") ||
              "postpaymentchange"
            }`}
            className="checkbox__input"
            type="checkbox"
            onChange={handleAcceptedTerms}
          />
          <label
            className="checkbox__label"
            htmlFor={`checkbox_terms__${
              (prePaymentTypeChange && "prepaymentchange") ||
              "postpaymentchange"
            }`}
          >
            <span className="checkbox__icon">
              <svg width="20px" height="20px">
                <polyline
                  points="1.5 6 4.5 9 10.5 1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <div>
              <span className="checkbox__text text-small-caption color-secondary-gray ">
                {t("iAcceptText")}{" "}
                <Link href={new URL(termsOfTradeUrl)}>
                  {t("termsOfTradeText")}
                  <sup>* </sup>
                </Link>
              </span>
            </div>
          </label>
        </div>
        {prePaymentTypeChange && !check && (
          <button
            type="button"
            className="btn-primary btn-outline btn-small arrow__hover--right-small mt-16"
            disabled
          >
            {t("payText")}
          </button>
        )}
        {prePaymentTypeChange && check && (
          <button
            type="button"
            className="btn-primary btn-outline btn-small arrow__hover--right-small mt-16"
            disabled
          >
            {t("payText")}
          </button>
        )}
        {!prePaymentTypeChange && !check && (
          <button
            type="button"
            className="btn-primary btn-outline btn-small arrow__hover--right-small mt-16"
            disabled
          >
            {t("payText")}
          </button>
        )}
        {!prePaymentTypeChange && check && (
          <button
            type="button"
            className="btn-primary btn-filled btn-small arrow__hover--right-small mt-16"
            onClick={openIntermediatePaymentModal}
          >
            {t("payText")}
          </button>
        )}
      </div>
    </div>
  );
};

export default TotalPaymentPay;
