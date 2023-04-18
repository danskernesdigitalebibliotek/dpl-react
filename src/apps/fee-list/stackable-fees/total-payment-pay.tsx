import clsx from "clsx";
import React, { FC, useState } from "react";
import Link from "../../../components/atoms/links/Link";
import CheckBox from "../../../components/checkbox/Checkbox";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import { getIntermediatePaymentModalId } from "../modal/my-payment-overview-modal";

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
    open(getIntermediatePaymentModalId || "");
  };
  const handleAcceptedTerms = () => {
    setCheck(!check);
  };
  const showPaymentButton = !prePaymentTypeChange && check;
  const paymentButtonClass = clsx(
    ["btn-primary", "btn-small", "arrow__hover--right-small", "mt-16"],
    { "btn-outline": !showPaymentButton, "btn-filled": showPaymentButton }
  );
  const { availablePaymentTypesUrl } = useUrls();

  const checkboxTermsId = `checkbox_terms__${
    (prePaymentTypeChange && "prepaymentchange") || "postpaymentchange"
  }`;
  const postPaymentChangeNotChecked = !prePaymentTypeChange && !check;
  const postPaymentChangeChecked = !prePaymentTypeChange && check;

  return (
    <div className="fee-list-bottom">
      <div className="fee-list-bottom__paymenttypes">
        {prePaymentTypeChange && availablePaymentTypesUrl.href !== "" && (
          <img
            width="300"
            height="35"
            alt=""
            src={`${availablePaymentTypesUrl}`}
          />
        )}
        {!prePaymentTypeChange && (
          <span className="text-small-caption color-secondary-gray">
            {t("alreadyPaidText")}
          </span>
        )}
      </div>
      <div className="fee-list-bottom__actions">
        <p className="text-body-small-medium">
          {t("totalText")} {total},-
        </p>
        <CheckBox
          id={checkboxTermsId}
          onChecked={() => handleAcceptedTerms()}
          label={
            <>
              {t("iAcceptText")}{" "}
              <Link href={termsOfTradeUrl}>
                {t("termsOfTradeText")}
                <sup>*</sup>
              </Link>
            </>
          }
        />
        {(postPaymentChangeNotChecked || prePaymentTypeChange) && (
          <button
            type="button"
            className={paymentButtonClass}
            onClick={
              showPaymentButton ? openIntermediatePaymentModal : undefined
            }
            disabled={!showPaymentButton}
          >
            {t("payText")}
          </button>
        )}
        {postPaymentChangeChecked && (
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
