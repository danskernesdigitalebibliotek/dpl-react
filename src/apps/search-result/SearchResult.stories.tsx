import type { Meta, StoryObj } from "@storybook/react";
import SearchResultEntry from "./SearchResult.entry";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import mappArgs, {
  argTypes as mappArgTypes
} from "../../core/storybook/mappArgs";
import zeroHitsSearchUrlArgs, {
  argTypes as zeroHitsSearchUrlArgTypes
} from "../../core/storybook/zeroHitsSearchUrlArgs";

const meta: Meta<typeof SearchResultEntry> = {
  title: "Apps / Search Result",
  component: SearchResultEntry,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    ...mappArgTypes,
    ...zeroHitsSearchUrlArgTypes,
    q: {
      description: "Search query",
      control: { type: "text" }
    },
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
    }
  }
};

export default meta;

type Story = StoryObj<typeof SearchResultEntry>;

export const Default: Story = {
  args: {
    ...serviceUrlArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    ...mappArgs,
    ...zeroHitsSearchUrlArgs,
    q: "harry",
    pageSizeDesktop: 50,
    pageSizeMobile: 20,
    etAlText: "et al.",
    materialUrl: "/work/:workid",
    searchUrl: "/search",
    byAuthorText: "By",
    inSeriesText: "in series",
    showMoreText: "show more",
    resultPagerStatusText: "Showing @itemsShown out of @hitcount results",
    searchShowingMaterialsText: "@hitcount materials",
    showingResultsForText: 'Showing results for "@query"',
    addMoreFiltersText: "More filters",
    searchShowResultsText: "Show results",
    searchShowLessText: "Show less",
    searchShowAllText: "Show all",
    searchFilterMaterialsText: "Filter @hitcount materials",
    invalidSearchText: "Invalid search",
    invalidSearchDescriptionText: "Please enter a search term to see results.",
    loadingText: "Loading",
    filterListText: "Filter",
    numberDescriptionText: "@count",
    facetAccessTypesText: "Access types",
    facetCanAlwaysBeLoanedText: "Can always be loaned",
    facetChildrenOrAdultsText: "Age group",
    facetCreatorsText: "Creators",
    facetDk5Text: "DK5",
    facetFictionalCharactersText: "Fictional characters",
    facetFictionNonfictionText: "Fiction/Non-fiction",
    facetGamePlatformText: "Game platform",
    facetGenreAndFormText: "Genre and form",
    facetMainLanguagesText: "Main languages",
    facetMaterialTypesText: "Material types",
    facetMaterialTypesGeneralText: "General material types",
    facetMaterialTypesSpecificText: "Specific material types",
    facetSubjectsText: "Subjects",
    facetWorkTypesText: "Work types",
    facetYearText: "Year",
    facetAgeText: "Age",
    facetGeneralAudienceText: "General audience",
    facetLixText: "LIX",
    facetLetText: "LET",
    facetLibraryRecommendationText: "Library recommendation",
    searchOnShelfText: "On shelf",
    searchOnShelfDescriptionText: "Only show materials available on shelf",
    searchCanAlwaysBeLoanedText: "Can always be loaned",
    searchCanAlwaysBeLoanedDescriptionText:
      "Only show materials that can always be loaned",
    webSearchLinkText: "Search web",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedAvailabilityBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    blacklistedSearchBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    branchesConfig:
      '[{"branchId":"DK-775120","title":"Højbjerg"},{"branchId":"DK-775122","title":"Beder-Malling"},{"branchId":"DK-775144","title":"Gellerup"},{"branchId":"DK-775167","title":"Lystrup"},{"branchId":"DK-775146","title":"Harlev"},{"branchId":"DK-775168","title":"Skødstrup"},{"branchId":"FBS-751010","title":"Arresten"},{"branchId":"DK-775147","title":"Hasle"},{"branchId":"FBS-751032","title":"Må ikke benyttes"},{"branchId":"FBS-751031","title":"Fjernlager 1"},{"branchId":"DK-775126","title":"Solbjerg"},{"branchId":"FBS-751030","title":"ITK"},{"branchId":"DK-775149","title":"Sabro"},{"branchId":"DK-775127","title":"Tranbjerg"},{"branchId":"DK-775160","title":"Risskov"},{"branchId":"DK-775162","title":"Hjortshøj"},{"branchId":"DK-775140","title":"Åby"},{"branchId":"FBS-751009","title":"Fjernlager 2"},{"branchId":"FBS-751029","title":"Stadsarkivet"},{"branchId":"FBS-751027","title":"Intern"},{"branchId":"FBS-751026","title":"Fælles undervejs"},{"branchId":"FBS-751025","title":"Fællessekretariatet"},{"branchId":"DK-775133","title":"Bavnehøj"},{"branchId":"FBS-751024","title":"Fjernlånte materialer"},{"branchId":"DK-775100","title":"Hovedbiblioteket"},{"branchId":"DK-775170","title":"Trige"},{"branchId":"DK-775150","title":"Tilst"},{"branchId":"DK-775130","title":"Viby"},{"branchId":"DK-775164","title":"Egå"}]',
    searchInfoboxConfig:
      '{"title": "", "content": {"value": ""}, "buttonLabel": "", "buttonUrl": ""}',
    webSearchConfig:
      '{\n  "webSearchUrl": "https://www.google.com",\n  "webSearchText": "Google",\n  "webSearchTotal": "1000"\n}',
    searchDialogFilterMaterialsText: "Filter materials (97)"
  }
};
