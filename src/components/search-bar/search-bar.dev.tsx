import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import Header from "./header";
import SearchBar, { SearchBarProps } from "./search-bar";

export default {
  title: "Components / Search Bar",
  component: SearchBar,
  argTypes: {
    searchHeaderUrl: {
      name: "Search header URL",
      defaultValue: "/search",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchBar>;

export const SearchBarComponent: ComponentStory<typeof SearchBar> = (
  args: SearchBarProps
) => {
  // We use the Header component and useState for context to the search
  // bar. Make sure to update the Header component markup if the design
  // in design system repository changes.
  const [q, setQ] = useState("");
  return (
    <Header>
      <SearchBar {...args} q={q} setQuery={setQ} />
    </Header>
  );
};
