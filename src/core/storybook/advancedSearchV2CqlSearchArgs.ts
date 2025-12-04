export const argTypes = {
  advancedSearchV2ToCqlSearchButtonText: {
    description: "Text for the link to CQL search",
    control: { type: "text" }
  },
  advancedSearchV2CqlSearchUrl: {
    description: "URL to the CQL search page",
    control: { type: "text" }
  }
};

export default {
  advancedSearchV2ToCqlSearchButtonText: "CQL search",
  advancedSearchV2CqlSearchUrl: "/advanced-search"
};

export interface AdvancedSearchV2CqlSearchArgs {
  advancedSearchV2ToCqlSearchButtonText: string;
  advancedSearchV2CqlSearchUrl: string;
}
