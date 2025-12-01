import React from "react";
import {
  useQueryState,
  parseAsBoolean,
  parseAsJson,
  parseAsString
} from "nuqs";
import AdvancedSearchFilterGroup from "./AdvancedSearchFilterGroup";
import AdvancedSearchToggle from "./AdvancedSearchToggle";
import AdvancedSearchRadioGroup from "./AdvancedSearchRadioGroup";
import { useText } from "../../../core/utils/text";
import {
  ComplexSearchFacetsEnum,
  useComplexFacetSearchQuery,
  HoldingsStatusEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { FACETS_CONFIG } from "../lib/facet-configs";
import { isValidFacetState } from "../lib/validation";

interface AdvancedSearchFiltersProps {
  cql: string;
}

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  cql
}) => {
  const t = useText();

  // Toggle states
  const [onShelf, setOnShelf] = useQueryState(
    "onShelf",
    parseAsBoolean.withDefault(false)
  );
  const [onlyExtraTitles, setOnlyExtraTitles] = useQueryState(
    "onlyExtraTitles",
    parseAsBoolean.withDefault(false)
  );

  // Radio group states
  const [fictionNonFiction, setFictionNonFiction] = useQueryState(
    "fictionNonFiction",
    parseAsString.withDefault("")
  );
  const [childrenOrAdults, setChildrenOrAdults] = useQueryState(
    "childrenOrAdults",
    parseAsString.withDefault("")
  );

  // Fetch all facets in one query
  const facetFields = FACETS_CONFIG.map((c) => c.facetField);
  const { data: facetData } = useComplexFacetSearchQuery({
    cql,
    facets: { facets: facetFields, facetLimit: 50 },
    filters: {
      ...(onShelf && { status: [HoldingsStatusEnum.Onshelf] })
    }
  });

  const facetsResponse = facetData?.complexSearch?.facets ?? [];

  // Facets state (sidebar filters only)
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => {
      if (isValidFacetState(value)) return value;
      return [];
    }).withDefault([])
  );

  const handleFacetChange = (
    facetField: ComplexSearchFacetsEnum,
    selectedValues: string[]
  ) => {
    const facetConfig = FACETS_CONFIG.find((c) => c.facetField === facetField);
    if (!facetConfig) return;

    // Remove facet if empty
    if (selectedValues.length === 0) {
      setFacetsInUrl(facetsFromUrl.filter((f) => f.facetField !== facetField));
      return;
    }

    const existingFacet = facetsFromUrl.find(
      (f) => f.facetField === facetField
    );

    // Update existing facet
    if (existingFacet) {
      setFacetsInUrl(
        facetsFromUrl.map((f) =>
          f.facetField === facetField ? { ...f, selectedValues } : f
        )
      );
      return;
    }

    // Add new facet
    setFacetsInUrl([
      ...facetsFromUrl,
      {
        facetField,
        selectedValues
      }
    ]);
  };

  const getSelectedValues = (facetField: ComplexSearchFacetsEnum): string[] => {
    return (
      facetsFromUrl.find((f) => f.facetField === facetField)?.selectedValues ??
      []
    );
  };

  const getSelectedCount = (facetField: ComplexSearchFacetsEnum): number => {
    return getSelectedValues(facetField).length;
  };

  return (
    <aside className="advanced-search-filters">
      <div className="advanced-search-filters__container">
        {/* Toggles section */}
        <div className="advanced-search-filters__toggles">
          <AdvancedSearchToggle
            id="on-shelf"
            label={t("advancedSearchOnShelfText")}
            description={t("advancedSearchOnShelfDescriptionText")}
            checked={onShelf}
            onChange={setOnShelf}
          />
          <AdvancedSearchToggle
            id="only-extra-titles"
            label={t("advancedSearchOnlyExtraTitlesText")}
            description={t("advancedSearchOnlyExtraTitlesDescriptionText")}
            checked={onlyExtraTitles}
            onChange={setOnlyExtraTitles}
          />

          {/* Radio groups */}
          <AdvancedSearchRadioGroup
            name="fiction-nonfiction"
            options={[
              { label: t("advancedSearchFilterFictionText"), value: "fiction" },
              {
                label: t("advancedSearchFilterNonFictionText"),
                value: "nonfiction"
              }
            ]}
            value={fictionNonFiction || null}
            onChange={(val) => setFictionNonFiction(val ?? "")}
          />
          <AdvancedSearchRadioGroup
            name="children-adults"
            options={[
              {
                label: t("advancedSearchFilterAdultsText"),
                value: "til voksne"
              },
              {
                label: t("advancedSearchFilterChildrenText"),
                value: "til børn"
              }
            ]}
            value={childrenOrAdults || null}
            onChange={(val) => setChildrenOrAdults(val ?? "")}
          />
        </div>

        {/* Filter groups */}
        {FACETS_CONFIG.map((config) => {
          const selectedValues = getSelectedValues(config.facetField);
          const selectedCount = getSelectedCount(config.facetField);

          const facetResponse = facetsResponse.find((f) => {
            if (!f.name) return false;
            return (
              f.name === config.facetField ||
              f.name === `facet.${config.facetField.toLowerCase()}`
            );
          });
          const facetValues = facetResponse?.values ?? [];

          return (
            <AdvancedSearchFilterGroup
              key={config.facetField}
              facetField={config.facetField}
              label={t(config.label)}
              selectedValues={selectedValues}
              selectedCount={selectedCount}
              facetValues={facetValues}
              onChange={(vals) => handleFacetChange(config.facetField, vals)}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default AdvancedSearchFilters;
