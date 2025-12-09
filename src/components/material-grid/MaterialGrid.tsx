import clsx from "clsx";
import * as React from "react";
import { useEffect, useState } from "react";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import MaterialListItem from "../card-item-list/MaterialListItem";
import RecommendedMaterial from "../../apps/recommended-material/RecommendedMaterial";

export type MaterialGridItemProps = {
  wid: WorkId;
  materialType?: ManifestationMaterialType;
};

export type MaterialGridProps = {
  materials: MaterialGridItemProps[];
  title?: string;
  description?: string;
  buttonText?: string;
  initialMaximumDisplay?: number;
};

const defaultIncrement: number = 4;

// Business logic states that there cannot be more than 100 items displayed.
// This limit should ideally be happening in the editor-input, but we'll
// add a safeguard here.
const maxAmount: number = 100;

const MaterialGrid: React.FC<MaterialGridProps> = ({
  materials,
  title,
  description,
  buttonText,
  initialMaximumDisplay = defaultIncrement
}) => {
  const firstNewItemRef = React.useRef<HTMLLIElement>(null);

  const moreMaterialsThanInitialMaximum =
    materials.length > initialMaximumDisplay;

  const amountToDisplay = Math.min(maxAmount, materials.length);

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
    setCurrentMaterialsDisplayedMaterials(amountToDisplay);
    setShowAllMaterials(!showAllMaterials);
  }

  if (!materials.length) {
    // eslint-disable-next-line no-console
    console.warn(`No materials to show for MaterialGrid: ${title}`);
    return null;
  }

  const titleClasses = clsx("material-grid__title", {
    "material-grid__title--no-description": !description
  });
  return (
    <div className="material-grid">
      {(title || description) && (
        <div className="material-grid__text-wrapper">
          {title && <h2 className={titleClasses}>{title}</h2>}
          {description && (
            <p className="material-grid__description">{description}</p>
          )}
        </div>
      )}
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
      {moreMaterialsThanInitialMaximum && !showAllMaterials && buttonText && (
        <button
          className="material-grid__show-more btn-primary btn-outline btn-medium"
          data-show-more
          aria-expanded={showAllMaterials ? "true" : "false"}
          type="button"
          onClick={() => handleShowAllMaterials()}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
export default MaterialGrid;
