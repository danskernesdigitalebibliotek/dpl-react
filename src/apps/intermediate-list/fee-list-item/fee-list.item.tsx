import * as React from "react";
import { FC } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import { FaustId } from "../../../core/utils/types/ids";
import StackableFees from "../stackable-fees/stackable-fees";

export interface FeeListItemProps {
  prePaymentTypeChange: boolean;
  itemData: FeeV2;
  openDetailsModalClickEvent: (faustId: string) => void;
  stackHeight: number;
}
const FeeListItem: FC<FeeListItemProps> = ({
  itemData,
  openDetailsModalClickEvent,
  stackHeight
}) => {
  const { materials } = itemData;
  return (
    <StackableFees
      amountOfMaterialsWithDueDate={materials.length}
      faust={materials[0].recordId as FaustId}
      feeData={itemData}
      openDetailsModalClickEvent={openDetailsModalClickEvent}
      stackHeight={stackHeight}
    />
  );
};

export default FeeListItem;
