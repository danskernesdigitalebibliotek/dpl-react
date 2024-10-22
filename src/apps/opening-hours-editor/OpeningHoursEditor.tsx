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
import { useText } from "../../core/utils/text";

export type OpeningHoursEditorType = {
  initialDate?: string | Date | null;
};

const OpeningHoursEditor: React.FC<OpeningHoursEditorType> = ({
  initialDate
}) => {
  // OpeningHoursEditorEventContent cannot be rendered as a standard component,
  // thus preventing the use of useText hook within it.
  const t = useText();
  const iconAltText = t("openingHoursRepeatedIconAltText");
  const config = useConfig();
  const openingHoursCategories = config<OpeningHoursCategoriesType[]>(
    "openingHoursEditorCategoriesConfig",
    {
      transformer: "jsonParse"
    }
  );

  const fullCalendarRef = React.useRef<FullCalendar>(null);
  const fullCalendarApi = fullCalendarRef.current?.getApi();

  const {
    events,
    handleEventAdd,
    handleEventEditing,
    handleEventRemove,
    handleDatesSet
  } = useOpeningHoursEditor();

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
        initialDate={initialDate ? new Date(initialDate) : undefined}
        ref={fullCalendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek",
          center: "title",
          right: "prev,next today"
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
            eventInput,
            iconAltText
          })
        }
        events={events}
        stickyHeaderDates
        height="auto"
        selectMirror
        allDaySlot={false}
        datesSet={handleDatesSet}
      />
    </>
  );
};

export default OpeningHoursEditor;
