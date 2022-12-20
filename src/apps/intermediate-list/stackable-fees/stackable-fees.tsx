import React, { useCallback, FC, MouseEvent, useState } from "react";
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
import { useText } from "../../../core/utils/text";
import FeeDetailsContent from "./fee-details-content";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

export interface StackableFeeProps {
  prePaymentTypeChange: boolean;
  amountOfMaterialsWithDueDate?: number;
  material?: BasicDetailsType;
  faust: string;
  feeData: FeeV2;
}

const StackableFees: FC<StackableFeeProps & MaterialProps> = ({
  prePaymentTypeChange,
  amountOfMaterialsWithDueDate,
  faust,
  material = {},
  feeData
}) => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const {
    amount = 0,
    creationDate = "",
    reasonMessage = "",
    dueDate = "",
    materials = {}
  } = feeData;

  const creationDateFormatted = dayjs(creationDate).format("D. MMMM YYYY");
  const [additionalFees] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );
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
        <FeeDetailsContent
          prePaymentTypeChange={prePaymentTypeChange}
          dueDate={dueDate}
          creationDate={creationDate}
          creationDateFormatted={creationDateFormatted}
          amount={amount}
          materials={materials}
        />
      </FeeDetailsModal>
    </>
  );
};

export default fetchMaterial(StackableFees);
