import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Header from "./header";
import SearchHeader from "./search-header";
import { SearchHeaderEntryProps } from "./search-header.entry";

export default {
  title: "Apps / Search Header App",
  component: SearchHeader,
  argTypes: {
    searchUrl: {
      name: "Search header URL",
      defaultValue: "/search",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchHeader>;

export const SearchHeaderApp: ComponentStory<typeof SearchHeader> = (
  args: SearchHeaderEntryProps
) => (
  // We use the Header component for context to the search bar.
  // Make sure to update it if the design in design system repository
  // changes.
  <Header>
    <SearchHeader {...args} />
  </Header>
);
