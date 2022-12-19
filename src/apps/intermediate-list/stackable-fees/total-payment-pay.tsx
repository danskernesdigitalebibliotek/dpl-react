import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import MyPaymentOverviewModal from "../modal/my-payment-overview-modal";

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
  const { open } = useModalButtonHandler();
  function stopPropagationFunction(e: Event | MouseEvent) {
    e.stopPropagation();
  }
  const selectListMaterial = React.useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      open("123" || "");
    },
    [open]
  );
  const handleAcceptedTerms = () => {
    setCheck(!check);
    console.log(check);
  };

  return (
    <>
      <div className="intermediate-list">
        <div className="intermediate-list__paymenttypes">
          {prePaymentTypeChange && <img width="300" height="35" alt="" />}
          {!prePaymentTypeChange && <span>{t("alreadyPaidText")}</span>}
        </div>
        <div className="intermediate-list__actions">
          <p>Total {total},-</p>
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
                  <Link href={new URL("https://www.google.dk")}>
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
              className="btn-primary btn-outline btn-medium arrow__hover--right-small"
              disabled
            >
              {t("payText")}
            </button>
          )}
          {prePaymentTypeChange && check && (
            <button
              type="button"
              className="btn-primary btn-outline btn-medium arrow__hover--right-small"
              disabled
            >
              {t("payText")}
            </button>
          )}
          {!prePaymentTypeChange && !check && (
            <button
              type="button"
              className="btn-primary btn-outline btn-medium arrow__hover--right-small"
              disabled
            >
              {t("payText")}
            </button>
          )}
          {!prePaymentTypeChange && check && (
            <button
              type="button"
              className="btn-primary btn-filled btn-medium arrow__hover--right-small"
              onClick={(e) => selectListMaterial(e)}
            >
              {t("payText")}
            </button>
          )}
        </div>
      </div>
      <MyPaymentOverviewModal />
    </>
  );
};

export default TotalPaymentPay;
