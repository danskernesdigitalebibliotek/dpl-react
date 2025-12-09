import { describe, expect, it } from "vitest";
import {
  mergeSelectFacetOptions,
  type DynamicFacet
} from "../../apps/advanced-search-v2/hooks/use-merged-facet-options";
import { ComplexSearchFacetsEnum } from "../../core/dbc-gateway/generated/graphql";
import type {
  PreSelectFacetConfig,
  Option
} from "../../apps/advanced-search-v2/types";
import { DIVIDER_VALUE } from "../../apps/advanced-search-v2/types";

const createSelectConfig = (
  facetField: ComplexSearchFacetsEnum,
  options: Array<{ label: string; value: string }>
): PreSelectFacetConfig => ({
  label: "Test Label",
  facetField,
  type: "select",
  options,
  enableSearch: false
});

const getOptions = (items: Option[]): Option[] =>
  items.filter((item) => item.value !== DIVIDER_VALUE);

describe("mergeSelectFacetOptions", () => {
  describe("sorting behavior", () => {
    it("sorts dynamic options alphabetically by label", () => {
      const config = createSelectConfig(ComplexSearchFacetsEnum.Genreandform, [
        { label: "Static Option", value: "static" }
      ]);

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Genreandform,
          values: [
            { key: "zebra", score: 10 },
            { key: "apple", score: 20 },
            { key: "mango", score: 15 }
          ]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      // Static options come first, then divider, then dynamic options sorted alphabetically
      expect(options).toHaveLength(4);
      expect(options[0].label).toBe("Static Option");
      expect(options[1].label).toBe("apple");
      expect(options[2].label).toBe("mango");
      expect(options[3].label).toBe("zebra");

      // Verify divider is present between static and dynamic
      expect(result.options[1].value).toBe(DIVIDER_VALUE);
    });

    it("sorts dynamic options using localeCompare", () => {
      const config = createSelectConfig(ComplexSearchFacetsEnum.Source, []);

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Source,
          values: [
            { key: "zebra", score: 5 },
            { key: "Beta", score: 10 },
            { key: "alpha", score: 15 },
            { key: "GAMMA", score: 20 }
          ]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      // localeCompare sorts case-insensitively by default
      const labels = options.map((o) => o.label);
      expect(labels).toEqual(["alpha", "Beta", "GAMMA", "zebra"]);
    });

    it("preserves count values from dynamic facets", () => {
      const config = createSelectConfig(
        ComplexSearchFacetsEnum.Mainlanguage,
        []
      );

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Mainlanguage,
          values: [
            { key: "dansk", score: 100 },
            { key: "engelsk", score: 50 }
          ]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);

      expect(result.options[0]).toEqual({
        label: "dansk",
        value: "dansk",
        count: 100
      });
      expect(result.options[1]).toEqual({
        label: "engelsk",
        value: "engelsk",
        count: 50
      });
    });
  });

  describe("merging behavior", () => {
    it("returns static options when no dynamic facets are provided", () => {
      const config = createSelectConfig(
        ComplexSearchFacetsEnum.Generalmaterialtype,
        [
          { label: "Books", value: "books" },
          { label: "Movies", value: "movies" }
        ]
      );

      const result = mergeSelectFacetOptions(config, []);

      expect(result.options).toHaveLength(2);
      expect(result.options).toEqual([
        { label: "Books", value: "books" },
        { label: "Movies", value: "movies" }
      ]);
    });

    it("returns static options when dynamic facet has no values", () => {
      const config = createSelectConfig(ComplexSearchFacetsEnum.Source, [
        { label: "Source A", value: "source-a" }
      ]);

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Source,
          values: null
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      expect(options).toHaveLength(1);
      expect(options[0].label).toBe("Source A");
    });

    it("excludes dynamic options that already exist in static options", () => {
      const config = createSelectConfig(ComplexSearchFacetsEnum.Genreandform, [
        { label: "Existing", value: "existing" }
      ]);

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Genreandform,
          values: [
            { key: "existing", score: 10 },
            { key: "new-option", score: 20 }
          ]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      // Should only have 2 options: "Existing" (static) and "new-option" (dynamic)
      // Plus a divider between them
      expect(options).toHaveLength(2);
      expect(options[0].label).toBe("Existing");
      expect(options[1].label).toBe("new-option");
      expect(result.options).toHaveLength(3); // includes divider
    });

    it("filters out dynamic values with null or undefined keys", () => {
      const config = createSelectConfig(
        ComplexSearchFacetsEnum.Mainlanguage,
        []
      );

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Mainlanguage,
          values: [
            { key: "valid", score: 10 },
            { key: null, score: 20 },
            { key: undefined, score: 30 },
            { key: "", score: 40 }
          ]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      // Only "valid" should be included (empty string is falsy)
      expect(options).toHaveLength(1);
      expect(options[0].label).toBe("valid");
    });

    it("matches dynamic facet by lowercase name with facet. prefix", () => {
      const config = createSelectConfig(
        ComplexSearchFacetsEnum.Genreandform,
        []
      );

      const dynamicFacets: DynamicFacet[] = [
        {
          name: "facet.genreandform",
          values: [{ key: "matched", score: 10 }]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      expect(options).toHaveLength(1);
      expect(options[0].label).toBe("matched");
    });

    it("sets count to undefined when score is nullish", () => {
      const config = createSelectConfig(ComplexSearchFacetsEnum.Source, []);

      const dynamicFacets: DynamicFacet[] = [
        {
          name: ComplexSearchFacetsEnum.Source,
          values: [{ key: "no-score", score: null }]
        }
      ];

      const result = mergeSelectFacetOptions(config, dynamicFacets);
      const options = getOptions(result.options);

      expect(options[0].count).toBeUndefined();
    });
  });
});
