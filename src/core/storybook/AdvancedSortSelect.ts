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
    description: "Text for latest publication date sorting option",
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
    description: "Text for creator sorting option",
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
    description: "Text for title sorting option",
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
  advancedSearchSortLatestPubDateText: "Latest publication date",
  advancedSearchSortLatestPubDateDescText:
    "Latest publication date (descending)",
  advancedSearchSortLatestPubDateAscText: "Latest publication date (ascending)",
  advancedSearchSortCreatorText: "Author",
  advancedSearchSortCreatorAscText: "Author (ascending)",
  advancedSearchSortCreatorDescText: "Author (descending)",
  advancedSearchSortTitleText: "Title",
  advancedSearchSortTitleAscText: "Title (ascending)",
  advancedSearchSortTitleDescText: "Title (descending)"
};

export interface AdvancedSortSelectArgs {
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
