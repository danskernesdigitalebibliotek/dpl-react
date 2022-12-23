import React, { FC, useState } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import FeeInfo from "./fee-info";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import FeeStatus from "./fee-status";
import { useText } from "../../../core/utils/text";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

export interface StackableFeeProps {
  amountOfMaterialsWithDueDate?: number;
  material?: BasicDetailsType;
  faust: string;
  feeData: FeeV2;
  openDetailsModalClickEvent: (faustId: string) => void;
  stackHeight: number;
}

const StackableFees: FC<StackableFeeProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  faust,
  material = {},
  feeData,
  openDetailsModalClickEvent,
  stackHeight
}) => {
  const t = useText();
  const { amount = 0, creationDate = "", reasonMessage = "" } = feeData;
  const stackSize = stackHeight - 1;
  const [additionalFees] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );

  return (
    <button
      type="button"
      onClick={() => openDetailsModalClickEvent(faust)}
      className={`list-reservation my-32 ${
        additionalFees > 0 ? "list-reservation--stacked" : ""
      }`}
    >
      {feeData && (
        <FeeInfo material={material} isbnForCover="">
          {stackSize > 0 &&
            t("plusXOtherMaterialsText", {
              placeholders: { "@amount": stackSize }
            })}
        </FeeInfo>
      )}
      <div className="list-reservation__status">
        <FeeStatus dueDate={creationDate} reasonMessage={reasonMessage} />
        <div className="list-reservation__fee">
          <p className="text-body-medium-medium">
            {t("itemFeeAmountText", {
              placeholders: { "@fee": amount }
            })}
          </p>
        </div>
      </div>
    </button>
  );
};

export default fetchMaterial(StackableFees);
