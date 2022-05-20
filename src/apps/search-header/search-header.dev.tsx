import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Header from "../../components/search-bar/header";
import SearchHeader, { SearchHeaderProps } from "./search-header";

export default {
  title: "Apps / Search Header",
  component: SearchHeader,
  argTypes: {
    searchUrl: {
      name: "Search header base URL",
      defaultValue: "https://bibliotek.dk/search",
      control: { type: "text" }
    },
    altText: {
      name: "Alt text for search button image",
      defaultValue: "søgeikon",
      control: { type: "text" }
    },
    inputPlaceholder: {
      name: "Input field placeholder",
      defaultValue: "Søg blandt bibliotekets materialer",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchHeader>;

export const SearchHeaderApp: ComponentStory<typeof SearchHeader> = (
  args: SearchHeaderProps
) => (
  // We use the Header component for context to the search bar.
  // Make sure to update it if the design in design system repository
  // changes.
  <Header>
    <SearchHeader {...args} />
  </Header>
);
