import { useConfig } from "./config";

export type TBranch = {
  branchId: string;
  title: string;
  location?: {
    lat: string;
    lng: string;
    value: string;
    address: string;
    city: string;
  };
};

export const excludeBlacklistedBranches = (
  branches: TBranch[],
  blacklist: string[]
): TBranch[] => {
  return branches.filter((item) => !blacklist.includes(item.branchId));
};

export const cleanBranchesId = (branches: TBranch[]): string[] => {
  return (
    branches
      .map((branch) => {
        // Filtering on branchId, only uses agency number for example "775100" and not ISIL "DK-775100"
        // So we need to filter on the digits after the -
        const pattern = /-(\d*)/g;
        const matches = pattern.exec(branch.branchId);
        return matches ? matches[1] : "";
      })
      // Remove empty strings
      .filter((item) => item)
  );
};

/**
 * Getting branches that are not blacklisted.
 *
 * @param blacklistKey
 *  The config key that contains the ID of the blacklist.
 *  Different lists (search, pickup etc.) might have different types.
 * @param preferEmptyResult
 *  If set, return an empty array if blacklist filtering has no effect.
 *  This is useful for filters, where an empty array already means all filters.
 */
export const useGetBranches = (
  blacklistKey: string,
  preferEmptyResult: boolean = false
): TBranch[] => {
  const config = useConfig();
  const branches = config<TBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranches = config(blacklistKey, {
    transformer: "stringToArray"
  });

  if (preferEmptyResult && !blacklistBranches.length) {
    return [];
  }

  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );

  if (preferEmptyResult && whitelistBranches.length == branches.length) {
    return [];
  }

  return whitelistBranches;
};

const useGetSearchBranches = () => {
  const branches = useGetBranches("blacklistedSearchBranchesConfig", true);
  const cleanBranches = cleanBranchesId(branches);
  return cleanBranches;
};

export default useGetSearchBranches;
