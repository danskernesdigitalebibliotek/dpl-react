import React from "react";
import { useQueryState, parseAsJson } from "nuqs";
import AdvancedSearchFacet from "./AdvancedSearchFacet";
import { FacetFieldEnum } from "../../../core/dbc-gateway/generated/graphql";
import { FacetConfig, FacetState } from "../types";

const FACET_CONFIGURATION: FacetConfig[] = [
  { label: "Format", facetField: FacetFieldEnum.Materialtypesspecific },
  { label: "Forfatter / ophav", facetField: FacetFieldEnum.Creators },
  { label: "Emne", facetField: FacetFieldEnum.Subjects },
  { label: "Sprog", facetField: FacetFieldEnum.Mainlanguages },
  { label: "Målgruppe", facetField: FacetFieldEnum.Generalaudience },
  {
    label: "Fiktiv hovedperson",
    facetField: FacetFieldEnum.Fictionalcharacters
  },
  { label: "Genre og form", facetField: FacetFieldEnum.Genreandform },
  { label: "Aldersgruppe", facetField: FacetFieldEnum.Age },
  { label: "Lix-tal", facetField: FacetFieldEnum.Lix }
];

interface AdvancedSearchFacetsProps {
  fetchQuery: string;
}

const AdvancedSearchFacets: React.FC<AdvancedSearchFacetsProps> = ({
  fetchQuery
}) => {
  // Read facets from URL
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => value as FacetState[]).withDefault([])
  );

  const handleFacetChange = (
    facetField: FacetFieldEnum,
    selectedValues: string[]
  ) => {
    // Update the changed facet while keeping others
    const updatedFacets = FACET_CONFIGURATION.map((config) =>
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
      {FACET_CONFIGURATION.map((config) => {
        const facetFromUrl = facetsFromUrl.find(
          (f) => f.facetField === config.facetField
        );
        const selectedValues = facetFromUrl?.selectedValues ?? [];

        return (
          <AdvancedSearchFacet
            key={config.facetField}
            fetchQuery={fetchQuery}
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
