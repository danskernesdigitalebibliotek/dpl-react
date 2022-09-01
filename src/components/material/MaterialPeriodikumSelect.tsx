import React, { useState } from "react";
import { useText } from "../../core/utils/text";

export type GroupListItem = {
  displayText: string;
  itemNumber: string;
  volume: string;
  volumeNumber: string;
  volumeYear: string;
};

interface MaterialPeriodikumSelectProps {
  groupList: { [key: string]: GroupListItem[] };
  selectPeriodikumSelect: (periodikumSelect: string | null) => void;
}

const MaterialPeriodikumSelect: React.FC<MaterialPeriodikumSelectProps> = ({
  groupList,
  selectPeriodikumSelect
}) => {
  const last = String(Object.keys(groupList).sort().pop());
  const t = useText();
  const [year, setYear] = useState<string>(last);

  return (
    <div className="text-small-caption material-periodikum ">
      <div className="material-periodikum-select">
        {/* This is because the design requires label and select input to be separated */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="year">{t("periodikumSelectYearText")}</label>
        <div className="material-periodikum-select__border-container">
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
        <div className="material-periodikum-select">
          {/* This is because the design requires label and select input to be separated */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="editions">{t("periodikumSelectEditionText")}</label>
          <div className="material-periodikum-select__border-container">
            <select
              id="editions"
              onChange={(e) => selectPeriodikumSelect(e.target.value)}
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

export default MaterialPeriodikumSelect;
