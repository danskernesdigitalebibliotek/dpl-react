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
    eventInfo.setProp("title", title);
    const startDate = updateEventTime(eventInfo.startStr, startTime);

    const endDate = updateEventTime(eventInfo.endStr, endTime);
    eventInfo.setDates(startDate, endDate);

    handleEventEditing(eventInfo);
    closeDialog();
  };

  return (
    <EventForm
      initialTitle={eventInfo.title}
      initialStartTime={extractTime(eventInfo.startStr)}
      initialEndTime={extractTime(eventInfo.endStr)}
      onSubmit={handleSubmit}
    />
  );
};

export default DialogFomularEdit;
