export const argTypes = {
  advancedSearchSortLabelText: {
    description: "Label for the sort select",
    control: { type: "text" }
  },
  advancedSearchSortRelevanceText: {
    description: "Text for relevance sorting option",
    control: { type: "text" }
  },
  advancedSearchSortLatestPubDateText: {
    description: "Text for latest publication date sorting option group",
    control: { type: "text" }
  },
  advancedSearchSortLatestPubDateDescText: {
    description: "Text for latest publication date descending sorting option",
    control: { type: "text" }
  },
  advancedSearchSortLatestPubDateAscText: {
    description: "Text for latest publication date ascending sorting option",
    control: { type: "text" }
  },
  advancedSearchSortCreatorText: {
    description: "Text for creator sorting option group",
    control: { type: "text" }
  },
  advancedSearchSortCreatorAscText: {
    description: "Text for creator ascending sorting option",
    control: { type: "text" }
  },
  advancedSearchSortCreatorDescText: {
    description: "Text for creator descending sorting option",
    control: { type: "text" }
  },
  advancedSearchSortTitleText: {
    description: "Text for title sorting option group",
    control: { type: "text" }
  },
  advancedSearchSortTitleAscText: {
    description: "Text for title ascending sorting option",
    control: { type: "text" }
  },
  advancedSearchSortTitleDescText: {
    description: "Text for title descending sorting option",
    control: { type: "text" }
  }
};

export default {
  advancedSearchSortLabelText: "Sort by",
  advancedSearchSortRelevanceText: "Relevance",
  advancedSearchSortLatestPubDateText: "Publication date",
  advancedSearchSortLatestPubDateDescText: "Newest first",
  advancedSearchSortLatestPubDateAscText: "Oldest first",
  advancedSearchSortCreatorText: "Author",
  advancedSearchSortCreatorAscText: "A-Z",
  advancedSearchSortCreatorDescText: "Z-A",
  advancedSearchSortTitleText: "Title",
  advancedSearchSortTitleAscText: "A-Z",
  advancedSearchSortTitleDescText: "Z-A"
};

export interface AdvancedSearchV2SortArgs {
  advancedSearchSortLabelText: string;
  advancedSearchSortRelevanceText: string;
  advancedSearchSortLatestPubDateText: string;
  advancedSearchSortLatestPubDateDescText: string;
  advancedSearchSortLatestPubDateAscText: string;
  advancedSearchSortCreatorText: string;
  advancedSearchSortCreatorAscText: string;
  advancedSearchSortCreatorDescText: string;
  advancedSearchSortTitleText: string;
  advancedSearchSortTitleAscText: string;
  advancedSearchSortTitleDescText: string;
}
