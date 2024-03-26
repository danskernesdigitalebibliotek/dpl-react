import * as React from "react";
import clsx from "clsx";

// Assuming the corrected import path for OpeningHoursItemType is given
import { DplOpeningHoursListGET200Item as OpeningHoursItemType } from "../../core/dpl-cms/model/dplOpeningHoursListGET200Item";

interface OpeningHoursDayEntryProps {
  data: OpeningHoursItemType;
  isOdd: boolean; // Added to determine styling
}

const OpeningHoursDayEntry: React.FC<OpeningHoursDayEntryProps> = ({
  data,
  isOdd
}) => {
  const { start_time, end_time, category } = data;

  return (
    <li
      className={clsx("opening-hours__row opening-hours__individual-opening", {
        "opening-hours__individual-opening--odd": isOdd
      })}
    >
      <div className="opening-hours__category">{category.title}</div>
      <div className="opening-hours__time">
        {start_time} - {end_time}
      </div>
    </li>
  );
};

export default OpeningHoursDayEntry;
