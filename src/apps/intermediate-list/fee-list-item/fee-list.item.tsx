import * as React from "react";
import { FC } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import { FaustId } from "../../../core/utils/types/ids";
import StackableFees from "../stackable-fees/stackable-fees";

export interface FeeListItemProps {
  prePaymentTypeChange: boolean;
  itemData: FeeV2;
}
const FeeListItem: FC<FeeListItemProps> = ({
  prePaymentTypeChange,
  itemData
}) => {
  const { materials } = itemData;
  return (
    <StackableFees
      prePaymentTypeChange={prePaymentTypeChange}
      amountOfMaterialsWithDueDate={materials.length}
      faust={materials[0].recordId as FaustId}
      feeData={itemData}
    />
  );
};

export default FeeListItem;
