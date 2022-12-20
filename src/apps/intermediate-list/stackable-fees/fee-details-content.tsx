import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
import { useText } from "../../../core/utils/text";
import FeeStatusCircle from "../utils/fee-status-circle";
import StackableFeesList from "./stackable-fees-list";

export interface FeeDetailsContentProps {
  prePaymentTypeChange: boolean;
  dueDate: string;
  creationDate: string;
  creationDateFormatted: string;
  amount: number;
  materials: object;
}

const FeeDetailsContent: FC<FeeDetailsContentProps> = ({
  prePaymentTypeChange,
  dueDate,
  creationDate,
  creationDateFormatted,
  amount,
  materials
}) => {
  const t = useText();
  const [check, setCheck] = useState(false);
  const handleAcceptedTerms = () => {
    setCheck(!check);
  };
  const openInNewTab = (url: URL) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="modal modal-show modal-loan">
      <div className="modal__screen-reader-description" id="describemodal">
        {t("feeDetailsModalScreenReaderText")}
      </div>
      <div className="modal-loan__container">
        <div className="modal-loan__header">
          <div className="mr-32">
            <FeeStatusCircle
              dueDate={dueDate || ""}
              feeCreationDate={creationDate}
            />
          </div>
          <div>
            <h2 className="modal-loan__title text-header-h2">
              {t("turnedInText")} {creationDateFormatted}
            </h2>
          </div>
        </div>
        <div className="modal-loan__buttons">
          <div className="checkbox">
            <input
              id="checkbox_id__fee_details"
              className="checkbox__input"
              type="checkbox"
              onChange={handleAcceptedTerms}
            />
            <label
              className="checkbox__label"
              htmlFor="checkbox_id__fee_details"
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
                    <sup>*</sup>
                  </Link>
                </span>
              </div>
            </label>
          </div>
          <div>
            <p>{amount},-</p>
          </div>
          {prePaymentTypeChange && !check && (
            <button
              type="button"
              className="btn-primary btn-outline btn-small arrow__hover--right-small"
              disabled
            >
              {t("payText")}
            </button>
          )}
          {prePaymentTypeChange && check && (
            <button
              type="button"
              className="btn-primary btn-outline btn-small arrow__hover--right-small"
              disabled
            >
              {t("payText")}
            </button>
          )}
          {!prePaymentTypeChange && !check && (
            <button
              type="button"
              className="btn-primary btn-outline btn-small arrow__hover--right-small"
              disabled
            >
              {t("payText")}
            </button>
          )}
          {!prePaymentTypeChange && check && (
            <button
              type="button"
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
              onClick={() =>
                openInNewTab(
                  new URL(
                    "https://www.borger.dk/vaelg-kommune?actionPageId=065ca8f9-a1f5-4946-ada7-12e163f568df&selfserviceId=7200a519-38ad-48b9-b19a-6e5783e39999"
                  )
                )
              }
            >
              {t("payText")}
            </button>
          )}
        </div>
        <ul className="modal-loan__list-container">
          <li className="modal-loan__list">
            <ul className="modal-loan__list-materials">
              {Object.values(materials).map((materialItem) => {
                return (
                  <StackableFeesList
                    faust={materialItem.recordId}
                    creationDateFormatted={creationDateFormatted}
                  />
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeeDetailsContent;
