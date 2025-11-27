import React from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useText } from "../../../core/utils/text";
import { SortOption } from "../types";

type SortSelectProps = {
  sort: SortOption;
  setSort: (value: SortOption) => void;
};

const isSortOption = (value: string): value is SortOption =>
  Object.values(SortOption).includes(value as SortOption);

const AdvancedSortSelect: React.FC<SortSelectProps> = ({ sort, setSort }) => {
  const t = useText();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (isSortOption(value)) {
      setSort(value);
    }
  };

  return (
    <div className="advanced-search-v2__sort">
      <label className="input-label" htmlFor="advanced-sort-select">
        {t("advancedSearchSortLabelText")}
      </label>
      <div className="dropdown dropdown--grey-borders">
        <select
          className="dropdown__select dropdown__select--grey"
          id="advanced-sort-select"
          value={sort}
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
              {t("advancedSearchSortCreatorAscText")}
            </option>
            <option value={SortOption.CreatorDesc}>
              {t("advancedSearchSortCreatorDescText")}
            </option>
          </optgroup>
          <optgroup label={t("advancedSearchSortTitleText")}>
            <option value={SortOption.TitleAsc}>
              {t("advancedSearchSortTitleAscText")}
            </option>
            <option value={SortOption.TitleDesc}>
              {t("advancedSearchSortTitleDescText")}
            </option>
          </optgroup>
        </select>
        <div className="dropdown__arrows">
          <img className="dropdown__arrow" src={IconExpand} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSortSelect;
