import React from "react";
import { DateSelectArg } from "@fullcalendar/core";
import {
  adjustEndDateToStartDay,
  extractTime,
  updateEventTime
} from "./helper";
import { ExtendedDateSelectArgType } from "./useOpeningHours";
import EventForm, { EventFormOnSubmitType } from "./EventForm";

type DialogFomularAddProps = {
  selectedEventInfo: DateSelectArg;
  handleEventSelect: (selectedEventInfo: ExtendedDateSelectArgType) => void;
  closeDialog: () => void;
};

const DialogFomularAdd: React.FC<DialogFomularAddProps> = ({
  selectedEventInfo,
  handleEventSelect,
  closeDialog
}) => {
  const calendarApi = selectedEventInfo.view.calendar;

  const handleSubmit: EventFormOnSubmitType = (title, startTime, endTime) => {
    const startDate = updateEventTime(selectedEventInfo.startStr, startTime);
    let endDate = updateEventTime(selectedEventInfo.endStr, endTime);

    endDate = adjustEndDateToStartDay(startDate, endDate);

    const newEventInfo = {
      ...selectedEventInfo,
      startStr: startDate.toISOString(),
      endStr: endDate.toISOString(),
      title
    };

    handleEventSelect(newEventInfo);
    calendarApi.unselect();
    closeDialog();
  };

  return (
    <EventForm
      initialTitle=""
      initialStartTime={extractTime(selectedEventInfo.startStr)}
      initialEndTime={extractTime(selectedEventInfo.endStr)}
      onSubmit={handleSubmit}
    />
  );
};

export default DialogFomularAdd;
