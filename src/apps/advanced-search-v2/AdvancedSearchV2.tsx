import React, { useState, useEffect } from "react";
import { useQueryStates, parseAsJson } from "nuqs";
import AdvancedSearchSuggestInput from "./components/AdvancedSearchSuggestInput";
import AdvancedSearchSelectSearch from "./components/AdvancedSearchSelectSearch";
import AdvancedSearchFacet from "./components/AdvancedSearchFacet";
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
      ]),
      facets: parseAsJson((value) => value as MultiSelectState[]).withDefault([
        { term: "Trolde", selectedValues: [] },
        { term: "Abe", selectedValues: [] }
      ])
    },
    { shallow: true }
  );

  // Local state for temporary changes - initialize from URL
  const [suggests, setSuggests] = useState<SuggestState[]>(urlState.suggests);
  const [selects, setSelects] = useState<MultiSelectState[]>(urlState.selects);
  const [facets, setFacets] = useState<MultiSelectState[]>(urlState.facets);

  // Sync local state with URL state on mount/URL change
  useEffect(() => {
    setSuggests(urlState.suggests);
    setSelects(urlState.selects);
    setFacets(urlState.facets);
  }, [urlState.suggests, urlState.selects, urlState.facets]);

  // Function to sync local state to URL
  const handleApplyFilters = () => {
    setUrlState({
      suggests,
      selects,
      facets
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
    const defaultFacets = [
      { term: "Trolde", selectedValues: [] },
      { term: "Abe", selectedValues: [] }
    ];

    setSuggests(defaultSuggests);
    setSelects(defaultSelects);
    setFacets(defaultFacets);
    setUrlState({
      suggests: defaultSuggests,
      selects: defaultSelects,
      facets: defaultFacets
    });
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(2, 1fr)",
        maxWidth: 900,
        margin: "20px auto"
      }}
    >
      <div>
        {/* Suggest inputs */}
        {suggests.map((s, i) => (
          <AdvancedSearchSuggestInput
            key={`suggest-${i}`}
            selectedIndex={s.term}
            onSelectedIndexChange={(value) =>
              setSuggests((prev) =>
                prev.map((it, idx) => (idx === i ? { ...it, term: value } : it))
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

        {/* Facets */}
        <div style={{ width: "300px" }}>
          {facets.map((f, i) => (
            <AdvancedSearchFacet
              key={`facet-${i}`}
              fetchQuery={f.term}
              facetField={FacetFieldEnum.Subjects}
              label={f.term}
              selected={f.selectedValues.map((v) => ({ label: v, value: v }))}
              onChange={(vals) =>
                setFacets((prev) =>
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
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            onClick={handleApplyFilters}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Apply Filters
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
      <div>
        <h3>Local State (not in URL)</h3>
        <pre>{JSON.stringify(suggests, null, 2)}</pre>
        <pre>{JSON.stringify(selects, null, 2)}</pre>
        <pre>{JSON.stringify(facets, null, 2)}</pre>
        
        <h3>URL State (from query params)</h3>
        <pre>{JSON.stringify(urlState, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdvancedSearchV2;
