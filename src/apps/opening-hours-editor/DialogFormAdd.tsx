import React from "react";
import { DateSelectArg } from "@fullcalendar/core";
import {
  adjustEndDateToStartDayGridMonth,
  adjustEndDateToStartDayTimeGridWeek,
  formatFullCalendarEventToCmsEventAdd
} from "./helper";
import EventForm, { EventFormOnSubmitType } from "./EventForm";
import {
  DplOpeningHoursCreatePOSTOpeningHoursInstanceBody,
  DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetitionType
} from "../../core/dpl-cms/model";
import { OpeningHoursCategoriesType } from "./types";
import useDialog from "../../components/dialog/useDialog";
import ConfirmAddRepeatedOpeningHour from "./ConfirmAddRepeatedOpeningHour";
import Dialog from "../../components/dialog/Dialog";
import {
  formatDateStringISO,
  updateDateTime
} from "../../core/utils/helpers/date";

type DialogFormAddProps = {
  selectedEventInfo: DateSelectArg;
  handleEventAdd: (
    event: DplOpeningHoursCreatePOSTOpeningHoursInstanceBody
  ) => void;
  closeDialog: () => void;
  openingHoursCategories: OpeningHoursCategoriesType[];
};

const DialogFormAdd: React.FC<DialogFormAddProps> = ({
  selectedEventInfo,
  handleEventAdd,
  closeDialog: closeAddDialog,
  openingHoursCategories
}) => {
  const { dialogContent, openDialogWithContent, closeDialog, dialogRef } =
    useDialog();
  const calendarApi = selectedEventInfo.view.calendar;
  const isDayGridMonth = selectedEventInfo.view.type === "dayGridMonth";
  const isTimeGridWeek = selectedEventInfo.view.type === "timeGridWeek";

  const handleSubmit = ({
    category,
    startTime,
    endTime,
    startDate,
    repeatedEndDate
  }: EventFormOnSubmitType) => {
    const start = updateDateTime(selectedEventInfo.start, startTime);
    const startStr = formatDateStringISO(start);
    let end = updateDateTime(selectedEventInfo.end, endTime);
    let { endStr } = selectedEventInfo;

    if (isTimeGridWeek) {
      const adjustedEnd = adjustEndDateToStartDayTimeGridWeek(start, end);
      end = adjustedEnd.end;
      endStr = adjustedEnd.endStr;
    }

    if (isDayGridMonth) {
      const adjustedEnd = adjustEndDateToStartDayGridMonth(start, end);
      end = adjustedEnd.end;
      endStr = adjustedEnd.endStr;
    }

    const newFullCalenderEvent = {
      ...selectedEventInfo,
      start,
      startStr,
      end,
      endStr,
      title: category.title,
      color: category.color,
      allDay: false
    };

    calendarApi.addEvent(newFullCalenderEvent);
    calendarApi.unselect();

    const cmsEvent = formatFullCalendarEventToCmsEventAdd({
      ...newFullCalenderEvent,
      repetition: {
        type: repeatedEndDate
          ? DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetitionType.weekly
          : DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetitionType.none,
        ...(repeatedEndDate
          ? { weekly_data: { end_date: repeatedEndDate } }
          : {})
      }
    });

    if (repeatedEndDate) {
      openDialogWithContent(
        <ConfirmAddRepeatedOpeningHour
          startDate={startDate}
          category={category}
          startTime={startTime}
          endTime={endTime}
          repeatedEndDate={new Date(repeatedEndDate)}
          confirmSubmit={() => {
            handleEventAdd(cmsEvent);
            closeAddDialog();
          }}
          closeDialog={closeDialog}
        />
      );
    } else {
      handleEventAdd(cmsEvent);
      closeAddDialog();
    }
  };

  return (
    <>
      <EventForm
        openingHoursCategories={openingHoursCategories}
        startDate={selectedEventInfo.start}
        endDate={selectedEventInfo.end}
        onSubmit={handleSubmit}
        isRepeatedOpeningHour
      />

      <Dialog closeDialog={closeDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>
    </>
  );
};

export default DialogFormAdd;
