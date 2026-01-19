import React from "react";
import {
  useQueryState,
  parseAsBoolean,
  parseAsJson,
  parseAsString
} from "nuqs";
import AdvancedSearchFilterGroup from "./AdvancedSearchFacetGroup";
import AdvancedSearchToggle from "./AdvancedSearchToggle";
import AdvancedSearchRadioGroup from "./AdvancedSearchRadioGroup";
import { useText } from "../../../core/utils/text";
import {
  ComplexSearchFacetsEnum,
  useComplexFacetSearchQuery,
  HoldingsStatusEnum
} from "../../../core/dbc-gateway/generated/graphql";
import { FACETS_CONFIG, FACET_FIELDS } from "../lib/facet-configs";
import { isValidFacetState } from "../lib/validation";
import { sortFacetValues } from "../lib/facet-sort-utils";
import {
  AccessTypeFilterOptions,
  AgeGroupFilterOptions,
  FictionTypeFilterOptions
} from "../types";

interface AdvancedSearchFacetsProps {
  cql: string;
}

// Radio button options
const ACCESS_TYPE_OPTIONS: AccessTypeFilterOptions[] = [
  { value: "online", label: "Online" },
  { value: "fysisk", label: "Fysisk" }
];
const FICTION_TYPE_OPTIONS: FictionTypeFilterOptions[] = [
  { value: "fiction", label: "Fiktion" },
  { value: "nonfiction", label: "Non-fiktion" }
];
const AGE_GROUP_OPTIONS: AgeGroupFilterOptions[] = [
  { value: "til voksne", label: "Voksne" },
  { value: "til børn", label: "Børn" }
];

const AdvancedSearchFacets: React.FC<AdvancedSearchFacetsProps> = ({ cql }) => {
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

  // Radio button filter states
  const [accessType, setAccessType] = useQueryState(
    "accessType",
    parseAsString
  );
  const [fictionType, setFictionType] = useQueryState(
    "fictionType",
    parseAsString
  );
  const [ageGroup, setAgeGroup] = useQueryState("ageGroup", parseAsString);

  // Facets are fetched in a separate query from search results.
  // The FBI API supports this and it allows facet counts to update
  // independently without refetching the full result set.
  const { data: facetData } = useComplexFacetSearchQuery({
    cql,
    facets: { facets: FACET_FIELDS, facetLimit: 50 },
    ...(onShelf && { filters: { status: [HoldingsStatusEnum.Onshelf] } })
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
      setFacetsInUrl(
        facetsFromUrl.filter((f) => f.facetField !== facetField),
        { history: "push" }
      );
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
          facetField,
          selectedValues
        }
      ],
      { history: "push" }
    );
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
    <aside className="advanced-search-facets">
      <div className="advanced-search-facets__container">
        {/* Toggles section */}
        <ul className="advanced-search-facets__toggles">
          <li>
            <AdvancedSearchToggle
              id="on-shelf"
              label={t("advancedSearchOnShelfText")}
              description={t("advancedSearchOnShelfDescriptionText")}
              checked={onShelf}
              onChange={(checked) => setOnShelf(checked, { history: "push" })}
            />
          </li>
          <li>
            <AdvancedSearchToggle
              id="only-extra-titles"
              label={t("advancedSearchOnlyExtraTitlesText")}
              description={t("advancedSearchOnlyExtraTitlesDescriptionText")}
              checked={onlyExtraTitles}
              onChange={(checked) =>
                setOnlyExtraTitles(checked, { history: "push" })
              }
            />
          </li>
        </ul>

        {/* Radio button filters */}
        <div className="advanced-search-radio-group-wrapper">
          <AdvancedSearchRadioGroup
            name="access-type"
            options={ACCESS_TYPE_OPTIONS}
            selectedValue={accessType}
            onChange={(value) => setAccessType(value, { history: "push" })}
          />

          <AdvancedSearchRadioGroup
            name="fiction-type"
            options={FICTION_TYPE_OPTIONS}
            selectedValue={fictionType}
            onChange={(value) => {
              setFictionType(value, { history: "push" });
            }}
          />
          <AdvancedSearchRadioGroup
            name="age-group"
            options={AGE_GROUP_OPTIONS}
            selectedValue={ageGroup}
            onChange={(value) => setAgeGroup(value, { history: "push" })}
          />
        </div>

        {/* Filter groups */}
        <ul className="advanced-search-facets__groups">
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
            const facetValues = sortFacetValues(
              config.facetField,
              facetResponse?.values ?? []
            );

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
        </ul>
      </div>
    </aside>
  );
};

export default AdvancedSearchFacets;
