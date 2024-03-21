import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import OpeningHoursEditorEventContent from "./OpeningHoursEditorEventContent";
import useOpeningHours from "./useOpeningHours";
import DialogFomular from "./DialogFomular";
import Dialog from "./Dialog";
import useDialog from "./useDialog";

const OpeningHoursEditor: React.FC = () => {
  const { events, handleEventSelect, handleEventEditing, handleEventRemove } =
    useOpeningHours();

  const { dialogContent, openDialogWithContent, closeDialog, dialogRef } =
    useDialog();

  return (
    <>
      <Dialog closeDialog={closeDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "title",
          center: "prev,next today",
          right: "dayGridMonth,timeGridWeek"
        }}
        initialView="timeGridWeek"
        locale={da}
        selectable
        select={handleEventSelect}
        eventClick={(clickInfo) =>
          openDialogWithContent(
            <DialogFomular
              eventInfo={clickInfo.event}
              handleEventEditing={handleEventEditing}
            />
          )
        }
        eventContent={(eventInput) =>
          OpeningHoursEditorEventContent({
            eventInput,
            handleEventRemove
          })
        }
        events={events}
        stickyHeaderDates
        height="auto"
        selectMirror
      />
    </>
  );
};

export default OpeningHoursEditor;
