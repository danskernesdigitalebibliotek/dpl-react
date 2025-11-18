import React from "react";
import { useQueryState, parseAsBoolean, parseAsJson } from "nuqs";
import AdvancedSearchFilterGroup from "./AdvancedSearchFilterGroup";
import AdvancedSearchToggle from "./AdvancedSearchToggle";
import { useText } from "../../../core/utils/text";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetState } from "../types";
import { FACETS_CONFIG } from "../lib/facet-configs";

interface AdvancedSearchFiltersProps {
  cql: string;
}

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  cql
}) => {
  const t = useText();

  // Toggle states
  const [onShelf, setOnShelf] = useQueryState(
    "onShelf",
    parseAsBoolean.withDefault(false)
  );
  const [onlyExtraTitles, setOnlyExtraTitles] = useQueryState(
    "onlyExtraTitles",
    parseAsBoolean.withDefault(false)
  );

  // Facets state (sidebar filters only)
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const handleFacetChange = (
    facetField: ComplexSearchFacetsEnum,
    selectedValues: string[]
  ) => {
    const facetConfig = FACETS_CONFIG.find((c) => c.facetField === facetField);
    if (!facetConfig) return;

    // Remove facet if empty
    if (selectedValues.length === 0) {
      setFacetsInUrl(facetsFromUrl.filter((f) => f.facetField !== facetField));
      return;
    }

    const existingFacet = facetsFromUrl.find(
      (f) => f.facetField === facetField
    );

    // Update existing facet
    if (existingFacet) {
      setFacetsInUrl(
        facetsFromUrl.map((f) =>
          f.facetField === facetField ? { ...f, selectedValues } : f
        )
      );
      return;
    }

    // Add new facet
    setFacetsInUrl([
      ...facetsFromUrl,
      {
        label: facetConfig.label,
        facetField,
        selectedValues
      }
    ]);
  };

  const getSelectedValues = (facetField: ComplexSearchFacetsEnum): string[] => {
    return (
      facetsFromUrl.find((f) => f.facetField === facetField)?.selectedValues ??
      []
    );
  };

  const getSelectedCount = (facetField: ComplexSearchFacetsEnum): number => {
    return getSelectedValues(facetField).length;
  };

  return (
    <aside className="advanced-search-filters">
      <div className="advanced-search-filters__container">
        {/* Toggles section */}
        <div className="advanced-search-filters__toggles">
          <AdvancedSearchToggle
            id="on-shelf"
            label={t("advancedSearchOnShelfText")}
            description={t("advancedSearchOnShelfDescriptionText")}
            checked={onShelf}
            onChange={setOnShelf}
          />
          <AdvancedSearchToggle
            id="only-extra-titles"
            label={t("advancedSearchOnlyExtraTitlesText")}
            description={t("advancedSearchOnlyExtraTitlesDescriptionText")}
            checked={onlyExtraTitles}
            onChange={setOnlyExtraTitles}
          />
        </div>

        {/* Filter groups */}
        {FACETS_CONFIG.map((config) => {
          const selectedValues = getSelectedValues(config.facetField);
          const selectedCount = getSelectedCount(config.facetField);

          return (
            <AdvancedSearchFilterGroup
              key={config.facetField}
              cql={cql}
              facetField={config.facetField}
              label={config.label}
              selectedValues={selectedValues}
              selectedCount={selectedCount}
              onChange={(vals) => handleFacetChange(config.facetField, vals)}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default AdvancedSearchFilters;
