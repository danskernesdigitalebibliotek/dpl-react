import * as React from "react";
import clsx from "clsx";
import { DplOpeningHoursListGET200Item as OpeningHoursItemType } from "../../core/dpl-cms/model/dplOpeningHoursListGET200Item";

interface OpeningHoursDayEntryProps {
  data: OpeningHoursItemType;
  isOdd: boolean;
}

const OpeningHoursDayEntry: React.FC<OpeningHoursDayEntryProps> = ({
  data,
  isOdd
}) => {
  const { start_time: startTime, end_time: endTime, category } = data;

  return (
    <li
      className={clsx("opening-hours__individual-opening", {
        "opening-hours__individual-opening--odd": isOdd
      })}
    >
      <div className="opening-hours__category">{category.title}</div>
      <div className="opening-hours__time">
        {startTime} - {endTime}
      </div>
    </li>
  );
};

export default OpeningHoursDayEntry;
