import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { useCombobox } from "downshift";
import StoryHeader from "./story-header.dev.inc";
import SearchBar, { SearchBarProps } from "./search-bar";

export default {
  title: "Components / Search Bar",
  component: SearchBar,
  argTypes: {
    altText: {
      name: "Alt text for search button image",
      defaultValue: "søgeikon",
      control: { type: "text" }
    },
    inputPlaceholderText: {
      name: "Input field placeholder",
      defaultValue: "Søg blandt bibliotekets materialer",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof SearchBar>;

export const Default: ComponentStory<typeof SearchBar> = (
  args: SearchBarProps
) => {
  // We use the Header component and useState for context to the search
  // bar. It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  // Downshift also warns in the browser that we forgot to apply menu props
  // but in this story it's by design, as an autosuggest dropdown isn't present

  const [q, setQ] = useState<string | undefined>("");

  const { getInputProps, getComboboxProps } = useCombobox({
    items: ["Item 1", "Item 2"],
    inputValue: q,
    defaultIsOpen: false,
    onInputValueChange: ({ inputValue }) => {
      setQ(inputValue);
    }
  });

  const searchHeaderUrl = "https://bibliotek.dk/search";

  return (
    <StoryHeader>
      <div className="header__menu-second">
        <form
          action={searchHeaderUrl}
          className="header__menu-search"
          {...getComboboxProps()}
        >
          <SearchBar {...args} getInputProps={getInputProps} />
        </form>
      </div>
    </StoryHeader>
  );
};
