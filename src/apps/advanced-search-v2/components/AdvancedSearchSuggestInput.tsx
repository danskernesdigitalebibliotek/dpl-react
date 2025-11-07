import React, { useMemo } from "react";
import { type Option, suggestionsToOptions } from "../suggestions";
import { SEARCH_INDEX_OPTIONS, type SearchIndexItem } from "../search-index";
import SearchIndexSelect from "./SearchIndexSelect";
import ComboBoxHeadless from "./ComboBoxHeadless";
import {
  ComplexSuggestionTypeEnum,
  useComplexSuggestQuery
} from "../../../core/dbc-gateway/generated/graphql";

interface Props {
  minimalAutosuggestCharacters?: number;
  selectedIndex: string;
  onSelectedIndexChange: (value: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
  selected: Option | null;
  onSelect: (opt: Option | null) => void;
}

const AdvancedSearchSuggestInput: React.FC<Props> = ({
  minimalAutosuggestCharacters = 3,
  selectedIndex,
  onSelectedIndexChange,
  query,
  onQueryChange,
  selected,
  onSelect
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
      <SearchIndexSelect value={selectedIndex} onChange={onSelectedIndexChange} />

      <div className="advanced-search-suggest__combobox-wrapper">
        <ComboBoxHeadless
          items={items}
          value={selected}
          onChange={onSelect}
          onQueryChange={onQueryChange}
        />
      </div>
    </div>
  );
};

export default AdvancedSearchSuggestInput;
