import * as React from "react";
import ArrowLeft from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ArrowLeft.svg";
import ArrowRight from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ArrowRight.svg";
import { addWeeks, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import {
  GroupedOpeningHours,
  formatDate,
  getCurrentWeekDisplay,
  getWeekStartAndEndDate,
  groupOpeningHoursByWeekday
} from "./OpeningHoursHelpers";
import OpeningHoursWeekList from "./OpeningHourWeekList";
import { useOpeningHours } from "./useOpeningHours";

export type OpeningHoursProps = {
  title: string;
  branchId: number;
};
interface WeekRange {
  start: Date;
  end: Date;
}
type DisplayData = {
  weekDisplay: string;
  groupedOpeningHours: GroupedOpeningHours;
};

const OpeningHours: React.FC<OpeningHoursProps> = ({ title, branchId }) => {
  const today = new Date("2024-03-21");

  const {
    currentWeekDisplay,
    groupedOpeningHours,
    navigateToPreviousWeek,
    navigateToNextWeek,
    isLoading,
    error
  } = useOpeningHours(today, branchId);

  // if (error) {
  //   new Error("Error fetching opening hours");
  // }

  if (error) {
    return <div>noget loret </div>;
  }
  return (
    <div className="opening-hours">
      <div className="opening-hours__header">
        <h2 className="opening-hours__heading">{title}</h2>
        <div className="opening-hours__navigation-controls">
          <button
            className="opening-hours__navigation-control opening-hours__navigation-control--previous"
            aria-label="Previous week"
            onClick={navigateToPreviousWeek}
            type="button"
          >
            <img src={ArrowLeft} alt="" />
          </button>
          <div className="opening-hours__week-select-wrapper">
            <div className="opening-hours__week-currently-displayed">
              {currentWeekDisplay}
            </div>
          </div>
          <button
            className="opening-hours__navigation-control opening-hours__navigation-control--next"
            aria-label="Next week"
            onClick={navigateToNextWeek}
            type="button"
          >
            <img src={ArrowRight} alt="" />
          </button>
        </div>
      </div>
      {groupedOpeningHours && (
        <OpeningHoursWeekList data={groupedOpeningHours} />
      )}
    </div>
  );
};
export default OpeningHours;
