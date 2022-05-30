import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import Header from "./header.dev.inc";
import SearchBar, { SearchBarProps } from "./search-bar";

export default {
  title: "Components / Search Bar",
  component: SearchBar,
  argTypes: {
    searchHeaderUrl: {
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
} as ComponentMeta<typeof SearchBar>;

export const SearchBarComponent: ComponentStory<typeof SearchBar> = (
  args: SearchBarProps
) => {
  // We use the Header component and useState for context to the search
  // bar. It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  const [q, setQ] = useState("");
  return (
    <Header>
      <SearchBar {...args} q={q} setQuery={setQ} />
    </Header>
  );
};
