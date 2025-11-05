import React, { useState } from "react";
import { type Option, suggestionsToOptions } from "./suggestions";
import { SEARCH_INDEX_OPTIONS, type SearchIndexItem } from "./search-index";
import ComboBoxDownshift from "./components/ComboBoxDownshift";
import ComboBoxHeadless from "./components/ComboBoxHeadless";
import ComboBoxCustom from "./components/ComboBoxCustom";
import ComboBoxRadix from "./components/ComboBoxRadix";
import SearchIndexSelect from "./components/SearchIndexSelect";
import {
  useComplexSuggestQuery,
  ComplexSuggestionTypeEnum
} from "../../core/dbc-gateway/generated/graphql";

const AdvancedSearchV2 = () => {
  const [selDownshift, setSelDownshift] = useState<Option | null>(null);
  const [selHeadless, setSelHeadless] = useState<Option | null>(null);
  const [selRadix, setSelRadix] = useState<Option | null>(null);
  const [selCustom, setSelCustom] = useState<Option | null>(null);

  const [selectedIndex, setSelectedIndex] = useState<string>("term.default");
  const [q, setQ] = useState("");
  const minimalAutosuggestCharacters = 3;

  const handleIndexChange = (value: string) => {
    setSelectedIndex(value);
    setQ("");
    setSelDownshift(null);
    setSelHeadless(null);
    setSelRadix(null);
    setSelCustom(null);
  };

  const foundIndex = SEARCH_INDEX_OPTIONS.find(
    (i: SearchIndexItem) => i.value === selectedIndex
  );
  const suggestType: ComplexSuggestionTypeEnum =
    foundIndex?.type ?? ComplexSuggestionTypeEnum.Default;
  const { data } = useComplexSuggestQuery(
    { q, type: suggestType },
    { enabled: q.trim().length >= minimalAutosuggestCharacters }
  );

  const items = suggestionsToOptions(data?.complexSuggest?.result);

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 800, margin: "0 auto" }}>
      <SearchIndexSelect value={selectedIndex} onChange={handleIndexChange} />

      <section>
        <h3>Downshift ComboBox</h3>
        <ComboBoxDownshift
          key={`downshift-${selectedIndex}`}
          items={items}
          onSelect={setSelDownshift}
          onQueryChange={setQ}
        />
        <small>Selected: {selDownshift ? selDownshift.label : "None"}</small>
      </section>

      <section>
        <h3>Headless UI ComboBox</h3>
        <ComboBoxHeadless
          key={`headless-${selectedIndex}`}
          items={items}
          onSelect={setSelHeadless}
          onQueryChange={setQ}
        />
        <small>Selected: {selHeadless ? selHeadless.label : "None"}</small>
      </section>

      <section>
        <h3>Radix UI (Popover) ComboBox</h3>
        <ComboBoxRadix
          key={`radix-${selectedIndex}`}
          items={items}
          onSelect={setSelRadix}
          onQueryChange={setQ}
        />
        <small>Selected: {selRadix ? selRadix.label : "None"}</small>
      </section>

      <section>
        <h3>Custom Accessible ComboBox</h3>
        <ComboBoxCustom
          key={`custom-${selectedIndex}`}
          items={items}
          onSelect={setSelCustom}
          onQueryChange={setQ}
        />
        <small>Selected: {selCustom ? selCustom.label : "None"}</small>
      </section>
    </div>
  );
};

export default AdvancedSearchV2;
