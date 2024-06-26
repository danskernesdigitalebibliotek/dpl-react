import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import expandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { UseComboboxPropGetters } from "downshift";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import { redirectTo } from "../../core/utils/helpers/url";

export interface SearchBarProps {
  q: string;
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
  getLabelProps: UseComboboxPropGetters<unknown>["getLabelProps"];
  dataCy?: string;
  qWithoutQuery: string;
  setQWithoutQuery: (value: string) => void;
  isHeaderDropdownOpen: boolean;
  setIsHeaderDropdownOpen: (
    value: boolean | ((prevState: boolean) => boolean)
  ) => void;
  redirectUrl: URL;
}

const SearchBar: React.FC<SearchBarProps> = ({
  q,
  getInputProps,
  getLabelProps,
  dataCy = "search-header-input",
  qWithoutQuery,
  setQWithoutQuery,
  isHeaderDropdownOpen,
  setIsHeaderDropdownOpen,
  redirectUrl
}) => {
  const t = useText();
  const handleDropdownMenu = () => {
    setIsHeaderDropdownOpen((prev) => !prev);
  };

  return (
    <>
      {/* The downshift combobox uses prop spreading by design & associated control is destructured too */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading */}
      <label className="hide-visually" {...getLabelProps()}>
        {t("searchHeaderInputLabelText")}
      </label>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        required
        pattern=".*\S+.*"
        title={t("searchNoValidCharactersErrorText")}
        name="q"
        className="header__menu-search-input text-body-medium-regular"
        data-cy={dataCy}
        type="text"
        placeholder={t("inputPlaceholderText")}
        aria-label={t("inputPlaceholderText")}
        onKeyUp={(e) => {
          if (e.key === "Enter" && qWithoutQuery === q && q.length > 0) {
            redirectTo(redirectUrl);
          }
        }}
        {...getInputProps({
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setQWithoutQuery(e.target.value);
          }
        })}
      />
      {/* eslint-enable react/jsx-props-no-spreading */}
      <input
        type="image"
        src={searchIcon}
        alt={t("searchHeaderIconAltText")}
        className="header__menu-search-icon"
        onClick={() => {
          // Only redirect if there is no selected item in autosuggest
          if (qWithoutQuery === q && q.length > 0) {
            redirectTo(redirectUrl);
          }
        }}
        onKeyUp={(e) => {
          // Only redirect if there is no selected item in autosuggest
          if (e.key === "Enter" && qWithoutQuery === q && q.length > 0) {
            redirectTo(redirectUrl);
          }
        }}
      />
      <input
        type="image"
        src={expandIcon}
        alt={t("searchHeaderDropdownText")}
        className={clsx("header__menu-dropdown-icon", {
          "header__menu-dropdown-icon--expanded": isHeaderDropdownOpen
        })}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDropdownMenu();
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();
            handleDropdownMenu();
          }
        }}
        tabIndex={0}
        aria-label={t("searchHeaderDropdownText")}
        data-cy="search-header-dropdown-icon"
        aria-expanded={isHeaderDropdownOpen}
      />
    </>
  );
};

export default SearchBar;
