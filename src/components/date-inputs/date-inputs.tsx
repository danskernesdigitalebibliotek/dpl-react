import React, { FC } from "react";
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
        label={t("pauseReservationStartDateLabelText")}
      />
      <DateInput
        onChange={setEndDate}
        minDateInput={startDate || ""}
        value={endDate}
        id="end-date"
        label={t("pauseReservationEndDateLabelText")}
      />
    </div>
  );
};

export default DateInputs;
