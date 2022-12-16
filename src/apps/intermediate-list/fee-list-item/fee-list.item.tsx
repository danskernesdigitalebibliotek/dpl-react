import * as React from "react";
import { FC } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import { FaustId } from "../../../core/utils/types/ids";
import StackableFees from "../stackable-fees/stackable-fees";

export interface FeeListItemProps {
  itemData: FeeV2;
}
const FeeListItem: FC<FeeListItemProps> = ({ itemData }) => {
  const { materials } = itemData;
  return (
    <StackableFees
      amountOfMaterialsWithDueDate={materials.length}
      faust={materials[0].recordId as FaustId}
      feeData={itemData}
    />
  );
};

export default FeeListItem;
