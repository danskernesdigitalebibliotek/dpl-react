import * as React from "react";
import { FC, useState } from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { HoldingsForBibliographicalRecordV3 } from "../../core/fbs/model";
import {
  PeriodicalEdition,
  makePeriodicalEditionsFromHoldings,
  filterAndSortPeriodicalEditions,
  handleSelectYear,
  GroupList,
  handleSelectEdition
} from "../material/periodical/helper";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";

export interface FindOnShelfPeriodicalDropdownProps {
  manifestationsHoldings: HoldingsForBibliographicalRecordV3[];
  setSelectedPeriodical: (selectedPeriodical: PeriodicalEdition) => void;
  selectedPeriodical: PeriodicalEdition;
}

const FindOnShelfPeriodicalDropdown: FC<FindOnShelfPeriodicalDropdownProps> = ({
  manifestationsHoldings,
  setSelectedPeriodical,
  selectedPeriodical
}) => {
  const t = useText();
  const periodicalEditionsBase = makePeriodicalEditionsFromHoldings(
    manifestationsHoldings[0].holdings
  );
  const groupedPeriodicalEditionsBase = groupObjectArrayByProperty(
    periodicalEditionsBase,
    "volumeYear"
  );

  const periodicalEditions = filterAndSortPeriodicalEditions(
    groupedPeriodicalEditionsBase
  );

  const sortedPeriodicalYears = Object.keys(periodicalEditions).sort();

  const [selectedYear, setSelectedYear] = useState<string>(
    selectedPeriodical.volumeYear
  );

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectYear(
      event.target.value,
      setSelectedYear,
      setSelectedPeriodical,
      periodicalEditions,
      groupedPeriodicalEditionsBase as GroupList
    );
  };

  const handleEditionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectEdition(
      groupedPeriodicalEditionsBase as GroupList,
      selectedYear,
      event.target.value,
      setSelectedPeriodical
    );
  };

  return (
    <div className="modal-find-on-shelf__periodical-dropdowns">
      <div className="dropdown dropdown--grey-borders">
        <select
          className="dropdown__select"
          aria-label={t("findOnShelfModalPeriodicalYearDropdownText")}
          defaultValue={selectedYear}
          onChange={handleYearSelect}
        >
          {sortedPeriodicalYears.map((volumeYear) => (
            <option
              key={volumeYear}
              value={volumeYear}
              className="dropdown__option"
            >
              {volumeYear}
            </option>
          ))}
        </select>
        <div className="dropdown__arrows">
          <img className="dropdown__arrow" src={ExpandMoreIcon} alt="" />
        </div>
      </div>
      {selectedYear && (
        <div className="dropdown dropdown--grey-borders">
          <select
            className="dropdown__select"
            aria-label={t("findOnShelfModalPeriodicalEditionDropdownText")}
            value={selectedPeriodical.volumeNumber}
            onChange={handleEditionSelect}
          >
            {periodicalEditions[selectedYear].map((periodicalEdition) => {
              return (
                <option key={periodicalEdition} value={periodicalEdition}>
                  {periodicalEdition}
                </option>
              );
            })}
          </select>
          <div className="dropdown__arrows">
            <img className="dropdown__arrow" src={ExpandMoreIcon} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindOnShelfPeriodicalDropdown;
