import React, { useMemo, useState } from "react";
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
  selected?: Option | null;
  onSelect?: (opt: Option | null) => void;
  // NEW: allow parent to observe query changes so it can persist minimal state
  onQueryChange?: (q: string) => void;
}

const AdvancedSearchSuggestInput: React.FC<Props> = ({
  minimalAutosuggestCharacters = 3,
  selectedIndex,
  onSelectedIndexChange,
  selected,
  onSelect,
  onQueryChange
}) => {
  const [query, setQuery] = useState("");
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
        <ComboBoxHeadless
          items={items}
          value={selected ?? null}
          onChange={onSelect ?? (() => {})}
          onQueryChange={(q) => {
            setQuery(q);
            onQueryChange?.(q);
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedSearchSuggestInput;
