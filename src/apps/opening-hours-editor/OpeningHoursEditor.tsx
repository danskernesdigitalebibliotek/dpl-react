import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import da from "@fullcalendar/core/locales/da";
import OpeningHoursEditorEventContent from "./OpeningHoursEditorEventContent";
import useOpeningHoursEditor from "./useOpeningHoursEditor";
import DialogFormEdit from "./DialogFormEdit";
import Dialog from "../../components/dialog/Dialog";
import useDialog from "../../components/dialog/useDialog";
import DialogFormAdd from "./DialogFormAdd";
import { OpeningHoursCategoriesType } from "./types";
import { useConfig } from "../../core/utils/config";

export type OpeningHoursEditorType = {
  useWireMockStartDate?: string;
};

const OpeningHoursEditor: React.FC<OpeningHoursEditorType> = ({
  useWireMockStartDate
}) => {
  const config = useConfig();
  const openingHoursCategories = config<OpeningHoursCategoriesType[]>(
    "openingHoursEditorCategoriesConfig",
    {
      transformer: "jsonParse"
    }
  );
  const fullCalendarRef = React.useRef<FullCalendar>(null);
  const fullCalendarApi = fullCalendarRef.current?.getApi();

  const { events, handleEventAdd, handleEventEditing, handleEventRemove } =
    useOpeningHoursEditor();

  const { dialogContent, openDialogWithContent, closeDialog, dialogRef } =
    useDialog({
      onClose: () => {
        if (fullCalendarApi) fullCalendarApi.unselect();
      }
    });

  return (
    <>
      <Dialog closeDialog={closeDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>

      <FullCalendar
        initialDate={useWireMockStartDate ?? undefined}
        ref={fullCalendarRef}
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
            <DialogFormAdd
              selectedEventInfo={selectedEventInfo}
              handleEventAdd={handleEventAdd}
              openingHoursCategories={openingHoursCategories}
              closeDialog={closeDialog}
            />
          )
        }
        unselectAuto={false}
        eventClick={(clickInfo) =>
          openDialogWithContent(
            <DialogFormEdit
              eventInfo={clickInfo.event}
              handleEventEditing={handleEventEditing}
              handleEventRemove={handleEventRemove}
              openingHoursCategories={openingHoursCategories}
              closeDialog={closeDialog}
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
