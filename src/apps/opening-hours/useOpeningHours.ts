// useOpeningHours.ts
import { useState, useEffect, useCallback } from "react";
import { addWeeks, subWeeks } from "date-fns";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import {
  GroupedOpeningHours,
  formatDate,
  getCurrentWeekDisplay,
  getWeekStartAndEndDate,
  groupOpeningHoursByWeekday
} from "./OpeningHoursHelpers";

interface UseOpeningHoursReturn {
  currentWeekDisplay: string;
  groupedOpeningHours: GroupedOpeningHours;
  navigateToPreviousWeek: () => void;
  navigateToNextWeek: () => void;
  isLoading: boolean;
  error: any; // Adjust according to the error type of useDplOpeningHoursListGET
}

export function useOpeningHours(
  initialDate: Date,
  branchId: number
): UseOpeningHoursReturn {
  const [currentWeekRange, setCurrentWeekRange] = useState(() =>
    getWeekStartAndEndDate(initialDate)
  );
  const [groupedOpeningHours, setGroupedOpeningHours] =
    useState<GroupedOpeningHours>({});

  const {
    data: openingHours,
    error,
    isLoading
  } = useDplOpeningHoursListGET({
    branch_id: branchId,
    from_date: formatDate(currentWeekRange.start),
    to_date: formatDate(currentWeekRange.end)
  });

  useEffect(() => {
    if (!isLoading && !error && openingHours) {
      const newGroupedOpeningHours = groupOpeningHoursByWeekday(
        currentWeekRange.start,
        openingHours
      );
      setGroupedOpeningHours(newGroupedOpeningHours);
    }
  }, [openingHours, currentWeekRange, isLoading, error]);

  const navigateToPreviousWeek = useCallback(() => {
    setCurrentWeekRange((prev) =>
      getWeekStartAndEndDate(subWeeks(prev.start, 1))
    );
  }, []);

  const navigateToNextWeek = useCallback(() => {
    setCurrentWeekRange((prev) =>
      getWeekStartAndEndDate(addWeeks(prev.start, 1))
    );
  }, []);

  const currentWeekDisplay = getCurrentWeekDisplay(currentWeekRange.start);

  return {
    currentWeekDisplay,
    groupedOpeningHours,
    navigateToPreviousWeek,
    navigateToNextWeek,
    isLoading,
    error
  };
}
