import React, { useRef, useEffect } from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import { useSearchFormState } from "../hooks/use-search-form-state";
import { useFormVisibility } from "../hooks/use-form-visibility";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import MultiSelect from "./MultiSelect";
import AdvancedSearchAgeSelect from "./AdvancedSearchAgeSelect";
import AdvancedSearchPublicationYearSelect from "./AdvancedSearchPublicationYearSelect";
import { Button } from "../../../components/Buttons/Button";

const AdvancedSearchForm: React.FC = () => {
  const t = useText();
  const suggestRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const previousSuggestCount = useRef<number>(0);
  const {
    suggests,
    preSearchFacets,
    updateSuggest,
    updatePreSearchFacet,
    addSuggest,
    removeSuggest,
    handleSearch,
    handleClearFilters
  } = useSearchFormState();

  const { setView } = useFormVisibility();

  // Focus on the newly added suggest row's SearchIndexSelect
  useEffect(() => {
    if (suggests.length > previousSuggestCount.current) {
      const newRowIndex = suggests.length - 1;
      const newRowRef = suggestRefs.current.get(newRowIndex);
      if (newRowRef) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          newRowRef.focus();
        }, 0);
      }
    }
    previousSuggestCount.current = suggests.length;
  }, [suggests.length]);

  // Check if there are any filters to reset
  const hasFilters =
    suggests.some((suggest) => suggest.query.trim()) ||
    preSearchFacets.some(
      (preSearchFacet) => preSearchFacet.selectedValues.length > 0
    );

  const handleSearchComplete = () => {
    handleSearch();
    setView("results");
  };

  return (
    <section className="advanced-search-v2__form">
      {/* Suggest inputs */}
      <div className="advanced-search-v2__suggests">
        {suggests.map((suggest, index) => {
          const config =
            SEARCH_TERM_OPTIONS.find((item) => item.value === suggest.term) ??
            SEARCH_TERM_OPTIONS[0];

          return (
            <AdvancedSearchSuggest
              key={`suggest-${index}`}
              ref={(el) => {
                if (el) {
                  suggestRefs.current.set(index, el);
                } else {
                  suggestRefs.current.delete(index);
                }
              }}
              selectedTerm={suggest.term}
              onSelectedTermChange={(value) =>
                updateSuggest(index, { term: value })
              }
              query={suggest.query}
              onQueryChange={(query) => updateSuggest(index, { query })}
              suggestType={config.type}
              inputPlaceholder={t(config.placeholderKey)}
              operator={suggests[index + 1]?.operator}
              onOperatorChange={
                index < suggests.length - 1
                  ? (operator) => updateSuggest(index + 1, { operator })
                  : undefined
              }
              onRemove={() => removeSuggest(index)}
              showRemoveButton={suggests.length > 1}
            />
          );
        })}

        <button
          type="button"
          className="advanced-search-v2__add-suggest"
          onClick={addSuggest}
        >
          <img src={PlusButtonIcon} alt="" />
          <span>{t("advancedSearchAddRowText")}</span>
        </button>
      </div>

      <div className="advanced-search-v2__selects-wrapper">
        <h2 className="advanced-search-v2__selects-wrapper__title">
          Afgræns din søgning
        </h2>

        {/* Pre-search facet selects - fixed structure, values from preSearchFacets state */}
        <div className="advanced-search-v2__selects-grid">
          {INITIAL_PRE_SEARCH_FACETS_STATE.map((config) => {
            // Get current values from preSearchFacets state
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
            if (config.type === "select")
              return (
                <MultiSelect
                  enableSearch={config.enableSearch}
                  options={config.options}
                  key={config.facetField}
                  label={config.label}
                  selectedOptions={selectedValues.map((value) => ({
                    label: value,
                    value
                  }))}
                  onChange={(values) => {
                    const newValues = values.map((option) => option.value);
                    // Upsert: update if exists, add if new, remove if empty
                    updatePreSearchFacet({
                      facetField: config.facetField,
                      selectedValues: newValues
                    });
                  }}
                />
              );
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
          onClick={handleSearchComplete}
        />
        {hasFilters && (
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
