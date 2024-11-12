import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";

export const getNumberInSeries = (serie: Work["series"][0], id: WorkId) => {
  if (!serie.members || serie.members.length === 0) {
    return null;
  }
  const filteredMembers = [
    ...serie.members.filter((member) => member.work.workId === id)
  ];
  return filteredMembers?.[0]?.numberInSeries;
};

export default {};
