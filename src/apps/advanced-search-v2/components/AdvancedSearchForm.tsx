import React, { useState } from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import {
  useComplexFacetSearchQuery,
  type ComplexSearchFacetResponse,
  type ComplexSearchFacetsEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { SEARCH_TERM_OPTIONS } from "../lib/search-fields-config";
import { INITIAL_PRE_SEARCH_FACETS_STATE } from "../lib/initial-state";
import { FacetData, getFacetOptions } from "../lib/facet-options";
import MultiSelect from "./MultiSelect";
import AdvancedSearchAgeSelect from "./AdvancedSearchAgeSelect";
import AdvancedSearchPublicationYearSelect from "./AdvancedSearchPublicationYearSelect";
import { Button } from "../../../components/Buttons/Button";
import { FacetState, SuggestState } from "../types";

export const updateSuggest = (
  prev: SuggestState[],
  index: number,
  updates: Partial<SuggestState>
): SuggestState[] => {
  return prev.map((item, idx) =>
    idx === index ? { ...item, ...updates } : item
  );
};

export const updatePreSearchFacet = ({
  preSearchFacets,
  preSearchFacet
}: {
  preSearchFacets: FacetState[];
  preSearchFacet: FacetState;
}): FacetState[] => {
  const existingIndex = preSearchFacets.findIndex(
    (f) => f.facetField === preSearchFacet.facetField
  );

  if (preSearchFacet.selectedValues.length === 0) {
    // Remove if empty
    return preSearchFacets.filter(
      (f) => f.facetField !== preSearchFacet.facetField
    );
  } else if (existingIndex >= 0) {
    // Update existing
    return preSearchFacets.map((f, idx) =>
      idx === existingIndex ? preSearchFacet : f
    );
  } else {
    // Add new
    return [...preSearchFacets, preSearchFacet];
  }
};

type AdvancedSearchFormProps = {
  suggests: SuggestState[];
  preSearchFacets: FacetState[];
  onSuggests: (suggests: SuggestState[]) => void;
  onPreSearchFacets: (facets: FacetState[]) => void;
  onSearch: () => void;
  onClearFilters: () => void;
};

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  suggests,
  preSearchFacets,
  onSuggests,
  onPreSearchFacets,
  onSearch,
  onClearFilters
}) => {
  const t = useText();
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const facetFields = INITIAL_PRE_SEARCH_FACETS_STATE.filter(
    (config) => config.type === "select"
  ).map((c) => c.facetField);

  const { data } = useComplexFacetSearchQuery({
    cql: "*",
    facets: { facets: facetFields, facetLimit: 25 },
    filters: {}
  });

  const facetData: ComplexSearchFacetResponse[] =
    data?.complexSearch?.facets ?? [];

  const hasFilters =
    suggests.some((suggest) => suggest.query.trim()) ||
    preSearchFacets.some(
      (preSearchFacet) => preSearchFacet.selectedValues.length > 0
    );

  const handleFacetUpdate = (
    facetField: ComplexSearchFacetsEnum,
    selectedValues: string[]
  ) => {
    onPreSearchFacets(
      updatePreSearchFacet({
        preSearchFacets,
        preSearchFacet: {
          facetField,
          selectedValues
        }
      })
    );
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
              query={suggest.query}
              suggestType={config.type}
              inputPlaceholder={t(config.placeholderKey)}
              operator={suggests[index + 1]?.operator}
              onQueryChange={(query) =>
                onSuggests(updateSuggest(suggests, index, { query }))
              }
              onOperatorChange={
                index < suggests.length - 1
                  ? (operator) =>
                      onSuggests(
                        updateSuggest(suggests, index + 1, { operator })
                      )
                  : undefined
              }
              onSelectedTermChange={(value) =>
                onSuggests(updateSuggest(suggests, index, { term: value }))
              }
              onRemove={() => {
                setFocusIndex(
                  suggests.length > 2
                    ? Math.min(index, suggests.length - 2)
                    : null
                );
                onSuggests(suggests.filter((_, idx) => idx !== index));
              }}
              showRemoveButton={suggests.length > 1}
            />
          );
        })}

        <button
          type="button"
          className="advanced-search-v2__add-suggest"
          onClick={() => {
            setFocusIndex(suggests.length);
            onSuggests([
              ...suggests,
              { term: "term.default", query: "", operator: "and" }
            ]);
          }}
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
              const RangeComponent =
                config.facetField === "AGES"
                  ? AdvancedSearchAgeSelect
                  : config.facetField === "PUBLICATIONYEAR"
                    ? AdvancedSearchPublicationYearSelect
                    : null;

              if (!RangeComponent) return null;

              return (
                <RangeComponent
                  key={config.facetField}
                  label={t(config.label)}
                  selectedValues={selectedValues}
                  rangePresets={config.rangePresets}
                  onUpdate={(values) =>
                    handleFacetUpdate(config.facetField, values)
                  }
                />
              );
            }

            if (config.type === "select") {
              return (
                <MultiSelect
                  key={config.facetField}
                  enableSearch={config.enableSearch}
                  label={config.label}
                  options={getFacetOptions(
                    config.facetField,
                    config,
                    facetData as FacetData[]
                  )}
                  selectedOptions={selectedValues.map((value) => ({
                    label: value,
                    value
                  }))}
                  onChange={(values) =>
                    handleFacetUpdate(
                      config.facetField,
                      values.map((option) => option.value)
                    )
                  }
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
          onClick={onSearch}
        />
        {hasFilters && (
          <Button
            label={t("advancedSearchResetText")}
            buttonType="none"
            collapsible={false}
            size="large"
            variant="outline"
            onClick={onClearFilters}
            classNames="advanced-search-v2__reset-button"
          />
        )}
      </div>
    </section>
  );
};

export default AdvancedSearchForm;
