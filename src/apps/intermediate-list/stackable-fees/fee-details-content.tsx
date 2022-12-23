import dayjs from "dayjs";
import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
import CheckBox from "../../../components/checkbox/Checkbox";
import { FeeV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import FeeStatusCircle from "../utils/fee-status-circle";
import { isDateBeforePaymentChangeDate } from "../utils/intermediate-list-helper";
import StackableFeesList from "./stackable-fees-list";

export interface FeeDetailsContentProps {
  feeDetailsData: FeeV2;
}

const FeeDetailsContent: FC<FeeDetailsContentProps> = ({ feeDetailsData }) => {
  const t = useText();
  const [check, setCheck] = useState(false);
  const { termsOfTradeUrl } = useUrls();
  const handleAcceptedTerms = () => {
    setCheck(!check);
  };
  const {
    amount = 0,
    creationDate = "",
    dueDate = "",
    materials = []
  } = feeDetailsData;
  const prePaymentTypeChange = isDateBeforePaymentChangeDate(new Date(dueDate));
  const creationDateFormatted = dayjs(creationDate).format("D. MMMM YYYY");
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
              {t("turnedInText", {
                placeholders: { "@date": creationDateFormatted }
              })}
            </h2>
          </div>
        </div>
        <div className="modal-loan__buttons">
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
            <Link
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
              href={
                new URL(
                  "https://www.borger.dk/vaelg-kommune?actionPageId=065ca8f9-a1f5-4946-ada7-12e163f568df&selfserviceId=7200a519-38ad-48b9-b19a-6e5783e39999"
                )
              }
              isNewTab
            >
              {t("payText")}
            </Link>
          )}
        </div>
        <ul className="modal-loan__list-container">
          <li className="modal-loan__list">
            <ul className="modal-loan__list-materials">
              {materials.map(({ recordId }) => (
                <StackableFeesList
                  faust={recordId}
                  creationDateFormatted={creationDateFormatted}
                />
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeeDetailsContent;
