import * as React from "react";
import { FC, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { HoldingsForBibliographicalRecordLogisticsV1 } from "../../core/fbs/model";
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
  manifestationsHoldings: HoldingsForBibliographicalRecordLogisticsV1[];
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
      <Dropdown
        classNames="dropdown--grey-borders"
        options={sortedPeriodicalYears.map((volumeYear) => ({
          label: volumeYear,
          value: volumeYear
        }))}
        arrowIcon="chevron"
        defaultValue={selectedYear}
        handleOnChange={handleYearSelect}
        ariaLabel={t("findOnShelfModalPeriodicalYearDropdownText")}
      />

      {selectedYear && (
        <Dropdown
          classNames="dropdown--grey-borders"
          options={periodicalEditions[selectedYear].map(
            (periodicalEdition) => ({
              label: periodicalEdition,
              value: periodicalEdition
            })
          )}
          arrowIcon="chevron"
          defaultValue={selectedPeriodical.volumeNumber}
          handleOnChange={handleEditionSelect}
          ariaLabel={t("findOnShelfModalPeriodicalEditionDropdownText")}
        />
      )}
    </div>
  );
};

export default FindOnShelfPeriodicalDropdown;
