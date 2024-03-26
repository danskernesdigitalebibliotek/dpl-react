import { useState, useEffect } from "react";
import { EventInput } from "@fullcalendar/core";
import { EventImpl } from "@fullcalendar/core/internal";
import { useQueryClient } from "react-query";
import { formatCmsEventsToFullCalendar } from "./helper";
import {
  getDplOpeningHoursListGETQueryKey,
  useDplOpeningHoursCreatePOST,
  useDplOpeningHoursDeleteDELETE,
  useDplOpeningHoursListGET
} from "../../core/dpl-cms/dpl-cms";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

const useOpeningHours = (openingHoursBranchId: number) => {
  const queryClient = useQueryClient();
  const { data: openingHoursData } = useDplOpeningHoursListGET({
    branch_id: openingHoursBranchId
  });
  const { mutate: removeOpeningHours } = useDplOpeningHoursDeleteDELETE();
  const { mutate: createOpeningHours } = useDplOpeningHoursCreatePOST();
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    if (openingHoursData) {
      const formattedEvents = formatCmsEventsToFullCalendar(openingHoursData);
      setEvents(formattedEvents);
    }
  }, [openingHoursData]);

  const handleEventAdd = (event: DplOpeningHoursListGET200Item) => {
    createOpeningHours(
      {
        data: event
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(getDplOpeningHoursListGETQueryKey());
        },
        onError: () => {
          // eslint-disable-next-line no-alert
          alert("Failed to create opening hours");
          // reload page
          window.location.reload();
        }
      }
    );
  };

  const handleEventEditing = (eventInfo: EventImpl) => {
    // This is just for demonstration purposes
    // and should be replaced with a call to the API
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(eventInfo, null, 2));
  };

  const handleEventRemove = (eventId: string) => {
    if (!eventId) {
      // eslint-disable-next-line no-alert
      alert("Invalid event id");
      return;
    }

    removeOpeningHours(
      { id: eventId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(getDplOpeningHoursListGETQueryKey());
        },
        onError: () => {
          // eslint-disable-next-line no-alert
          alert("Failed to remove opening hours");
          // reload page
          window.location.reload();
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

export default useOpeningHours;
