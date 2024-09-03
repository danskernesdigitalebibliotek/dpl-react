import type { Meta, StoryObj } from "@storybook/react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import AdvancedSearchEntry from "./AdvancedSearch.entry";

const meta: Meta<typeof AdvancedSearchEntry> = {
  title: "Apps / Advanced Search",
  component: AdvancedSearchEntry,
  argTypes: {
    pageSizeDesktop: {
      name: "Number of search result items on desktop",
      control: { type: "number", value: 50 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "50" }
      }
    },
    pageSizeMobile: {
      name: "Number of search result items on mobile",
      control: { type: "number", value: 20 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "20" }
      }
    },
    materialUrl: {
      name: "Path to the material page",
      control: { type: "text", value: "/work/:workid" }
    },
    authUrl: {
      name: "Url where user can authenticate",
      control: { type: "text", value: "" }
    },
    searchUrl: {
      name: "Path to the search result page",
      control: { type: "text", value: "/search" }
    },
    etAlText: {
      name: "Et al. Text",
      control: { type: "text", value: "et al." }
    },
    byAuthorText: {
      name: "By (author) Text",
      control: { type: "text", value: "By" }
    },
    showMoreText: {
      name: "Show more Text",
      control: { type: "text", value: "show more" }
    },
    resultPagerStatusText: {
      name: "Result pager status text",
      control: {
        type: "text",
        value: "Showing @itemsShown out of @hitcount results"
      }
    },
    advancedSearchInputLabelText: {
      name: "Advanced search input label",
      control: { type: "text", value: "Input field @inputNumber" }
    },
    numberDescriptionText: {
      name: "Number description",
      control: { type: "text", value: "Nr." }
    },
    inSeriesText: {
      name: "In series",
      control: { type: "text", value: "in series" }
    },
    showingMaterialsText: {
      name: "Showing materials",
      control: { type: "text", value: "Showing materials (@hitcount)" }
    },
    noSearchResultText: {
      name: "0-hit search result",
      control: { type: "text", value: "Your search has 0 results" }
    },
    blacklistedPickupBranchesConfig: {
      name: "Blacklisted Pickup branches",
      control: {
        type: "text",
        value: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      control: {
        type: "text",
        value: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    blacklistedSearchBranchesConfig: {
      name: "Blacklisted branches",
      control: {
        type: "text",
        value: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024"
      }
    },
    branchesConfig: {
      name: "Branches",
      control: {
        type: "text",
        value:
          '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]'
      }
    },
    loadingText: {
      name: "Loading",
      control: { type: "text", value: "Loading" }
    },
    advancedSearchLinkToThisSearchText: {
      name: "Advanced search copy to clipboard button text",
      control: { type: "text", value: "Link to this search" }
    },
    advancedSearchAllIndexesText: {
      name: "Advanced search indexes - all",
      control: { type: "text", value: "All indexes" }
    },
    advancedSearchCreatorText: {
      name: "Advanced search indexes - creator",
      control: { type: "text", value: "Creator" }
    },
    advancedSearchSubjectText: {
      name: "Advanced search indexes - subject",
      control: { type: "text", value: "Subject" }
    },
    advancedSearchGenreText: {
      name: "Advanced search indexes - genre",
      control: { type: "text", value: "Genre" }
    },
    advancedSearchLanguageText: {
      name: "Advanced search indexes - language",
      control: { type: "text", value: "Language" }
    },
    advancedSearchDateText: {
      name: "Advanced search indexes - date",
      control: { type: "text", value: "Date" }
    },
    advancedSearchMainCreatorText: {
      name: "Advanced search indexes - main creator",
      control: { type: "text", value: "Main creator" }
    },
    advancedSearchMainTitleText: {
      name: "Advanced search indexes - main title",
      control: { type: "text", value: "Main title" }
    },
    advancedSearchSourceText: {
      name: "Advanced search indexes - source",
      control: { type: "text", value: "Source" }
    },
    advancedSearchDateFirstEditionText: {
      name: "Advanced search indexes - edition",
      control: { type: "text", value: "Edition" }
    },
    advancedSearchDecimalDk5Text: {
      name: "Advanced search indexes - DK5",
      control: { type: "text", value: "DK5" }
    },
    advancedSearchTypeText: {
      name: "Advanced search indexes - type",
      control: { type: "text", value: "Type" }
    },
    advancedSearchAudienceText: {
      name: "Advanced search indexes - audience",
      control: { type: "text", value: "Audience" }
    },
    advancedSearchPublisherText: {
      name: "Advanced search indexes - publisher",
      control: { type: "text", value: "Publisher" }
    },
    advancedSearchIdentifierText: {
      name: "Advanced search indexes - identifier",
      control: { type: "text", value: "Identifier" }
    },
    advancedSearchAcSourceText: {
      name: "Advanced search indexes - source",
      control: { type: "text", value: "Source" }
    },
    advancedSearchAddRowText: {
      name: "Add row",
      control: { type: "text", value: "Add row" }
    },
    advancedSearchInputPlaceholderText: {
      name: "Advanced search input placeholder",
      control: { type: "text", value: "Search term" }
    },
    advancedSearchTitleText: {
      name: "Advanced search page title",
      control: { type: "text", value: "Advanced search" }
    },
    advancedSearchPreviewHeadlineText: {
      name: "Advanced search CQL preview headline",
      control: { type: "text", value: "CQL search string" }
    },
    advancedSearchPreviewEmptyText: {
      name: "Advanced search empty preview",
      control: { type: "text", value: "-" }
    },
    advancedSearchResetText: {
      name: "Advanced search reset button text",
      control: { type: "text", value: "Reset" }
    },
    advancedSearchCopyStringText: {
      name: "Advanced search page copy string button text",
      control: { type: "text", value: "Copy CQL" }
    },
    advancedSearchEditCqlText: {
      name: "Advanced search page edit CQL button text",
      control: { type: "text", value: "Edit CQL" }
    },
    advancedSearchSearchButtonText: {
      name: "Advanced search search button text",
      control: { type: "text", value: "Search" }
    },
    loadingResultsText: {
      name: "Advanced search loading results text",
      control: { type: "text", value: "Loading results..." }
    },
    toAdvancedSearchButtonText: {
      name: "To advanced search button text",
      control: { type: "text", value: "Back to advanced search" }
    },
    cqlSearchTitleText: {
      name: "CQL search title text",
      control: { type: "text", value: "CQL search" }
    },
    copiedToClipboardText: {
      name: "Text that appears after copying to clipboard",
      control: { type: "text", value: "Copied" }
    },
    copiedLinkToThisSearchText: {
      name: "Text that appears after getting link to a search copied to clipboard",
      control: { type: "text", value: "Link copied to clipboard" }
    },
    clauseAndText: {
      name: "Advanced search clause - AND",
      control: { type: "text", value: "AND" }
    },
    clauseOrText: {
      name: "Advanced search clause - OR",
      control: { type: "text", value: "OR" }
    },
    clauseNotText: {
      name: "Advanced search clause - NOT",
      control: { type: "text", value: "NOT" }
    },
    advancedSearchFilterMaterialTypeText: {
      name: "Advanced search filter - material type",
      control: { type: "text", value: "Material Type" }
    },
    advancedSearchFilterLiteratureFormText: {
      name: "Advanced search filter - literature form",
      control: { type: "text", value: "Literature form" }
    },
    advancedSearchFilterAccessText: {
      name: "Advanced search filter - access",
      control: { type: "text", value: "Accessibility" }
    },
    advancedSearchFilterBookText: {
      name: "Advanced search filter - book",
      control: { type: "text", value: "Book" }
    },
    advancedSearchFilterEbookText: {
      name: "Advanced search filter - ebook",
      control: { type: "text", value: "Ebook" }
    },
    advancedSearchFilterAudioBookText: {
      name: "Advanced search filter - audio book",
      control: { type: "text", value: "Audio book" }
    },
    advancedSearchFilterArticleText: {
      name: "Advanced search filter - article",
      control: { type: "text", value: "Article" }
    },
    advancedSearchFilterMovieText: {
      name: "Advanced search filter - movie",
      control: { type: "text", value: "Movie" }
    },
    advancedSearchFilterMusicText: {
      name: "Advanced search filter - music",
      control: { type: "text", value: "Music" }
    },
    advancedSearchFilterPhysicalText: {
      name: "Advanced search filter - physical access",
      control: { type: "text", value: "Physical" }
    },
    advancedSearchFilterOnlineText: {
      name: "Advanced search filter - online access",
      control: { type: "text", value: "Online" }
    },
    advancedSearchFilterFictionText: {
      name: "Advanced search filter - fiction",
      control: { type: "text", value: "Fiction" }
    },
    advancedSearchFilterNonFictionText: {
      name: "Advanced search filter - non-fiction",
      control: { type: "text", value: "Non-fiction" }
    },
    advancedSearchFilterHoldingStatusText: {
      name: "Advanced search filter - holding status",
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
    branchesConfig: `[
      {
        branchId: "DK-775120",
        title: "Højbjerg"
      },
      {
        branchId: "DK-775122",
        title: "Beder-Malling"
      },
      {
        branchId: "DK-775144",
        title: "Gellerup"
      },
      {
        branchId: "DK-775167",
        title: "Lystrup"
      },
      {
        branchId: "DK-775146",
        title: "Harlev"
      },
      {
        branchId: "DK-775168",
        title: "Skødstrup"
      },
      {
        branchId: "FBS-751010",
        title: "Arresten"
      },
      {
        branchId: "DK-775147",
        title: "Hasle"
      },
      {
        branchId: "FBS-751032",
        title: "Må ikke benyttes"
      },
      {
        branchId: "FBS-751031",
        title: "Fjernlager 1"
      },
      {
        branchId: "DK-775126",
        title: "Solbjerg"
      },
      {
        branchId: "FBS-751030",
        title: "ITK"
      },
      {
        branchId: "DK-775149",
        title: "Sabro"
      },
      {
        branchId: "DK-775127",
        title: "Tranbjerg"
      },
      {
        branchId: "DK-775160",
        title: "Risskov"
      },
      {
        branchId: "DK-775162",
        title: "Hjortshøj"
      },
      {
        branchId: "DK-775140",
        title: "Åby"
      },
      {
        branchId: "FBS-751009",
        title: "Fjernlager 2"
      },
      {
        branchId: "FBS-751029",
        title: "Stadsarkivet"
      },
      {
        branchId: "FBS-751027",
        title: "Intern"
      },
      {
        branchId: "FBS-751026",
        title: "Fælles undervejs"
      },
      {
        branchId: "FBS-751025",
        title: "Fællessekretariatet"
      },
      {
        branchId: "DK-775133",
        title: "Bavnehøj"
      },
      {
        branchId: "FBS-751024",
        title: "Fjernlånte materialer"
      },
      {
        branchId: "DK-775100",
        title: "Hovedbiblioteket"
      },
      {
        branchId: "DK-775170",
        title: "Trige"
      },
      {
        branchId: "DK-775150",
        title: "Tilst"
      },
      {
        branchId: "DK-775130",
        title: "Viby"
      },
      {
        branchId: "DK-775164",
        title: "Egå"
      }
    ]`,
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
