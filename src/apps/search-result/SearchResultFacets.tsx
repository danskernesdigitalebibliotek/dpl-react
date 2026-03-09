import React, { memo, useMemo } from "react";
import { useQueryState, parseAsJson, parseAsBoolean } from "nuqs";
import { useText } from "../../core/utils/text";
import {
  FacetResult,
  FacetFieldEnum
} from "../../core/dbc-gateway/generated/graphql";
import { useFacetTracking } from "./useSearchResultTracking";
import SearchFacetGroup from "./SearchFacetGroup";
import SearchToggle from "../../components/search-toggle/SearchToggle";
import { isValidFacetsState } from "./helpers";
import { sortSimpleSearchFacetValues } from "../advanced-search-v2/lib/facet-sort-utils";
import SearchRadioButtonGroup from "../../components/search-radio-button-group/SearchRadioButtonGroup";
import { getFacetFieldTranslation } from "./helper";

// Fixed facet name for "can always be loaned" filter in SearchFiltersInput
const CAN_ALWAYS_BE_LOANED_FACET_NAME = "canAlwaysBeLoaned";

type AccessTypeFilterOptions =
  | { value: "Digital"; label: "Online" }
  | { value: "Fysisk"; label: "Fysisk" };
type FictionTypeFilterOptions =
  | { value: "Skønlitteratur"; label: "Fiktion" }
  | { value: "Faglitteratur"; label: "Non-fiktion" };
type AgeGroupFilterOptions =
  | { value: "til voksne"; label: "Voksne" }
  | { value: "til børn"; label: "Børn" };

// Radio button options (mirroring AdvancedSearch)
const ACCESS_TYPE_OPTIONS: AccessTypeFilterOptions[] = [
  { value: "Digital", label: "Online" },
  { value: "Fysisk", label: "Fysisk" }
];
const FICTION_TYPE_OPTIONS: FictionTypeFilterOptions[] = [
  { value: "Skønlitteratur", label: "Fiktion" },
  { value: "Faglitteratur", label: "Non-fiktion" }
];
const AGE_GROUP_OPTIONS: AgeGroupFilterOptions[] = [
  { value: "til voksne", label: "Voksne" },
  { value: "til børn", label: "Børn" }
];

