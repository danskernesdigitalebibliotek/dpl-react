import * as React from "react";
import MaterialGrid, { MaterialGridItemProps } from "../MaterialGrid";
import { calculateAmountToDisplay } from "../materiel-grid-util";

export type MaterialGridManualProps = {
  materials: MaterialGridItemProps[];
  title?: string;
};

const MaterialGridManual: React.FC<MaterialGridManualProps> = ({
  materials,
  title
}) => {
  const selectedAmountOfMaterialsForDisplay = calculateAmountToDisplay(
    materials.length
  );

  return (
    <MaterialGrid
      title={title}
      materials={materials}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  );
};
export default MaterialGridManual;
