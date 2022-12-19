import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import dayjs from "dayjs";
import { FeeV2 } from "../../../core/fbs/model";
import { useModalButtonHandler } from "../../../core/utils/modal";
import FeeInfo from "./fee-info";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import AdditionalFeesButton from "./additional-fees-button";
import FeeStatus from "./fee-status";
import FeeDetailsModal from "../modal/fee-details-modal";
import { Link } from "../../../components/atoms/link";
import FeeStatusCircle from "../utils/fee-status-circle";
import { useText } from "../../../core/utils/text";
import StackableFeesList from "./stackable-fees-list";

export interface StackableFeeProps {
  amountOfMaterialsWithDueDate?: number;
  faust: string;
  feeData: FeeV2;
}

const StackableFees: FC<StackableFeeProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  faust,
  material,
  feeData
}) => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const { amount, creationDate, reasonMessage, dueDate, materials } = feeData;

  const creationDateFormatted = dayjs(creationDate).format("D. MMMM YYYY");
  const [additionalFees] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );
  // const { materialItemNumber } = fee.materials;
  function stopPropagationFunction(e: Event | MouseEvent) {
    e.stopPropagation();
  }

  const selectListMaterial = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      open(faust || "");
    },
    [faust, open]
  );
  return (
    <>
      <button
        type="button"
        onClick={(e) => selectListMaterial(e)}
        className={`list-reservation my-32 ${
          additionalFees > 0 ? "list-reservation--stacked" : ""
        }`}
      >
        {feeData && (
          <FeeInfo material={material} isbnForCover="">
            <AdditionalFeesButton
              showOn="desktop"
              additionalFees={additionalFees}
              screenReaderLabel="screenreadertext"
            />
          </FeeInfo>
        )}
        <div className="list-reservation__status">
          <FeeStatus dueDate={creationDate} reasonMessage={reasonMessage} />
          <div className="list-reservation__fee">
            <p className="text-body-medium-medium">
              {t("totalFeeAmountText")} {amount},-
            </p>
          </div>
        </div>
      </button>

      <FeeDetailsModal faust={faust} material={material}>
        <div className="modal modal-show modal-loan">
          <div className="modal__screen-reader-description" id="describemodal">
            Denne modal dækker sidens indhold, og er en demo
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
                  id="checkbox_id__0.09343192931195876"
                  className="checkbox__input"
                  type="checkbox"
                />
                <label
                  className="checkbox__label"
                  htmlFor="checkbox_id__0.09343192931195876"
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
              <button
                type="button"
                className="btn-primary btn-filled btn-small arrow__hover--right-small undefined"
              >
                {t("payText")}
              </button>
            </div>
            <ul className="modal-loan__list-container">
              <li className="modal-loan__list">
                <ul className="modal-loan__list-materials">
                  {materials.map((materialItem) => {
                    return (
                      <StackableFeesList
                        faust={`${materialItem.recordId}`}
                        creationDateFormatted={creationDateFormatted}
                      />
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </FeeDetailsModal>
    </>
  );
};

export default fetchMaterial(StackableFees);
