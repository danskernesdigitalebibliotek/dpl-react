import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import { UseComboboxPropGetters } from "downshift";
import { useText } from "../../core/utils/text";
import { useModalButtonHandler } from "../../core/utils/modal";

export interface SearchBarProps {
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
  getLabelProps: UseComboboxPropGetters<unknown>["getLabelProps"];
  dataCy?: string;
  setQWithoutQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  getInputProps,
  getLabelProps,
  dataCy = "search-header-input",
  setQWithoutQuery
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const advancedSearchClick = () => {
    open("advanced-search-modal");
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
        autoComplete="off"
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
      <span
        className="mr-64 ml-24"
        onClick={advancedSearchClick}
        role="button"
        onKeyUp={(e) => e.key === "Enter" && advancedSearchClick}
        tabIndex={0}
        aria-label={t("searchHeaderAdvancedSearchIconText")}
      >
        A.S.
      </span>
    </>
  );
};

export default SearchBar;
