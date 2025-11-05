import React, { useState } from "react";
import { type Option, suggestionsToOptions } from "./suggestions";
import { SEARCH_INDEX_OPTIONS, type SearchIndexItem } from "./search-index";
import ComboBoxDownshift from "./components/ComboBoxDownshift";
import ComboBoxHeadless from "./components/ComboBoxHeadless";
import ComboBoxCustom from "./components/ComboBoxCustom";
import ComboBoxRadix from "./components/ComboBoxRadix";
import SearchIndexSelect from "./components/SearchIndexSelect";
import FacetsSelectDownshift from "./components/FacetsSelectDownshift";
import FacetsSelectHeadless from "./components/FacetsSelectHeadless";
import FacetsSelectRadix from "./components/FacetsSelectRadix";
import FacetsSelectCustom from "./components/FacetsSelectCustom";
import MultiSelectHeadless from "./components/MultiSelectHeadless";
import {
  useComplexSuggestQuery,
  ComplexSuggestionTypeEnum,
  useSearchFacetQuery,
  FacetFieldEnum
} from "../../core/dbc-gateway/generated/graphql";

const AdvancedSearchV2 = () => {
  const [selDownshift, setSelDownshift] = useState<Option | null>(null);
  const [selHeadless, setSelHeadless] = useState<Option | null>(null);
  const [selRadix, setSelRadix] = useState<Option | null>(null);
  const [selCustom, setSelCustom] = useState<Option | null>(null);

  // Facet multiselect states
  const [facetsDownshift, setFacetsDownshift] = useState<Option[]>([]);
  const [facetsHeadless, setFacetsHeadless] = useState<Option[]>([]);
  const [facetsRadix, setFacetsRadix] = useState<Option[]>([]);
  const [facetsCustom, setFacetsCustom] = useState<Option[]>([]);

  const [selectedIndex, setSelectedIndex] = useState<string>("term.default");
  const [q, setQ] = useState("");
  const minimalAutosuggestCharacters = 3;

  // Facet multiselect demo
  const [facetQ, setFacetQ] = useState("harry");

  // MultiSelectHeadless selections
  const [msHeadless, setMsHeadless] = useState<Option[]>([]);

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

  // Fetch facet values (e.g. subjects) based on facetQ
  const { data: facetData } = useSearchFacetQuery(
    { q: { all: facetQ }, facets: [FacetFieldEnum.Subjects], facetLimit: 50 },
    { keepPreviousData: true }
  );
  const facetItems = (facetData?.search?.facets?.[0]?.values ?? []).map(
    (v) => ({
      label: v.term,
      value: v.key
    })
  );

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 900, margin: "0 auto" }}>
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

      <hr />

      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "1fr 1fr 1fr 1fr"
        }}
      >
        <section>
          <h3>MultiSelectHeadless (facets)</h3>
          <MultiSelectHeadless
            key={`ms-headless-${selectedIndex}`}
            items={facetItems}
            onChange={setMsHeadless}
          />
          <small>Selected count: {msHeadless.length}</small>
        </section>
      </div>

      <section>
        <h3>Facet query</h3>
        <input
          placeholder="Type to load facet values (subjects)"
          value={facetQ}
          onChange={(e) => setFacetQ(e.currentTarget.value)}
          style={{ padding: 8, border: "1px solid #ccc", width: "100%" }}
        />
      </section>

      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "1fr 1fr 1fr 1fr"
        }}
      >
        <section>
          <h3>Downshift FacetsSelect (facets)</h3>
          <FacetsSelectDownshift
            key={`facets-downshift-${selectedIndex}`}
            items={facetItems}
            onChange={setFacetsDownshift}
          />
          <small>Selected count: {facetsDownshift.length}</small>
        </section>

        <section>
          <h3>Headless UI FacetsSelect (facets)</h3>
          <FacetsSelectHeadless
            key={`facets-headless-${selectedIndex}`}
            items={facetItems}
            onChange={setFacetsHeadless}
          />
          <small>Selected count: {facetsHeadless.length}</small>
        </section>

        <section>
          <h3>Radix UI (Popover) FacetsSelect (facets)</h3>
          <FacetsSelectRadix
            key={`facets-radix-${selectedIndex}`}
            items={facetItems}
            onChange={setFacetsRadix}
          />
          <small>Selected count: {facetsRadix.length}</small>
        </section>

        <section>
          <h3>Custom Accessible FacetsSelect (facets)</h3>
          <FacetsSelectCustom
            key={`facets-custom-${selectedIndex}`}
            items={facetItems}
            onChange={setFacetsCustom}
          />
          <small>Selected count: {facetsCustom.length}</small>
        </section>
      </div>
    </div>
  );
};

export default AdvancedSearchV2;
