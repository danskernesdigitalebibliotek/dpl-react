import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import {
  formatDateForAPI,
  groupByBranchId,
  convertGroupBranchesToLibrariesList
} from "./helper";

const useOpeningHoursSidebar = () => {
  const toDayAndDate = formatDateForAPI(new Date());
  const {
    data: openingHours,
    error,
    isLoading
  } = useDplOpeningHoursListGET({
    from_date: toDayAndDate,
    to_date: toDayAndDate
  });

  if (!openingHours) {
    return {
      libraries: [],
      error,
      isLoading
    };
  }

  const groupedOpeningHours = groupByBranchId(openingHours);
  const libraries = convertGroupBranchesToLibrariesList(groupedOpeningHours);

  return {
    libraries,
    error,
    isLoading
  };
};

export default useOpeningHoursSidebar;
