import React, { useRef, useEffect } from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import AdvancedSearchSelect from "./AdvancedSearchSelect";
import AdvancedSearchRangeFacet from "./AdvancedSearchRangeFacet";
import { useSearchFormState } from "../hooks/use-search-form-state";
import { useFormVisibility } from "../hooks/use-form-visibility";
import AdvancedSearchActionButtons from "./AdvancedSearchActionButtons";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";

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

      {/* Pre-search facet selects - fixed structure, values from preSearchFacets state */}
      <div className="advanced-search-v2__selects-grid">
        {INITIAL_PRE_SEARCH_FACETS_STATE.map((config) => {
          // Get current values from preSearchFacets state
          const currentPreSearchFacet = preSearchFacets.find(
            (f) => f.facetField === config.facetField
          );
          const selectedValues = currentPreSearchFacet?.selectedValues ?? [];

          if (
            config.facetField === ComplexSearchFacetsEnum.Ages ||
            config.facetField === ComplexSearchFacetsEnum.Publicationyear
          ) {
            return (
              <AdvancedSearchRangeFacet
                key={config.facetField}
                facetField={config.facetField}
                label={t(config.label)}
                selectedValues={selectedValues}
                onUpdate={(values) => {
                  updatePreSearchFacet({
                    label: config.label,
                    facetField: config.facetField,
                    selectedValues: values
                  });
                }}
              />
            );
          }

          return (
            <AdvancedSearchSelect
              key={config.facetField}
              facetField={config.facetField}
              label={t(config.label)}
              selected={selectedValues.map((value) => ({
                label: value,
                value
              }))}
              onChange={(values) => {
                const newValues = values.map((option) => option.value);
                // Upsert: update if exists, add if new, remove if empty
                updatePreSearchFacet({
                  label: config.label,
                  facetField: config.facetField,
                  selectedValues: newValues
                });
              }}
            />
          );
        })}
      </div>

      <AdvancedSearchActionButtons
        onSearch={handleSearchComplete}
        onClear={handleClearFilters}
        showReset={hasFilters}
      />
    </section>
  );
};

export default AdvancedSearchForm;
