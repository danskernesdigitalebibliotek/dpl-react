import React from "react";
import { useQueryState, parseAsBoolean, parseAsJson } from "nuqs";
import AdvancedSearchFilterGroup from "./AdvancedSearchFilterGroup";
import AdvancedSearchToggle from "./AdvancedSearchToggle";
import { useText } from "../../../core/utils/text";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FilterState } from "../types";
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

  // Unified filters state (both form and sidebar edit this)
  const [filtersFromUrl, setFiltersInUrl] = useQueryState(
    "filters",
    parseAsJson((value) => value as FilterState[]).withDefault([])
  );

  const handleFilterChange = (
    facetField: ComplexSearchFacetsEnum,
    selectedValues: string[]
  ) => {
    const filterConfig = FACETS_CONFIG.find((c) => c.facetField === facetField);
    if (!filterConfig) return;

    if (selectedValues.length === 0) {
      // Remove filter if empty
      setFiltersInUrl(
        filtersFromUrl.filter((f) => f.facetField !== facetField)
      );
    } else {
      const existingFilter = filtersFromUrl.find(
        (f) => f.facetField === facetField
      );

      if (existingFilter) {
        // Update existing filter
        setFiltersInUrl(
          filtersFromUrl.map((f) =>
            f.facetField === facetField ? { ...f, selectedValues } : f
          )
        );
      } else {
        // Add new filter
        setFiltersInUrl([
          ...filtersFromUrl,
          {
            label: filterConfig.label,
            facetField,
            selectedValues
          }
        ]);
      }
    }
  };

  const getSelectedValues = (facetField: ComplexSearchFacetsEnum): string[] => {
    return (
      filtersFromUrl.find((f) => f.facetField === facetField)?.selectedValues ??
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
              onChange={(vals) => handleFilterChange(config.facetField, vals)}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default AdvancedSearchFilters;
