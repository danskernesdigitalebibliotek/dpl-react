import React, { FC } from "react";

interface DateInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (date: string) => void;
}

const DateInput: FC<DateInputProps> = ({ label, id, value, onChange }) => {
  // cannot set from/to to yesterday or yesteryear
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="datepicker">
      <span className="datepicker-toggle">
        <label htmlFor={id} className="text-body-medium-regular">
          {label}
          <input
            type="date"
            onChange={({ target }) => onChange(target.value)}
            name={id}
            value={value}
            id={id}
            className="datepicker-input"
            min={minDate}
          />
        </label>
      </span>
    </div>
  );
};

export default DateInput;
