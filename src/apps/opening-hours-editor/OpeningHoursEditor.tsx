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
import watchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";

export type OpeningHoursEditorType = {
  initialDate?: Date;
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
    handleDatesSet,
    isLoading
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

      {isLoading && (
        <div className="opening-hours-editor__loading">
          <img src={watchIcon} alt="" />

          <h1>{t("openingHoursLoadingText")}</h1>
        </div>
      )}

      <FullCalendar
        initialDate={initialDate ?? undefined}
        ref={fullCalendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek",
          center: "title",
          right: "prev,next today"
        }}
        initialView="timeGridWeek"
        locale={da}
        selectable={!isLoading}
        select={
          isLoading
            ? undefined
            : (selectedEventInfo) =>
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
        eventClick={
          isLoading
            ? undefined
            : (clickInfo) =>
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
