import { useState, useEffect, useCallback, useMemo } from "react";
import { CalendarApi, EventInput } from "@fullcalendar/core";
import { useQueryClient } from "react-query";
import {
  formatCmsEventsToFullCalendar,
  getStringForDateInput,
  getThreeMonthRange
} from "./helper";
import {
  getDplOpeningHoursListGETQueryKey,
  useDplOpeningHoursCreatePOST,
  useDplOpeningHoursDeleteDELETE,
  useDplOpeningHoursListGET,
  useDplOpeningHoursUpdatePATCH
} from "../../core/dpl-cms/dpl-cms";
import {
  DplOpeningHoursCreatePOSTOpeningHoursInstanceBody,
  DplOpeningHoursUpdatePATCH200Item
} from "../../core/dpl-cms/model";
import { useConfig } from "../../core/utils/config";
import { HandleEventRemoveType } from "./types";

const useOpeningHoursEditor = (calendarApi: CalendarApi | undefined) => {
  const config = useConfig();
  const openingHoursBranchId = config("openingHoursBranchIdConfig", {
    transformer: "stringToNumber"
  });

  const [date, setDate] = useState(new Date());
  const currentMonthRange = useMemo(() => getThreeMonthRange(date), [date]);

  const queryClient = useQueryClient();
  const { data: openingHoursData } = useDplOpeningHoursListGET({
    branch_id: openingHoursBranchId,
    from_date: getStringForDateInput(currentMonthRange.start),
    to_date: getStringForDateInput(currentMonthRange.end)
  });
  const { mutate: removeOpeningHours } = useDplOpeningHoursDeleteDELETE();
  const { mutate: createOpeningHours } = useDplOpeningHoursCreatePOST();
  const { mutate: updateOpeningHours } = useDplOpeningHoursUpdatePATCH();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (openingHoursData) {
      const formattedEvents = formatCmsEventsToFullCalendar(openingHoursData);
      setEvents(formattedEvents);
    }
  }, [openingHoursData]);

  const navigateToPreviousMonthRange = useCallback(() => {
    if (calendarApi) {
      calendarApi.prev();
      setDate(
        (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
      );
    }
  }, [calendarApi]);

  const navigateToNextMonthRange = useCallback(() => {
    if (calendarApi) {
      calendarApi.next();
      setDate(
        (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
      );
    }
  }, [calendarApi]);

  const onSuccess = () => {
    queryClient.invalidateQueries(
      getDplOpeningHoursListGETQueryKey({ branch_id: openingHoursBranchId })
    );
  };

  const onError = (message: string) => {
    // eslint-disable-next-line no-alert
    alert(message);
    // reload page to get the latest data
    window.location.reload();
  };

  const handleEventAdd = (
    event: DplOpeningHoursCreatePOSTOpeningHoursInstanceBody
  ) => {
    createOpeningHours(
      {
        data: {
          ...event,
          branch_id: openingHoursBranchId
        },
        params: {
          _format: "json"
        }
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: () => {
          onError("Failed to create opening hours");
        }
      }
    );
  };

  const handleEventEditing = (event: DplOpeningHoursUpdatePATCH200Item) => {
    updateOpeningHours(
      {
        id: event.id.toString(),
        data: {
          ...event,
          branch_id: openingHoursBranchId
        },
        params: {
          _format: "json"
        }
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: () => {
          onError("Failed to update opening hours");
        }
      }
    );
  };

  const handleEventRemove = ({
    eventId,
    repetition_id
  }: HandleEventRemoveType) => {
    removeOpeningHours(
      {
        id: eventId,
        params: {
          _format: "json",
          ...(repetition_id ? { repetition_id } : {})
        }
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: () => {
          onError("Failed to remove opening hours");
        }
      }
    );
  };

  return {
    events,
    handleEventAdd,
    handleEventRemove,
    handleEventEditing,
    navigateToPreviousMonthRange,
    navigateToNextMonthRange
  };
};

export default useOpeningHoursEditor;
