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
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
      control: { type: "text" }
    },
    byAuthorText: {
      name: "By (author) Text",
      defaultValue: "Af",
      control: { type: "text" }
    },
    showMoreText: {
      name: "Show more Text",
      defaultValue: "vis flere",
      control: { type: "text" }
    },
    showingText: {
      name: "Showing Text",
      defaultValue: "Viser",
      control: { type: "text" }
    },
    outOfText: {
      name: "Out of Text",
      defaultValue: "ud af",
      control: { type: "text" }
    },
    resultsText: {
      name: "Results Text",
      defaultValue: "resultater",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number description",
      defaultValue: "Nr.",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "i serien",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchResultEntry>;

export const SearchResult: ComponentStory<typeof SearchResultEntry> = (
  args: SearchResultEntryProps
) => <SearchResultEntry {...args} />;
