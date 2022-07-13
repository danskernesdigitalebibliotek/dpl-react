import React from "react";
import { useText } from "../../core/utils/text";

const MaterialPeriodikumSelect: React.FC = () => {
  const t = useText();

  const placeholderData = {
    year: ["2017", "2018", "2019", "2020", "2021", "2022"],
    weeks: ["30", "31", "32", "33", "34", "35"]
  };

  return (
    <div className="text-small-caption material-periodikum ">
      <div className="material-periodikum-select">
        {/* This is because the design requires label and select input to be separated */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="year">{t("Årgang")}</label>
        <div className="material-periodikum-select__border-container">
          <select id="year">
            {placeholderData.year.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="material-periodikum-select">
        {/* This is because the design requires label and select input to be separated */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="weeks">{t("Uge")}</label>
        <div className="material-periodikum-select__border-container">
          <select id="weeks">
            {placeholderData.weeks.map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MaterialPeriodikumSelect;
