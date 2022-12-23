import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
import CheckBox from "../../../components/checkbox/Checkbox";
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
        <CheckBox
          id="checkbox_id__fee_details"
          onChecked={() => handleAcceptedTerms()}
          label={
            <>
              {t("iAcceptText")}{" "}
              <Link href={new URL(termsOfTradeUrl)}>
                {t("termsOfTradeText")}
                <sup>*</sup>
              </Link>
            </>
          }
        />
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
