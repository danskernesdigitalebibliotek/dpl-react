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
  selectPeriodicalSelect: (periodicalSelect: string) => void;
  lastYear: string;
  lastEdition: GroupListItem;
}

const MaterialPeriodicalSelect: React.FC<MaterialPeriodicalSelectProps> = ({
  groupList,
  selectPeriodicalSelect,
  lastYear
}) => {
  const t = useText();
  const [year, setYear] = useState<string>(lastYear);
  const firstEditions = JSON.stringify(groupList[year][0]);

  // Sets periodicalSelect to the last edition on munt and if year changes
  useEffect(() => {
    selectPeriodicalSelect(firstEditions);
  }, [selectPeriodicalSelect, firstEditions]);

  return (
    <div className="text-small-caption material-periodical ">
      <div className="material-periodical-select">
        <label htmlFor="year">{t("periodicalSelectYearText")}</label>
        <div className="material-periodical-select__border-container">
          <select
            id="year"
            defaultValue={year}
            onChange={(e) => setYear(e.target.value)}
          >
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
            <select
              id="editions"
              onChange={(e) => {
                selectPeriodicalSelect(e.target.value);
              }}
            >
              {groupList[year]?.map((item) => {
                return (
                  <option key={item.itemNumber} value={JSON.stringify(item)}>
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
