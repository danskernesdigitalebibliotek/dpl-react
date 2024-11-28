import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import SearchResultEntry from "./search-result.entry";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof SearchResultEntry> = {
  title: "Apps / Search Result",
  component: SearchResultEntry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    q: {
      description: "Search string",
      control: { type: "text" }
    },
    pageSizeDesktop: {
      description: "Number of search result items on desktop",
      control: { type: "number" }
    },
    pageSizeMobile: {
      description: "Number of search result items on mobile",
      control: { type: "number" }
    },
    authUrl: {
      description: "Url where user can authenticate",
      control: { type: "text" }
    },
    searchUrl: {
      description: "Path to the search result page",
      control: { type: "text" }
    },
    materialUrl: {
      description: "Path to the material page",
      control: { type: "text" }
    },
    etAlText: {
      description: "Et al. Text",
      control: { type: "text" }
    },
    byAuthorText: {
      description: "By (author) Text",
      control: { type: "text" }
    },
    showMoreText: {
      description: "Show more Text",
      control: { type: "text" }
    },
    resultPagerStatusText: {
      description: "Result pager status text",
      control: { type: "text" }
    },
    numberDescriptionText: {
      description: "Number description",
      control: { type: "text" }
    },
    inSeriesText: {
      description: "In series",
      control: { type: "text" }
    },
    showingResultsForText: {
      description: "Showing results for",
      control: { type: "text" }
    },
    noSearchResultText: {
      description: "0-hit search result",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      description: "Blacklisted Pickup branches",
      control: { type: "text" }
    },
    blacklistedAvailabilityBranchesConfig: {
      description: "Blacklisted Availability branches",
      control: { type: "text" }
    },
    blacklistedSearchBranchesConfig: {
      description: "Blacklisted branches",
      control: { type: "text" }
    },
    branchesConfig: {
      description: "Branches",
      control: { type: "text" }
    },
    facetBrowserModalScreenReaderModalDescriptionText: {
      description: "facet browser screen reader modal description text",
      control: { type: "text" }
    },
    facetBrowserModalCloseModalAriaLabelText: {
      description: "facet browser close modal aria label text",
      control: { type: "text" }
    },
    facetAccessTypesText: {
      description: "Access types text",
      control: { type: "text" }
    },
    facetCanAlwaysBeLoanedText: {
      description: "Can always be loaned text",
      control: { type: "text" }
    },
    facetChildrenOrAdultsText: {
      description: "Children or adults text",
      control: { type: "text" }
    },
    facetCreatorsText: {
      description: "Creators text",
      control: { type: "text" }
    },
    facetDk5Text: {
      description: "Dk5 text",
      control: { type: "text" }
    },
    facetFictionalCharactersText: {
      description: "Fictional characters text",
      control: { type: "text" }
    },
    facetFictionNonfictionText: {
      description: "Fiction or nonfiction text",
      control: { type: "text" }
    },
    facetGenreAndFormText: {
      description: "Genre and form text",
      control: { type: "text" }
    },
    facetGamePlatformText: {
      description: "Game platform text",
      control: { type: "text" }
    },
    facetMainLanguagesText: {
      description: "Main languages text",
      control: { type: "text" }
    },
    facetMaterialTypesText: {
      description: "Material types text",
      control: { type: "text" }
    },
    facetMaterialTypesGeneralText: {
      description: "Material types general text",
      control: { type: "text" }
    },
    facetMaterialTypesSpecificText: {
      description: "Material types specific text",
      control: { type: "text" }
    },
    facetSubjectsText: {
      description: "Subjects text",
      control: { type: "text" }
    },
    facetWorkTypesText: {
      description: "Work types text",
      control: { type: "text" }
    },
    facetYearText: {
      description: "Year text",
      control: { type: "text" }
    },
    facetAgeText: {
      name: "Age text",
      control: { type: "text" }
    },
    showResultsText: {
      description: "Show results text",
      control: { type: "text" }
    },
    filterListText: {
      description: "Filter list text",
      control: { type: "text" }
    },
    searchSortingOptionText: {
      name: "Search sorting option text",
      control: { type: "text" }
    },
    addMoreFiltersText: {
      description: "Add more filters text",
      control: { type: "text" }
    },
    loadingText: {
      description: "Loading",
      control: { type: "text" }
    },
    invalidSearchText: {
      description: "Invalid search headline",
      control: { type: "text" }
    },
    invalidSearchDescriptionText: {
      description: "Invalid search description",
      control: { type: "text" }
    },
    intelligentFiltersAccessibleHeadlineText: {
      description: "Intelligent filters accessible headline",
      control: { type: "text" }
    },
    intelligentFiltersSelectedAccessibleHeadlineText: {
      description: "Intelligent filters - selected - accessible headline",
      control: { type: "text" }
    },
    webSearchLinkText: {
      description: "Web search link text",
      control: { type: "text" }
    },
    webSearchConfig: {
      name: "Web search config",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof SearchResultEntry>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    q: "harry",
    pageSizeDesktop: 50,
    pageSizeMobile: 20,
    authUrl: "",
    searchUrl: "/search",
    materialUrl: "/work/:workid",
    etAlText: "et al.",
    byAuthorText: "By",
    showMoreText: "show more",
    resultPagerStatusText: "Showing @itemsShown out of @hitcount results",
    numberDescriptionText: "Nr.",
    inSeriesText: "in series",
    showingResultsForText: "Showing results for “@query”",
    noSearchResultText: "Your search has 0 results",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedSearchBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    branchesConfig:
      '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
    facetBrowserModalScreenReaderModalDescriptionText:
      "Modal for facet browser",
    facetBrowserModalCloseModalAriaLabelText: "Close facet browser modal",
    facetAccessTypesText: "Access types",
    facetCanAlwaysBeLoanedText: "Can always be loaned",
    facetChildrenOrAdultsText: "Children or adults",
    facetCreatorsText: "Creators",
    facetDk5Text: "Dk5",
    facetFictionalCharactersText: "Fictional characters",
    facetFictionNonfictionText: "Fiction or nonfiction",
    facetGamePlatformText: "Game platform",
    facetGenreAndFormText: "Genre and form",
    facetMainLanguagesText: "Main languages",
    facetMaterialTypesText: "Material types",
    facetMaterialTypesGeneralText: "Material types general",
    facetMaterialTypesSpecificText: "Material types specific",
    facetSubjectsText: "Subjects",
    facetWorkTypesText: "Work types",
    facetYearText: "Year",
    facetAgeText: "Age",
    showResultsText: "Show results",
    filterListText: "Filter list",
    searchSortingOptionText: "Search sorting option text",
    addMoreFiltersText: "+ more filters",
    loadingText: "Loading",
    invalidSearchText: "Invalid search",
    invalidSearchDescriptionText:
      "Your search is invalid. Please try again. In order to perform a valid search, you need to include at least three letters.",
    intelligentFiltersAccessibleHeadlineText: "Available filters",
    intelligentFiltersSelectedAccessibleHeadlineText: "Selected filters",
    webSearchLinkText: "Switch to the results for the library content.",
    webSearchConfig:
      '{\n  "webSearchUrl": "https://www.google.com",\n  "webSearchText": "Google",\n  "webSearchTotal": "1000"\n}'
  }
};
