import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import AdvancedSearchV2Entry from "./AdvancedSearchV2.entry";
import mappArgs, {
  argTypes as mappArgTypes
} from "../../core/storybook/mappArgs";

const meta: Meta<typeof AdvancedSearchV2Entry> = {
  title: "Apps / Advanced Search V2",
  component: AdvancedSearchV2Entry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    ...mappArgTypes,
    pageSizeDesktop: {
      description: "Number of search result items on desktop",
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "50" }
      }
    },
    pageSizeMobile: {
      description: "Number of search result items on mobile",
      control: { type: "number" },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "20" }
      }
    },
    materialUrl: {
      description: "Path to the material page",
      control: { type: "text" }
    },
    authUrl: {
      description: "Url where user can authenticate",
      control: { type: "text" }
    },
    searchUrl: {
      description: "Path to the search result page",
      control: { type: "text" }
    },
    byAuthorText: {
      description: "By (author) Text",
      control: { type: "text" }
    },
    inSeriesText: {
      description: "In series",
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
    showingMaterialsText: {
      description: "Showing materials",
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
    loadingText: {
      description: "Loading",
      control: { type: "text" }
    },
    advancedSearchAddRowText: {
      description: "Add row",
      control: { type: "text" }
    },
    advancedSearchRemoveRowText: {
      description: "Remove row",
      control: { type: "text" }
    },
    advancedSearchResetText: {
      description: "Advanced search reset button text",
      control: { type: "text" }
    },
    advancedSearchSearchButtonText: {
      description: "Advanced search search button text",
      control: { type: "text" }
    },
    loadingResultsText: {
      description: "Advanced search loading results text",
      control: { type: "text" }
    },
    clauseAndText: {
      description: "Advanced search clause - AND",
      control: { type: "text" }
    },
    clauseOrText: {
      description: "Advanced search clause - OR",
      control: { type: "text" }
    },
    clauseNotText: {
      description: "Advanced search clause - NOT",
      control: { type: "text" }
    },
    // NOTE: The following properties are newly added and not inherited from the previous advanced search implementation.
    advancedSearchSelectedText: {
      description: "Text shown in multiselect when items are selected",
      control: { type: "text" }
    },
    advancedSearchAllText: {
      description: "Text shown in multiselect when no items are selected",
      control: { type: "text" }
    },
    advancedSearchPlaceholderDefaultText: {
      description: "Placeholder for free text search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderTitleText: {
      description: "Placeholder for title search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderCreatorText: {
      description: "Placeholder for creator/author search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderSubjectText: {
      description: "Placeholder for subject search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderPublisherText: {
      description: "Placeholder for publisher search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderDk5Text: {
      description: "Placeholder for DK5 search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderIsbnText: {
      description: "Placeholder for ISBN search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderSeriesText: {
      description: "Placeholder for series search field",
      control: { type: "text" }
    },
    advancedSearchLabelDefaultText: {
      description: "Label for free text search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelTitleText: {
      description: "Label for title search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelCreatorText: {
      description: "Label for creator/author search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelSubjectText: {
      description: "Label for subject search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelPublisherText: {
      description: "Label for publisher search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelDk5Text: {
      description: "Label for DK5 search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelIsbnText: {
      description: "Label for ISBN search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelSeriesText: {
      description: "Label for series search field dropdown",
      control: { type: "text" }
    },
    advancedSearchEditSearchText: {
      description: "Edit search link text",
      control: { type: "text" }
    },
    advancedSearchOnShelfText: {
      description: "Text for on shelf toggle",
      control: { type: "text" }
    },
    advancedSearchOnShelfDescriptionText: {
      description: "Description for on shelf toggle",
      control: { type: "text" }
    },
    advancedSearchOnlyExtraTitlesText: {
      description: "Text for only extra titles toggle",
      control: { type: "text" }
    },
    advancedSearchOnlyExtraTitlesDescriptionText: {
      description: "Description for only extra titles toggle",
      control: { type: "text" }
    },
    advancedSearchShowAllText: {
      description: "Show all text",
      control: { type: "text" }
    },
    advancedSearchShowLessText: {
      description: "Show less text",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof AdvancedSearchV2Entry>;

export const Default: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    ...mappArgs,
    pageSizeDesktop: 50,
    pageSizeMobile: 20,
    materialUrl: "/work/:workid",
    authUrl: "",
    searchUrl: "/search",
    byAuthorText: "By",
    inSeriesText: "in series",
    showMoreText: "show more",
    resultPagerStatusText: "Showing @itemsShown out of @hitcount results",
    showingMaterialsText: "Showing materials (@hitcount)",
    noSearchResultText: "Your search has 0 results",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedSearchBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    branchesConfig:
      '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
    loadingText: "Loading",
    advancedSearchAddRowText: "Add row",
    advancedSearchRemoveRowText: "Remove row @inputNumber",
    advancedSearchResetText: "Reset",
    advancedSearchSearchButtonText: "Search",
    loadingResultsText: "Loading results...",
    clauseAndText: "AND",
    clauseOrText: "OR",
    clauseNotText: "NOT",
    // NOTE: The following properties are newly added and not inherited from the previous advanced search implementation.
    advancedSearchSelectedText: "Valgte",
    advancedSearchAllText: "Alle",
    advancedSearchPlaceholderDefaultText: "Search in all material…",
    advancedSearchPlaceholderTitleText: "Enter title…",
    advancedSearchPlaceholderCreatorText: "Enter author or creator…",
    advancedSearchPlaceholderSubjectText: "Enter subject…",
    advancedSearchPlaceholderPublisherText: "Enter publisher…",
    advancedSearchPlaceholderDk5Text: "Enter DK5 number…",
    advancedSearchPlaceholderIsbnText: "Enter ISBN number…",
    advancedSearchPlaceholderSeriesText: "Enter series title…",
    advancedSearchLabelDefaultText: "Free text search",
    advancedSearchLabelTitleText: "Title",
    advancedSearchLabelCreatorText: "Author / Creator",
    advancedSearchLabelSubjectText: "Subject",
    advancedSearchLabelPublisherText: "Publisher",
    advancedSearchLabelDk5Text: "DK5",
    advancedSearchLabelIsbnText: "ISBN",
    advancedSearchLabelSeriesText: "Series title",
    advancedSearchEditSearchText: "Edit search",
    advancedSearchOnShelfText: "På hylden",
    advancedSearchOnShelfDescriptionText:
      "Vis kun resultater der er tilgængelige på biblioteket nu.",
    advancedSearchOnlyExtraTitlesText: 'Kun "Ekstra Titler"',
    advancedSearchOnlyExtraTitlesDescriptionText:
      "Vis kun resultater der ikke er begrænset af kvoter for digitale lån.",
    advancedSearchShowAllText: "Vis alle",
    advancedSearchShowLessText: "Vis færre"
  }
};
