import React, { useMemo } from "react";
import { type Option, suggestionsToOptions } from "../suggestions";
import { SEARCH_INDEX_OPTIONS, type SearchIndexItem } from "../search-index";
import SearchIndexSelect from "./SearchIndexSelect";
import ComboBoxBase from "./ComboBoxBase";
import {
  ComplexSuggestionTypeEnum,
  useComplexSuggestQuery
} from "../../../core/dbc-gateway/generated/graphql";

interface Props {
  minimalAutosuggestCharacters?: number;
  selectedIndex: string;
  onSelectedIndexChange: (value: string) => void;
  selected?: Option | null;
  onSelect?: (opt: Option | null) => void;
  // Controlled query value and change handler
  query: string;
  onQueryChange: (q: string) => void;
}

const AdvancedSearchSuggestInput: React.FC<Props> = ({
  minimalAutosuggestCharacters = 3,
  selectedIndex,
  onSelectedIndexChange,
  selected,
  onSelect,
  query,
  onQueryChange
}) => {
  const foundIndex = useMemo(
    () =>
      SEARCH_INDEX_OPTIONS.find(
        (i: SearchIndexItem) => i.value === selectedIndex
      ),
    [selectedIndex]
  );

  const suggestType: ComplexSuggestionTypeEnum =
    foundIndex?.type ?? ComplexSuggestionTypeEnum.Default;

  const { data } = useComplexSuggestQuery(
    { q: query, type: suggestType },
    { enabled: query.trim().length >= minimalAutosuggestCharacters }
  );

  const items = suggestionsToOptions(data?.complexSuggest?.result);

  return (
    <div className="advanced-search-suggest">
      <SearchIndexSelect
        value={selectedIndex}
        onChange={onSelectedIndexChange}
      />

      <div className="advanced-search-suggest__combobox-wrapper">
        <ComboBoxBase
          allowFreeInput
          items={items}
          value={selected ?? null}
          onChange={(next) => {
            if (!Array.isArray(next)) {
              onSelect?.(next ?? null);
            }
          }}
          query={query}
          onQueryChange={onQueryChange}
          classes={{
            input: "advanced-search-select-search__combobox-input",
            options:
              "advanced-search-dropdown advanced-search-suggest__combobox-options"
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedSearchSuggestInput;
