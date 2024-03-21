// I dont know why eslint is complaining about label-has-associated-control
// as the label is associated with the input field. I will disable it for now.
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import { extractTime, updateEventTime } from "./helper";

type DialogFomularProps = {
  eventInfo: EventImpl;
  handleEventEditing: (eventInfo: EventImpl) => void;
};

const DialogFomular: React.FC<DialogFomularProps> = ({
  eventInfo,
  handleEventEditing
}) => {
  const [title, setTitle] = useState(eventInfo.title);
  const [startTime, setStartTime] = useState(extractTime(eventInfo.startStr));
  const [endTime, setEndTime] = useState(extractTime(eventInfo.endStr));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    eventInfo.setProp("title", title);
    const startDate = updateEventTime(eventInfo.startStr, startTime);
    const endDate = updateEventTime(eventInfo.endStr, endTime);
    eventInfo.setDates(startDate, endDate);

    handleEventEditing(eventInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", marginTop: "20px" }}
    >
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="start-time">Start Time: {startTime}</label>
      <input
        id="start-time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label htmlFor="end-time">End Time:</label>
      <input
        id="end-time"
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

export default DialogFomular;
