import * as React from "react";
import SearchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";

export interface SearchBarProps {
  q: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchHeaderUrl: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  q,
  setQuery,
  searchHeaderUrl
}) => {
  return (
    <div className="header__menu-second">
      <form action={searchHeaderUrl} className="header__menu-search">
        <input
          name="q"
          className="header__menu-search-input text-body-medium-regular"
          type="text"
          placeholder="Søg blandt bibliotekets materialer"
          value={q}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="image"
          src={SearchIcon}
          alt="search icon"
          className="header__menu-search-icon"
        />
      </form>
    </div>
  );
};

export default SearchBar;
