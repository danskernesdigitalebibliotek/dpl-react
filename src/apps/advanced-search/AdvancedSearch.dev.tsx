import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import AdvancedSearchEntry, {
  AdvancedSearchEntryProps
} from "./AdvancedSearch.entry";

export default {
  title: "Apps / Advanced Search",
  component: AdvancedSearchEntry,
  argTypes: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
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
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
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
    advancedSearchInputLabelText: {
      name: "Advanced search input label",
      defaultValue: "Input field @inputNumber",
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
    showingMaterialsText: {
      name: "Showing materials",
      defaultValue: "Showing materials (@hitcount)",
      control: { type: "text" }
    },
    noSearchResultText: {
      name: "0-hit search result",
      defaultValue: "Your search has 0 results",
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
    loadingText: {
      name: "Loading",
      defaultValue: "Loading",
      control: { type: "text" }
    },
    advancedSearchLinkToThisSearchText: {
      name: "Advanced search copy to clipboard button text",
      defaultValue: "Link to this search",
      control: { type: "text" }
    },
    advancedSearchAllIndexesText: {
      name: "Advanced search indexes - all",
      defaultValue: "All indexes",
      control: { type: "text" }
    },
    advancedSearchCreatorText: {
      name: "Advanced search indexes - creator",
      defaultValue: "Creator",
      control: { type: "text" }
    },
    advancedSearchSubjectText: {
      name: "Advanced search indexes - subject",
      defaultValue: "Subject",
      control: { type: "text" }
    },
    advancedSearchGenreText: {
      name: "Advanced search indexes - genre",
      defaultValue: "Genre",
      control: { type: "text" }
    },
    advancedSearchLanguageText: {
      name: "Advanced search indexes - language",
      defaultValue: "Language",
      control: { type: "text" }
    },
    advancedSearchDateText: {
      name: "Advanced search indexes - date",
      defaultValue: "Date",
      control: { type: "text" }
    },
    advancedSearchMainCreatorText: {
      name: "Advanced search indexes - main creator",
      defaultValue: "Main creator",
      control: { type: "text" }
    },
    advancedSearchMainTitleText: {
      name: "Advanced search indexes - main title",
      defaultValue: "Main title",
      control: { type: "text" }
    },
    advancedSearchSourceText: {
      name: "Advanced search indexes - source",
      defaultValue: "Source",
      control: { type: "text" }
    },
    advancedSearchDateFirstEditionText: {
      name: "Advanced search indexes - edition",
      defaultValue: "Edition",
      control: { type: "text" }
    },
    advancedSearchDecimalDk5Text: {
      name: "Advanced search indexes - DK5",
      defaultValue: "DK5",
      control: { type: "text" }
    },
    advancedSearchTypeText: {
      name: "Advanced search indexes - type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    advancedSearchAudienceText: {
      name: "Advanced search indexes - audience",
      defaultValue: "Audience",
      control: { type: "text" }
    },
    advancedSearchPublisherText: {
      name: "Advanced search indexes - publisher",
      defaultValue: "Publisher",
      control: { type: "text" }
    },
    advancedSearchIdentifierText: {
      name: "Advanced search indexes - identifier",
      defaultValue: "Identifier",
      control: { type: "text" }
    },
    advancedSearchAcSourceText: {
      name: "Advanced search indexes - source",
      defaultValue: "Source",
      control: { type: "text" }
    },
    advancedSearchAddRowText: {
      name: "Add row",
      defaultValue: "Add row",
      control: { type: "text" }
    },
    advancedSearchInputPlaceholderText: {
      name: "Advanced search input placeholder",
      defaultValue: "Search term",
      control: { type: "text" }
    },
    advancedSearchTitleText: {
      name: "Advanced search page title",
      defaultValue: "Advanced search",
      control: { type: "text" }
    },
    advancedSearchPreviewHeadlineText: {
      name: "Advanced search CQL preview headline",
      defaultValue: "CQL search string",
      control: { type: "text" }
    },
    advancedSearchPreviewEmptyText: {
      name: "Advanced search empty preview",
      defaultValue: "-",
      control: { type: "text" }
    },
    advancedSearchResetText: {
      name: "Advanced search reset button text",
      defaultValue: "Reset",
      control: { type: "text" }
    },
    advancedSearchCopyStringText: {
      name: "Advanced search page copy string button text",
      defaultValue: "Copy CQL",
      control: { type: "text" }
    },
    advancedSearchEditCqlText: {
      name: "Advanced search page edit CQL button text",
      defaultValue: "Edit CQL",
      control: { type: "text" }
    },
    advancedSearchSearchButtonText: {
      name: "Advanced search search button text",
      defaultValue: "Search",
      control: { type: "text" }
    },
    loadingResultsText: {
      name: "Advanced search loading results text",
      defaultValue: "Loading results...",
      control: { type: "text" }
    },
    toAdvancedSearchButtonText: {
      name: "To advanced search button text",
      defaultValue: "Back to advanced search",
      control: { type: "text" }
    },
    cqlSearchTitleText: {
      name: "CQL search title text",
      defaultValue: "CQL search",
      control: { type: "text" }
    },
    copiedToClipboardText: {
      name: "Text that appears after copying to clipboard",
      defaultValue: "Copied",
      control: { type: "text" }
    },
    copiedLinkToThisSearchText: {
      name: "Text that appears after getting link to a search copied to clipboard",
      defaultValue: "Link copied to clipboard",
      control: { type: "text" }
    },
    clauseAndText: {
      name: "Advanced search clause - AND",
      defaultValue: "AND",
      control: { type: "text" }
    },
    clauseOrText: {
      name: "Advanced search clause - OR",
      defaultValue: "OR",
      control: { type: "text" }
    },
    clauseNotText: {
      name: "Advanced search clause - NOT",
      defaultValue: "NOT",
      control: { type: "text" }
    },
    advancedSearchFilterMaterialTypeText: {
      name: "Advanced search filter - material type",
      defaultValue: "Material Type",
      control: { type: "text" }
    },
    advancedSearchFilterLiteratureFormText: {
      name: "Advanced search filter - literature form",
      defaultValue: "Literature form",
      control: { type: "text" }
    },
    advancedSearchFilterAccessText: {
      name: "Advanced search filter - access",
      defaultValue: "Accessibility",
      control: { type: "text" }
    },
    advancedSearchFilterBookText: {
      name: "Advanced search filter - book",
      defaultValue: "Book",
      control: { type: "text" }
    },
    advancedSearchFilterEbookText: {
      name: "Advanced search filter - ebook",
      defaultValue: "Ebook",
      control: { type: "text" }
    },
    advancedSearchFilterAudioBookText: {
      name: "Advanced search filter - audio book",
      defaultValue: "Audio book",
      control: { type: "text" }
    },
    advancedSearchFilterArticleText: {
      name: "Advanced search filter - article",
      defaultValue: "Article",
      control: { type: "text" }
    },
    advancedSearchFilterMovieText: {
      name: "Advanced search filter - movie",
      defaultValue: "Movie",
      control: { type: "text" }
    },
    advancedSearchFilterMusicText: {
      name: "Advanced search filter - music",
      defaultValue: "Music",
      control: { type: "text" }
    },
    advancedSearchFilterPhysicalText: {
      name: "Advanced search filter - physical access",
      defaultValue: "Physical",
      control: { type: "text" }
    },
    advancedSearchFilterOnlineText: {
      name: "Advanced search filter - online access",
      defaultValue: "Online",
      control: { type: "text" }
    },
    advancedSearchFilterFictionText: {
      name: "Advanced search filter - fiction",
      defaultValue: "Fiction",
      control: { type: "text" }
    },
    advancedSearchFilterNonFictionText: {
      name: "Advanced search filter - non-fiction",
      defaultValue: "Non-fiction",
      control: { type: "text" }
    }
  }
} as Meta<typeof AdvancedSearchEntry>;

export const AdvancedSearch: StoryFn<typeof AdvancedSearchEntry> = (
  args: AdvancedSearchEntryProps
) => <AdvancedSearchEntry {...args} />;
