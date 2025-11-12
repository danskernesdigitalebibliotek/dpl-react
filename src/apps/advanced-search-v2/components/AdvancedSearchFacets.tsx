import React from "react";
import { useQueryState, parseAsJson } from "nuqs";
import AdvancedSearchFacet from "./AdvancedSearchFacet";
import { ComplexSearchFacetsEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetState } from "../types";
import { FACETS_CONFIG } from "../lib/config";

interface AdvancedSearchFacetsProps {
  cql: string;
}

const AdvancedSearchFacets: React.FC<AdvancedSearchFacetsProps> = ({ cql }) => {
  // Read facets from URL
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const handleFacetChange = (
    facetField: ComplexSearchFacetsEnum,
    selectedValues: string[]
  ) => {
    // Update the changed facet while keeping others
    const updatedFacets = FACETS_CONFIG.map((config) =>
      config.facetField === facetField
        ? { facetField, selectedValues }
        : (facetsFromUrl.find((f) => f.facetField === config.facetField) ?? {
            facetField: config.facetField,
            selectedValues: []
          })
    );

    // Only store facets with selections
    setFacetsInUrl(updatedFacets.filter((f) => f.selectedValues.length > 0));
  };

  return (
    <aside className="advanced-search__facets">
      <h3>Filters</h3>
      {FACETS_CONFIG.map((config) => {
        const facetFromUrl = facetsFromUrl.find(
          (f) => f.facetField === config.facetField
        );
        const selectedValues = facetFromUrl?.selectedValues ?? [];

        return (
          <AdvancedSearchFacet
            key={config.facetField}
            cql={cql}
            facetField={config.facetField}
            label={config.label}
            selected={selectedValues.map((v) => ({ label: v, value: v }))}
            onChange={(vals) =>
              handleFacetChange(
                config.facetField,
                vals.map((o) => o.value)
              )
            }
          />
        );
      })}
    </aside>
  );
};

export default AdvancedSearchFacets;
