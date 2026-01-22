import React from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useText } from "../../../core/utils/text";
import { SortOption } from "../types";

type SortSelectProps = {
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
};

const isSortOption = (value: string): value is SortOption =>
  Object.values(SortOption).includes(value as SortOption);

const AdvancedSortSelect: React.FC<SortSelectProps> = ({
  sortOption,
  setSortOption
}) => {
  const t = useText();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (isSortOption(value)) {
      setSortOption(value);
    }
  };

  return (
    <div className="search-v2__sort-select">
      <label
        className="search-v2__sort-select__label"
        htmlFor="advanced-sort-select"
      >
        {t("advancedSearchSortLabelText")}
      </label>
      <div className="search-v2__sort-select__select-wrapper">
        <select
          className="search-v2__sort-select__select"
          id="advanced-sort-select"
          value={sortOption}
          onChange={handleChange}
        >
          <option value={SortOption.Relevance}>
            {t("advancedSearchSortRelevanceText")}
          </option>
          <optgroup label={t("advancedSearchSortLatestPubDateText")}>
            <option value={SortOption.LatestPubDateDesc}>
              {t("advancedSearchSortLatestPubDateDescText")}
            </option>
            <option value={SortOption.LatestPubDateAsc}>
              {t("advancedSearchSortLatestPubDateAscText")}
            </option>
          </optgroup>
          <optgroup label={t("advancedSearchSortCreatorText")}>
            <option value={SortOption.CreatorAsc}>
              {t("advancedSearchSortAscText")}
            </option>
            <option value={SortOption.CreatorDesc}>
              {t("advancedSearchSortDescText")}
            </option>
          </optgroup>
          <optgroup label={t("advancedSearchSortTitleText")}>
            <option value={SortOption.TitleAsc}>
              {t("advancedSearchSortAscText")}
            </option>
            <option value={SortOption.TitleDesc}>
              {t("advancedSearchSortDescText")}
            </option>
          </optgroup>
        </select>
        <div className="search-v2__dropdown__arrows">
          <img className="search-v2__dropdown__arrow" src={IconExpand} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSortSelect;
