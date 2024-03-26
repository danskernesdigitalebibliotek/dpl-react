import React from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import { extractTime, updateEventTime } from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";

type DialogFomularEditProps = {
  eventInfo: EventImpl;
  handleEventEditing: (eventInfo: EventImpl) => void;
  closeDialog: () => void;
};

const DialogFomularEdit: React.FC<DialogFomularEditProps> = ({
  eventInfo,
  handleEventEditing,
  closeDialog
}) => {
  const handleSubmit: EventFormOnSubmitType = (title, startTime, endTime) => {
    if (eventInfo.start && eventInfo.end) {
      eventInfo.setProp("title", title);
      const startDate = updateEventTime(eventInfo.start, startTime);

      const endDate = updateEventTime(eventInfo.end, endTime);
      eventInfo.setDates(startDate, endDate);

      handleEventEditing(eventInfo);
      closeDialog();
    }
  };

  if (!eventInfo.start || !eventInfo.end) {
    return null;
  }

  return (
    <EventForm
      initialTitle={eventInfo.title}
      initialStartTime={extractTime(eventInfo.start)}
      initialEndTime={extractTime(eventInfo.end)}
      onSubmit={handleSubmit}
    />
  );
};

export default DialogFomularEdit;
