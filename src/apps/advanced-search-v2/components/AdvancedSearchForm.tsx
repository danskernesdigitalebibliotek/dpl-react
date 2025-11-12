import React from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import AdvancedSearchSelect from "./AdvancedSearchSelect";

import { useSearchFormState } from "../hooks/use-search-form-state";
import AdvancedSearchActionButtons from "./AdvancedSearchActionButtons";
import PlusButtonIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import { useText } from "../../../core/utils/text";
import { buildCQLQuery } from "../lib/query-builder";

const AdvancedSearchForm: React.FC = () => {
  const t = useText();
  const {
    suggests,
    selects,
    updateSuggest,
    updateSelect,
    addSuggest,
    removeSuggest,
    handleSearch,
    handleClearFilters
  } = useSearchFormState();
  // Build CQL query for facet calculation - this ensures facets reflect the actual search
  const facetCql = buildCQLQuery(suggests, selects, []);

  return (
    <section className="advanced-search-v2__form">
      {/* Suggest inputs */}
      <div className="advanced-search-v2__suggests">
        {suggests.map((suggest, index) => (
          <AdvancedSearchSuggest
            key={`suggest-${index}`}
            selectedIndex={suggest.term}
            onSelectedIndexChange={(value) =>
              updateSuggest(index, { term: value })
            }
            query={suggest.query}
            onQueryChange={(query) => updateSuggest(index, { query })}
            operator={suggests[index + 1]?.operator}
            onOperatorChange={
              index < suggests.length - 1
                ? (operator) => updateSuggest(index + 1, { operator })
                : undefined
            }
            onRemove={() => removeSuggest(index)}
            showRemoveButton={suggests.length > 1}
          />
        ))}

        <button
          type="button"
          className="advanced-search-v2__add-suggest"
          onClick={addSuggest}
        >
          <img src={PlusButtonIcon} alt="" />
          <span>{t("advancedSearchAddRowText")}</span>
        </button>
      </div>

      {/* Select search */}
      <div className="advanced-search-v2__selects-grid">
        {selects.map((select, index) => (
          <AdvancedSearchSelect
            key={`select-${index}`}
            cql={facetCql}
            facetField={select.facetField}
            label={select.label}
            selected={select.selectedValues.map((value) => ({
              label: value,
              value
            }))}
            onChange={(values) =>
              updateSelect(index, {
                selectedValues: values.map((option) => option.value)
              })
            }
          />
        ))}
      </div>

      <AdvancedSearchActionButtons
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />
    </section>
  );
};

export default AdvancedSearchForm;
