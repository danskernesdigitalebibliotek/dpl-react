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
  // We use the Header component as context to the search bar.
  // It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  <Header>
    <SearchHeader {...args} />
  </Header>
);
