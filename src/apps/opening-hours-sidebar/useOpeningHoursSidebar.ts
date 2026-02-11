import { useDplOpeningHoursListGET } from "../../core/dpl-cms/dpl-cms";
import { useConfig } from "../../core/utils/config";
import { formatDateForAPI } from "../../core/utils/helpers/date";
import { convertBranchesToLibraries, BranchConfigType } from "./helper";

const useOpeningHoursSidebar = () => {
  const config = useConfig();
  const branches = config<BranchConfigType[]>(
    "openingHoursSidebarBranchesConfig",
    {
      transformer: "jsonParse"
    }
  );

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

  const libraries = convertBranchesToLibraries(branches, openingHours);

  return {
    libraries,
    error,
    isLoading
  };
};

export default useOpeningHoursSidebar;
