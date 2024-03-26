import React from "react";
import { DateSelectArg } from "@fullcalendar/core";
import {
  adjustEndDateToStartDay,
  extractTime,
  formatFullCalendarEventToCmsEvent,
  updateEventTime
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";
import { OpeningHoursCategoriesType } from "./types";

type DialogFomularAddProps = {
  selectedEventInfo: DateSelectArg;
  handleEventAdd: (selectedEventInfo: DplOpeningHoursListGET200Item) => void;
  closeDialog: () => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFomularAdd: React.FC<DialogFomularAddProps> = ({
  selectedEventInfo,
  handleEventAdd,
  closeDialog,
  openingHoursCategories
}) => {
  const calendarApi = selectedEventInfo.view.calendar;

  const handleSubmit: EventFormOnSubmitType = (
    category,
    startTime,
    endTime
  ) => {
    const startDate = updateEventTime(selectedEventInfo.start, startTime);
    let endDate = updateEventTime(selectedEventInfo.end, endTime);
    endDate = adjustEndDateToStartDay(startDate, endDate);

    const newEventInfo = {
      ...selectedEventInfo,
      start: startDate,
      end: endDate,
      title: category.title,
      color: category.color,
      allDay: false
    };

    calendarApi.addEvent(newEventInfo);
    calendarApi.unselect();

    handleEventAdd(formatFullCalendarEventToCmsEvent(newEventInfo));
    closeDialog();
  };

  return (
    <EventForm
      openingHoursCategories={openingHoursCategories}
      initialStartTime={extractTime(selectedEventInfo.start)}
      initialEndTime={extractTime(selectedEventInfo.end)}
      onSubmit={handleSubmit}
    />
  );
};

export default DialogFomularAdd;
