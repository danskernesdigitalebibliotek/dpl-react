import * as React from "react";
import { FC } from "react";
// Do not understand why eslint is complaining about this import
// It is for sure listed in the dependencies of package.json.
import Flatpickr from "react-flatpickr";
// eslint-disable-next-line import/no-extraneous-dependencies
import "flatpickr/dist/flatpickr.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Danish } from "flatpickr/dist/l10n/da";
import dayjs from "dayjs";
import { dateFormatDayjs } from "../../core/configuration/date-format";

export interface DateRangeInputProps {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  startDate: string;
  endDate: string;
  label: string;
  placeholder?: string;
  className?: string;
  dataCy?: string;
}

const DateRangeInput: FC<DateRangeInputProps> = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  label,
  placeholder,
  className = "date-range",
  dataCy = "date-range"
}) => {
  const refLabel = React.useRef<HTMLLabelElement | null>(null);

  // Disable past dates - only allow today and future dates
  // Using disable instead of minDate because minDate causes unexpected behavior
  // where existing date ranges don't display correctly
  const isPastDate = (date: Date) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };

  // We only create a default date if both start and end date are set
  // Because it is about defining a range.
  const value =
    startDate && endDate
      ? [dayjs(startDate).toDate(), dayjs(endDate).toDate()]
      : undefined;

  return (
    <div data-cy={dataCy} className={className}>
      <div className="date-range__input">
        <label
          ref={refLabel}
          htmlFor="date-range"
          className="text-body-medium-regular"
        >
          {label}
        </label>
        {/* TODO: fix typescript issue */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Flatpickr
          id="date-range"
          value={value}
          options={{
            altInput: true,
            altFormat: "j. F Y",
            disable: [isPastDate],
            locale: Danish,
            dateFormat: "d-m-Y",
            static: true,
            mode: "range",
            defaultDate: new Date(),
            onOpen: () => {
              // Scroll the page to ensure the input is visible in the viewport
              refLabel.current?.scrollIntoView();
            },
            onReady: (dates, currentDateStr, self) => {
              self.altInput?.setAttribute("aria-label", label);
              const classes =
                self.altInput?.getAttribute("class")?.split(" ") || [];

              // Set placeholder if no dates are chosen and a placeholder is given.
              if (!dates.length && placeholder) {
                self.altInput?.setAttribute("placeholder", placeholder);
              }
              // Set empty-date-range class if no dates are chosen.
              if (!dates.length && !classes.includes("empty-date-range")) {
                classes.push("empty-date-range");
                self.altInput?.setAttribute("class", classes.join(" "));
              }
            },
            onValueUpdate: (dates, currentDateStr, self) => {
              const classes =
                self.altInput?.getAttribute("class")?.split(" ") || [];
              if (dates.length && classes.includes("empty-date-range")) {
                classes.splice(classes.indexOf("empty-date-range"), 1);
                self.altInput?.setAttribute("class", classes.join(" "));
              }
            }
          }}
          onChange={([start, end]) => {
            if (start && end) {
              setStartDate(dayjs(start).format(dateFormatDayjs));
              setEndDate(dayjs(end).format(dateFormatDayjs));
            }
          }}
        />
      </div>
    </div>
  );
};
export default DateRangeInput;
