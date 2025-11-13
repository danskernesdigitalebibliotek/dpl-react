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
import advancedSortSelectArgs, {
  argTypes as advancedSortSelectArgsTypes
} from "../../core/storybook/AdvancedSortSelect";

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
    ...advancedSortSelectArgsTypes,
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
    advancedSearchInputLabelText: {
      description: "Advanced search input label",
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
    advancedSearchLinkToThisSearchText: {
      description: "Advanced search copy to clipboard button text",
      control: { type: "text" }
    },
    advancedSearchAllIndexesText: {
      description: "Advanced search indexes - all",
      control: { type: "text" }
    },
    advancedSearchCreatorText: {
      description: "Advanced search indexes - creator",
      control: { type: "text" }
    },
    advancedSearchSubjectText: {
      description: "Advanced search indexes - subject",
      control: { type: "text" }
    },
    advancedSearchGenreText: {
      description: "Advanced search indexes - genre",
      control: { type: "text" }
    },
    advancedSearchLanguageText: {
      description: "Advanced search indexes - language",
      control: { type: "text" }
    },
    advancedSearchDateText: {
      description: "Advanced search indexes - date",
      control: { type: "text" }
    },
    advancedSearchMainCreatorText: {
      description: "Advanced search indexes - main creator",
      control: { type: "text" }
    },
    advancedSearchMainTitleText: {
      description: "Advanced search indexes - main title",
      control: { type: "text" }
    },
    advancedSearchSourceText: {
      description: "Advanced search indexes - source",
      control: { type: "text" }
    },
    advancedSearchDateFirstEditionText: {
      description: "Advanced search indexes - edition",
      control: { type: "text" }
    },
    advancedSearchDecimalDk5Text: {
      description: "Advanced search indexes - DK5",
      control: { type: "text" }
    },
    advancedSearchTypeText: {
      description: "Advanced search indexes - type",
      control: { type: "text" }
    },
    advancedSearchAudienceText: {
      description: "Advanced search indexes - audience",
      control: { type: "text" }
    },
    advancedSearchPublisherText: {
      description: "Advanced search indexes - publisher",
      control: { type: "text" }
    },
    advancedSearchIdentifierText: {
      description: "Advanced search indexes - identifier",
      control: { type: "text" }
    },
    advancedSearchAcSourceText: {
      description: "Advanced search indexes - source",
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
    advancedSearchInputPlaceholderText: {
      description: "Advanced search input placeholder",
      control: { type: "text" }
    },
    advancedSearchTitleText: {
      description: "Advanced search page title",
      control: { type: "text" }
    },
    advancedSearchPreviewHeadlineText: {
      description: "Advanced search CQL preview headline",
      control: { type: "text" }
    },
    advancedSearchPreviewEmptyText: {
      description: "Advanced search empty preview",
      control: { type: "text" }
    },
    advancedSearchResetText: {
      description: "Advanced search reset button text",
      control: { type: "text" }
    },
    advancedSearchCopyStringText: {
      description: "Advanced search page copy string button text",
      control: { type: "text" }
    },
    advancedSearchEditCqlText: {
      description: "Advanced search page edit CQL button text",
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
    toAdvancedSearchButtonText: {
      description: "To advanced search button text",
      control: { type: "text" }
    },
    cqlSearchTitleText: {
      description: "CQL search title text",
      control: { type: "text" }
    },
    copiedToClipboardText: {
      description: "Text that appears after copying to clipboard",
      control: { type: "text" }
    },
    copiedLinkToThisSearchText: {
      description:
        "Text that appears after getting link to a search copied to clipboard",
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
    advancedSearchFilterMaterialTypeText: {
      description: "Advanced search filter - material type",
      control: { type: "text" }
    },
    advancedSearchFilterLiteratureFormText: {
      description: "Advanced search filter - literature form",
      control: { type: "text" }
    },
    advancedSearchFilterAccessText: {
      description: "Advanced search filter - access",
      control: { type: "text" }
    },
    advancedSearchFilterBookText: {
      description: "Advanced search filter - book",
      control: { type: "text" }
    },
    advancedSearchFilterEbookText: {
      description: "Advanced search filter - ebook",
      control: { type: "text" }
    },
    advancedSearchFilterAudioBookText: {
      description: "Advanced search filter - audio book",
      control: { type: "text" }
    },
    advancedSearchFilterArticleText: {
      description: "Advanced search filter - article",
      control: { type: "text" }
    },
    advancedSearchFilterMovieText: {
      description: "Advanced search filter - movie",
      control: { type: "text" }
    },
    advancedSearchFilterMusicText: {
      description: "Advanced search filter - music",
      control: { type: "text" }
    },
    advancedSearchFilterPhysicalText: {
      description: "Advanced search filter - physical access",
      control: { type: "text" }
    },
    advancedSearchFilterOnlineText: {
      description: "Advanced search filter - online access",
      control: { type: "text" }
    },
    advancedSearchFilterFictionText: {
      description: "Advanced search filter - fiction",
      control: { type: "text" }
    },
    advancedSearchFilterNonFictionText: {
      description: "Advanced search filter - non-fiction",
      control: { type: "text" }
    },
    advancedSearchFilterHoldingStatusText: {
      description: "Advanced search filter - holding status",
      control: { type: "text" }
    },
    advancedSearchFilterLocationText: {
      description: "Advanced search filter - location",
      control: { type: "text" }
    },
    advancedSearchFilterLocationDescriptionText: {
      description: "Advanced search filter - location description",
      control: { type: "text" }
    },
    advancedSearchFilterSublocationText: {
      description: "Advanced search filter - sublocation",
      control: { type: "text" }
    },
    advancedSearchFilterSublocationDescriptionText: {
      description: "Advanced search filter - sublocation description",
      control: { type: "text" }
    },
    advancedSearchFilterBranchText: {
      description: "Advanced search filter - branch",
      control: { type: "text" }
    },
    advancedSearchFilterBranchDescriptionText: {
      description: "Advanced search filter - branch description",
      control: { type: "text" }
    },
    advancedSearchFilterDepartmentText: {
      description: "Advanced search filter - department",
      control: { type: "text" }
    },
    advancedSearchFilterDepartmentDescriptionText: {
      description: "Advanced search filter - department description",
      control: { type: "text" }
    },
    advancedSearchFirstAccessionDateText: {
      description: "Date for first accession date",
      control: { type: "text" }
    },
    advancedSearchFirstAccessionDateOperatorText: {
      description: "Choose operator",
      control: { type: "text" }
    },
    advancedSearchFilterLaterThanText: {
      description: "Date later than",
      control: { type: "text" }
    },
    advancedSearchFilterExactDateText: {
      description: "Exact date",
      control: { type: "text" }
    },
    advancedSearchFilterEarlierThanText: {
      description: "Date earlier than",
      control: { type: "text" }
    },
    advancedSearchFirstAccessionDateDescriptionText: {
      description:
        "The format should be YYYY-DD-MM e.g. 2024-24-11. Terms ”NOW”, ”DAYS” and ”MONTHS” can also be used. For example ”NOW - 60 DAYS”. Remember to add a space on both sides of the plus and minus symbols",
      control: { type: "text" }
    },
    advancedSearchFirstAccessionDateSpecifyDateText: {
      description: "Input desired date in format ”YYYY-MM-DD”",
      control: { type: "text" }
    },
    cqlSearchExternalHelpLinkText: {
      description: "CQL search external help link text",
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
    advancedSearchPlaceholderFictionalCharacterText: {
      description: "Placeholder for fictional character search field",
      control: { type: "text" }
    },
    advancedSearchPlaceholderHostPublicationText: {
      description: "Placeholder for host publication search field",
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
    advancedSearchLabelFictionalCharacterText: {
      description: "Label for fictional character search field dropdown",
      control: { type: "text" }
    },
    advancedSearchLabelHostPublicationText: {
      description: "Label for host publication search field dropdown",
      control: { type: "text" }
    },
    advancedSearchEditSearchText: {
      description: "Edit search link text",
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
    ...advancedSortSelectArgs,
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
      '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
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
    advancedSearchRemoveRowText: "Remove row @inputNumber",
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
    advancedSearchFilterHoldingStatusText: "Holding Status On Shelf",
    advancedSearchFilterLocationText: "Location",
    advancedSearchFilterLocationDescriptionText:
      "Add a comma separated list for multiple locations",
    advancedSearchFilterSublocationText: "Sublocation",
    advancedSearchFilterSublocationDescriptionText:
      "Add a comma separated list for multiple sublocations",
    cqlSearchExternalHelpLinkText: "Find out more about CQL search",
    advancedSearchFilterBranchText: "Branch",
    advancedSearchFilterBranchDescriptionText:
      "Add a comma separated list for multiple branches",
    advancedSearchFilterDepartmentText: "Department",
    advancedSearchFilterDepartmentDescriptionText: 'E.g. "Adult" or "Children"',
    advancedSearchFirstAccessionDateText: "First Accession Date",
    advancedSearchFirstAccessionDateOperatorText: "Choose operator",
    advancedSearchFilterLaterThanText: "Later than",
    advancedSearchFilterExactDateText: "Exact date",
    advancedSearchFilterEarlierThanText: "Earlier than",
    advancedSearchFirstAccessionDateDescriptionText:
      "The format should be YYYY-MM-DD e.g. 2024-11-24. Terms ”NOW”, ”DAYS” and ”MONTHS” can also be used. For example ”NOW - 90 DAYS”. Remember to add a space on both sides of the plus and minus symbols.",
    advancedSearchFirstAccessionDateSpecifyDateText:
      "Input desired date in format 'YYYY-MM-DD'",
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
    advancedSearchPlaceholderFictionalCharacterText:
      "Enter fictional character…",
    advancedSearchPlaceholderHostPublicationText: "Enter host publication…",
    advancedSearchLabelDefaultText: "Free text search",
    advancedSearchLabelTitleText: "Title",
    advancedSearchLabelCreatorText: "Author / Creator",
    advancedSearchLabelSubjectText: "Subject",
    advancedSearchLabelPublisherText: "Publisher",
    advancedSearchLabelDk5Text: "DK5",
    advancedSearchLabelIsbnText: "ISBN",
    advancedSearchLabelSeriesText: "Series title",
    advancedSearchLabelFictionalCharacterText: "Fictional character",
    advancedSearchLabelHostPublicationText: "Host publication",
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
