import React, { useState } from "react";
import AdvancedSearchSuggestInput from "./components/AdvancedSearchSuggestInput";
import AdvancedSearchSelectSearch from "./components/AdvancedSearchSelectSearch";
import AdvancedSearchFacet from "./components/AdvancedSearchFacet";
import type { Option } from "./suggestions";

type SuggestState = {
  selectedIndex: string;
  query: string;
  selected: Option | null;
};

type MultiSelectState = {
  query: string;
  selected: Option[];
};

const AdvancedSearchV2 = () => {
  // Suggest inputs (array)
  const [suggests, setSuggests] = useState<SuggestState[]>([
    { selectedIndex: "term.default", query: "", selected: null },
    { selectedIndex: "term.default", query: "", selected: null }
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
            selectedIndex={s.selectedIndex}
            onSelectedIndexChange={(value) =>
              setSuggests((prev) =>
                prev.map((it, idx) =>
                  idx === i
                    ? { selectedIndex: value, query: "", selected: null }
                    : it
                )
              )
            }
            query={s.query}
            onQueryChange={(q) =>
              setSuggests((prev) =>
                prev.map((it, idx) => (idx === i ? { ...it, query: q } : it))
              )
            }
            selected={s.selected}
            onSelect={(opt) =>
              setSuggests((prev) =>
                prev.map((it, idx) =>
                  idx === i ? { ...it, selected: opt } : it
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
                  prev.map((it, idx) => (idx === i ? { ...it, query: q } : it))
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
                  prev.map((it, idx) => (idx === i ? { ...it, query: q } : it))
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
      </div>
      <div>
        <pre>{JSON.stringify(suggests, null, 2)}</pre>
        <pre>{JSON.stringify(selects, null, 2)}</pre>
        <pre>{JSON.stringify(facets, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdvancedSearchV2;
