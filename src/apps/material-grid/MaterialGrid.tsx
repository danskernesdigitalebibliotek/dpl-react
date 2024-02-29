import * as React from "react";
import { useState } from "react";
import { WorkId } from "../../core/utils/types/ids";
import RecommendedMaterial from "../recommended-material/RecommendedMaterial";
import { useText } from "../../core/utils/text";
import {
  MaterialGridValidIncrements,
  ValidSelectedIncrements,
  calculateAmountToDisplay
} from "./materiel-grid-util";

export type MaterialGridProps = {
  materialIds: WorkId[];
  title?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
};
const MaterialGrid: React.FC<MaterialGridProps> = ({
  materialIds,
  title,
  selectedAmountOfMaterialsForDisplay
}) => {
  const t = useText();

  const initialMaximumDisplay = MaterialGridValidIncrements[0];
  const maximumCalculatedDisplay = calculateAmountToDisplay(
    materialIds.length,
    selectedAmountOfMaterialsForDisplay
  );
  const moreMaterialsThanInitialMaximum =
    maximumCalculatedDisplay > initialMaximumDisplay;

  const [
    currentAmountOfDisplayedMaterials,
    setCurrentMaterialsDisplayedMaterials
  ] = useState(initialMaximumDisplay);

  const [showAllMaterials, setShowAllMaterials] = useState(false);

  function handleShowAllMaterials() {
    setCurrentMaterialsDisplayedMaterials(maximumCalculatedDisplay);
    setShowAllMaterials(!showAllMaterials);
  }

  return (
    <div className="material-grid">
      {title && <h2 className="material-grid__title">{title}</h2>}
      <ul className="material-grid__items">
        {materialIds
          .slice(0, currentAmountOfDisplayedMaterials)
          .map((materialId) => (
            <li key={materialId}>
              <RecommendedMaterial wid={materialId} partOfGrid />
            </li>
          ))}
      </ul>
      {moreMaterialsThanInitialMaximum && !showAllMaterials && (
        <button
          className="material-grid__show-more btn-primary btn-outline btn-medium"
          data-show-more
          aria-expanded={showAllMaterials ? "true" : "false"}
          type="button"
          onClick={() => handleShowAllMaterials()}
        >
          {t("buttonText")}
        </button>
      )}
    </div>
  );
};
export default MaterialGrid;
