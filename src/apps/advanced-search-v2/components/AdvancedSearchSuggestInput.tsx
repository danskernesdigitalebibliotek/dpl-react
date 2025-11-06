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
  onSelect?: (opt: Option) => void;
}

const AdvancedSearchSuggestInput: React.FC<Props> = ({
  minimalAutosuggestCharacters = 3,
  onSelect
}) => {
  const [selectedIndex, setSelectedIndex] = useState<string>("term.default");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Option | null>(null);

  const handleIndexChange = (value: string) => {
    setSelectedIndex(value);
    setQ("");
    setSel(null);
  };

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
    { q, type: suggestType },
    { enabled: q.trim().length >= minimalAutosuggestCharacters }
  );

  const items = suggestionsToOptions(data?.complexSuggest?.result);

  const handleSelect = (opt: Option | null) => {
    setSel(opt);
    if (opt) onSelect?.(opt);
  };

  return (
    <div className="advanced-search-suggest">
      <SearchIndexSelect value={selectedIndex} onChange={handleIndexChange} />

      <div className="advanced-search-suggest__combobox-wrapper">
        <ComboBoxHeadless
          items={items}
          onSelect={handleSelect}
          onQueryChange={setQ}
        />
      </div>
    </div>
  );
};

export default AdvancedSearchSuggestInput;
