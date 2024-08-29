import { groupBy } from "lodash";
import dayjs from "dayjs";
import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

type OpeningHoursDataType = {
  term: string;
  description: string;
};

export type LibraryType = {
  id: string;
  name: string;
  openingHoursData: OpeningHoursDataType[];
  link: string;
};

export type GroupedOpeningHourstype = Record<
  string,
  DplOpeningHoursListGET200Item[]
>;

export const groupByBranchId = (
  events: DplOpeningHoursListGET200Item[]
): GroupedOpeningHourstype => {
  return groupBy(events, "branch_id");
};

export const convertGroupBranchesToLibrariesList = (
  input: GroupedOpeningHourstype
): LibraryType[] => {
  return Object.entries(input).map(([branchId, events]) => {
    const openingHoursData = events.map((event) => ({
      term: event.category.title,
      description: `${event.start_time} - ${event.end_time}`
    }));

    return {
      id: branchId,
      name: `Branch ${branchId}`, // Placeholder name
      openingHoursData,
      link: "#" // Placeholder URL
    };
  });
};

export const formatDateForAPI = (date: Date): string => {
  return dayjs(date).format("YYYY-MM-DD");
};
