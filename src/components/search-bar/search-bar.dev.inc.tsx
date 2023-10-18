/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { useCombobox } from "downshift";
import SearchBar, { SearchBarProps } from "./search-bar";

export interface StorySearchBarProps {
  storybookArgs: SearchBarProps;
}

const StorySearchBar: React.FC<StorySearchBarProps> = ({ storybookArgs }) => {
  // We use the Header component and useState for context to the search
  // bar. It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  // Downshift also warns in the browser that we forgot to apply menu props
  // but in this story it's by design, as an autosuggest dropdown isn't present
  const searchHeaderUrl = "https://bibliotek.dk/search";
  const [q, setQ] = useState<string | undefined>("");
  const { getInputProps, getComboboxProps } = useCombobox({
    items: ["Item 1", "Item 2"],
    inputValue: q,
    defaultIsOpen: false,
    onInputValueChange: ({ inputValue }) => {
      setQ(inputValue);
    }
  });

  return (
    <div className="header__menu-second">
      <form
        action={searchHeaderUrl}
        className="header__menu-search"
        {...getComboboxProps()}
      >
        <SearchBar {...storybookArgs} getInputProps={getInputProps} />
      </form>
    </div>
  );
};

export default StorySearchBar;
