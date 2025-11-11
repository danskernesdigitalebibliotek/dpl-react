import React from "react";
import AdvancedSearchSuggest from "./AdvancedSearchSuggest";
import AdvancedSearchSelect from "./AdvancedSearchSelect";

import { useSearchFormState } from "../hooks/use-search-form-state";
import AdvancedSearchActionButtons from "./AdvancedSearchActionButtons";

const AdvancedSearchForm: React.FC = () => {
  const {
    suggests,
    selects,
    updateSuggest,
    updateSelect,
    handleSearch,
    handleClearFilters
  } = useSearchFormState();
  // Build search query from suggest inputs for fetching facets
  const fetchQuery =
    suggests
      .map((s) => s.query.trim())
      .filter(Boolean)
      .join(" ") || "*";

  return (
    <section className="advanced-search-v2__form">
      <div className="advanced-search-v2__inputs">
        {/* Suggest inputs */}
        {suggests.map((suggest, index) => (
          <AdvancedSearchSuggest
            key={`suggest-${index}`}
            selectedIndex={suggest.term}
            onSelectedIndexChange={(value) =>
              updateSuggest(index, { term: value })
            }
            query={suggest.query}
            onQueryChange={(query) => updateSuggest(index, { query })}
          />
        ))}

        {/* Select search */}
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(2, 1fr)"
          }}
        >
          {selects.map((select, index) => (
            <AdvancedSearchSelect
              key={`select-${index}`}
              fetchQuery={fetchQuery}
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
      </div>
    </section>
  );
};

export default AdvancedSearchForm;
