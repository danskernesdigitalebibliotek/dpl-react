import * as React from "react";
import { useState, useEffect } from "react";
import { WorkId } from "../../core/utils/types/ids";
import RecommendedMaterial from "../recommended-material/RecommendedMaterial";
import { useText } from "../../core/utils/text";
import {
  MaterialGridValidIncrements,
  ValidSelectedIncrements,
  calculateAmountToDisplay
} from "./materiel-grid-util";
import { DisplayMaterialType } from "../../core/utils/types/material-type";
import MaterialListItem from "../../components/card-item-list/MaterialListItem";

export type MaterialGridItemProps = {
  wid: WorkId;
  materialType?: DisplayMaterialType;
};

export type MaterialGridProps = {
  materials: MaterialGridItemProps[];
  title?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
};
const MaterialGrid: React.FC<MaterialGridProps> = ({
  materials,
  title,
  selectedAmountOfMaterialsForDisplay
}) => {
  const t = useText();
  const firstNewItemRef = React.useRef<HTMLLIElement>(null);

  const initialMaximumDisplay = MaterialGridValidIncrements[0];
  const maximumCalculatedDisplay = calculateAmountToDisplay(
    materials.length,
    selectedAmountOfMaterialsForDisplay
  );
  const moreMaterialsThanInitialMaximum =
    maximumCalculatedDisplay > initialMaximumDisplay;

  const [
    currentAmountOfDisplayedMaterials,
    setCurrentMaterialsDisplayedMaterials
  ] = useState(initialMaximumDisplay);

  // Focus on the first new item when the user clicks the "Show more" button
  useEffect(() => {
    if (firstNewItemRef.current) {
      firstNewItemRef.current.focus();
    }
  }, [currentAmountOfDisplayedMaterials]);

  const [showAllMaterials, setShowAllMaterials] = useState(false);

  function handleShowAllMaterials() {
    setCurrentMaterialsDisplayedMaterials(maximumCalculatedDisplay);
    setShowAllMaterials(!showAllMaterials);
  }

  return (
    <div className="material-grid">
      {title && <h2 className="material-grid__title">{title}</h2>}
      <ul className="material-grid__items">
        {materials
          .slice(0, currentAmountOfDisplayedMaterials)
          .map((material, index) => {
            const { wid, materialType } = material;
            return (
              <MaterialListItem
                key={wid}
                ref={index === initialMaximumDisplay ? firstNewItemRef : null}
              >
                <RecommendedMaterial
                  partOfGrid
                  wid={wid}
                  materialType={materialType}
                />
              </MaterialListItem>
            );
          })}
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
