import React, { FC, ReactNode } from "react";
import ListHeader from "../../components/list-header/list-header";
import { FeeV2 } from "../../core/fbs/model";
import StackableFees from "./stackable-fees/stackable-fees";
import { FaustId } from "../../core/utils/types/ids";

interface ListProps {
  openDetailsModalClickEvent: (faustId: string) => void;
  fees: FeeV2[] | null;
  dataCy: string;
  listHeader: ReactNode;
  totalText: string;
}
const List: FC<ListProps> = ({
  openDetailsModalClickEvent,
  fees,
  listHeader,
  dataCy,
  totalText
}) => {
  return (
    <div>
      {fees && (
        <div data-cy={dataCy}>
          <ListHeader header={listHeader} amount={null} />
          {fees.map((itemData) => (
            <StackableFees
              amountOfMaterialsWithDueDate={itemData.materials.length}
              item={{ faust: itemData.materials[0].recordId as FaustId }}
              faust={itemData.materials[0].recordId as FaustId}
              materialItemNumber={itemData.materials[0].materialItemNumber}
              feeData={itemData}
              openDetailsModalClickEvent={openDetailsModalClickEvent}
            />
          ))}
          <div className="fee-list-bottom">
            <div className="fee-list-bottom__paymenttypes" />
            <div className="fee-list-bottom__actions">
              <p className="text-body-small-medium">{totalText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
