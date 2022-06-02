import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";

export interface SearchBarProps {
  q: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchHeaderUrl?: string;
  altText?: string;
  inputPlaceholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  q,
  setQuery,
  searchHeaderUrl = "/search",
  altText = "search icon",
  inputPlaceholder = "Search here"
}) => {
  return (
    <div className="header__menu-search">
      <form action={searchHeaderUrl} className="header__menu-search-form">
        <input
          name="q"
          className="header__menu-search-input text-body-medium-regular"
          type="text"
          placeholder={inputPlaceholder}
          value={q}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="image"
          src={searchIcon}
          alt={altText}
          className="header__menu-search-icon"
        />
      </form>
    </div>
  );
};

export default SearchBar;
