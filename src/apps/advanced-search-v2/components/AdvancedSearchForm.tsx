import React, { useRef, useEffect, Activity } from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import AdvancedSearchSelect from "./AdvancedSearchSelect";
import AdvancedSearchSummary from "./AdvancedSearchSummary";

import { useSearchFormState } from "../hooks/use-search-form-state";
import { useFormVisibility } from "../hooks/use-form-visibility";
import AdvancedSearchActionButtons from "./AdvancedSearchActionButtons";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { SEARCH_INDEX_OPTIONS } from "../lib/search-fields-config";
import { INITIAL_FILTERS_STATE } from "../lib/initial-state";

const AdvancedSearchForm: React.FC = () => {
  const t = useText();
  const suggestRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const previousSuggestCount = useRef<number>(0);
  const {
    suggests,
    filters,
    updateSuggest,
    updateFilter,
    addSuggest,
    removeSuggest,
    handleSearch,
    handleClearFilters
  } = useSearchFormState();

  const { shouldShowForm, shouldShowSummary, setShowForm } =
    useFormVisibility();

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
    filters.some((filter) => filter.selectedValues.length > 0);

  const handleSearchComplete = () => {
    handleSearch();
    setShowForm(false);
  };

  return (
    <section className="advanced-search-v2__form">
      <Activity mode={shouldShowSummary ? "visible" : "hidden"}>
        <AdvancedSearchSummary onEditClick={() => setShowForm(true)} />
      </Activity>

      <Activity mode={shouldShowForm ? "visible" : "hidden"}>
        <>
          {/* Suggest inputs */}
          <div className="advanced-search-v2__suggests">
            {suggests.map((suggest, index) => {
              const config = SEARCH_INDEX_OPTIONS.find(
                (item) => item.value === suggest.term
              )!;

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
                  selectedIndex={suggest.term}
                  onSelectedIndexChange={(value) =>
                    updateSuggest(index, { term: value })
                  }
                  query={suggest.query}
                  onQueryChange={(query) => updateSuggest(index, { query })}
                  suggestType={config.type}
                  placeholderKey={config.placeholderKey}
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

          {/* Filter selects - fixed structure, values from unified state */}
          <div className="advanced-search-v2__selects-grid">
            {INITIAL_FILTERS_STATE.map((config) => {
              // Get current values from unified filters state
              const currentFilter = filters.find(
                (f) => f.facetField === config.facetField
              );
              const selectedValues = currentFilter?.selectedValues ?? [];

              return (
                <AdvancedSearchSelect
                  key={config.facetField}
                  facetField={config.facetField}
                  label={config.label}
                  selected={selectedValues.map((value) => ({
                    label: value,
                    value
                  }))}
                  onChange={(values) => {
                    const newValues = values.map((option) => option.value);
                    // Upsert: update if exists, add if new, remove if empty
                    updateFilter({
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
        </>
      </Activity>
    </section>
  );
};

export default AdvancedSearchForm;
