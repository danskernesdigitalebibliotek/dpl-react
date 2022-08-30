import React from "react";
import { useText } from "../../core/utils/text";

// create interface for MaterialPeriodikumSelectProps widt a list of strings
interface MaterialPeriodikumSelectProps {
  years?: string[];
  weeks?: string[];
}

const MaterialPeriodikumSelect: React.FC<MaterialPeriodikumSelectProps> = ({
  years,
  weeks
}) => {
  const t = useText();

  return (
    <div className="text-small-caption material-periodikum ">
      {years && (
        <div className="material-periodikum-select">
          {/* This is because the design requires label and select input to be separated */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="year">{t("periodikumSelectYearText")}</label>
          <div className="material-periodikum-select__border-container">
            <select id="year">
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {weeks && (
        <div className="material-periodikum-select">
          {/* This is because the design requires label and select input to be separated */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="weeks">{t("periodikumSelectWeekText")}</label>
          <div className="material-periodikum-select__border-container">
            <select id="weeks">
              {weeks.map((week) => (
                <option key={week} value={week}>
                  {week}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialPeriodikumSelect;
