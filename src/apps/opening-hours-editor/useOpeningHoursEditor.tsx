import { useState, useEffect } from "react";
import { EventInput } from "@fullcalendar/core";
import { useQueryClient } from "react-query";
import { formatCmsEventsToFullCalendar } from "./helper";
import {
  getDplOpeningHoursListGETQueryKey,
  useDplOpeningHoursCreatePOST,
  useDplOpeningHoursDeleteDELETE,
  useDplOpeningHoursListGET,
  useDplOpeningHoursUpdatePATCH
} from "../../core/dpl-cms/dpl-cms";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";
import { useConfig } from "../../core/utils/config";

const useOpeningHoursEditor = () => {
  const config = useConfig();
  const openingHoursBranchId = config("openingHoursBranchIdConfig", {
    transformer: "stringToNumber"
  });
  const queryClient = useQueryClient();
  const { data: openingHoursData } = useDplOpeningHoursListGET({
    branch_id: openingHoursBranchId
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

  const handleEventAdd = (event: DplOpeningHoursListGET200Item) => {
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

  const handleEventEditing = (event: DplOpeningHoursListGET200Item) => {
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

  const handleEventRemove = (eventId: string) => {
    removeOpeningHours(
      {
        id: eventId,
        params: {
          _format: "json"
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
    handleEventEditing
  };
};

export default useOpeningHoursEditor;
