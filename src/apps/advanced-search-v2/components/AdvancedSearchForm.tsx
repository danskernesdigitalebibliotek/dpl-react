import React, { useState } from "react";
import AdvancedSearchFilterRow from "./AdvancedSearchFilterRow";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import { useMergedFacetOptions } from "../hooks/use-merged-facet-options";
import MultiSelect from "./MultiSelect";
import AdvancedSearchAgeSelect from "./AdvancedSearchAgeSelect";
import AdvancedSearchPublicationYearSelect from "./AdvancedSearchPublicationYearSelect";
import { Button } from "../../../components/Buttons/Button";
import { FacetState, FilterState } from "../types";

type AdvancedSearchFormProps = {
  filters: FilterState[];
  preSearchFacets: FacetState[];
  updateFilter: (index: number, updates: Partial<FilterState>) => void;
  updatePreSearchFacet: (preSearchFacet: FacetState) => void;
  addFilter: () => void;
  removeFilter: (index: number) => void;
  handleSearch: () => void;
  handleClearFilters: () => void;
};

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  filters,
  preSearchFacets,
  updateFilter,
  updatePreSearchFacet,
  addFilter,
  removeFilter,
  handleSearch,
  handleClearFilters
}) => {
  const t = useText();
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const { mergedFacetOptions } = useMergedFacetOptions();

  const handleAddFilter = () => {
    setFocusIndex(filters.length);
    addFilter();
  };

  const handleRemoveFilter = (index: number) => {
    setFocusIndex(
      filters.length > 1 ? Math.min(index, filters.length - 2) : null
    );
    removeFilter(index);
  };

  // Check if there are any filters to reset
  const hasActiveFilters =
    filters.some((filter) => filter.query.trim()) ||
    preSearchFacets.some(
      (preSearchFacet) => preSearchFacet.selectedValues.length > 0
    );

  return (
    <section className="advanced-search-v2__form">
      {/* Filter inputs */}
      <div className="advanced-search-v2__suggests">
        {filters.map((filter, index) => {
          const config =
            SEARCH_TERM_OPTIONS.find((item) => item.value === filter.term) ??
            SEARCH_TERM_OPTIONS[0];

          return (
            <AdvancedSearchFilterRow
              key={`filter-${index}`}
              shouldAutoFocus={index === focusIndex}
              selectedTerm={filter.term}
              onSelectedTermChange={(value) =>
                updateFilter(index, { term: value })
              }
              query={filter.query}
              onQueryChange={(query) => updateFilter(index, { query })}
              suggestType={config.type}
              inputPlaceholder={t(config.placeholderKey)}
              operator={filters[index + 1]?.operator}
              onOperatorChange={
                index < filters.length - 1
                  ? (operator) => updateFilter(index + 1, { operator })
                  : undefined
              }
              onRemove={() => handleRemoveFilter(index)}
              showRemoveButton={filters.length > 1}
              disableSuggest={config.disableSuggest}
            />
          );
        })}

        <button
          type="button"
          className="advanced-search-v2__add-suggest"
          onClick={handleAddFilter}
        >
          <img src={PlusButtonIcon} alt="" />
          <span>{t("advancedSearchAddRowText")}</span>
        </button>
      </div>
      <div className="advanced-search-v2__selects-wrapper">
        <h2 className="advanced-search-v2__selects-wrapper__title">
          {t("advancedSearchLimitSearchText")}
        </h2>
        <div className="advanced-search-v2__selects-grid">
          {INITIAL_PRE_SEARCH_FACETS_STATE.map((config) => {
            const currentPreSearchFacet = preSearchFacets.find(
              (f) => f.facetField === config.facetField
            );
            const selectedValues = currentPreSearchFacet?.selectedValues ?? [];

            if (config.type === "range") {
              if (config.facetField === "AGES") {
                return (
                  <AdvancedSearchAgeSelect
                    key={config.facetField}
                    label={t(config.label)}
                    selectedValues={selectedValues}
                    rangePresets={config.rangePresets}
                    onUpdate={(values) => {
                      updatePreSearchFacet({
                        facetField: config.facetField,
                        selectedValues: values
                      });
                    }}
                  />
                );
              }
              if (config.facetField === "PUBLICATIONYEAR") {
                return (
                  <AdvancedSearchPublicationYearSelect
                    key={config.facetField}
                    label={t(config.label)}
                    selectedValues={selectedValues}
                    rangePresets={config.rangePresets}
                    onUpdate={(values) => {
                      updatePreSearchFacet({
                        facetField: config.facetField,
                        selectedValues: values
                      });
                    }}
                  />
                );
              }
            }
            if (config.type === "select") {
              const merged = mergedFacetOptions.find(
                (m) => m.facetField === config.facetField
              );
              const options = merged?.options ?? config.options;

              return (
                <MultiSelect
                  enableSearch={config.enableSearch}
                  options={options}
                  key={config.facetField}
                  label={config.label}
                  selectedOptions={selectedValues.map((value) => ({
                    label: value,
                    value
                  }))}
                  onChange={(values) => {
                    const newValues = values.map((option) => option.value);
                    updatePreSearchFacet({
                      facetField: config.facetField,
                      selectedValues: newValues
                    });
                  }}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="advanced-search-v2__action-buttons">
        <Button
          label={t("advancedSearchSearchButtonText")}
          buttonType="none"
          collapsible={false}
          size="large"
          variant="filled"
          onClick={handleSearch}
        />
        {hasActiveFilters && (
          <Button
            label={t("advancedSearchResetText")}
            buttonType="none"
            collapsible={false}
            size="large"
            variant="outline"
            onClick={handleClearFilters}
            classNames="advanced-search-v2__reset-button"
          />
        )}
      </div>
    </section>
  );
};

export default AdvancedSearchForm;
