import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import expandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { UseComboboxPropGetters } from "downshift";
import { useText } from "../../core/utils/text";

export interface SearchBarProps {
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
  getLabelProps: UseComboboxPropGetters<unknown>["getLabelProps"];
  dataCy?: string;
  setQWithoutQuery: (value: string) => void;
  setIsHeaderDropdownOpen: (
    value: boolean | ((prevState: boolean) => boolean)
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  getInputProps,
  getLabelProps,
  dataCy = "search-header-input",
  setQWithoutQuery,
  setIsHeaderDropdownOpen
}) => {
  const t = useText();
  const handleDropdownMenu = () => {
    setIsHeaderDropdownOpen((prev: boolean) => !prev);
  };

  return (
    <>
      {/* The downshift combobox uses prop spreading by design & associated control is desctructured too */}
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
        {...getInputProps({
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setQWithoutQuery(e.target.value);
          }
        })}
      />
      {/* eslint-enable react/jsx-props-no-spreading */}
      <input
        required
        type="image"
        src={searchIcon}
        alt={t("searchHeaderIconAltText")}
        className="header__menu-search-icon"
      />
      <input
        required
        type="image"
        src={expandIcon}
        alt={t("searchHeaderAdvancedSearchIconText")}
        className="header__menu-dropdown-icon"
        onClick={(e) => {
          e.stopPropagation();
          handleDropdownMenu();
        }}
        onKeyUp={(e) =>
          (e.key === "Enter" || e.key === "ArrowDown") && handleDropdownMenu()
        }
        tabIndex={0}
        aria-label={t("searchHeaderAdvancedSearchIconText")}
        data-cy="search-header-dropdown-icon"
      />
    </>
  );
};

export default SearchBar;
