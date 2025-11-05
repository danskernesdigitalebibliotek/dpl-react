import React, { FC } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { SEARCH_INDEX_OPTIONS, type SearchIndexItem } from "../search-index";

export type SearchIndexSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchIndexSelect: FC<SearchIndexSelectProps> = ({ value, onChange }) => {
  return (
    <section>
      <label className="input-label" htmlFor="adv2-index">
        Search index
      </label>
      <div
        className="dropdown dropdown--grey-borders"
        style={{ maxWidth: 260 }}
      >
        <select
          className="dropdown__select dropdown__select--inline-body-font focus-styling"
          id="adv2-index"
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
    </section>
  );
};

export default SearchIndexSelect;
