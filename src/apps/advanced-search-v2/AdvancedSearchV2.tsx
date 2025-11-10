import React, { useState, useEffect } from "react";
import { useQueryStates, parseAsJson } from "nuqs";
import AdvancedSearchSuggestInput from "./components/AdvancedSearchSuggestInput";
import AdvancedSearchSelectSearch from "./components/AdvancedSearchSelectSearch";
import AdvancedSearchV2Results from "./AdvancedSearchV2Results";
import AdvancedSearchV2Facets from "./AdvancedSearchV2Facets";
import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";

type SuggestState = {
  term: string;
  query: string;
};

type MultiSelectState = {
  term: string;
  selectedValues: string[];
};

const AdvancedSearchV2: React.FC = () => {
  // URL state management with nuqs
  const [urlState, setUrlState] = useQueryStates(
    {
      suggests: parseAsJson((value) => value as SuggestState[]).withDefault([
        { term: "term.default", query: "" },
        { term: "term.default", query: "" }
      ]),
      selects: parseAsJson((value) => value as MultiSelectState[]).withDefault([
        { term: "Voksen", selectedValues: [] },
        { term: "Magi", selectedValues: [] }
      ])
      // facets are managed by AdvancedSearchV2Facets component
    },
    { shallow: true }
  );

  // Local state for temporary changes - initialize from URL
  const [suggests, setSuggests] = useState<SuggestState[]>(urlState.suggests);
  const [selects, setSelects] = useState<MultiSelectState[]>(urlState.selects);
  // Facets are NOT in local state - they only live in the URL

  // Sync local state with URL state on mount/URL change
  useEffect(() => {
    setSuggests(urlState.suggests);
    setSelects(urlState.selects);
  }, [urlState.suggests, urlState.selects]);

  // Function to sync local state to URL and trigger search
  const handleSearch = () => {
    setUrlState({
      suggests,
      selects
      // facets are not included - they update directly in URL
    });
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    const defaultSuggests = [
      { term: "term.default", query: "" },
      { term: "term.default", query: "" }
    ];
    const defaultSelects = [
      { term: "Voksen", selectedValues: [] },
      { term: "Magi", selectedValues: [] }
    ];

    setSuggests(defaultSuggests);
    setSelects(defaultSelects);
    setUrlState({
      suggests: defaultSuggests,
      selects: defaultSelects
    });
  };

  return (
    <div
      className="advanced-search-v2"
      style={{
        maxWidth: 1200,
        margin: "20px auto"
      }}
    >
      {/* Search Form Section */}
      <section className="advanced-search-v2__form">
        <div className="advanced-search-v2__inputs">
          {/* Suggest inputs */}
          {suggests.map((s, i) => (
            <AdvancedSearchSuggestInput
              key={`suggest-${i}`}
              selectedIndex={s.term}
              onSelectedIndexChange={(value) =>
                setSuggests((prev) =>
                  prev.map((it, idx) =>
                    idx === i ? { ...it, term: value } : it
                  )
                )
              }
              onSelect={() => {}}
              query={s.query}
              onQueryChange={(q) =>
                setSuggests((prev) =>
                  prev.map((it, idx) => (idx === i ? { ...it, query: q } : it))
                )
              }
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
            {selects.map((s, i) => (
              <AdvancedSearchSelectSearch
                key={`select-${i}`}
                fetchQuery={s.term}
                facetField={FacetFieldEnum.Subjects}
                label={s.term}
                selected={s.selectedValues.map((v) => ({ label: v, value: v }))}
                onChange={(vals) =>
                  setSelects((prev) =>
                    prev.map((it, idx) =>
                      idx === i
                        ? { ...it, selectedValues: vals.map((o) => o.value) }
                        : it
                    )
                  )
                }
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={handleSearch}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0066cc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold"
              }}
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* Results Section with Facets Sidebar */}
      <div
        className="advanced-search-v2__results-container"
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
      >
        <AdvancedSearchV2Facets />
        <AdvancedSearchV2Results
          suggests={urlState.suggests}
          selects={urlState.selects}
        />
      </div>
    </div>
  );
};

export default AdvancedSearchV2;
