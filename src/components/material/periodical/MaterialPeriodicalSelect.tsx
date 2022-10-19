import React, { useEffect, useState } from "react";
import { useText } from "../../../core/utils/text";
import {
  filterAndSortPeriodicalEditions,
  getFirstEditionFromYear,
  PeriodicalEdition
} from "./helper";

export type GroupList = { [key: string]: PeriodicalEdition[] };

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
    const firstEdition = getFirstEditionFromYear(year, groupList);
    if (firstEdition) {
      selectPeriodicalHandler(firstEdition);
    }
  }, [groupList, selectPeriodicalHandler, selectedPeriodical, year]);

  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
    //  Updates the selectedPeriodical to the first edition of the selected year.
    const changedEdition = getFirstEditionFromYear(
      event.target.value,
      groupList
    );
    if (changedEdition) {
      selectPeriodicalHandler(changedEdition);
    }
  };

  const handleSelectEditions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedItem = groupList[year].find(
      (item) => item.itemNumber === event.target.value
    );

    if (selectedItem) {
      selectPeriodicalHandler(selectedItem);
    }
  };

  return (
    <div className="text-small-caption material-periodical">
      <div className="material-periodical-select">
        <label htmlFor="year">{t("periodicalSelectYearText")}</label>
        <div className="material-periodical-select__border-container">
          <select id="year" defaultValue={year} onChange={handleSelectYear}>
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
            <select id="editions" onChange={handleSelectEditions}>
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
