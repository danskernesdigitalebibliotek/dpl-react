import React, { FC } from "react";
import clsx from "clsx";
import { FeeV2 } from "../../../core/fbs/model";
import FeeInfo from "./fee-info";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import FeeStatus from "./fee-status";
import { useText } from "../../../core/utils/text";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";
import { FaustId } from "../../../core/utils/types/ids";

export interface StackableFeeProps {
  amountOfMaterialsWithDueDate: number;
  material?: BasicDetailsType;
  faust: FaustId;
  feeData: FeeV2;
  materialItemNumber: string;
  openDetailsModalClickEvent: (faustId: FaustId) => void;
}

const StackableFees: FC<StackableFeeProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  faust,
  material = {},
  feeData,
  materialItemNumber,
  openDetailsModalClickEvent
}) => {
  const t = useText();
  const { amount = 0, creationDate = "", reasonMessage = "" } = feeData;
  const stackSize = amountOfMaterialsWithDueDate - 1;
  const listReservationClass = clsx(["list-reservation", "my-32"], {
    "list-reservation--stacked": stackSize > 1
  });
  return (
    <button
      type="button"
      onClick={() => openDetailsModalClickEvent(faust)}
      className={listReservationClass}
    >
      {feeData && (
        <FeeInfo materialItemNumber={materialItemNumber} material={material}>
          {stackSize > 0 && (
            <p
              className="text-small-caption color-secondary-gray mt-8"
              data-cy="stack-size"
            >
              {t("plusXOtherMaterialsText", {
                placeholders: { "@amount": stackSize }
              })}
            </p>
          )}
        </FeeInfo>
      )}
      <div className="list-reservation__status">
        <FeeStatus dueDate={creationDate} reasonMessage={reasonMessage} />
        <div className="list-reservation__fee">
          <p className="text-body-medium-regular">
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
