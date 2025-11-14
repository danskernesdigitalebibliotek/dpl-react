import React from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import AdvancedSearchSelect from "./AdvancedSearchSelect";
import AdvancedSearchSummary from "./AdvancedSearchSummary";

import { useSearchFormState } from "../hooks/use-search-form-state";
import { useFormVisibility } from "../hooks/use-form-visibility";
import AdvancedSearchActionButtons from "./AdvancedSearchActionButtons";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { SEARCH_INDEX_OPTIONS } from "../lib/search-fields-config";

const AdvancedSearchForm: React.FC = () => {
  const t = useText();
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
      {shouldShowSummary && (
        <AdvancedSearchSummary onEditClick={() => setShowForm(true)} />
      )}

      {shouldShowForm && (
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

          {/* Filter selects */}
          <div className="advanced-search-v2__selects-grid">
            {filters.map((filter, index) => (
              <AdvancedSearchSelect
                key={`filter-${index}`}
                facetField={filter.facetField}
                label={filter.label}
                selected={filter.selectedValues.map((value) => ({
                  label: value,
                  value
                }))}
                onChange={(values) =>
                  updateFilter(index, {
                    selectedValues: values.map((option) => option.value)
                  })
                }
              />
            ))}
          </div>

          <AdvancedSearchActionButtons
            onSearch={handleSearchComplete}
            onClear={handleClearFilters}
            showReset={hasFilters}
          />
        </>
      )}
    </section>
  );
};

export default AdvancedSearchForm;
