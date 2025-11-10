import React from "react";
import { useQueryState, parseAsJson } from "nuqs";
import AdvancedSearchFacet from "./components/AdvancedSearchFacet";
import { FacetFieldEnum } from "../../core/dbc-gateway/generated/graphql";

type MultiSelectState = {
  term: string;
  selectedValues: string[];
};

const AdvancedSearchV2Facets: React.FC = () => {
  const [facetsFromUrl, setFacets] = useQueryState(
    "facets",
    parseAsJson((value) => value as MultiSelectState[]).withDefault([])
  );

  // Define all available facets
  const allFacets = [
    { term: "Trolde", selectedValues: [] },
    { term: "Abe", selectedValues: [] }
  ];

  // Merge URL facets with all facets to ensure all options are shown
  const facets = allFacets.map((defaultFacet) => {
    const urlFacet = facetsFromUrl.find((f) => f.term === defaultFacet.term);
    return urlFacet || defaultFacet;
  });

  return (
    <aside className="advanced-search__facets">
      <h3>Filters</h3>
      {facets.map((f, i) => (
        <AdvancedSearchFacet
          key={`facet-${i}`}
          fetchQuery={f.term}
          facetField={FacetFieldEnum.Subjects}
          label={f.term}
          selected={f.selectedValues.map((v) => ({ label: v, value: v }))}
          onChange={(vals) => {
            const updatedFacets = allFacets.map((defaultFacet) => {
              const isCurrentFacet = defaultFacet.term === facets[i].term;
              if (isCurrentFacet) {
                return {
                  ...defaultFacet,
                  selectedValues: vals.map((o) => o.value)
                };
              }
              // Keep existing selections from URL
              const existingFacet = facetsFromUrl.find(
                (f) => f.term === defaultFacet.term
              );
              return existingFacet || defaultFacet;
            });
            // Only include facets with selections in the URL
            const facetsWithSelections = updatedFacets.filter(
              (f) => f.selectedValues.length > 0
            );
            setFacets(facetsWithSelections);
          }}
        />
      ))}
    </aside>
  );
};

export default AdvancedSearchV2Facets;
