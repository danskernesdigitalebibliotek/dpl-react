import React, { useState } from "react";
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
  selectPeriodicalSelect: (periodicalSelect: string | null) => void;
}

const MaterialPeriodicalSelect: React.FC<MaterialPeriodicalSelectProps> = ({
  groupList,
  selectPeriodicalSelect
}) => {
  const last = String(Object.keys(groupList).sort().pop());
  const t = useText();
  const [year, setYear] = useState<string>(last);

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
              onChange={(e) => selectPeriodicalSelect(e.target.value)}
            >
              {groupList[year]?.map((item) => {
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
