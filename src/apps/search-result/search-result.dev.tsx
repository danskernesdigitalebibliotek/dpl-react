import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import SearchResultEntry, {
  SearchResultEntryProps
} from "./search-result.entry";

export default {
  title: "Apps / Search Result",
  component: SearchResultEntry,
  decorators: [withQuery],
  parameters: {
    query: {
      q: "Harry"
    }
  }
} as ComponentMeta<typeof SearchResultEntry>;

export const SearchResult: ComponentStory<typeof SearchResultEntry> = (
  args: SearchResultEntryProps
) => <SearchResultEntry {...args} />;
