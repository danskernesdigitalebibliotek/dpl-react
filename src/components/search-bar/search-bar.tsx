import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import { GetInputPropsOptions } from "downshift";

export interface SearchBarProps {
  q: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholder?: string;
  // TODO: find out what type this can be from downshifts official types
  getInputProps?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  q,
  setQuery,
  altText = "search icon",
  inputPlaceholder = "Search here",
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
        placeholder={inputPlaceholder}
        value={q}
        onChange={(e) => setQuery(e.target.value)}
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
