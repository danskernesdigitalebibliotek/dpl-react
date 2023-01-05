import dayjs from "dayjs";
import * as React from "react";
import { FC, useState } from "react";
import { Link } from "../../../components/atoms/link";
import CheckBox from "../../../components/checkbox/Checkbox";
import { FeeV2 } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import { FaustId } from "../../../core/utils/types/ids";
import { useUrls } from "../../../core/utils/url";
import FeeStatusCircle from "../utils/fee-status-circle";
import { isDateBeforePaymentChangeDate } from "../utils/helper";
import { dateFormatCustom } from "../../../core/configuration/date-format.json";
import StackableFeesList from "./stackable-fees-list";

export interface FeeDetailsContentProps {
  feeDetailsData: FeeV2;
}

const FeeDetailsContent: FC<FeeDetailsContentProps> = ({ feeDetailsData }) => {
  const t = useText();
  const [check, setCheck] = useState(false);
  const { termsOfTradeUrl, paymentOverviewUrl } = useUrls();
  const handleAcceptedTerms = () => {
    setCheck(!check);
  };
  const {
    amount = 0,
    creationDate = "",
    dueDate = "",
    materials = []
  } = feeDetailsData;
  const prePaymentTypeChange = isDateBeforePaymentChangeDate(dueDate);
  const creationDateFormatted = dayjs(creationDate).format(dateFormatCustom);
  const showPaymentButton = !prePaymentTypeChange && check;

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
          {/* TODO: Create a subcomponent of "terms and conditions checkbox", to reduce duplicate code */}
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
          {!showPaymentButton && (
            <button
              type="button"
              className="btn-primary btn-outline btn-small arrow__hover--right-small"
              disabled={!showPaymentButton}
            >
              {t("payText")}
            </button>
          )}
          {showPaymentButton && (
            <Link
              className="btn-primary btn-filled btn-small arrow__hover--right-small disabled"
              href={new URL(paymentOverviewUrl)}
            >
              {t("payText")}
            </Link>
          )}

          {/* )} */}
        </div>
        <ul className="modal-loan__list-container">
          <li className="modal-loan__list">
            <ul className="modal-loan__list-materials">
              {materials.map(({ recordId }) => (
                <StackableFeesList
                  faust={`${recordId}` as FaustId}
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
