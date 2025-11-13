import React, { FC } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import {
  SEARCH_INDEX_OPTIONS,
  type SearchIndexItem
} from "../lib/search-fields-config";
import { useText } from "../../../core/utils/text";

export type SearchIndexSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchIndexSelect: FC<SearchIndexSelectProps> = ({ value, onChange }) => {
  const t = useText();

  return (
    <div className="dropdown dropdown--grey-borders advanced-search-v2__search-index-select">
      <select
        className="dropdown__select dropdown__select--inline-body-font focus-styling"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search index"
      >
        {SEARCH_INDEX_OPTIONS.map((item: SearchIndexItem) => (
          <option
            key={item.value}
            className="dropdown__option"
            value={item.value}
          >
            {t(item.labelKey)}
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
