import React, { useEffect, useState } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import AdvancedSearchSuggestInput from "./components/AdvancedSearchSuggestInput";
import AdvancedSearchSelectSearch from "./components/AdvancedSearchSelectSearch";
import AdvancedSearchFacet from "./components/AdvancedSearchFacet";
import type { Option } from "./suggestions";
import TestNuqs from "./components/TestNuqs";

type SuggestState = {
  term: string;
  query: string;
};

type MultiSelectState = {
  query: string;
  selected: Option[];
};

const AdvancedSearchV2 = () => {
  // Suggest inputs (array)
  const [suggests, setSuggests] = useState<SuggestState[]>([
    { term: "term.default", query: "" },
    { term: "term.default", query: "" }
  ]);

  // Select search (array)
  const [selects, setSelects] = useState<MultiSelectState[]>([
    { query: "", selected: [] },
    { query: "", selected: [] }
  ]);

  // Facets (array)
  const [facets, setFacets] = useState<MultiSelectState[]>([
    { query: "harry", selected: [] },
    { query: "harry", selected: [] }
  ]);

  const [suggestsUrl, setSuggestsUrl] = useQueryState(
    "suggests",
    parseAsJson<SuggestState[]>()
  );

  console.log("suggestsUrl", suggestsUrl);

  const handleSubmit = () => {
    const selectsData = suggests.map((s) => ({
      query: s.query,
      term: s.term
    }));

    // Update URL with suggest params using nuqs
    setSuggestsUrl(selectsData);

    console.log("Submitting search with data:", searchData);
  };

  useEffect(() => {
    // Load initial state from URL if available
    if (suggestsUrl && Array.isArray(suggestsUrl) && suggestsUrl.length > 0) {
      setSuggests(suggestsUrl);
    }
  }, [suggestsUrl]);

  return (
    <div>
      <div>
        <TestNuqs />
      </div>

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
          {suggests.map((suggestItem, i) => (
            <AdvancedSearchSuggestInput
              key={`suggest-${i}`}
              selectedIndex={suggestItem.term}
              onSelectedIndexChange={(value) =>
                setSuggests((prev) =>
                  prev.map((it, idx) =>
                    idx === i ? { term: value, query: "" } : it
                  )
                )
              }
              query={suggestItem.query}
              onQueryChange={(q) =>
                setSuggests((prev) =>
                  prev.map((it, idx) => (idx === i ? { ...it, query: q } : it))
                )
              }
              onSelect={(opt) =>
                setSuggests((prev) =>
                  prev.map((it, idx) =>
                    idx === i ? { ...it, query: it.query, selected: opt } : it
                  )
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
                query={s.query}
                onQueryChange={(q) =>
                  setSelects((prev) =>
                    prev.map((it, idx) =>
                      idx === i ? { ...it, query: q } : it
                    )
                  )
                }
                selected={s.selected}
                onChange={(vals) =>
                  setSelects((prev) =>
                    prev.map((it, idx) =>
                      idx === i ? { ...it, selected: vals } : it
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
                query={f.query}
                onQueryChange={(q) =>
                  setFacets((prev) =>
                    prev.map((it, idx) =>
                      idx === i ? { ...it, query: q } : it
                    )
                  )
                }
                selected={f.selected}
                onChange={(vals) =>
                  setFacets((prev) =>
                    prev.map((it, idx) =>
                      idx === i ? { ...it, selected: vals } : it
                    )
                  )
                }
              />
            ))}
          </div>

          <button
            style={{
              padding: "10px 24px",
              background: "#0078d4",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
        <div>
          <pre>{JSON.stringify(suggests, null, 2)}</pre>
          <pre>{JSON.stringify(selects, null, 2)}</pre>
          <pre>{JSON.stringify(facets, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchV2;
