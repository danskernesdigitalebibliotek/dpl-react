import React, { memo } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import { useText } from "../../../core/utils/text";
import {
  FacetResult,
  FacetFieldEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { getFacetFieldTranslation } from "../../../components/facet-browser/helper";
import SearchFacetGroup from "../../../components/facet-browser/SearchFacetGroup";
import SearchToggle from "../../../components/search-toggle/SearchToggle";

interface SearchResultFacetsProps {
  facets: FacetResult[] | null;
}

// Type for facet state stored in URL
// Uses facetName (camelCase string like "materialTypesGeneral") as that's what the API expects for filters
type FacetState = {
  facetName: string;
  selectedValues: string[];
};

// Validation function for facet state from URL
const isValidFacetState = (value: unknown): value is FacetState[] => {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (typeof item !== "object" || item === null) return false;

    const { facetName, selectedValues } = item as Record<string, unknown>;

    if (typeof facetName !== "string") {
      return false;
    }
    if (
      !Array.isArray(selectedValues) ||
      !selectedValues.every((v) => typeof v === "string")
    ) {
      return false;
    }

    return true;
  });
};

const SearchResultFacets: React.FC<SearchResultFacetsProps> = ({ facets }) => {
  const t = useText();

  // Facets state stored in URL
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([])
  );

  const handleFacetChange = (facetName: string, selectedValues: string[]) => {
    // Remove facet if empty
    if (selectedValues.length === 0) {
      setFacetsInUrl(
        facetsFromUrl.filter((f) => f.facetName !== facetName),
        { history: "push" }
      );
      return;
    }

    const existingFacet = facetsFromUrl.find((f) => f.facetName === facetName);

    // Update existing facet
    if (existingFacet) {
      setFacetsInUrl(
        facetsFromUrl.map((f) =>
          f.facetName === facetName ? { ...f, selectedValues } : f
        ),
        { history: "push" }
      );
      return;
    }

    // Add new facet
    setFacetsInUrl(
      [
        ...facetsFromUrl,
        {
          facetName,
          selectedValues
        }
      ],
      { history: "push" }
    );
  };

  const getSelectedValues = (facetName: string): string[] => {
    return (
      facetsFromUrl.find((f) => f.facetName === facetName)?.selectedValues ?? []
    );
  };

  const getSelectedCount = (facetName: string): number => {
    return getSelectedValues(facetName).length;
  };

  // Filter out facets with no values
  const allAvailableFacets = facets?.filter((f) => f.values.length > 0) ?? [];

  // Special handling for "Canalwaysbeloaned" facet as a toggle
  const canAlwaysBeLoanedFacet = allAvailableFacets.find(
    (f) => f.type === FacetFieldEnum.Canalwaysbeloaned
  );
  const canAlwaysBeLoanedFacetName = canAlwaysBeLoanedFacet?.name;
  const canAlwaysBeLoanedSelectedValues = canAlwaysBeLoanedFacetName
    ? getSelectedValues(canAlwaysBeLoanedFacetName)
    : [];
  const isCanAlwaysBeLoanedChecked = canAlwaysBeLoanedSelectedValues.length > 0;

  const handleCanAlwaysBeLoanedToggle = (checked: boolean) => {
    if (!canAlwaysBeLoanedFacet || !canAlwaysBeLoanedFacetName) return;

    // Assume single-value facet; use first value term as filter value
    const firstValue = canAlwaysBeLoanedFacet.values[0];
    if (!firstValue) return;

    if (checked) {
      handleFacetChange(canAlwaysBeLoanedFacetName, [firstValue.term]);
    } else {
      handleFacetChange(canAlwaysBeLoanedFacetName, []);
    }
  };

  // Facets shown as regular groups (exclude Canalwaysbeloaned which is now a toggle)
  const availableFacets = allAvailableFacets.filter(
    (f) => f.type !== FacetFieldEnum.Canalwaysbeloaned
  );

  return (
    <aside className="search-v2-facets">
      <div className="search-v2-facets__container">
        {/* Toggles section */}
        {canAlwaysBeLoanedFacet && (
          <ul className="search-v2-facets__toggles">
            <li>
              <SearchToggle
                id="can-always-be-loaned"
                label={'t("facetCanAlwaysBeLoanedText")'}
                description={'t("facetCanAlwaysBeLoanedDescriptionText")'}
                checked={isCanAlwaysBeLoanedChecked}
                onChange={(checked) => handleCanAlwaysBeLoanedToggle(checked)}
              />
            </li>
          </ul>
        )}

        {/* Filter groups - dynamically rendered from API response */}
        <ul className="search-v2-facets__groups">
          {availableFacets.map((facetResult) => {
            const facetName = facetResult.name;
            const facetField = facetResult.type;
            const selectedValues = getSelectedValues(facetName);
            const selectedCount = getSelectedCount(facetName);
            const label = t(getFacetFieldTranslation(facetField));

            return (
              <SearchFacetGroup
                key={facetName}
                facetField={facetField}
                label={label}
                selectedValues={selectedValues}
                selectedCount={selectedCount}
                showScore={false}
                facetValues={facetResult.values}
                onChange={(vals) => handleFacetChange(facetName, vals)}
                getValue={(facetValue) => facetValue.term}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default memo(SearchResultFacets);
