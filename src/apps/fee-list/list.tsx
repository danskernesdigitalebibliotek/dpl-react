import React, { FC, ReactNode } from "react";
import ListHeader from "../../components/list-header/list-header";
import { FeeV2 } from "../../core/fbs/model";
import TotalPaymentPay from "./stackable-fees/total-payment-pay";
import StackableFees from "./stackable-fees/stackable-fees";
import { FaustId } from "../../core/utils/types/ids";

interface ListProps {
  openDetailsModalClickEvent: (faustId: string) => void;
  fees: FeeV2[] | null;
  dataCy: string;
  listHeader: ReactNode;
  hideCheckbox: boolean;
  totalText: string;
}
const List: FC<ListProps> = ({
  openDetailsModalClickEvent,
  fees,
  listHeader,
  dataCy,
  totalText,
  hideCheckbox
}) => {
  return (
    <div>
      {fees && (
        <div data-cy={dataCy}>
          <ListHeader header={listHeader} amount={null} />
          {fees.map((itemData) => (
            <StackableFees
              amountOfMaterialsWithDueDate={itemData.materials.length}
              faust={itemData.materials[0].recordId as FaustId}
              materialItemNumber={itemData.materials[0].materialItemNumber}
              feeData={itemData}
              openDetailsModalClickEvent={openDetailsModalClickEvent}
            />
          ))}
          <TotalPaymentPay
            hideCheckbox={hideCheckbox}
            prePaymentTypeChange={!hideCheckbox}
            totalText={totalText}
          />
        </div>
      )}
    </div>
  );
};

export default List;
