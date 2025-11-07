import React, { useState } from "react";
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
  // Suggest inputs (array)
  const [suggests, setSuggests] = useState<SuggestState[]>([
    { term: "term.default", query: "" },
    { term: "term.default", query: "" }
  ]);

  // Select search (array)
  const [selects, setSelects] = useState<MultiSelectState[]>([
    { term: "Voksen", selectedValues: [] },
    { term: "Magi", selectedValues: [] }
  ]);

  // Facets (array)
  const [facets, setFacets] = useState<MultiSelectState[]>([
    { term: "Trolde", selectedValues: [] },
    { term: "Abe", selectedValues: [] }
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
            selectedIndex={s.term}
            onSelectedIndexChange={(value) =>
              setSuggests((prev) =>
                prev.map((it, idx) => (idx === i ? { ...it, term: value } : it))
              )
            }
            onSelect={() => {}}
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
