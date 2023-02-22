import React, { FC } from "react";
import { dateHasPassed } from "../../core/utils/helpers/date";
import { useText } from "../../core/utils/text";
import DateInput from "./date-input";
// Todo create meaningful types for this when redoing dates in the mapping file
interface DateInputsProps {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  startDate: string;
  endDate: string;
}

const DateInputs: FC<DateInputsProps> = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate
}) => {
  const t = useText();

  return (
    <div className="datepickers">
      <DateInput
        value={startDate}
        id="start-date"
        onChange={setStartDate}
        label={t("dateInputsStartDateLabelText")}
      />
      <DateInput
        onChange={setEndDate}
        minDateInput={(dateHasPassed(startDate) ? null : startDate) || ""}
        value={endDate}
        id="end-date"
        label={t("dateInputsEndDateLabelText")}
      />
    </div>
  );
};

export default DateInputs;
