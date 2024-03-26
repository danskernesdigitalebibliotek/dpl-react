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
import { OpeningHoursCategoriesType } from "./types";

export type OpeningHoursEditorType = {
  openingHoursCategories: OpeningHoursCategoriesType[];
  openingHoursBranchId: number;
};

const OpeningHoursEditor: React.FC<OpeningHoursEditorType> = ({
  openingHoursCategories,
  openingHoursBranchId
}) => {
  const { events, handleEventAdd, handleEventEditing, handleEventRemove } =
    useOpeningHours(openingHoursBranchId);

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
              handleEventAdd={handleEventAdd}
              closeDialog={closeDialog}
              openingHoursCategories={openingHoursCategories}
            />
          )
        }
        eventClick={(clickInfo) =>
          openDialogWithContent(
            <DialogFomularEdit
              eventInfo={clickInfo.event}
              handleEventEditing={handleEventEditing}
              closeDialog={closeDialog}
              handleEventRemove={handleEventRemove}
              openingHoursCategories={openingHoursCategories}
            />
          )
        }
        eventContent={(eventInput) =>
          OpeningHoursEditorEventContent({
            eventInput
          })
        }
        events={events}
        stickyHeaderDates
        height="auto"
        selectMirror
        allDaySlot={false}
      />
    </>
  );
};

export default OpeningHoursEditor;
