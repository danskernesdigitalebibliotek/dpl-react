import * as React from "react";
import { WorkId } from "../../../core/utils/types/ids";
import MaterialGrid from "../MaterialGrid";
import { calculateAmountToDisplay } from "../materiel-grid-util";

export type MaterialGridManualProps = {
  materialIds: WorkId[];
  title: string;
};

const MaterialGridManual: React.FC<MaterialGridManualProps> = ({
  materialIds,
  title
}) => {
  const selectedAmountOfMaterialsForDisplay = calculateAmountToDisplay(
    materialIds.length
  );

  return (
    <MaterialGrid
      title={title}
      materialIds={materialIds}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  );
};
export default MaterialGridManual;