const SearchResultFacets = ({ facets }: { facets: FacetResult[] }) => {
  const t = useText();
  const { trackFacetChange } = useFacetTracking();

  // "On shelf" toggle state stored in URL
  const [onShelf, setOnShelf] = useQueryState(
    "onShelf",
    parseAsBoolean.withDefault(false)
  );

  // Facets state stored in URL
  const [facetsFromUrl, setFacetsInUrl] = useQueryState(
    "facets",
    parseAsJson((value) => {
      if (isValidFacetsState(value)) return value;
      return [];
    }).withDefault([])
  );

  const handleFacetChange = (facetName: string, selectedValues: string[]) => {
    // Remove facet if empty
    if (selectedValues.length === 0) {
      const updatedFacets = facetsFromUrl.filter(
        (f) => f.facetName !== facetName
      );
      setFacetsInUrl(updatedFacets, { history: "push" });
      trackFacetChange(updatedFacets);
      return;
    }

    const existingFacet = facetsFromUrl.find((f) => f.facetName === facetName);

    // Update existing facet
    if (existingFacet) {
      const updatedFacets = facetsFromUrl.map((f) =>
        f.facetName === facetName ? { ...f, selectedValues } : f
      );
      setFacetsInUrl(updatedFacets, { history: "push" });
      trackFacetChange(updatedFacets);
      return;
    }

    // Add new facet
    const updatedFacets = [
      ...facetsFromUrl,
      {
        facetName,
        selectedValues
      }
    ];
    setFacetsInUrl(updatedFacets, { history: "push" });
    trackFacetChange(updatedFacets);
  };

  // Filter out facets with no values
  const allAvailableFacets = useMemo(
    () => facets?.filter((filter) => filter.values.length > 0) ?? [],
    [facets]
  );

  // Map radios to corresponding facet names so they affect facetsFromUrl
  const accessTypeFacetName = allAvailableFacets.find(
    (filter) => filter.type === FacetFieldEnum.Accesstypes
  )?.name;
  const fictionTypeFacetName = allAvailableFacets.find(
    (filter) => filter.type === FacetFieldEnum.Fictionnonfiction
  )?.name;
  const ageGroupFacetName = allAvailableFacets.find(
    (filter) => filter.type === FacetFieldEnum.Childrenoradults
  )?.name;

  // facet names used by radio groups (may be undefined until facets load)
  const radioFacetNames = [
    accessTypeFacetName,
    fictionTypeFacetName,
    ageGroupFacetName
  ].filter((name): name is string => Boolean(name));

  // facets used for generic facet groups (exclude radio-driven facets)
  const nonRadioFacetsFromUrl = facetsFromUrl.filter(
    (f) => !radioFacetNames.includes(f.facetName)
  );

  const getSelectedValues = (facetName: string): string[] => {
    return (
      nonRadioFacetsFromUrl.find((f) => f.facetName === facetName)
        ?.selectedValues ?? []
    );
  };

  const getSelectedCount = (facetName: string): number => {
    return getSelectedValues(facetName).length;
  };

  // Selected state for "can always be loaned" toggle comes from URL facet state
  const canAlwaysBeLoanedSelectedValues = getSelectedValues(
    CAN_ALWAYS_BE_LOANED_FACET_NAME
  );
  const isCanAlwaysBeLoanedChecked = canAlwaysBeLoanedSelectedValues.length > 0;

  // Toggle / radio handlers: update facetsFromUrl based on selection
  const handleCanAlwaysBeLoanedToggle = (checked: boolean) => {
    // Use fixed filter value "true" for canAlwaysBeLoaned SearchFiltersInput
    handleFacetChange(CAN_ALWAYS_BE_LOANED_FACET_NAME, checked ? ["true"] : []);
  };

  const handleRadioFacetChange = (
    facetName: string | undefined,
    value: string | null
  ) => {
    if (!facetName) return;
    handleFacetChange(facetName, value ? [value] : []);
  };

  // Facets shown as regular groups (exclude Canalwaysbeloaned and radio-driven facets)
  // Apply sorting to facet values based on facet type
  const availableFacets = useMemo(
    () =>
      allAvailableFacets
        .filter(
          (facet) =>
            facet.type !== FacetFieldEnum.Canalwaysbeloaned &&
            facet.type !== FacetFieldEnum.Accesstypes &&
            facet.type !== FacetFieldEnum.Fictionnonfiction &&
            facet.type !== FacetFieldEnum.Childrenoradults
        )
        .map((facet) => ({
          ...facet,
          values: sortSimpleSearchFacetValues(facet.type, facet.values)
        })),
    [allAvailableFacets]
  );

  return (
    <aside className="search-facets">
      <div className="search-facets__container">
        {/* Toggles section */}
        <ul className="search-facets__toggles">
          <li>
            <SearchToggle
              id="on-shelf"
              label={t("searchOnShelfText")}
              description={t("searchOnShelfDescriptionText")}
              checked={onShelf}
              onChange={(checked) => setOnShelf(checked, { history: "push" })}
            />
          </li>
          <li>
            <SearchToggle
              id="can-always-be-loaned"
              label={t("searchCanAlwaysBeLoanedText")}
              description={t("searchCanAlwaysBeLoanedDescriptionText")}
              checked={isCanAlwaysBeLoanedChecked}
              onChange={(checked) => handleCanAlwaysBeLoanedToggle(checked)}
            />
          </li>
        </ul>

        {/* Advanced search-style radio groups */}
        <div className="search-radio-button-group-wrapper">
          <SearchRadioButtonGroup
            name="access-type"
            options={ACCESS_TYPE_OPTIONS}
            selectedValue={
              accessTypeFacetName
                ? (facetsFromUrl.find(
                    (f) => f.facetName === accessTypeFacetName
                  )?.selectedValues[0] ?? null)
                : null
            }
            onChange={(value) =>
              handleRadioFacetChange(accessTypeFacetName, value)
            }
          />

          <SearchRadioButtonGroup
            name="fiction-type"
            options={FICTION_TYPE_OPTIONS}
            selectedValue={
              fictionTypeFacetName
                ? (facetsFromUrl.find(
                    (f) => f.facetName === fictionTypeFacetName
                  )?.selectedValues[0] ?? null)
                : null
            }
            onChange={(value) =>
              handleRadioFacetChange(fictionTypeFacetName, value)
            }
          />

          <SearchRadioButtonGroup
            name="age-group"
            options={AGE_GROUP_OPTIONS}
            selectedValue={
              ageGroupFacetName
                ? (facetsFromUrl.find((f) => f.facetName === ageGroupFacetName)
                    ?.selectedValues[0] ?? null)
                : null
            }
            onChange={(value) =>
              handleRadioFacetChange(ageGroupFacetName, value)
            }
          />
        </div>

        {/* Filter groups - dynamically rendered from API response */}
        <ul className="search-facets__groups">
          {availableFacets.map((facet) => {
            const facetName = facet.name;
            const facetField = facet.type;
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
                facetValues={facet.values}
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
