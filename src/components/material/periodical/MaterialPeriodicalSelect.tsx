import React, { useEffect, useState } from "react";
import { useText } from "../../../core/utils/text";
import {
  filterAndSortPeriodicalEditions,
  getFirstEditionFromYear,
  GroupList,
  handleSelectEdition,
  handleSelectYear,
  PeriodicalEdition
} from "./helper";

interface MaterialPeriodicalSelectProps {
  groupList: GroupList;
  selectedPeriodical: PeriodicalEdition | null;
  selectPeriodicalHandler: (selectedPeriodical: PeriodicalEdition) => void;
}

const MaterialPeriodicalSelect: React.FC<MaterialPeriodicalSelectProps> = ({
  groupList,
  selectedPeriodical,
  selectPeriodicalHandler
}) => {
  const t = useText();
  const lastYear = Object.keys(groupList).sort().pop() || "";
  const [year, setYear] = useState<string>(lastYear);
  const periodicalEditions = filterAndSortPeriodicalEditions(groupList);

  // Sets selectedPeriodical to the last edition
  useEffect(() => {
    if (selectedPeriodical) return;
    const firstEdition = getFirstEditionFromYear(year, periodicalEditions);
    const firstFullPeriodicalEdition = groupList[year].find((edition) => {
      return edition.volumeNumber === firstEdition;
    });
    if (firstFullPeriodicalEdition) {
      selectPeriodicalHandler(firstFullPeriodicalEdition);
    }
  }, [
    selectPeriodicalHandler,
    selectedPeriodical,
    year,
    periodicalEditions,
    groupList
  ]);

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectYear(
      event.target.value,
      setYear,
      selectPeriodicalHandler,
      periodicalEditions,
      groupList
    );
  };

  const handleEditionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectEdition(
      groupList,
      year,
      event.target.value,
      selectPeriodicalHandler
    );
  };

  return (
    <div className="text-small-caption material-periodical">
      <div className="material-periodical-select">
        <label htmlFor="year">{t("periodicalSelectYearText")}</label>
        <div className="material-periodical-select__border-container">
          <select id="year" defaultValue={year} onChange={handleYearSelect}>
            {Object.keys(periodicalEditions)
              .sort()
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>

      {year && (
        <div className="material-periodical-select">
          <label htmlFor="editions">{t("periodicalSelectEditionText")}</label>
          <div className="material-periodical-select__border-container">
            <select
              id="editions"
              value={selectedPeriodical?.volumeNumber}
              onChange={handleEditionSelect}
            >
              {periodicalEditions[year].map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialPeriodicalSelect;
