import { useState, useEffect } from "react";
import { DatesSetArg, EventInput } from "@fullcalendar/core";
import { useQueryClient } from "react-query";
import { formatCmsEventsToFullCalendar } from "./helper";
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
import { formatDateForAPI } from "../../core/utils/helpers/date";

const useOpeningHoursEditor = () => {
  const config = useConfig();
  const openingHoursBranchId = config("openingHoursBranchIdConfig", {
    transformer: "stringToNumber"
  });
  const [datesSet, setDatseSet] = useState<null | DatesSetArg>(null);
  const queryClient = useQueryClient();
  const { data: openingHoursData } = useDplOpeningHoursListGET(
    {
      branch_id: openingHoursBranchId,
      ...(datesSet && {
        from_date: formatDateForAPI(datesSet.start),
        to_date: formatDateForAPI(datesSet.end)
      })
    },
    { enabled: !!datesSet }
  );
  const { mutate: removeOpeningHours, isLoading: removeOpeningHoursLoading } =
    useDplOpeningHoursDeleteDELETE();
  const { mutate: createOpeningHours, isLoading: createOpeningHoursLoading } =
    useDplOpeningHoursCreatePOST();
  const { mutate: updateOpeningHours, isLoading: updateOpeningHoursLoading } =
    useDplOpeningHoursUpdatePATCH();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (openingHoursData) {
      const formattedEvents = formatCmsEventsToFullCalendar(openingHoursData);
      setEvents(formattedEvents);
    }
  }, [openingHoursData]);

  const handleDatesSet = (datesInView: DatesSetArg) => {
    setDatseSet(datesInView);
  };

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
    handleDatesSet,
    isLoading:
      updateOpeningHoursLoading ||
      removeOpeningHoursLoading ||
      createOpeningHoursLoading
  };
};

export default useOpeningHoursEditor;
