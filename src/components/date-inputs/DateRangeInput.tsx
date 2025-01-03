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

  const scrollCalendarIntoView = () => {
    refLabel.current?.scrollIntoView();
  };

  // We only create a default date if both start and end date are set
  // Because it is about defing a range.
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
        <Flatpickr
          id="date-range"
          value={value}
          options={{
            altInput: true,
            altFormat: "j. F Y",
            minDate: dayjs().toDate(),
            locale: Danish,
            dateFormat: "d-m-Y",
            static: true,
            mode: "range",
            onOpen: scrollCalendarIntoView,
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
              setStartDate(dayjs(start).format("YYYY-MM-DD"));
              setEndDate(dayjs(end).format("YYYY-MM-DD"));
            }
          }}
        />
      </div>
    </div>
  );
};
export default DateRangeInput;
