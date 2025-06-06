import React from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useText } from "../../core/utils/text";
import { AdvancedSortMapStrings } from "./types";

type SortSelectProps = {
  sort: AdvancedSortMapStrings;
  setSort: (value: AdvancedSortMapStrings) => void;
};

const AdvancedSortSelect: React.FC<SortSelectProps> = ({ sort, setSort }) => {
  const t = useText();
  return (
    <li className="content-list-page__filter">
      <div>
        <label className="input-label" htmlFor="advanced-sort-select">
          {t("advancedSearchSortLabelText")}
        </label>
        <div className="dropdown dropdown--grey-borders">
          <select
            className="dropdown__select dropdown__select--grey"
            id="advanced-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as AdvancedSortMapStrings)}
          >
            <option value={AdvancedSortMapStrings.Relevance}>
              {t("advancedSearchSortRelevanceText")}
            </option>
            <optgroup label={t("advancedSearchSortLatestPubDateText")}>
              <option value={AdvancedSortMapStrings.LatestPubDateDesc}>
                {t("advancedSearchSortLatestPubDateDescText")}
              </option>
              <option value={AdvancedSortMapStrings.LatestPubDateAsc}>
                {t("advancedSearchSortLatestPubDateAscText")}
              </option>
            </optgroup>
            <optgroup label={t("advancedSearchSortCreatorText")}>
              <option value={AdvancedSortMapStrings.CreatorAsc}>
                {t("advancedSearchSortCreatorAscText")}
              </option>
              <option value={AdvancedSortMapStrings.CreatorDesc}>
                {t("advancedSearchSortCreatorDescText")}
              </option>
            </optgroup>
            <optgroup label={t("advancedSearchSortTitleText")}>
              <option value={AdvancedSortMapStrings.TitleAsc}>
                {t("advancedSearchSortTitleAscText")}
              </option>
              <option value={AdvancedSortMapStrings.TitleDesc}>
                {t("advancedSearchSortTitleDescText")}
              </option>
            </optgroup>
          </select>
          <div className="dropdown__arrows">
            <img className="dropdown__arrow" src={IconExpand} alt="" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default AdvancedSortSelect;
