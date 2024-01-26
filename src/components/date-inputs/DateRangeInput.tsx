import * as React from "react";
import { FC } from "react";
// Do not understand why eslint is complaining about this import
// It is for sure listed in the dependencies of package.json.
// eslint-disable-next-line import/no-extraneous-dependencies
import Flatpickr from "react-flatpickr";
// eslint-disable-next-line import/no-extraneous-dependencies
import "flatpickr/dist/flatpickr.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Danish } from "flatpickr/dist/l10n/da";
import dayjs from "dayjs";

export interface DateRangeInputProps {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  startDate: string;
  endDate: string;
  label: string;
  className?: string;
}

const DateRangeInput: FC<DateRangeInputProps> = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  label,
  className = "datepickers"
}) => {
  const refBelowInputField = React.useRef<HTMLDivElement | null>(null);

  // We only create a default date if both start and end date are set
  // Because it is about defing a range.
  const value =
    startDate && endDate
      ? [dayjs(startDate).toDate(), dayjs(endDate).toDate()]
      : undefined;

  return (
    <>
      <div className={className}>
        <div className="datepicker">
          <label htmlFor="date-range" className="text-body-medium-regular">
            {label}
          </label>
          <Flatpickr
            id="date-range"
            value={value}
            options={{
              altInput: true,
              minDate: dayjs().toDate(),
              locale: Danish,
              dateFormat: "d-m-Y",
              static: true,
              mode: "range",
              onReady: (selectedDates, dateStr, instance) => {
                instance.altInput?.setAttribute("aria-label", label);
              }
            }}
            onValueUpdate={([start, end]) => {
              if (start && end) {
                setStartDate(dayjs(start).format("YYYY-MM-DD"));
                setEndDate(dayjs(end).format("YYYY-MM-DD"));
              }
            }}
          />
        </div>
      </div>
      <div ref={refBelowInputField}>&nbsp;</div>
    </>
  );
};
export default DateRangeInput;
