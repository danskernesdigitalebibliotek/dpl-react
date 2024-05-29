import * as React from "react";
import MaterialGrid, { MaterialGridItemProps } from "../MaterialGrid";
import { calculateAmountToDisplay } from "../materiel-grid-util";

export type MaterialGridManualProps = {
  materials: MaterialGridItemProps[];
  title?: string;
  description?: string;
};

const MaterialGridManual: React.FC<MaterialGridManualProps> = ({
  materials,
  title,
  description
}) => {
  const selectedAmountOfMaterialsForDisplay = calculateAmountToDisplay(
    materials.length
  );

  return (
    <MaterialGrid
      title={title}
      description={description}
      materials={materials}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  );
};
export default MaterialGridManual;
