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
    }
  }
} as ComponentMeta<typeof SearchResultEntry>;

export const SearchResult: ComponentStory<typeof SearchResultEntry> = (
  args: SearchResultEntryProps
) => <SearchResultEntry {...args} />;
