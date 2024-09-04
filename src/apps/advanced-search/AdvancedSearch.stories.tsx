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
import AdvancedSearchEntry from "./AdvancedSearch.entry";

const meta: Meta<typeof AdvancedSearchEntry> = {
  title: "Apps / Advanced Search",
  component: AdvancedSearchEntry,
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    pageSizeDesktop: {
      description: "Number of search result items on desktop",
      control: "number",
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
      control: { type: "text", value: "/work/:workid" }
    },
    authUrl: {
      description: "Url where user can authenticate",
      control: { type: "text", value: "" }
    },
    searchUrl: {
      description: "Path to the search result page",
      control: { type: "text", value: "/search" }
    },
    etAlText: {
      description: "Et al. Text",
      control: { type: "text", value: "et al." }
    },
    byAuthorText: {
      description: "By (author) Text",
      control: { type: "text", value: "By" }
    },
    showMoreText: {
      description: "Show more Text",
      control: { type: "text", value: "show more" }
    },
    resultPagerStatusText: {
      description: "Result pager status text",
      control: {
        type: "text",
        value: "Showing @itemsShown out of @hitcount results"
      }
    },
    advancedSearchInputLabelText: {
      description: "Advanced search input label",
      control: { type: "text", value: "Input field @inputNumber" }
    },
    numberDescriptionText: {
      description: "Number description",
      control: { type: "text", value: "Nr." }
    },
    inSeriesText: {
      description: "In series",
      control: { type: "text", value: "in series" }
    },
    showingMaterialsText: {
      description: "Showing materials",
      control: { type: "text", value: "Showing materials (@hitcount)" }
    },
    noSearchResultText: {
      description: "0-hit search result",
      control: { type: "text", value: "Your search has 0 results" }
    },
    blacklistedPickupBranchesConfig: {
      description: "Blacklisted Pickup branches",
      control: {
        type: "text",
        value: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    blacklistedAvailabilityBranchesConfig: {
      description: "Blacklisted Availability branches",
      control: {
        type: "text",
        value: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    blacklistedSearchBranchesConfig: {
      description: "Blacklisted branches",
      control: {
        type: "text",
        value: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    branchesConfig: {
      description: "Branches",
      control: {
        type: "text",
        value:
          '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]'
      }
    },
    loadingText: {
      description: "Loading",
      control: { type: "text", value: "Loading" }
    },
    advancedSearchLinkToThisSearchText: {
      description: "Advanced search copy to clipboard button text",
      control: { type: "text", value: "Link to this search" }
    },
    advancedSearchAllIndexesText: {
      description: "Advanced search indexes - all",
      control: { type: "text", value: "All indexes" }
    },
    advancedSearchCreatorText: {
      description: "Advanced search indexes - creator",
      control: { type: "text", value: "Creator" }
    },
    advancedSearchSubjectText: {
      description: "Advanced search indexes - subject",
      control: { type: "text", value: "Subject" }
    },
    advancedSearchGenreText: {
      description: "Advanced search indexes - genre",
      control: { type: "text", value: "Genre" }
    },
    advancedSearchLanguageText: {
      description: "Advanced search indexes - language",
      control: { type: "text", value: "Language" }
    },
    advancedSearchDateText: {
      description: "Advanced search indexes - date",
      control: { type: "text", value: "Date" }
    },
    advancedSearchMainCreatorText: {
      description: "Advanced search indexes - main creator",
      control: { type: "text", value: "Main creator" }
    },
    advancedSearchMainTitleText: {
      description: "Advanced search indexes - main title",
      control: { type: "text", value: "Main title" }
    },
    advancedSearchSourceText: {
      description: "Advanced search indexes - source",
      control: { type: "text", value: "Source" }
    },
    advancedSearchDateFirstEditionText: {
      description: "Advanced search indexes - edition",
      control: { type: "text", value: "Edition" }
    },
    advancedSearchDecimalDk5Text: {
      description: "Advanced search indexes - DK5",
      control: { type: "text", value: "DK5" }
    },
    advancedSearchTypeText: {
      description: "Advanced search indexes - type",
      control: { type: "text", value: "Type" }
    },
    advancedSearchAudienceText: {
      description: "Advanced search indexes - audience",
      control: { type: "text", value: "Audience" }
    },
    advancedSearchPublisherText: {
      description: "Advanced search indexes - publisher",
      control: { type: "text", value: "Publisher" }
    },
    advancedSearchIdentifierText: {
      description: "Advanced search indexes - identifier",
      control: { type: "text", value: "Identifier" }
    },
    advancedSearchAcSourceText: {
      description: "Advanced search indexes - source",
      control: { type: "text", value: "Source" }
    },
    advancedSearchAddRowText: {
      description: "Add row",
      control: { type: "text", value: "Add row" }
    },
    advancedSearchInputPlaceholderText: {
      description: "Advanced search input placeholder",
      control: { type: "text", value: "Search term" }
    },
    advancedSearchTitleText: {
      description: "Advanced search page title",
      control: { type: "text", value: "Advanced search" }
    },
    advancedSearchPreviewHeadlineText: {
      description: "Advanced search CQL preview headline",
      control: { type: "text", value: "CQL search string" }
    },
    advancedSearchPreviewEmptyText: {
      description: "Advanced search empty preview",
      control: { type: "text", value: "-" }
    },
    advancedSearchResetText: {
      description: "Advanced search reset button text",
      control: { type: "text", value: "Reset" }
    },
    advancedSearchCopyStringText: {
      description: "Advanced search page copy string button text",
      control: { type: "text", value: "Copy CQL" }
    },
    advancedSearchEditCqlText: {
      description: "Advanced search page edit CQL button text",
      control: { type: "text", value: "Edit CQL" }
    },
    advancedSearchSearchButtonText: {
      description: "Advanced search search button text",
      control: { type: "text", value: "Search" }
    },
    loadingResultsText: {
      description: "Advanced search loading results text",
      control: { type: "text", value: "Loading results..." }
    },
    toAdvancedSearchButtonText: {
      description: "To advanced search button text",
      control: { type: "text", value: "Back to advanced search" }
    },
    cqlSearchTitleText: {
      description: "CQL search title text",
      control: { type: "text", value: "CQL search" }
    },
    copiedToClipboardText: {
      description: "Text that appears after copying to clipboard",
      control: { type: "text", value: "Copied" }
    },
    copiedLinkToThisSearchText: {
      description:
        "Text that appears after getting link to a search copied to clipboard",
      control: { type: "text", value: "Link copied to clipboard" }
    },
    clauseAndText: {
      description: "Advanced search clause - AND",
      control: { type: "text", value: "AND" }
    },
    clauseOrText: {
      description: "Advanced search clause - OR",
      control: { type: "text", value: "OR" }
    },
    clauseNotText: {
      description: "Advanced search clause - NOT",
      control: { type: "text", value: "NOT" }
    },
    advancedSearchFilterMaterialTypeText: {
      description: "Advanced search filter - material type",
      control: { type: "text", value: "Material Type" }
    },
    advancedSearchFilterLiteratureFormText: {
      description: "Advanced search filter - literature form",
      control: { type: "text", value: "Literature form" }
    },
    advancedSearchFilterAccessText: {
      description: "Advanced search filter - access",
      control: { type: "text", value: "Accessibility" }
    },
    advancedSearchFilterBookText: {
      description: "Advanced search filter - book",
      control: { type: "text", value: "Book" }
    },
    advancedSearchFilterEbookText: {
      description: "Advanced search filter - ebook",
      control: { type: "text", value: "Ebook" }
    },
    advancedSearchFilterAudioBookText: {
      description: "Advanced search filter - audio book",
      control: { type: "text", value: "Audio book" }
    },
    advancedSearchFilterArticleText: {
      description: "Advanced search filter - article",
      control: { type: "text", value: "Article" }
    },
    advancedSearchFilterMovieText: {
      description: "Advanced search filter - movie",
      control: { type: "text", value: "Movie" }
    },
    advancedSearchFilterMusicText: {
      description: "Advanced search filter - music",
      control: { type: "text", value: "Music" }
    },
    advancedSearchFilterPhysicalText: {
      description: "Advanced search filter - physical access",
      control: { type: "text", value: "Physical" }
    },
    advancedSearchFilterOnlineText: {
      description: "Advanced search filter - online access",
      control: { type: "text", value: "Online" }
    },
    advancedSearchFilterFictionText: {
      description: "Advanced search filter - fiction",
      control: { type: "text", value: "Fiction" }
    },
    advancedSearchFilterNonFictionText: {
      description: "Advanced search filter - non-fiction",
      control: { type: "text" }
    },
    advancedSearchFilterHoldingStatusText: {
      description: "Advanced search filter - holding status",
      control: { type: "text", value: "Holding Status On Shelf" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof AdvancedSearchEntry>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    pageSizeDesktop: 50,
    pageSizeMobile: 20,
    materialUrl: "/work/:workid",
    authUrl: "",
    searchUrl: "/search",
    etAlText: "et al.",
    byAuthorText: "By",
    showMoreText: "show more",
    resultPagerStatusText: "Showing @itemsShown out of @hitcount results",
    advancedSearchInputLabelText: "Input field @inputNumber",
    numberDescriptionText: "Nr.",
    inSeriesText: "in series",
    showingMaterialsText: "Showing materials (@hitcount)",
    noSearchResultText: "Your search has 0 results",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedSearchBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    branchesConfig:
      '[{  branchId: "DK-775120",  title: "Højbjerg"},{  branchId: "DK-775122",  title: "Beder-Malling"},{  branchId: "DK-775144",  title: "Gellerup"},{  branchId: "DK-775167",  title: "Lystrup"},{  branchId: "DK-775146",  title: "Harlev"},{  branchId: "DK-775168",  title: "Skødstrup"},{  branchId: "FBS-751010",  title: "Arresten"},{  branchId: "DK-775147",  title: "Hasle"},{  branchId: "FBS-751032",  title: "Må ikke benyttes"},{  branchId: "FBS-751031",  title: "Fjernlager 1"},{  branchId: "DK-775126",  title: "Solbjerg"},{  branchId: "FBS-751030",  title: "ITK"},{  branchId: "DK-775149",  title: "Sabro"},{  branchId: "DK-775127",  title: "Tranbjerg"},{  branchId: "DK-775160",  title: "Risskov"},{  branchId: "DK-775162",  title: "Hjortshøj"},{  branchId: "DK-775140",  title: "Åby"},{  branchId: "FBS-751009",  title: "Fjernlager 2"},{  branchId: "FBS-751029",  title: "Stadsarkivet"},{  branchId: "FBS-751027",  title: "Intern"},{  branchId: "FBS-751026",  title: "Fælles undervejs"},{  branchId: "FBS-751025",  title: "Fællessekretariatet"},{  branchId: "DK-775133",  title: "Bavnehøj"},{  branchId: "FBS-751024",  title: "Fjernlånte materialer"},{  branchId: "DK-775100",  title: "Hovedbiblioteket"},{  branchId: "DK-775170",  title: "Trige"},{  branchId: "DK-775150",  title: "Tilst"},{  branchId: "DK-775130",  title: "Viby"},{  branchId: "DK-775164", title: "Egå"}]',
    loadingText: "Loading",
    advancedSearchLinkToThisSearchText: "Link to this search",
    advancedSearchAllIndexesText: "All indexes",
    advancedSearchCreatorText: "Creator",
    advancedSearchSubjectText: "Subject",
    advancedSearchGenreText: "Genre",
    advancedSearchLanguageText: "Language",
    advancedSearchDateText: "Date",
    advancedSearchMainCreatorText: "Main creator",
    advancedSearchMainTitleText: "Main title",
    advancedSearchSourceText: "Source",
    advancedSearchDateFirstEditionText: "Edition",
    advancedSearchDecimalDk5Text: "DK5",
    advancedSearchTypeText: "Type",
    advancedSearchAudienceText: "Audience",
    advancedSearchPublisherText: "Publisher",
    advancedSearchIdentifierText: "Identifier",
    advancedSearchAcSourceText: "Source",
    advancedSearchAddRowText: "Add row",
    advancedSearchInputPlaceholderText: "Search term",
    advancedSearchTitleText: "Advanced search",
    advancedSearchPreviewHeadlineText: "CQL search string",
    advancedSearchPreviewEmptyText: "-",
    advancedSearchResetText: "Reset",
    advancedSearchCopyStringText: "Copy CQL",
    advancedSearchEditCqlText: "Edit CQL",
    advancedSearchSearchButtonText: "Search",
    loadingResultsText: "Loading results...",
    toAdvancedSearchButtonText: "Back to advanced search",
    cqlSearchTitleText: "CQL search",
    copiedToClipboardText: "Copied",
    copiedLinkToThisSearchText: "Link copied to clipboard",
    clauseAndText: "AND",
    clauseOrText: "OR",
    clauseNotText: "NOT",
    advancedSearchFilterMaterialTypeText: "Material Type",
    advancedSearchFilterLiteratureFormText: "Literature form",
    advancedSearchFilterAccessText: "Accessibility",
    advancedSearchFilterBookText: "Book",
    advancedSearchFilterEbookText: "Ebook",
    advancedSearchFilterAudioBookText: "Audio book",
    advancedSearchFilterArticleText: "Article",
    advancedSearchFilterMovieText: "Movie",
    advancedSearchFilterMusicText: "Music",
    advancedSearchFilterPhysicalText: "Physical",
    advancedSearchFilterOnlineText: "Online",
    advancedSearchFilterFictionText: "Fiction",
    advancedSearchFilterNonFictionText: "Non-fiction",
    advancedSearchFilterHoldingStatusText: "Holding Status On Shelf"
  }
};
