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
  advancedSearchSortTitleText: {
    description: "Text for title sorting option group",
    control: { type: "text" }
  },
  advancedSearchSortAscText: {
    description: "Text for ascending (A-Z) sorting option",
    control: { type: "text" }
  },
  advancedSearchSortDescText: {
    description: "Text for descending (Z-A) sorting option",
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
  advancedSearchSortTitleText: "Title",
  advancedSearchSortAscText: "A-Z",
  advancedSearchSortDescText: "Z-A"
};

export interface AdvancedSearchV2SortArgs {
  advancedSearchSortLabelText: string;
  advancedSearchSortRelevanceText: string;
  advancedSearchSortLatestPubDateText: string;
  advancedSearchSortLatestPubDateDescText: string;
  advancedSearchSortLatestPubDateAscText: string;
  advancedSearchSortCreatorText: string;
  advancedSearchSortTitleText: string;
  advancedSearchSortAscText: string;
  advancedSearchSortDescText: string;
}
