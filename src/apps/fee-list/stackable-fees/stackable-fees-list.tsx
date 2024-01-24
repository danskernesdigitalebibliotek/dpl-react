import React, { FC } from "react";
import { useText } from "../../../core/utils/text";
import { MaterialProps } from "../../loan-list/materials/utils/material-fetch-hoc";
import { FeeMaterialV2 } from "../../../core/fbs/model";
import SelectableMaterial from "../../loan-list/materials/selectable-material/selectable-material";
import StatusBadge from "../../loan-list/materials/utils/status-badge";
import { FaustId } from "../../../core/utils/types/ids";

interface StackableFeeListProps {
  materials: FeeMaterialV2[];
  reasonForFee: string;
}

const StackableFeeList: FC<StackableFeeListProps & MaterialProps> = ({
  materials,
  reasonForFee
}) => {
  const t = useText();

  return (
    <ul className="modal-loan__list-materials">
      {materials.map(({ recordId, materialItemNumber }) => (
        <SelectableMaterial
          focused={false}
          disabled
          statusBadgeComponent={<StatusBadge dangerText={reasonForFee} />}
          item={{ faust: recordId as FaustId }}
          key={recordId}
          statusMessageComponentMobile={
            <div className="list-materials__status__note-mobile">
              {t("feeListMaterialNumberText", {
                placeholders: { "@materialNumber": materialItemNumber }
              })}
            </div>
          }
          statusMessageComponentDesktop={
            <div className="list-materials__status__note-desktop">
              {t("feeListMaterialNumberText", {
                placeholders: { "@materialNumber": materialItemNumber }
              })}
            </div>
          }
        />
      ))}
    </ul>
  );
};

export default StackableFeeList;
