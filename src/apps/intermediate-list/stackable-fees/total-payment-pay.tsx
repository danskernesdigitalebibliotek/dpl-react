import clsx from "clsx";
import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
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

  return (
    <div className="intermediate-list-bottom">
      <div className="intermediate-list-bottom__paymenttypes">
        {prePaymentTypeChange && (
          <img
            width="300"
            height="35"
            alt=""
            src={`${availablePaymentTypesUrl}`}
          />
        )}
        {!prePaymentTypeChange && <span>{t("alreadyPaidText")}</span>}
      </div>
      <div className="intermediate-list-bottom__actions">
        <p>
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
        {!prePaymentTypeChange && !check && (
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
