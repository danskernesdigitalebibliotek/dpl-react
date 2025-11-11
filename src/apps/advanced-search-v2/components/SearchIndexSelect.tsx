import React, { FC } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import {
  SEARCH_INDEX_OPTIONS,
  type SearchIndexItem
} from "../lib/search-index";

export type SearchIndexSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchIndexSelect: FC<SearchIndexSelectProps> = ({ value, onChange }) => {
  return (
    <div className="dropdown dropdown--grey-borders advanced-search-v2__search-index-select">
      <select
        className="dropdown__select dropdown__select--inline-body-font focus-styling"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search index"
      >
        {SEARCH_INDEX_OPTIONS.map((idx: SearchIndexItem) => (
          <option
            key={idx.value}
            className="dropdown__option"
            value={idx.value}
          >
            {idx.label}
          </option>
        ))}
      </select>
      <div className="dropdown__arrows dropdown__arrows--inline">
        <img className="dropdown__arrow" src={IconExpand} alt="" />
      </div>
    </div>
  );
};

export default SearchIndexSelect;
