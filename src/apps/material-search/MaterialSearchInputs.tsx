import React, { FC } from "react";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

interface MaterialSearchInputsProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  availableMaterialTypes: ManifestationMaterialType[] | null;
  selectedMaterialType: ManifestationMaterialType | null;
  handleUpdateMaterialType: (newValue: ManifestationMaterialType) => void;
  work: Work | null;
  uniqueIdentifier: string;
}

const MaterialSearchInputs: FC<MaterialSearchInputsProps> = ({
  searchInput,
  setSearchInput,
  availableMaterialTypes,
  selectedMaterialType,
  handleUpdateMaterialType,
  work,
  uniqueIdentifier
}) => {
  const t = useText();
  return (
    <div className="material-search__inputs-container">
      <label className="material-search__label" htmlFor="material-search-input">
        {t("materialSearchSearchInputText")}
        <input
          id={`material-search-input-${uniqueIdentifier}`}
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t("materialSearchSearchInputPlaceholderText")}
          className="material-search__input"
        />
      </label>
      <label
        className="material-search__label"
        htmlFor="material-type-selector"
      >
        {t("materialSearchMaterialTypeSelectorText")}
        <select
          id={`material-type-selector-${uniqueIdentifier}`}
          className="material-search__selector"
          disabled={
            !work ||
            !availableMaterialTypes ||
            availableMaterialTypes.length === 0
          }
          onChange={(e) =>
            handleUpdateMaterialType(
              e.target.value as ManifestationMaterialType
            )
          }
          value={selectedMaterialType || ""}
        >
          <option value="" disabled>
            {t("materialSearchMaterialTypeSelectorNoneOptionText")}
          </option>
          {availableMaterialTypes &&
            availableMaterialTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default MaterialSearchInputs;
