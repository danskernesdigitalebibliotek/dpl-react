import React, { useEffect, useState } from "react";
import { useText } from "../../core/utils/text";

export type GroupListItem = {
  displayText: string;
  itemNumber: string;
  volume: string;
  volumeNumber: string;
  volumeYear: string;
};

export type GroupList = { [key: string]: GroupListItem[] };

interface MaterialPeriodicalSelectProps {
  groupList: GroupList;
  selectedPeriodical: GroupListItem | null;
  selectPeriodicalHandler: (selectedPeriodical: GroupListItem) => void;
}

const MaterialPeriodicalSelect: React.FC<MaterialPeriodicalSelectProps> = ({
  groupList,
  selectedPeriodical,
  selectPeriodicalHandler
}) => {
  const lastYear = Object.keys(groupList).sort().pop() || "";
  const t = useText();
  const [year, setYear] = useState<string>(lastYear);

  // Sets selectedPeriodical to the last edition on mount and if year changes
  useEffect(() => {
    if (selectedPeriodical) return;
    const firstEditions = groupList?.[year]?.[0];
    if (firstEditions) {
      selectPeriodicalHandler(firstEditions);
    }
  }, [selectPeriodicalHandler, groupList, year, selectedPeriodical]);

  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setYear(event.target.value);

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
    <div className="text-small-caption material-periodical ">
      <div className="material-periodical-select">
        <label htmlFor="year">{t("periodicalSelectYearText")}</label>
        <div className="material-periodical-select__border-container">
          <select id="year" defaultValue={year} onChange={handleSelectYear}>
            {Object.keys(groupList)
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
              {groupList[year].map((item) => {
                return (
                  <option key={item.itemNumber} value={item.itemNumber}>
                    {item.volumeNumber}
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
