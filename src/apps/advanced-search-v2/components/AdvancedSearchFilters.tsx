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

  // Facets state
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const handleFacetChange = (
    facetField: ComplexSearchFacetsEnum,
    selectedValues: string[]
  ) => {
    const updatedFacets = FACETS_CONFIG.map((config) =>
      config.facetField === facetField
        ? { facetField, selectedValues }
        : (facetsFromUrl.find((f) => f.facetField === config.facetField) ?? {
            facetField: config.facetField,
            selectedValues: []
          })
    );

    setFacetsInUrl(updatedFacets.filter((f) => f.selectedValues.length > 0));
  };

  const getSelectedCount = (facetField: ComplexSearchFacetsEnum): number => {
    const facet = facetsFromUrl.find((f) => f.facetField === facetField);
    return facet?.selectedValues.length ?? 0;
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
          const facetFromUrl = facetsFromUrl.find(
            (f) => f.facetField === config.facetField
          );
          const selectedValues = facetFromUrl?.selectedValues ?? [];
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
