import { DplOpeningHoursListGET200Item } from "../../core/dpl-cms/model";

type OpeningHoursDataType = {
  term: string;
  description: string;
};

export type LibraryType = {
  branch_id: string;
  name: string;
  openingHoursData: OpeningHoursDataType[];
  link: string;
};

export type BranchConfigType = {
  branch_id: string;
  link: string;
  name: string;
  promoted: boolean;
};

// Sort branches by promoted status and name
const sortBranches = (branches: BranchConfigType[]): BranchConfigType[] =>
  branches.sort(
    (a, b) =>
      Number(b.promoted) - Number(a.promoted) || a.name.localeCompare(b.name)
  );

const filterOpeningHoursByBranchId = (
  branch_id: string,
  openingHours: DplOpeningHoursListGET200Item[]
): DplOpeningHoursListGET200Item[] =>
  openingHours.filter((item) => item.branch_id === Number(branch_id));

const sortOpeningHours = (
  openingHours: DplOpeningHoursListGET200Item[]
): DplOpeningHoursListGET200Item[] =>
  openingHours.sort(
    (a, b) =>
      a.start_time.localeCompare(b.start_time) ||
      a.end_time.localeCompare(b.end_time)
  );

const mapOpeningHoursData = (
  openingHours: DplOpeningHoursListGET200Item[]
): OpeningHoursDataType[] =>
  openingHours.map((item) => ({
    term: item.category.title,
    description: `${item.start_time} - ${item.end_time}`
  }));

export const convertBranchesToLibraries = (
  branches: BranchConfigType[],
  openingHours: DplOpeningHoursListGET200Item[]
): LibraryType[] => {
  const sortedBranches = sortBranches(branches);
  return sortedBranches.map(({ branch_id, name, link }) => {
    const branchOpeningHours = filterOpeningHoursByBranchId(
      branch_id,
      openingHours
    );
    const sortedOpeningHours = sortOpeningHours(branchOpeningHours);
    const openingHoursData = mapOpeningHoursData(sortedOpeningHours);

    return {
      branch_id,
      name,
      openingHoursData,
      link
    };
  });
};
