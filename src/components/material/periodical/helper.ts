export type GroupListItem = {
  displayText: string;
  itemNumber: string;
  volume: string;
  volumeNumber: string;
  volumeYear: string;
};

export const getFirstEditionFromYear = <T extends string>(
  year: T,
  groupList: { [key in T]: GroupListItem[] }
) => {
  return groupList[year][0];
};

export default {};
