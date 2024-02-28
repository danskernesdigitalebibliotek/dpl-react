import * as React from "react";
import { useEffect } from "react";
import { WorkId } from "../../../core/utils/types/ids";
import MaterialGrid from "../MaterialGrid";
import MaterialGridSkeleton from "../MaterialGridSkeleton";
import { calculateAmountToDisplay } from "../materiel-grid-util";

export type MaterialGridManualProps = {
  materialIds: WorkId[];
  title: string;
};

const MaterialGridManual: React.FC<MaterialGridManualProps> = ({
  materialIds,
  title
}) => {
  const [parsedMaterialIds, setParsedMaterials] =
    React.useState<WorkId[]>(materialIds);

  useEffect(() => {
    // Materials must be parsed from string to WorkId[] array as they are
    // received as a string from the backend.
    if (typeof materialIds === "string") {
      setParsedMaterials(JSON.parse(materialIds));
    }
  }, [materialIds]);

  const selectedAmountOfMaterialsForDisplay = calculateAmountToDisplay(
    parsedMaterialIds.length
  );

  if (!parsedMaterialIds.length || typeof parsedMaterialIds === "string") {
    return <MaterialGridSkeleton />;
  }

  return (
    <MaterialGrid
      title={title}
      materialIds={parsedMaterialIds}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  );
};
export default MaterialGridManual;
