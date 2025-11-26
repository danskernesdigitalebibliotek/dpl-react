import React, { useState } from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import { useSearchFormState } from "../hooks/use-search-form-state";
import { useFormVisibility } from "../hooks/use-form-visibility";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import { useAddFetchedFacets } from "../hooks/use-add-fetched-facets";
import MultiSelect from "./MultiSelect";
import AdvancedSearchAgeSelect from "./AdvancedSearchAgeSelect";
import AdvancedSearchPublicationYearSelect from "./AdvancedSearchPublicationYearSelect";
import { Button } from "../../../components/Buttons/Button";

const AdvancedSearchForm: React.FC = () => {
  const t = useText();
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

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
  const { optionsByFacet } = useAddFetchedFacets();

  const handleAddSuggest = () => {
    setFocusIndex(suggests.length);
    addSuggest();
  };

  const handleRemoveSuggest = (index: number) => {
    setFocusIndex(
      suggests.length > 1 ? Math.min(index, suggests.length - 2) : null
    );
    removeSuggest(index);
  };

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
              shouldAutoFocus={index === focusIndex}
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
              onRemove={() => handleRemoveSuggest(index)}
              showRemoveButton={suggests.length > 1}
            />
          );
        })}

        <button
          type="button"
          className="advanced-search-v2__add-suggest"
          onClick={handleAddSuggest}
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
              const options =
                optionsByFacet.get(config.facetField) ?? config.options;

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
