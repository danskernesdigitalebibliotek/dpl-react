import { useCallback, useEffect, useState } from "react";
import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import {
  GroupedOpeningHours,
  groupOpeningHoursByWeekday
} from "./OpeningHoursHelpers";
import {
  formatDateForAPI,
  getNextWeek,
  getPreviousWeek,
  getWeekStartAndEndDate
} from "../../core/utils/helpers/date";

interface UseOpeningHoursReturn {
  groupedOpeningHours: GroupedOpeningHours;
  currentWeekRange: { start: Date; end: Date };
  navigateToPreviousWeek: () => void;
  navigateToNextWeek: () => void;
  isLoading: boolean;
}
function useOpeningHours(
  initialDate: Date,
  branchId: number
): UseOpeningHoursReturn {
  const [currentWeekRange, setCurrentWeekRange] = useState(() =>
    getWeekStartAndEndDate(initialDate)
  );
  const [groupedOpeningHours, setGroupedOpeningHours] =
    useState<GroupedOpeningHours>([]);

  const {
    data: openingHours,
    error,
    isLoading
  } = useDplOpeningHoursListGET({
    branch_id: branchId,
    from_date: formatDateForAPI(currentWeekRange.start),
    to_date: formatDateForAPI(currentWeekRange.end)
  });

  useEffect(() => {
    if (!isLoading && !error && openingHours) {
      const newGroupedOpeningHours = groupOpeningHoursByWeekday(
        currentWeekRange.start,
        currentWeekRange.end,
        openingHours
      );
      setGroupedOpeningHours(newGroupedOpeningHours);
    }
  }, [openingHours, currentWeekRange, isLoading, error]);

  const navigateToPreviousWeek = useCallback(() => {
    setCurrentWeekRange((prev) => {
      const previousWeek = getPreviousWeek(prev.start);
      return getWeekStartAndEndDate(previousWeek);
    });
  }, []);

  const navigateToNextWeek = useCallback(() => {
    setCurrentWeekRange((prev) => {
      const nextWeek = getNextWeek(prev.start);
      return getWeekStartAndEndDate(nextWeek);
    });
  }, []);

  return {
    groupedOpeningHours,
    currentWeekRange,
    navigateToPreviousWeek,
    navigateToNextWeek,
    isLoading
  };
}

export default useOpeningHours;
