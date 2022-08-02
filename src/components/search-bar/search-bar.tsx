import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import { UseComboboxPropGetters } from "downshift";
import { useText } from "../../core/utils/text";

export interface SearchBarProps {
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
}

const SearchBar: React.FC<SearchBarProps> = ({ getInputProps }) => {
  const t = useText();
  return (
    <>
      {/* The downshift combobox uses prop spreading by design */}
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        name="q"
        className="header__menu-search-input text-body-medium-regular"
        type="text"
        autoComplete="off"
        placeholder={t("inputPlaceholderText")}
        {...getInputProps()}
      />
      {/* eslint-enable react/jsx-props-no-spreading */}
      <input
        type="image"
        src={searchIcon}
        alt={t("altText")}
        className="header__menu-search-icon"
      />
    </>
  );
};

export default SearchBar;
