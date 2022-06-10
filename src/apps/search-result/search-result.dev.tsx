import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SearchResultEntry from "./search-result.entry";

export default {
  title: "Apps / Search Result",
  component: SearchResultEntry
  // argTypes: {
  //   // searchUrl: {
  //   //   defaultValue: "/soeg",
  //   //   control: { type: "text" }
  //   // }
  // }
} as ComponentMeta<typeof SearchResultEntry>;

export const SearchResult: ComponentStory<typeof SearchResultEntry> = () => (
  <SearchResultEntry />
);
