import React, { useState } from "react";
import { useCombobox } from "downshift";
import SearchBar, { SearchBarProps } from "./search-bar";
import { withText } from "../../core/utils/text";

export interface StorySearchBarProps {
  storybookArgs: SearchBarProps;
}

const WrappedSearchBar = withText(SearchBar);

const StorySearchBar: React.FC<StorySearchBarProps> = ({ storybookArgs }) => {
  // We use the Header component and useState for context to the search
  // bar. It is the Header that creates the Search bar's design -
  // - without it, the Search bar loses its shape.
  // Downshift also warns in the browser that we forgot to apply menu props
  // but in this story it's by design, as an autosuggest dropdown isn't present
  const searchHeaderUrl = "https://bibliotek.dk/search";
  const [q, setQ] = useState<string | undefined>("");
  const { getInputProps } = useCombobox({
    items: ["Item 1", "Item 2"],
    inputValue: q,
    defaultIsOpen: false,
    onInputValueChange: ({ inputValue }) => {
      setQ(inputValue);
    }
  });

  // TODO: rewrite this and ensure it works correctly. This code below only got the story to work and is not tested.
  const { getLabelProps } = useCombobox({
    items: ["Item 1", "Item 2"],
    inputValue: q,
    defaultIsOpen: false,
    onInputValueChange: ({ inputValue }) => {
      setQ(inputValue);
    }
  });

  return (
    <div className="header__menu-second">
      <form action={searchHeaderUrl} className="header__menu-search">
        <WrappedSearchBar
          {...storybookArgs}
          getInputProps={getInputProps}
          getLabelProps={getLabelProps}
        />
      </form>
    </div>
  );
};

export default StorySearchBar;
