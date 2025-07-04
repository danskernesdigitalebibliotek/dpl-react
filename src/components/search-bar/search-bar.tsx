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
  altText?: string;
  inputPlaceholderText?: string;
  searchHeaderIconAltText?: string;
  searchNoValidCharactersErrorText?: string;
  searchHeaderDropdownText?: string;
  searchHeaderInputLabelText?: string;
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
      <label
        className="hide-visually"
        // TODO: Explicitly define prop types for better clarity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getLabelProps()}
      >
        {t("searchHeaderInputLabelText")}
      </label>
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
          // Only redirect if there is no selected item in autosuggest + query has length above 0 characters
          if (e.key === "Enter" && qWithoutQuery === q && !!q.length) {
            redirectTo(redirectUrl);
          }
        }}
        // TODO: Explicitly define prop types for better clarity
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getInputProps({
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setQWithoutQuery(e.target.value);
          }
        })}
      />
      <input
        type="image"
        src={searchIcon}
        alt={t("searchHeaderIconAltText")}
        className="header__menu-search-icon"
        onClick={() => {
          // Only redirect if there is no selected item in autosuggest + query has length above 0 characters
          if (qWithoutQuery === q && !!q.length) {
            redirectTo(redirectUrl);
          }
        }}
        onKeyUp={(e) => {
          // Only redirect if there is no selected item in autosuggest + query has length above 0 characters
          if (e.key === "Enter" && qWithoutQuery === q && !!q.length) {
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
