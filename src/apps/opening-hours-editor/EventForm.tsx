// I dont know why eslint is complaining about label-has-associated-control
// as the label is associated with the input field. I will disable it for now.
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";

export type EventFormOnSubmitType = (
  title: string,
  startTime: string,
  endTime: string
) => void;

type EventFormProps = {
  initialTitle: string;
  initialStartTime: string;
  initialEndTime: string;
  onSubmit: EventFormOnSubmitType;
};

const EventForm: React.FC<EventFormProps> = ({
  initialTitle,
  initialStartTime,
  initialEndTime,
  onSubmit
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  // Reset the form when the initial values change
  // This is necessary because EventForm are reused
  useEffect(() => {
    setTitle(initialTitle);
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
  }, [initialTitle, initialStartTime, initialEndTime]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "") {
      onSubmit(title, startTime, endTime);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", marginTop: "20px" }}
    >
      <label htmlFor="event-form-title">Title:</label>
      <input
        id="event-form-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
