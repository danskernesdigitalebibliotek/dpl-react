import React from "react";
import { SuggestState, MultiSelectState } from "../types";
import { FacetFieldEnum } from "../../../core/dbc-gateway/generated/graphql";
import AdvancedSearchSuggestInput from "./AdvancedSearchSuggestInput";
import AdvancedSearchSelectSearch from "./AdvancedSearchSelectSearch";

interface SearchFormProps {
  suggests: SuggestState[];
  selects: MultiSelectState[];
  onSuggestUpdate: (index: number, updates: Partial<SuggestState>) => void;
  onSelectUpdate: (index: number, updates: Partial<MultiSelectState>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  suggests,
  selects,
  onSuggestUpdate,
  onSelectUpdate
}) => {
  return (
    <div className="advanced-search-v2__inputs">
      {/* Suggest inputs */}
      {suggests.map((suggest, index) => (
        <AdvancedSearchSuggestInput
          key={`suggest-${index}`}
          selectedIndex={suggest.term}
          onSelectedIndexChange={(value) =>
            onSuggestUpdate(index, { term: value })
          }
          query={suggest.query}
          onQueryChange={(query) => onSuggestUpdate(index, { query })}
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
          <AdvancedSearchSelectSearch
            key={`select-${index}`}
            fetchQuery={select.term}
            facetField={FacetFieldEnum.Subjects}
            label={select.term}
            selected={select.selectedValues.map((value) => ({
              label: value,
              value
            }))}
            onChange={(values) =>
              onSelectUpdate(index, {
                selectedValues: values.map((option) => option.value)
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
