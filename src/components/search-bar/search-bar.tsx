import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import { UseComboboxPropGetters } from "downshift";

export interface SearchBarProps {
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholderText?: string;
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
}

const SearchBar: React.FC<SearchBarProps> = ({
  altText = "search icon",
  inputPlaceholderText = "Search here",
  getInputProps
}) => {
  return (
    <>
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <input
        name="q"
        className="header__menu-search-input text-body-medium-regular"
        type="text"
        autoComplete="off"
        placeholder={inputPlaceholderText}
        {...getInputProps()}
      />
      {/* eslint-enable react/jsx-props-no-spreading */}
      <input
        type="image"
        src={searchIcon}
        alt={altText}
        className="header__menu-search-icon"
      />
    </>
  );
};

export default SearchBar;
