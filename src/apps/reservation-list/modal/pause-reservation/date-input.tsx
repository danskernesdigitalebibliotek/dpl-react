import React, { FC } from "react";

interface DateInputProps {
  label: string;
  id: string;
}

const DateInput: FC<DateInputProps> = ({ label, id }) => {
  return (
    <div className="datepicker">
      <span className="datepicker-toggle">
        <label htmlFor={id} className="text-body-medium-regular">
          {label}
          <input type="date" name={id} id={id} className="datepicker-input" />
        </label>
      </span>
    </div>
  );
};

export default DateInput;
