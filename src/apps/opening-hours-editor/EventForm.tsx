// I dont know why eslint is complaining about label-has-associated-control
// as the label is associated with the input field. I will disable it for now.
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { OpeningHoursCategoriesType } from "./types";

export type EventFormOnSubmitType = (
  category: OpeningHoursCategoriesType,
  startTime: string,
  endTime: string
) => void;

type EventFormProps = {
  initialTitle?: string;
  initialStartTime: string;
  initialEndTime: string;
  onSubmit: EventFormOnSubmitType;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const EventForm: React.FC<EventFormProps> = ({
  initialTitle,
  initialStartTime,
  initialEndTime,
  onSubmit,
  openingHoursCategories
}) => {
  const initialCategory = initialTitle
    ? openingHoursCategories.find((category) => category.title === initialTitle)
    : openingHoursCategories[0];

  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [category, setCategory] = useState(initialCategory);

  // Reset the form when the initial values change
  // This is necessary because EventForm are reused
  useEffect(() => {
    setCategory(initialCategory);
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
  }, [initialCategory, initialEndTime, initialStartTime]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category) {
      onSubmit(category, startTime, endTime);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", marginTop: "20px" }}
    >
      <label htmlFor="event-form-title">Title:</label>
      <select
        id="event-form-title"
        value={category?.title}
        onChange={(e) => {
          setCategory(
            openingHoursCategories.find((item) => item.title === e.target.value)
          );
        }}
      >
        {openingHoursCategories.map((categoryItem) => (
          <option key={categoryItem.title} value={categoryItem.title}>
            {categoryItem.title}
          </option>
        ))}
      </select>
      <label htmlFor="event-form-start-time">Start Time:</label>
      <input
        id="event-form-start-time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label htmlFor="event-form-end-time">End Time:</label>
      <input
        id="event-form-end-time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        min={startTime}
        max="00:00"
      />
      <button
        type="submit"
        style={{ backgroundColor: "green", marginTop: "20px" }}
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm;
