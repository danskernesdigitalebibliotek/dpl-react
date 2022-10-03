import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SearchResultEntry, {
  SearchResultEntryProps
} from "./search-result.entry";

export default {
  title: "Apps / Search Result",
  component: SearchResultEntry,
  argTypes: {
    q: {
      name: "Search string",
      defaultValue: "harry",
      control: { type: "text" }
    },
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
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
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
    showingText: {
      name: "Showing Text",
      defaultValue: "Showing",
      control: { type: "text" }
    },
    outOfText: {
      name: "Out of Text",
      defaultValue: "out of",
      control: { type: "text" }
    },
    resultsText: {
      name: "Results Text",
      defaultValue: "results",
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
    showingResultsForText: {
      name: "Showing results for",
      defaultValue: "Showing results for",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchResultEntry>;

export const SearchResult: ComponentStory<typeof SearchResultEntry> = (
  args: SearchResultEntryProps
) => <SearchResultEntry {...args} />;
