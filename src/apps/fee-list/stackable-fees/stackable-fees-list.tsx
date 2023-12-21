import React, { FC } from "react";
import { useText } from "../../../core/utils/text";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";
import { FeeMaterialV2 } from "../../../core/fbs/model";
import SelectableMaterial from "../../loan-list/materials/selectable-material/selectable-material";
import StatusBadge from "../../loan-list/materials/utils/status-badge";
import { FaustId } from "../../../core/utils/types/ids";

interface StackableFeeListProps {
  creationDateFormatted: string;
  materials: FeeMaterialV2[];
}

const StackableFeeList: FC<StackableFeeListProps & MaterialProps> = ({
  materials,
  creationDateFormatted
}) => {
  const t = useText();

  return (
    <ul className="modal-loan__list-materials">
      {materials.map(({ recordId, materialItemNumber }) => (
        <SelectableMaterial
          focused={false}
          disabled
          statusBadgeComponent={
            <StatusBadge
              dangerText={t("turnedInText", {
                placeholders: { "@date": creationDateFormatted }
              })}
            />
          }
          item={{ faust: recordId as FaustId }}
          key={recordId}
          statusMessageComponentMobile={
            <div className="list-materials__status__note-mobile">
              {t("materialNumberText", {
                placeholders: { "@materialNumber": materialItemNumber }
              })}
            </div>
          }
          statusMessageComponentDesktop={
            <div className="list-materials__status__note-desktop">
              {t("materialNumberText", {
                placeholders: { "@materialNumber": materialItemNumber }
              })}
            </div>
          }
        />
      ))}
    </ul>
  );
};

export default fetchMaterial(StackableFeeList);
