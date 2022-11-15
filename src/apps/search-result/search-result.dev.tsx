import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SearchResultEntry, {
  SearchResultEntryProps
} from "./search-result.entry";

export default {
  title: "Apps / Search Result",
  component: SearchResultEntry,
  argTypes: {
    q: {
      name: "Search string",
      defaultValue: "harry",
      control: { type: "text" }
    },
    pageSizeDesktop: {
      name: "Number of search result items on desktop",
      defaultValue: 50,
      control: { type: "number" }
    },
    pageSizeMobile: {
      name: "Number of search result items on mobile",
      defaultValue: 20,
      control: { type: "number" }
    },
    authUrl: {
      name: "Url where user can authenticate",
      defaultValue: "",
      control: { type: "text" }
    },
    searchUrl: {
      name: "Path to the search result page",
      defaultValue: "/search",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
      control: { type: "text" }
    },
    byAuthorText: {
      name: "By (author) Text",
      defaultValue: "By",
      control: { type: "text" }
    },
    showMoreText: {
      name: "Show more Text",
      defaultValue: "show more",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      name: "Result pager status text",
      defaultValue: "Showing @itemsShown out of @hitcount results",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number description",
      defaultValue: "Nr.",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "in series",
      control: { type: "text" }
    },
    showingResultsForText: {
      name: "Showing results for",
      defaultValue: "Showing results for",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted Pickup branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    blacklistedSearchBranchesConfig: {
      name: "Blacklisted branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    branchesConfig: {
      name: "Branches",
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    facetBrowserModalScreenReaderModalDescriptionText: {
      name: "facet browser screen reader modal description text",
      defaultValue: "Modal for facet browser",
      control: { type: "text" }
    },
    facetBrowserModalCloseModalAriaLabelText: {
      name: "facet browser close modal aria label text",
      defaultValue: "Close facet browser modal",
      control: { type: "text" }
    },
    facetAccessTypesText: {
      name: "Access types text",
      defaultValue: "Access types",
      control: { type: "text" }
    },
    facetChildrenOrAdultsText: {
      name: "Children or adults text",
      defaultValue: "Children or adults",
      control: { type: "text" }
    },
    facetCreatorsText: {
      name: "Creators text",
      defaultValue: "Creators",
      control: { type: "text" }
    },
    facetFictionNonfictionText: {
      name: "Fiction or nonfiction text",
      defaultValue: "Fiction or nonfiction",
      control: { type: "text" }
    },
    facetGenreAndFormText: {
      name: "Genre and form text",
      defaultValue: "Genre and form",
      control: { type: "text" }
    },
    facetMainLanguagesText: {
      name: "Main languages text",
      defaultValue: "Main languages",
      control: { type: "text" }
    },
    facetMaterialTypesText: {
      name: "Material types text",
      defaultValue: "Material types",
      control: { type: "text" }
    },
    facetSubjectsText: {
      name: "Subjects text",
      defaultValue: "Subjects",
      control: { type: "text" }
    },
    facetWorkTypesText: {
      name: "Work types text",
      defaultValue: "Work types",
      control: { type: "text" }
    },
    showResultsText: {
      name: "Show results text",
      defaultValue: "Show results",
      control: { type: "text" }
    },
    filterListText: {
      name: "Filter list text",
      defaultValue: "Filter list",
      control: { type: "text" }
    },
    clearAllText: {
      name: "Clear all text",
      defaultValue: "Clear all",
      control: { type: "text" }
    },
    addMoreFiltersText: {
      name: "Add more filters text",
      defaultValue: "+ more filters",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchResultEntry>;

export const SearchResult: ComponentStory<typeof SearchResultEntry> = (
  args: SearchResultEntryProps
) => <SearchResultEntry {...args} />;
