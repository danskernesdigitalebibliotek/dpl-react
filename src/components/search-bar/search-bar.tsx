import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import { UseComboboxPropGetters } from "downshift";
import { useText } from "../../core/utils/text";

export interface SearchBarProps {
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
  getLabelProps: UseComboboxPropGetters<unknown>["getLabelProps"];
}

const SearchBar: React.FC<SearchBarProps> = ({
  getInputProps,
  getLabelProps
}) => {
  const t = useText();
  return (
    <>
      {/* The downshift combobox uses prop spreading by design & associated control is desctructured too */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading */}
      <label className="hide-visually" {...getLabelProps()}>
        {t("searchHeaderInputLabel")}
      </label>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        name="q"
        className="header__menu-search-input text-body-medium-regular"
        type="text"
        autoComplete="off"
        placeholder={t("inputPlaceholderText")}
        aria-label={t("inputPlaceholderText")}
        {...getInputProps()}
      />
      {/* eslint-enable react/jsx-props-no-spreading */}
      <input
        type="image"
        src={searchIcon}
        alt={t("searchHeaderIconAltText")}
        aria-label={t("searchHeaderIconAltText")}
        className="header__menu-search-icon"
      />
    </>
  );
};

export default SearchBar;
