import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";

export const getNumberInSeries = (serie: Work["series"][0], id: WorkId) => {
  const filteredMembers = [
    ...serie.members.filter((member) => member.work.workId === id)
  ];
  return filteredMembers?.[0]?.numberInSeries;
};

export default {};
