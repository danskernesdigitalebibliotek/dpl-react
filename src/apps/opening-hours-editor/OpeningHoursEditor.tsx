import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import OpeningHoursEditorEventContent from "./OpeningHoursEditorEventContent";
import useOpeningHours from "./useOpeningHours";
import DialogFomularEdit from "./DialogFomularEdit";
import Dialog from "../../components/dialog/Dialog";
import useDialog from "../../components/dialog/useDialog";
import DialogFomularAdd from "./DialogFomularAdd";

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
        select={(selectedEventInfo) =>
          openDialogWithContent(
            <DialogFomularAdd
              selectedEventInfo={selectedEventInfo}
              handleEventSelect={handleEventSelect}
              closeDialog={closeDialog}
            />
          )
        }
        eventClick={(clickInfo) =>
          openDialogWithContent(
            <DialogFomularEdit
              eventInfo={clickInfo.event}
              handleEventEditing={handleEventEditing}
              closeDialog={closeDialog}
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
