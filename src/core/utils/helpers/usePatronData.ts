import { useGetPersonTypePatronInformationV2 } from "../../fbs/fbs";
import BlockedTypes from "../types/BlockedTypes";
import { Patron } from "../types/entities";
import { isAnonymous } from "./user";

export const usePatronData = () =>
  useGetPersonTypePatronInformationV2({
    enabled: !isAnonymous()
  });

export const getBlockedStatus = (patron?: Patron | null) => {
  // TODO: Investigate if we need to consider multiple
  // block statuses and not only the first.
  if (patron?.blockStatus && patron?.blockStatus?.length > 0) {
    return patron.blockStatus[0].blockedReason as BlockedTypes;
  }
  // We cannot resolve the block status so we return unknown
  return BlockedTypes.unknown;
};

export default {};
